/**
 * Example Node / serverless proxy for AI feedback.
 * Keep OPENAI_API_KEY on the server only.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
      return;
    }

    const prompt = `
You are an English writing teacher for A2-B1 students.
Give brief, practical feedback.

Task:
${JSON.stringify(body.task, null, 2)}

Expected formality:
${body.expected_formality}

Student text:
${body.student_text}

Local rubric:
${JSON.stringify(body.local_result, null, 2)}

Return strict JSON with keys:
overall_comment
strengths
improvements
corrected_email
`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: [
          {
            role: 'system',
            content: 'You are a careful English writing assessor. Return valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const outputText = data.output_text || '';

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch (e) {
      parsed = {
        overall_comment: 'AI feedback was returned in an unexpected format.',
        strengths: [],
        improvements: ['Check the server response format.'],
        corrected_email: ''
      };
    }

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}

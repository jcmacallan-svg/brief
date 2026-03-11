/**
 * Example Node / serverless proxy for AI feedback.
 *
 * IMPORTANT:
 * - Keep OPENAI_API_KEY on the server only.
 * - Do NOT place your API key inside index.html or any browser code.
 *
 * Expected POST body:
 * {
 *   task: {...},
 *   student_text: "...",
 *   expected_formality: "formal" | "informal",
 *   local_result: {...}
 * }
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

Rules:
- Focus on spelling, grammar, tone, task completion, salutation and sign-off.
- Keep corrected_email simple and realistic for A2-B1.
- Do not over-correct into C1/C2 language.
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
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'email_feedback',
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                overall_comment: { type: 'string' },
                strengths: { type: 'array', items: { type: 'string' } },
                improvements: { type: 'array', items: { type: 'string' } },
                corrected_email: { type: 'string' }
              },
              required: ['overall_comment', 'strengths', 'improvements', 'corrected_email']
            }
          }
        }
      })
    });

    const data = await response.json();

    let parsed = null;
    try {
      parsed = JSON.parse(data.output_text);
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

/**
 * Google Apps Script Web App
 * Ontvangt JSON van de GitHub Pages-site en mailt de inzending naar de docent.
 */
const TEACHER_EMAIL = 'h.blankestijn@roca12.nl';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    const subject = 'Nieuwe inzending briefschrijfoefening: ' + (data.student_name || 'Onbekende student');

    const body =
      'Nieuwe inzending ontvangen\n\n' +
      'Docent: ' + (data.teacher_email || TEACHER_EMAIL) + '\n' +
      'Student: ' + (data.student_name || '') + '\n' +
      'Student e-mail: ' + (data.student_email || '') + '\n' +
      'Opdracht: ' + (data.assignment_title || '') + '\n' +
      'Doel: ' + (data.goal || '') + '\n' +
      'Ontvanger: ' + (data.audience || '') + '\n' +
      'Onderwerp: ' + (data.subject_line || '') + '\n' +
      'Gewenste toon: ' + (data.expected_formality || '') + '\n' +
      'Score lokaal: ' + (data.local_score || '') + '/28\n' +
      'Ingediend op: ' + (data.submitted_at || '') + '\n\n' +
      '--- STUDENTTEKST ---\n' +
      (data.student_text || '') + '\n\n' +
      '--- LOKALE SAMENVATTING ---\n' +
      (data.local_summary || '') + '\n\n' +
      '--- RUBRIC ---\n' +
      JSON.stringify(data.local_rubric || [], null, 2);

    MailApp.sendEmail({
      to: data.teacher_email || TEACHER_EMAIL,
      subject: subject,
      body: body,
      replyTo: data.student_email || undefined
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

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
      'Situatie: ' + (data.situation || '') + '\n' +
      'Ontvanger: ' + (data.audience || '') + '\n' +
      'Verplichte punten: ' + (data.required_points || '') + '\n' +
      'Score: ' + (data.score || '') + '/10\n' +
      'Ingediend op: ' + (data.submitted_at || '') + '\n\n' +
      '--- STUDENTTEKST ---\n' +
      (data.student_text || '') + '\n\n' +
      '--- FEEDBACK (HTML STRIPPED IN E-MAIL) ---\n' +
      stripHtml_(data.feedback_html || '');

    MailApp.sendEmail({
      to: TEACHER_EMAIL,
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

function stripHtml_(html) {
  return html
    .replace(/<br\s*\/?/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<li>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

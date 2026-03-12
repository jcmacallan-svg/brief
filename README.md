# English Email Writing Practice v4

Docentmail: `h.blankestijn@roca12.nl`

## Nieuw in versie 4
- het schrijfscherm lijkt meer op een echt mailvenster
- aparte velden voor From, To en Subject
- uitgebreidere scenario-schetsen
- 8 verplichte punten per taak
- score op /28
- mailfunctie met zichtbare fallback:
  - zonder endpoint opent een kant-en-klare e-mail
  - met endpoint wordt automatisch verzonden

## Bestanden
- `index.html`
- `google-apps-script-mail.js`
- `README.md`
- `.nojekyll`

## Automatisch versturen aanzetten
1. Open `google-apps-script-mail.js`
2. Plaats de code in een nieuw Google Apps Script-project
3. Deploy als Web App
4. Kopieer de Web App URL
5. Zet die URL in `index.html` bij:
   `const MAIL_ENDPOINT = "";`

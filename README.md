# Briefschrijfoefening — slimme AI-feedback versie

Docentmail: `h.blankestijn@roca12.nl`

## Wat deze versie doet
- 6 opdrachten op A2-B1 niveau
- 6 verplichte onderdelen per opdracht
- automatische puntentelling per onderdeel
- 80%-regel voor inhoudsdekking
- controle op:
  - greeting / salutation
  - hoofdletter I
  - hoofdletters aan begin van zinnen
  - leestekens aan het eind van zinnen
  - closing sentence
  - final sign-off
  - veelvoorkomende spelling- en grammaticafouten
- optionele AI-feedback
- optioneel automatisch mailen naar de docent

## Bestanden
- `index.html` — de website voor GitHub Pages
- `google-apps-script-mail.js` — mailt inzendingen naar de docent
- `openai-ai-proxy-template.js` — voorbeeld backend voor AI-feedback
- `README.md` — deze handleiding
- `.nojekyll`

## Belangrijk
GitHub Pages is statisch. Daarom kun je een OpenAI API-key niet veilig in de browser zetten.
Gebruik voor AI-feedback een eigen backend of serverless function en zet daarna de URL daarvan in `AI_ENDPOINT`.

## Snelle route: eerst zonder AI
1. Upload alle bestanden naar een GitHub-repository.
2. Zet GitHub Pages aan.
3. De site werkt dan al met lokale feedback en puntentelling.

## AI-feedback aanzetten
1. Maak een eigen backend of serverless function.
2. Gebruik `openai-ai-proxy-template.js` als startpunt.
3. Zet jouw geheime API-key als environment variable.
4. Deploy die backend.
5. Open `index.html`
6. Zoek:
   `const AI_ENDPOINT = '';`
7. Vul daar jouw backend-URL in.
8. Upload de aangepaste `index.html` opnieuw.

## Mailen naar docent aanzetten
1. Gebruik `google-apps-script-mail.js`
2. Deploy als Google Apps Script Web App
3. Kopieer de Web App URL
4. Zet die URL in `index.html` bij:
   `const MAIL_ENDPOINT = '';`

## Wat de docent krijgt
- naam student
- student e-mail
- opdracht
- studenttekst
- lokale score /20
- puntentabel per onderdeel
- AI-feedback, als die actief is

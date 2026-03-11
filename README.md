# Briefschrijfoefening voor GitHub Pages — docentmail ingevuld

Dit pakket bevat een eenvoudige webapp voor Engelse e-mails op A2-B1 niveau.

## Docentmail
De docentmail is in dit pakket alvast ingevuld als:

`h.blankestijn@roca12.nl`

## Inhoud
- `index.html` — de volledige oefenpagina
- `google-apps-script-template.js` — script om inzendingen naar jouw e-mail te sturen
- `.nojekyll` — handig voor GitHub Pages
- `README.md` — deze handleiding

## Zo zet je dit online op GitHub Pages
1. Maak een nieuwe repository op GitHub.
2. Upload alle bestanden uit deze map naar de hoofdmap van die repository.
3. Ga naar `Settings` → `Pages`
4. Kies:
   - Source: **Deploy from a branch**
   - Branch: **main** / **root**
5. Sla op.
6. Je krijgt daarna een GitHub Pages-link.

## Wat al ingevuld is
Jouw e-mailadres is al opgenomen in:
- het Google Apps Script-bestand
- de payload die vanuit de site wordt meegestuurd

## Wat je nog zelf moet doen
Je moet nog steeds een werkend endpoint koppelen in `index.html`.

Zoek deze regel:
`const MAIL_ENDPOINT = '';`

Daar vul je later in:
- een Formspree endpoint, of
- een Google Apps Script Web App URL

## Aanbevolen route: Google Apps Script
1. Open `google-apps-script-template.js`
2. Plak die code in een nieuw Google Apps Script-project
3. Deploy als **Web app**
4. Kies toegang voor **Anyone**
5. Kopieer de web app URL
6. Plak die URL in `index.html` bij `MAIL_ENDPOINT`
7. Upload daarna de aangepaste `index.html` opnieuw naar GitHub

## Resultaat
Dan worden studenttekst, feedback en score automatisch gestuurd naar:

`h.blankestijn@roca12.nl`

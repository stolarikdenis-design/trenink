# Trénink

Denisův tréninkový deník jako webová aplikace do telefonu: plán A, vlastní cviky, gumy, váha po sériích, pocit, pauza, týdenní míry postavy a váha, týdenní a měsíční přehled, PDF reporty.

- Zdroj je v `src/` (`body.html`, `styles.css`, `app.js`).
- `node build.mjs` sestaví `docs/` (index.html, manifest, service worker; publikuje GitHub Pages) a verzi pro claude.ai (`out/artifact.html`).
- `node icons.mjs` udělá ikony z `icon.svg` (potřebuje Playwright).
- Nainstalovaná appka ukládá data v telefonu (localStorage). Na claude.ai ukládá do účtu (`db`). Mezi nimi se data přenáší zálohou: Přehled → Záloha.
- PDF dělá jsPDF 2.5.1 z cdnjs, písmo je podmnožina DejaVu Sans v `docs/fonts/` (čeština).

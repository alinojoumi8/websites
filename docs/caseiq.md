# CaseIQ landing page

Source: `sites/caseiq/src/`. Build: `cd sites/caseiq && node build.mjs`. Output: `sites/caseiq/dist/index.html` (single file) and `dist/og.png`.

## Critique scores (independent panel)

| Evaluator | Draft | Round 2 | Round 3 |
|---|---|---|---|
| Direct-response copy | 6 | 7.5 | 8 |
| Creative direction / UX | 6.5 | 7.5 | 8 |
| Technical SEO / GEO | 5.5 | 7.5 | 8 |

The 9.5 target was not reached. A final batch of the panel's round 3 fixes and the finish reviewer's fixes was applied after the last score and has not been re-scored.

## Before launch

- Real domain (`SITE_URL` in `build.mjs`) and intake endpoint (`INTAKE_ENDPOINT` in `src/app.js`).
- Licensee name, licence type and number; contact details; privacy notice (marked in the footer).
- Have a lawyer confirm what the licensee may draft in each province (Ontario paralegals generally cannot draft Superior Court factums) and whether "strategy" wording is acceptable.
- Confirm or supply: founder story specifics, "Scope and cost agreed before the work starts", forensic capability through CaseIQ, the $15,000-$50,000+ range, Quebec position.
- Replace "Last reviewed" and `dateModified` at launch.

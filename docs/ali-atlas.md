# Site brief: ali-atlas

- **Goal:** a fifth portfolio for Ali Nojoumi, aimed at Director of Product and VP of Product roles in payments, digital asset platforms and applied AI systems. Success is an email or a LinkedIn visit.
- **Audience:** hiring managers, recruiters and founders in fintech. They decide inside two minutes.
- **Pages / sections:** one page.
  1. Cover: title cartouche, portrait in a compass inset, the one-line position, contact links.
  2. Spot heights: four figures, each with its exact scope and date.
  3. The chart: one drawn map. The ventures are stops on a route in founding order. Each stop links to its plate. A route log below the map repeats every stop as text.
  4. Three plates (Pontemesto, Keywa, CMOR Group), each with the gap, the steps as waypoints, and the outcome. A short plate for the three other ventures.
  5. Field stations: Manyworld, TrialLens, CrowdLens, with GitHub links.
  6. Gazetteer: skills index with filters, education, languages.
  7. Home port: contact.
- **Style / mood:** picked by Ali on 2026-11-11: "Map atlas". A printed survey sheet. Light paper `#F4EEE0`, ink navy `#1C2B3A`, route red `#B8402A`, sea green-blue tints, ochre relief bands. Fraunces for titles (italic for water names, as on real charts), Public Sans for text, IBM Plex Mono for labels and figures. It is the only light site of the five. It must not look like the ledger, banknote, model-shop or steel-watch sites.
- **Content:** the same resume and cover letter facts (October 2026) as the fourth site, in `src/lib/content.ts`. The studio portrait is supplied by Ali. The terrain is invented and drawn by `scripts/terrain.mjs`; the page says so. Dates and facts are real.
- **Never on the site:** the same hidden items as the first portfolio, and no resume PDF. The repo is public, so these notes do not spell the hidden items out. Ask Ali for the exact list.
- **Features:** static Astro, Tailwind CSS, TypeScript, no framework runtime. One small inline script: route drawing on scroll and the skills filter. Full content with no JavaScript, with reduced motion and on phones.
- **Hosting / domain:** not decided. Build with `SITE_URL=https://<domain> npm run build` so the canonical link and the share image are absolute.

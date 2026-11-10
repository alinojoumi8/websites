# Site brief: ali-modelshop

- **Goal:** a third flagship portfolio for Ali Nojoumi. It must make a fintech hiring manager or founder want a conversation. Success is an email or a LinkedIn visit.
- **Audience:** hiring managers, recruiters and founders in payments and digital assets. Also design-literate visitors who judge craft.
- **Pages / sections:** one page. The table (hero: name, the bridge model with one yellow span, portrait print). Statement. Four measured figures. One founder at 1:1, a whole team at 1:87 (portrait spread with the tiny Alis and their jobs). Five models (projects, stacked boards). Parts list (other ventures, education). Contact.
- **Style / mood:** an architect's model shop in daylight. The page is a green cutting mat with a live grid. White card models, one cutter-yellow part, foam-blue second colour, pencil-graphite ink, ruler ticks on the page edges. Stencil display type with an engineering sans. It must look nothing like `sites/ali-nojoumi` (ledger) or `sites/ali-flagship` (banknote plate at night).
- **Content:** resume and cover letter dated October 2026, plus two photos, all supplied by Ali. Krea makes the 3D art: hero model, mat texture and one model photo per project. Raw files live in `sites/ali-modelshop/raw` (git-ignored); `scripts/images.mjs` rebuilds the shipped files.
- **Never on the site:** the same hidden items as the first portfolio, and no resume PDF. The repo is public, so these notes do not spell them out. Ask Ali for the exact list.
- **Features:** React island in Astro, Tailwind CSS, Framer Motion, GSAP. WebGL mat grid that bends under the pointer. Split-text entrances, number counters, magnetic buttons, pointer glow on cards, a scale switch that shows the tiny Alis, sticky stacked project boards. Full layout for phones, reduced motion and no JavaScript.
- **Hosting / domain:** undecided. Build with `SITE_URL=https://<domain> npm run build` so the canonical link and the share image are absolute.

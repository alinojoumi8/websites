# Site brief: ali-caliber

- **Goal:** a fourth portfolio for Ali Nojoumi, aimed at Director of Product and VP of Product roles in payments, digital asset platforms and applied AI systems. Success is an email or a LinkedIn visit.
- **Audience:** hiring managers, recruiters and founders in fintech. They decide inside two minutes. Also design-literate visitors who judge craft.
- **Pages / sections:** one page, plus a print page that makes the PDF dossier.
  1. Hero: the studio portrait. A loupe, or the "Inspect leadership stack" switch, shows the composite photo with the small Alis. Each small Ali is a hotspot with one proof.
  2. Four figures on sub-dial registers, with spring counters.
  3. Three case studies, each pinned while it draws, each with a Strategy view and an Architecture view: Pontemesto (payment routing diagram you can run), Keywa (two-layer threshold signing you can operate), CMOR Group and the three other ventures (headline sentiment toy).
  4. The lab: three small demos that run in the browser and link to GitHub (Manyworld, TrialLens, CrowdLens).
  5. Skills matrix with pill filters, education, languages.
  6. Contact with magnetic actions and the PDF dossier.
- **Style / mood:** pinned by Ali as "Horological Fintech Precision". A steel sports watch at night: obsidian `#07090E` and carbon slate `#0F141C`, warm gold `#D4AF37`, brushed steel `#94A3B8`, live emerald `#10B981` and cyan `#38BDF8`. Syne for headlines, Inter for text, JetBrains Mono for data. The page ground is a dial with horizontal grooves. It must not look like the ledger site, the banknote site or the model shop.
- **Content:** resume and cover letter dated October 2026, plus two photos, all supplied by Ali. Krea makes the art: monogram, payment routing, threshold vault, simulation network, sentiment instrument, dial macro, movement macro. Raw files live in `sites/ali-caliber/raw` (git-ignored); `scripts/images.mjs` rebuilds the shipped files. Facts live in `sites/ali-caliber/PRODUCT.md`.
- **Never on the site:** the same hidden items as the first portfolio, and no resume PDF. The dossier PDF is made from the site's own page, so it holds only public facts. The repo is public, so these notes do not spell the hidden items out. Ask Ali for the exact list.
- **Features:** React island in Astro, Tailwind CSS, Motion (Framer Motion), GSAP ScrollTrigger, Lenis. Motion presets live in `src/lib/motion.ts`. The two main diagrams are layered SVGs with named ids and are also served as plain files under `/exports/` for motion tools. Full layout for phones, reduced motion and no JavaScript.
- **Hosting / domain:** here.now test link. Build with `SITE_URL=https://<domain> npm run build` so the canonical link and the share image are absolute.

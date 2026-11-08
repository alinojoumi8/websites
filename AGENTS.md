# Websites workspace

- Each site is self-contained in `sites/<name>/` with its own `package.json`. Never share a `node_modules` across sites.
- Default stack for new sites: Astro (content/marketing sites) or Next.js (apps), Tailwind CSS, TypeScript. Plain HTML/CSS/JS for very small pages.
- Every site needs: responsive layout, semantic HTML, accessible contrast and alt text, meta/OG tags, and a fast Lighthouse score.
- Put the brief for each site in `docs/<name>.md` before building.
- Never commit secrets; use `.env` locally and keep `.env.example` current.

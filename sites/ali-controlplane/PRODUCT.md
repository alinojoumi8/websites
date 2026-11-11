# Product

<!-- impeccable:product-schema 1 -->

Scope: this record describes Ali Nojoumi's sixth portfolio (`sites/ali-controlplane/`, the control plane). The five earlier portfolios (`ali-nojoumi` ledger, `ali-flagship` banknote plate, `ali-modelshop` model shop, `ali-caliber` steel watch, `ali-atlas` map atlas) have their own records. The root `PRODUCT.md` describes CaseIQ only.

## Platform

web

## Stack

User-pinned: Framer Motion (the `motion` package), GSAP ScrollTrigger, Lenis smooth scrolling, Krea-made art. React runs as one island inside Astro (workspace default) with Tailwind CSS, so the page still ships as static HTML. Test hosting on here.now; domain undecided.

## Users

Hiring managers, recruiters and founders at fintech, payments, digital-asset and applied-AI companies who hire for Director of Product and VP of Product roles. They arrive from a resume, LinkedIn or an email, usually between meetings, and decide inside two minutes whether this person is worth a conversation.

## Product Purpose

Get Ali into a conversation about a Director of Product or VP of Product role in payments, digital asset platforms or applied AI systems. Success means the visitor emails him or opens his LinkedIn.

## Positioning

A fintech co-founder who has personally done every job on the way to a live financial product: found the customer need, set the roadmap, designed the gateway and APIs, built components alongside developers, hired and led the team, raised the money, and structured the partnerships. In his words: "I build products when there is a real customer need but no clear path to delivery."

## Operating Context

Visitors weigh him against other product leaders using a resume, LinkedIn and a short conversation. They know payment gateways, processors, liquidity providers, merchant onboarding, custody, multi-signature control and APIs.

## Capabilities and Constraints

- Based in Toronto. Open to GTA, remote, and relocation anywhere in Canada.
- Languages: English (fluent), Farsi (native).
- Public contact channels: alinojoumi8@gmail.com, linkedin.com/in/ali-nojoumi-93251842, github.com/alinojoumi8.
- Standing user decision (2026-11-09, confirmed again 2026-11-11): three resume items never appear on a public site, and the resume PDF is never offered because it contains them. The site offers its own PDF dossier instead, printed from `/dossier/`, which holds only public facts. The repo is public, so these notes do not spell out the hidden items. Ask Ali for the exact list.
- Undecided: domain, hosting.

## Brand Commitments

Voice: plain, factual, first person, as in the cover letter. Dry humour is allowed around the facts and never on them.
Binding from the brief (user, 2026-11-11, sixth site): "Horological Fintech Precision". The page must feel like a live, high-precision financial and AI control plane with executive weight. Palette: obsidian `#07090E`, carbon slate `#0F141C`, warm gold `#D4AF37`, brushed steel `#94A3B8`, live emerald `#10B981`, cyan `#38BDF8`, with subtle glass surfaces. Type: Syne headlines, Inter text, JetBrains Mono for metrics and data. Required parts: the dual-portrait hero with a spotlight and hotspots on the small Alis, a counter strip, three case studies with a Strategy and an Architecture view, three lab demos, a skills matrix, a contact footer with a PDF dossier. Motion presets must stay modular (`src/lib/motion.ts`) and the main diagrams must be layered SVGs with named ids. The same brief produced `ali-caliber` one day earlier; this site must not resemble it, nor the ledger, banknote, model-shop or atlas sites.

## Evidence on Hand

Real, usable as written:

- Pontemesto, co-founder, 2026 to present, pontemesto.app. Merchant payments platform. More than USD $80 million in payment-processing volume from March 2026 through October 5, 2026. Owned roadmap and onboarding requirements. Designed the payment gateway and the APIs for exchanges and liquidity providers. Evaluated and selected processing partners, then structured a commercial partnership and its contracts. Demand came from high-risk merchants.
- Keywa (formerly Tardigrade), co-founder, 2020 to 2024. Found through specialist interviews that organizations needed shared control of crypto assets. Recruited and led a 20-person team. Self-custody solution with multiple signing authorities. Directed exchange and liquidity-provider API design and built components alongside developers. Retail wallet reached approximately 20,000 clients within weeks of launch. Raised CAD $3 million. Co-authored a whitepaper proposing two-layer threshold signing for departmental approvals, distributed key management, and signer replacement without changing the wallet address. Sold ownership following acquisition in December 2024.
- CMOR Group Corporation, CEO, 2018 to 2023. Founded and self-funded. Algorithmic trading applications for FX and equity markets. AI-powered news-trading system that analyzed market sentiment and automated responses to global news.
- MyInvestino.ir, founder, 2020 to 2025. Micro-investing platform with financial-institution integrations.
- Chante.app, founder, 2020 to 2025. Crypto wallet with localized onboarding and support.
- Chainblock.app, founder, 2018 to 2020. Blockchain platform for digital-asset transactions, smart contracts and decentralized applications.
- Manyworld (formerly Agent Economy), github.com/alinojoumi8/manyworld. Open-source economic and society simulation: agents acting as households, businesses and banks. Transaction validation, double-entry accounting, replayable experiments.
- TrialLens, github.com/alinojoumi8/triallens. Open-source experimental legal-AI workspace for evidence review and courtroom rehearsal. Source-linked decision traces, evidence-use controls, saved audit records.
- CrowdLens, in development, github.com/alinojoumi8/crowdlens. Audience simulation on an open-source foundation for possible reactions to product launches, advertising and company news. Document-based scenarios, source-linked reports, saved human reviews.
- Education: Bachelor of Computer Science, University of Mashhad, Iran, 1998. New York Institute of Finance, coursework in financial markets and algorithmic trading.
- Core skills: product strategy and roadmaps, cross-team delivery, API and gateway design, merchant onboarding, digital-asset custody, exchange and liquidity integrations, processing partnerships and contracts, team hiring and leadership.
- Photos: studio portrait, and a composite in the same framing with seven small Alis (ladder, laptop, light bulb, megaphone, sunglasses, clipboard, asleep). Both show a steel sports watch on his wrist.
- Demos and diagrams on the page are toy models that run in the browser with sample data written for the site. They are labelled as such and never stand in for the real products. No message shape, threshold or endpoint shown is the real one.

Absent, do not fabricate: testimonials, employer or client logos, press, product screenshots, monthly volume breakdowns, team member names, awards, real API endpoints.

## Product Principles

1. Every number traces to the resume, with its exact scope and date.
2. Show the mechanism. Do not describe it with adjectives.
3. Find what is missing, then fill it. This is the story of every venture.
4. Serious facts, playful delivery. The joke never touches a fact.

## Accessibility & Inclusion

WCAG AA contrast. Full keyboard support. Complete reduced-motion experience with all content present. No content may depend on hover, WebGL or animation timing to exist.

/**
 * Every fact on the site. Each one traces to Ali's resume or cover letter (October 2026).
 * Some resume items are left out on purpose. Ask Ali before you add a figure.
 */

export const site = {
  name: 'Ali Nojoumi',
  role: 'Product leader',
  field: 'Payments and digital asset platforms',
  city: 'Toronto',
  email: 'alinojoumi8@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ali-nojoumi-93251842',
  github: 'https://github.com/alinojoumi8',
  mailto:
    'mailto:alinojoumi8@gmail.com?subject=' +
    encodeURIComponent('A conversation about product leadership'),
};

export const statement =
  'I build products when there is a real customer need but no clear path to delivery.';

/** The words in the statement that get the yellow marker. */
export const statementMark = 'no clear path';

export const statementAfter = [
  'I am a fintech co-founder. I bring product direction, technical implementation and commercial partnerships together to launch payments and crypto-custody businesses.',
  'I enjoy finding what is missing, assembling the right team and turning a hard problem into a working product.',
];

export type Figure = {
  value: number;
  before?: string;
  after?: string;
  text: string;
  source: string;
  /** Length of the dimension line, as a share of the row. */
  span: number;
};

export const figures: Figure[] = [
  {
    value: 80,
    before: '$',
    after: 'M+',
    text: 'More than USD $80 million in payment-processing volume, from March 2026 through October 5, 2026.',
    source: 'Pontemesto, 2026',
    span: 1,
  },
  {
    value: 20000,
    before: '≈',
    text: 'The custody technology became a retail wallet. It attracted approximately 20,000 clients within weeks of launch.',
    source: 'Keywa retail wallet',
    span: 0.82,
  },
  {
    value: 20,
    text: 'People recruited and led, to deliver a self-custody solution with multiple signing authorities.',
    source: 'Keywa, 2020 to 2024',
    span: 0.56,
  },
  {
    value: 3,
    before: '$',
    after: 'M',
    text: 'Canadian dollars raised for Keywa. The company was acquired in December 2024.',
    source: 'Keywa',
    span: 0.4,
  },
];

/**
 * The seven small Alis in the composite photo.
 * x and y are the centre of each one, as fractions of the picture.
 */
export const jobs = [
  { id: 'bulb', x: 0.735, y: 0.39, label: 'Finds what is missing', note: 'Specialist interviews showed that organizations needed shared control of their crypto assets.' },
  { id: 'megaphone', x: 0.845, y: 0.33, label: 'Calls the team together', note: 'Recruited and led twenty people at Keywa.' },
  { id: 'laptop', x: 0.2, y: 0.4, label: 'Builds alongside the developers', note: 'Designed the payment gateway and the APIs, then built components with the team.' },
  { id: 'ladder', x: 0.105, y: 0.67, label: 'Raises the money', note: 'CAD $3 million for Keywa.' },
  { id: 'clipboard', x: 0.84, y: 0.78, label: 'Writes the requirements', note: 'Roadmap and onboarding requirements at Pontemesto.' },
  { id: 'shades', x: 0.665, y: 0.8, label: 'Signs the partnership', note: 'Selected the processing partners. Structured the commercial partnership and its contracts.' },
  { id: 'asleep', x: 0.235, y: 0.9, label: 'Sleeps. Sometimes.', note: 'Not on the resume.' },
] as const;

export type Project = {
  id: string;
  name: string;
  kind: string;
  role: string;
  line: string;
  points: string[];
  href?: string;
  hrefLabel?: string;
  /** What the model in the picture stands for. */
  model: string;
  alt: string;
};

export const projects: Project[] = [
  {
    id: 'pontemesto',
    name: 'Pontemesto',
    kind: 'Merchant payments platform',
    role: 'Co-founder, 2026 to present',
    line: 'Merchants were ready. The way to onboard them and process their payments was missing. So I built it.',
    points: [
      'More than USD $80 million processed from March 2026 through October 5, 2026.',
      'Owned the product roadmap and the onboarding requirements.',
      'Designed the payment gateway and the APIs for exchanges and liquidity providers.',
      'Selected the processing partners and structured the partnership contracts.',
    ],
    href: 'https://pontemesto.app',
    hrefLabel: 'pontemesto.app',
    model: 'Five gates. One is the new lane.',
    alt: 'Model photo: a row of five card arches on a cutting mat. The centre arch is yellow. Lanes of white tokens pass through the arches, directed by tiny figures in navy suits.',
  },
  {
    id: 'keywa',
    name: 'Keywa',
    kind: 'Organizational crypto custody',
    role: 'Co-founder, 2020 to 2024. Formerly Tardigrade.',
    line: 'Organizations needed shared control of their crypto assets. We delivered self-custody with multiple signing authorities.',
    points: [
      'Recruited and led a 20-person team. Raised CAD $3 million.',
      'The retail wallet reached approximately 20,000 clients within weeks.',
      'Co-authored a whitepaper on two-layer threshold signing: departmental approvals, distributed key management, and signer replacement with no new wallet address.',
      'Acquired in December 2024.',
    ],
    model: 'One vault. Three keys. No single holder.',
    alt: 'Model photo: a white card bank vault with three keyholes. Three tiny figures in navy suits each carry a large key. One key is yellow.',
  },
  {
    id: 'manyworld',
    name: 'Manyworld',
    kind: 'Economic and society simulation. Open source.',
    role: 'Formerly Agent Economy',
    line: 'A platform to explore how agents acting as households, businesses and banks respond to changing conditions.',
    points: ['Transaction validation.', 'Double-entry accounting.', 'Replayable experiments.'],
    href: 'https://github.com/alinojoumi8/manyworld',
    hrefLabel: 'Manyworld on GitHub',
    model: 'The same town, run three times.',
    alt: 'Model photo: three identical white card towns on round bases, in a row. One house in the nearest town is yellow.',
  },
  {
    id: 'triallens',
    name: 'TrialLens',
    kind: 'Experimental legal AI. Open source.',
    role: 'Evidence review and courtroom rehearsal',
    line: 'A workspace that links every rehearsal in the courtroom back to the source evidence.',
    points: ['Source-linked decision traces.', 'Evidence-use controls.', 'Saved audit records.'],
    href: 'https://github.com/alinojoumi8/triallens',
    hrefLabel: 'TrialLens on GitHub',
    model: 'A lens over the files.',
    alt: 'Model photo: a white card courtroom with benches and tables. A magnifying lens with a yellow rim sits over a stack of tiny paper files.',
  },
  {
    id: 'crowdlens',
    name: 'CrowdLens',
    kind: 'AI audience simulation. In development.',
    role: 'Built on an open-source foundation',
    line: 'It explores possible audience reactions to product launches, advertising and company news.',
    points: ['Document-based scenarios.', 'Source-linked reports.', 'Saved human reviews.'],
    href: 'https://github.com/alinojoumi8/crowdlens',
    hrefLabel: 'CrowdLens on GitHub',
    model: 'Seven voices in a full house.',
    alt: 'Model photo: a white card amphitheatre filled with tiny white figures. Seven of them are yellow. One figure in a navy suit stands on the stage.',
  },
];

export const parts = [
  { years: '2018 to 2023', name: 'CMOR Group Corporation', role: 'Chief Executive Officer', text: 'Founded and self-funded. Algorithmic trading applications for foreign-exchange and equity markets, and an AI news-trading system.' },
  { years: '2020 to 2025', name: 'MyInvestino', role: 'Founder', text: 'Micro-investing platform with financial-institution integrations.' },
  { years: '2020 to 2025', name: 'Chante', role: 'Founder', text: 'Cryptocurrency wallet with localized onboarding and support.' },
  { years: '2018 to 2020', name: 'Chainblock', role: 'Founder', text: 'Blockchain platform for digital-asset transactions, smart contracts and decentralized applications.' },
];

export const footnotes = [
  { label: 'Education', text: 'Bachelor of Computer Science, University of Mashhad, 1998. New York Institute of Finance: coursework in financial markets and algorithmic trading.' },
  { label: 'Languages', text: 'English, fluent. Farsi, native.' },
  { label: 'Location', text: 'Toronto. Open to GTA, remote, and relocation anywhere in Canada.' },
];

export const nav = [
  { href: '#figures', label: 'Figures' },
  { href: '#scale', label: 'Scale' },
  { href: '#models', label: 'Models' },
  { href: '#parts', label: 'Parts' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Every fact on the site. Each one traces to Ali's resume or cover letter (October 2026).
 * Some resume items are left out on purpose. See PRODUCT.md before you add a figure.
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

export const statementAfter =
  'I am a fintech co-founder. I bring product direction, technical implementation and commercial partnerships together to launch payments and crypto-custody businesses.';

export type Figure = {
  value: number;
  before?: string;
  after?: string;
  unit: string;
  text: string;
  source: string;
  size: string;
};

export const figures: Figure[] = [
  {
    value: 80,
    before: '$',
    after: 'M+',
    unit: 'US dollars processed',
    text: 'More than USD $80 million in payment-processing volume, from March 2026 through October 5, 2026.',
    source: 'Pontemesto · 2026',
    size: 'clamp(5.5rem, 25vw, 23rem)',
  },
  {
    value: 20,
    unit: 'People hired and led',
    text: 'I recruited and led a 20-person team to deliver a self-custody solution with multiple signing authorities.',
    source: 'Keywa · 2020 to 2024',
    size: 'clamp(5.5rem, 25vw, 23rem)',
  },
  {
    value: 3,
    before: '$',
    after: 'M',
    unit: 'Canadian dollars raised',
    text: 'CAD $3 million raised for Keywa. The company was acquired in December 2024.',
    source: 'Keywa · 2022',
    size: 'clamp(5.5rem, 25vw, 23rem)',
  },
  {
    value: 20000,
    before: '≈',
    unit: 'Clients within weeks',
    text: 'The custody technology became a separate retail wallet. It attracted approximately 20,000 clients within weeks of launch.',
    source: 'Keywa retail wallet',
    size: 'clamp(3.1rem, 14.2vw, 13.5rem)',
  },
];

/** The seven small Alis in the composite photo. x and y are fractions of the picture. */
export const jobs = [
  { id: 'bulb', x: 0.728, y: 0.4, label: 'Finds what is missing', note: 'Specialist interviews showed that organizations needed shared control of their crypto assets.' },
  { id: 'clipboard', x: 0.85, y: 0.74, label: 'Writes the roadmap', note: 'Roadmap and onboarding requirements at Pontemesto.' },
  { id: 'laptop', x: 0.2, y: 0.36, label: 'Designs the gateway', note: 'Payment gateway and APIs for exchanges and liquidity providers. Components built alongside developers.' },
  { id: 'megaphone', x: 0.86, y: 0.31, label: 'Hires and leads the team', note: 'Twenty people at Keywa.' },
  { id: 'ladder', x: 0.1, y: 0.66, label: 'Raises the money', note: 'CAD $3 million for Keywa.' },
  { id: 'shades', x: 0.67, y: 0.78, label: 'Signs the partnership', note: 'Processing partners evaluated and selected. Commercial partnership and contracts structured.' },
  { id: 'asleep', x: 0.24, y: 0.9, label: 'Sleeps. Sometimes.', note: 'Not on the resume.' },
] as const;

export const practice = [
  {
    title: 'Product strategy and roadmaps',
    text: 'I owned the roadmap and the onboarding requirements at Pontemesto. Merchant demand became a live payments offering.',
    span: 'lg:col-span-7',
  },
  {
    title: 'Gateways and APIs',
    text: 'I designed the payment gateway and the APIs for exchanges and liquidity providers. I set implementation approaches and built components alongside developers.',
    span: 'lg:col-span-5',
  },
  {
    title: 'Digital-asset custody',
    text: 'Organizational self-custody with multiple signing authorities. I co-authored a whitepaper on two-layer threshold signing: departmental approvals, distributed key management, and signer replacement without a new wallet address.',
    span: 'lg:col-span-5',
  },
  {
    title: 'Teams, capital and partners',
    text: 'I recruit and lead the team, raise the money, and select the processing partners. Then I structure the commercial partnership and its contracts.',
    span: 'lg:col-span-7',
  },
];

export type Project = {
  id: string;
  name: string;
  /** Printed on the picture frame. Initials and true years only. */
  serial: string;
  series: string;
  role: string;
  line: string;
  points: string[];
  href: string;
  hrefLabel: string;
  alt: string;
};

export const projects: Project[] = [
  {
    id: 'pontemesto',
    serial: 'AN PM 2026',
    name: 'Pontemesto',
    series: 'Series 2026',
    role: 'Co-founder · 2026 to present',
    line: 'A merchant payments platform. More than USD $80 million processed from March 2026 through October 5, 2026.',
    points: [
      'Owned the product roadmap and onboarding requirements.',
      'Designed the payment gateway and the APIs for exchanges and liquidity providers.',
      'Selected the processing partners and structured the partnership contracts.',
    ],
    href: 'https://pontemesto.app',
    hrefLabel: 'pontemesto.app',
    alt: 'Abstract render: a bridge of engraved steel with a stream of copper discs crossing it.',
  },
  {
    id: 'keywa',
    serial: 'AN KW 2020 2024',
    name: 'Keywa',
    series: 'Series 2020',
    role: 'Co-founder · 2020 to 2024 · formerly Tardigrade',
    line: 'Shared control of crypto assets for organizations. A self-custody solution with multiple signing authorities.',
    points: [
      'Recruited and led a 20-person team. Raised CAD $3 million.',
      'Retail wallet reached approximately 20,000 clients within weeks.',
      'Acquired in December 2024.',
    ],
    href: '#register',
    hrefLabel: 'See the full register',
    alt: 'Abstract render: three engraved steel ring segments closing around an emerald glass core.',
  },
  {
    id: 'manyworld',
    serial: 'AN MW OPEN',
    name: 'Manyworld',
    series: 'Open source',
    role: 'Economic and society simulation · formerly Agent Economy',
    line: 'A platform for exploring how agents acting as households, businesses and banks respond to changing conditions.',
    points: ['Transaction validation.', 'Double-entry accounting.', 'Replayable experiments.'],
    href: 'https://github.com/alinojoumi8/manyworld',
    hrefLabel: 'github.com/alinojoumi8/manyworld',
    alt: 'Abstract render: a small sphere built like a city of steel tiles and copper discs, with two foil orbits.',
  },
  {
    id: 'triallens',
    serial: 'AN TL OPEN',
    name: 'TrialLens',
    series: 'Open source',
    role: 'Experimental legal AI',
    line: 'A workspace for evidence review and courtroom rehearsal.',
    points: ['Source-linked decision traces.', 'Evidence-use controls.', 'Saved audit records.'],
    href: 'https://github.com/alinojoumi8/triallens',
    hrefLabel: 'github.com/alinojoumi8/triallens',
    alt: 'Abstract render: a glass lens over an engraved plate. One magnified line glows green.',
  },
  {
    id: 'crowdlens',
    serial: 'AN CL IN DEV',
    name: 'CrowdLens',
    series: 'In development',
    role: 'AI audience simulation',
    line: 'An audience-simulation product on an open-source foundation. It explores possible reactions to product launches, advertising and company news.',
    points: ['Document-based scenarios.', 'Source-linked reports.', 'Saved human reviews.'],
    href: 'https://github.com/alinojoumi8/crowdlens',
    hrefLabel: 'github.com/alinojoumi8/crowdlens',
    alt: 'Abstract render: a crowd of small steel figures. A wave of green light moves through them.',
  },
];

export const register = [
  { years: '2026 to now', name: 'Pontemesto', role: 'Co-founder', text: 'Merchant payments platform.' },
  { years: '2020 to 2024', name: 'Keywa', role: 'Co-founder', text: 'Organizational crypto custody. Formerly Tardigrade. Acquired December 2024.' },
  { years: '2018 to 2023', name: 'CMOR Group', role: 'Chief Executive Officer', text: 'Self-funded. Algorithmic trading applications for FX and equity markets, and an AI news-trading system.' },
  { years: '2020 to 2025', name: 'MyInvestino', role: 'Founder', text: 'Micro-investing platform with financial-institution integrations.' },
  { years: '2020 to 2025', name: 'Chante', role: 'Founder', text: 'Cryptocurrency wallet with localized onboarding and support.' },
  { years: '2018 to 2020', name: 'Chainblock', role: 'Founder', text: 'Blockchain platform for digital-asset transactions, smart contracts and decentralized applications.' },
];

export const footnotes = [
  { label: 'Education', text: 'Bachelor of Computer Science, University of Mashhad, 1998. New York Institute of Finance: coursework in financial markets and algorithmic trading.' },
  { label: 'Languages', text: 'English, fluent. Farsi, native.' },
  { label: 'Location', text: 'Toronto. Open to GTA, remote, and relocation anywhere in Canada.' },
];

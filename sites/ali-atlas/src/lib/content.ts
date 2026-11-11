/** Every fact on the page. All of it traces to Ali's resume and cover letter (October 2026). */

export const site = {
  name: 'Ali Nojoumi',
  role: 'Product leader',
  fields: ['Payments', 'Digital asset platforms', 'Applied AI systems'],
  line: 'I build products when there is a real customer need but no clear path to delivery.',
  email: 'alinojoumi8@gmail.com',
  linkedin: 'https://linkedin.com/in/ali-nojoumi-93251842',
  linkedinLabel: 'linkedin.com/in/ali-nojoumi-93251842',
  github: 'https://github.com/alinojoumi8',
  githubLabel: 'github.com/alinojoumi8',
  location: 'Toronto, Ontario',
  open: 'Open to the GTA, remote work, or relocation anywhere in Canada.',
};

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#lab', label: 'Lab' },
  { href: '#fit', label: 'Fit' },
  { href: '#contact', label: 'Contact' },
];

/* ---------- Figures ---------- */

export const figures = [
  {
    id: 'volume',
    prefix: '>USD $',
    value: 80,
    suffix: 'M',
    label: 'Payment-processing volume at Pontemesto',
    scope: 'March 2026 to October 5, 2026',
  },
  {
    id: 'raised',
    prefix: 'CAD $',
    value: 3,
    suffix: 'M',
    label: 'Raised for Keywa',
    scope: 'Co-founder, 2020 to 2024',
  },
  {
    id: 'clients',
    prefix: '~',
    value: 20000,
    suffix: '',
    label: 'Clients on the retail self-custody wallet',
    scope: 'Within weeks of launch',
  },
  {
    id: 'team',
    prefix: '',
    value: 20,
    suffix: '',
    label: 'Specialists recruited and led at Keywa',
    scope: 'Company acquired December 2024',
  },
];

/* ---------- Case studies ---------- */

export type Step = { title: string; text: string };

export const pontemesto = {
  id: 'pontemesto',
  name: 'Pontemesto',
  role: 'Co-founder',
  dates: '2026 to present',
  link: { href: 'https://pontemesto.app', label: 'pontemesto.app' },
  challenge:
    'High-risk merchants were ready to work with us. The company had no way to onboard them or process their payments.',
  outcome: 'More than USD $80 million in payment-processing volume from March 2026 through October 5, 2026.',
  steps: [
    { title: 'Find the gap', text: 'Merchant demand existed. The onboarding and processing path did not.' },
    { title: 'Set the roadmap', text: 'Researched the options, then owned the product roadmap and the onboarding requirements.' },
    { title: 'Design the gateway', text: 'Designed the payment gateway and the APIs for exchanges and liquidity providers.' },
    { title: 'Direct the build', text: 'Translated merchant and partner requirements into implementation direction for developers.' },
    { title: 'Close the partner', text: 'Evaluated and selected processing partners, then structured the partnership and its contracts.' },
  ] as Step[],
  nodes: {
    merchant: {
      label: 'Merchant',
      text: 'Demand came first. High-risk merchants were ready before a path to process them existed.',
    },
    onboarding: {
      label: 'Onboarding',
      text: 'Ali set the onboarding requirements and owned the roadmap that turned that demand into a live offering.',
    },
    gateway: {
      label: 'Gateway API',
      text: 'Ali designed the payment gateway and gave developers their implementation direction.',
    },
    exchange: {
      label: 'Exchange API',
      text: 'Ali designed the APIs that connect exchanges to the gateway.',
    },
    liquidity: {
      label: 'Liquidity provider API',
      text: 'Ali designed the APIs that connect liquidity providers to the gateway.',
    },
    settlement: {
      label: 'Settlement',
      text: 'Ali evaluated and selected the processing partners, then structured the commercial partnership and its contracts.',
    },
  },
};

export const keywa = {
  id: 'keywa',
  name: 'Keywa',
  aka: 'formerly Tardigrade',
  role: 'Co-founder',
  dates: '2020 to 2024',
  note: 'Acquired December 2024',
  challenge:
    'Organizations needed shared control of their crypto assets. One person holding one key was the risk nobody could sign off.',
  outcome: 'A self-custody product with multiple signing authorities, a retail wallet with about 20,000 clients in weeks, and an acquisition in December 2024.',
  steps: [
    { title: 'Find the need', text: 'Interviewed specialists and found that organizations needed shared crypto-asset control.' },
    { title: 'Build the team', text: 'Recruited and led 20 people. Raised CAD $3 million.' },
    { title: 'Ship custody', text: 'Delivered organizational self-custody with multiple signing authorities.' },
    { title: 'Stay in the code', text: 'Directed exchange and liquidity-provider API design and built components alongside developers.' },
    { title: 'Adapt for retail', text: 'Turned the technology into a retail wallet. About 20,000 clients arrived within weeks.' },
    { title: 'Exit', text: 'Keywa was acquired in December 2024. Ali sold his ownership.' },
  ] as Step[],
  paper:
    'Ali co-authored a whitepaper that proposes two-layer threshold signing: departmental approvals, distributed key management, and signer replacement that leaves the wallet address unchanged.',
};

export const cmor = {
  id: 'cmor',
  name: 'CMOR Group',
  full: 'CMOR Group Corporation',
  role: 'Chief Executive Officer',
  dates: '2018 to 2023',
  challenge:
    'Markets move on news faster than a person can read it. CMOR built trading software that could read first.',
  outcome: 'Algorithmic trading applications for foreign-exchange and equity markets, founded and self-funded.',
  steps: [
    { title: 'Found and fund', text: 'Founded and self-funded the company.' },
    { title: 'Build the applications', text: 'Developed algorithmic trading applications for foreign-exchange and equity markets.' },
    { title: 'Read the news', text: 'Developed an AI-powered news-trading system that analyzed market sentiment.' },
    { title: 'Automate the response', text: 'The system automated responses to global news. Ali led product development and deployment.' },
  ] as Step[],
};

export const ventures = [
  {
    id: 'myinvestino',
    name: 'MyInvestino.ir',
    role: 'Founder',
    dates: '2020 to 2025',
    text: 'A micro-investing platform with financial-institution integrations.',
    carry: 'Applies experience from Keywa.',
  },
  {
    id: 'chante',
    name: 'Chante.app',
    role: 'Founder',
    dates: '2020 to 2025',
    text: 'A cryptocurrency wallet with localized onboarding and support.',
    carry: 'Applies experience from Keywa.',
  },
  {
    id: 'chainblock',
    name: 'Chainblock.app',
    role: 'Founder',
    dates: '2018 to 2020',
    text: 'A blockchain platform for digital-asset transactions, smart contracts and decentralized applications.',
    carry: 'The first of the digital-asset builds.',
  },
];

/* ---------- Lab ---------- */

export const lab = {
  manyworld: {
    name: 'Manyworld',
    aka: 'formerly Agent Economy',
    kind: 'Economic and society simulation',
    href: 'https://github.com/alinojoumi8/manyworld',
    repo: 'github.com/alinojoumi8/manyworld',
    text: 'An open-source platform for exploring how agents acting as households, businesses and banks respond to changing conditions. It validates every transaction, keeps double-entry accounts, and can replay an experiment exactly.',
  },
  triallens: {
    name: 'TrialLens',
    kind: 'Experimental legal AI',
    href: 'https://github.com/alinojoumi8/triallens',
    repo: 'github.com/alinojoumi8/triallens',
    text: 'An open-source workspace for evidence review and courtroom rehearsal. Each rehearsal links to source evidence through a decision trace, with evidence-use controls and saved audit records.',
  },
  crowdlens: {
    name: 'CrowdLens',
    kind: 'AI audience simulation',
    status: 'In development',
    href: 'https://github.com/alinojoumi8/crowdlens',
    repo: 'github.com/alinojoumi8/crowdlens',
    text: 'An audience-simulation product on an open-source foundation. It explores possible reactions to product launches, advertising and company news, from document-based scenarios, with source-linked reports and saved human reviews.',
  },
};

/* ---------- Fit: skills mapped to proof ---------- */

export const skills = [
  { id: 'strategy', label: 'Product strategy & roadmaps' },
  { id: 'delivery', label: 'Cross-team delivery' },
  { id: 'api', label: 'API & gateway design' },
  { id: 'onboarding', label: 'Merchant onboarding' },
  { id: 'custody', label: 'Digital-asset custody' },
  { id: 'liquidity', label: 'Exchange & liquidity integrations' },
  { id: 'partners', label: 'Processing partnerships & contracts' },
  { id: 'team', label: 'Team hiring & leadership' },
] as const;

export type SkillId = (typeof skills)[number]['id'];

export const proofs: { id: string; at: string; text: string; skills: SkillId[] }[] = [
  { id: 'p1', at: 'Pontemesto', text: 'Owned the product roadmap and the onboarding requirements.', skills: ['strategy', 'onboarding'] },
  { id: 'p2', at: 'Pontemesto', text: 'Turned demand from high-risk merchants into a live payments offering.', skills: ['onboarding', 'strategy'] },
  { id: 'p3', at: 'Pontemesto', text: 'Designed the payment gateway and the APIs for exchanges and liquidity providers.', skills: ['api', 'liquidity'] },
  { id: 'p4', at: 'Pontemesto', text: 'Translated merchant and partner requirements into implementation direction for developers.', skills: ['delivery', 'api'] },
  { id: 'p5', at: 'Pontemesto', text: 'Evaluated and selected processing partners, then structured a commercial partnership and its contracts.', skills: ['partners'] },
  { id: 'k1', at: 'Keywa', text: 'Found the need for shared crypto-asset control through specialist interviews.', skills: ['strategy', 'custody'] },
  { id: 'k2', at: 'Keywa', text: 'Recruited and led a 20-person team, and raised CAD $3 million.', skills: ['team'] },
  { id: 'k3', at: 'Keywa', text: 'Delivered a self-custody solution with multiple signing authorities.', skills: ['custody', 'delivery'] },
  { id: 'k4', at: 'Keywa', text: 'Directed exchange and liquidity-provider API design and built components alongside developers.', skills: ['liquidity', 'api', 'delivery'] },
  { id: 'k5', at: 'Keywa', text: 'Co-authored a whitepaper on two-layer threshold signing and signer replacement.', skills: ['custody'] },
  { id: 'k6', at: 'Keywa', text: 'Adapted the technology into a retail wallet that drew about 20,000 clients within weeks.', skills: ['strategy', 'delivery'] },
  { id: 'c1', at: 'CMOR Group', text: 'Founded and self-funded the company, and led product development and deployment.', skills: ['strategy', 'team', 'delivery'] },
  { id: 'v1', at: 'Chante.app', text: 'Built a crypto wallet with localized onboarding and support.', skills: ['custody'] },
  { id: 'v2', at: 'Working style', text: 'Works closely with front-end, design and API design managers to turn requirements into implementation decisions.', skills: ['delivery', 'team'] },
];

export const education = [
  { title: 'Bachelor of Computer Science', where: 'University of Mashhad, Iran', when: '1998' },
  { title: 'Financial markets and algorithmic trading', where: 'New York Institute of Finance', when: 'Coursework' },
];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Farsi', level: 'Native' },
];

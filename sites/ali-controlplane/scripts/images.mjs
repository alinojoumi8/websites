// Turns the raw Krea renders and Ali's portraits into the files the site ships.
// Usage: node scripts/images.mjs   (run from sites/ali-controlplane)
// Raw files live in ./raw (git-ignored). Each output gets a provenance sidecar
// (<file>.json). The build removes the sidecars from dist.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const out = 'public/art';
await mkdir(out, { recursive: true });

const krea = (prompt, model = 'google/nano-banana-pro via Krea') => ({
  prompt,
  model,
  createdAt: '2026-11-11',
});
const photo = (what) => ({
  prompt: `Origin: ${what}, supplied by Ali Nojoumi. Not generated for this site.`,
  createdAt: '2026-11-11',
});

export const PROMPTS = {
  logo: 'A minimalist architectural monogram of the two capital letters A and N joined into one compact mark, where the right leg of the A is also the left stem of the N. The mark is machined from brushed titanium with a dark smoked glass inlay set into the strokes, crisp polished chamfered edges, and a thin warm gold rim light from the upper right. It looks like the plate on a vault door. Straight front view, perfectly centered, even margin all around, isolated object on a fully transparent background, no ground shadow. No other text, no border, no watermark.',
  pontemesto:
    'Orthographic isometric 3D render, ultra clean, of a global payment routing system built as an architectural scale model. Low matte obsidian-black slabs stand as nodes on a dark obsidian floor (#07090E) etched with a faint fine grid. Thin glowing emerald-green light conduits run in straight lines with right-angle turns from many small merchant slabs on the left, into one tall central gateway block of smoked glass and brushed titanium, then fan out to a row of liquidity vault blocks on the right. Small bright emerald pulses travel along the conduits. A warm gold key light from the upper right puts a thin gold rim on the titanium edges. Deep shadows, large calm areas of dark negative space at the top and bottom of the frame. Precise, minimal, expensive. No text, no numbers, no logos, no people.',
  keywa:
    'Orthographic isometric 3D render, ultra clean, of a cryptographic threshold-signing mechanism for institutional custody. Three large interlocking rings of brushed titanium float around a smoked glass vault core above a dark obsidian floor (#07090E) etched with a faint fine grid. Each ring carries several small glass key segments; most glow soft emerald, two glow warm gold, one is dark and empty. A second, smaller set of rings sits inside the first, showing two layers of approval. Frosted glass plates with soft refraction, polished chamfers, a warm gold key light from the upper right, deep shadows, large calm dark negative space on the left third of the frame. Precise, minimal, expensive. No text, no numbers, no logos, no people.',
  simulations:
    'Cinematic dark-mode render of a simulation network seen from a raised three-quarter view. Hundreds of small nodes joined by hair-thin luminous lines spread across a dark obsidian plane (#07090E) toward the horizon. Some clusters pulse amber-gold and other clusters pulse cyan, like live telemetry moving through the graph. A few nodes are tiny solid scale models: a house, an office block, a bank with columns, a courthouse with a pediment, hinting at economic and legal agents. Shallow depth of field, soft volumetric glow, a warm gold light from the upper right, large calm dark areas across the top of the frame. No text, no numbers, no logos, no people.',
  cmor: 'Orthographic isometric 3D render, ultra clean, of a news-sentiment trading engine built as an architectural scale model. On a dark obsidian floor (#07090E) etched with a faint fine grid, a stream of small blank paper cards slides in from the left along a rail into a smoked glass prism block. From the far side of the prism one continuous glowing amber line comes out and rises and falls like a price chart drawn in light, above a row of thin brushed titanium fins of different heights. A few cyan sparks mark the points where the line turns. A warm gold key light from the upper right, deep shadows, large calm dark negative space. Precise, minimal, expensive. No text, no numbers, no logos, no people.',
};

const wide = [2400, 1400, 800];
const jobs = [
  { src: 'raw/pontemesto.jpg', name: 'asset-pontemesto', widths: wide, meta: krea(PROMPTS.pontemesto) },
  { src: 'raw/keywa.png', name: 'asset-keywa', widths: wide, meta: krea(PROMPTS.keywa) },
  { src: 'raw/cmor.jpg', name: 'asset-cmor', widths: wide, meta: krea(PROMPTS.cmor) },
  { src: 'raw/simulations.png', name: 'asset-simulations', widths: wide, meta: krea(PROMPTS.simulations) },
  { src: 'raw/ali.webp', name: 'ali', widths: [1312, 800], meta: photo('studio portrait of Ali Nojoumi') },
  {
    src: 'raw/ali-minis.webp',
    name: 'ali-minis',
    widths: [1312, 800],
    meta: photo('composite portrait of Ali Nojoumi with seven small copies of himself'),
  },
];

for (const j of jobs) {
  const buf = await sharp(j.src).toBuffer();
  for (const w of j.widths) {
    const base = sharp(buf).resize({ width: w, withoutEnlargement: true });
    const stem = join(out, `${j.name}-${w}`);
    await base.clone().avif({ quality: 50, effort: 6 }).toFile(`${stem}.avif`);
    await base.clone().webp({ quality: 80, effort: 6 }).toFile(`${stem}.webp`);
    for (const ext of ['avif', 'webp']) await writeFile(`${stem}.${ext}.json`, JSON.stringify(j.meta, null, 2));
  }
  console.log('made', j.name);
}

// The monogram keeps its alpha. Trim the empty margin, then ship two sizes.
{
  const meta = krea(PROMPTS.logo, 'openai/gpt-image-2.6-flare via Krea, transparent background');
  const trimmed = await sharp('raw/logo.png').trim({ threshold: 8 }).toBuffer();
  for (const w of [720, 360]) {
    const stem = join(out, `logo-an-${w}`);
    const base = sharp(trimmed).resize({ width: w });
    await base.clone().webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(`${stem}.webp`);
    await base.clone().png({ compressionLevel: 9, palette: false }).toFile(`${stem}.png`);
    for (const ext of ['webp', 'png']) await writeFile(`${stem}.${ext}.json`, JSON.stringify(meta, null, 2));
  }
  console.log('made logo-an');
}

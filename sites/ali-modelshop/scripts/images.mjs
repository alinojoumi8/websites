// Turns the raw Krea photos and Ali's portraits into the files the site ships.
// Usage: node scripts/images.mjs
// Raw files live in ./raw (git-ignored). Each output gets a provenance sidecar.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const out = 'public/art';
await mkdir(out, { recursive: true });

const HEAD = "Photograph of an architect's presentation model on a dark green self-healing cutting mat.";
const TAIL =
  'Three-quarter elevated view. Soft north-window daylight from the upper left, gentle soft shadows on the mat, tilt-shift shallow depth of field, studio product photography. The mat is plain deep green with only a very faint fine grid. No text, no numbers, no logos, no hands, no tools.';

const krea = (subject) => ({
  prompt: `${HEAD} ${subject} ${TAIL}`,
  model: 'google/nano-banana-pro via Krea',
  createdAt: '2026-11-10',
});
const photo = (what) => ({
  prompt: `Origin: ${what}, supplied by Ali Nojoumi. Not generated for this site.`,
  createdAt: '2026-11-10',
});

const jobs = [
  {
    src: 'raw/hero.jpg',
    name: 'hero',
    widths: [2400, 1600, 960],
    meta: krea(
      'A long white bridge model spans a gap between two small white city blocks. The bridge is built from clean white foamboard and museum card with crisp knife-cut edges. Exactly one span in the middle of the bridge is bright cutter-yellow, the single missing piece now set in place. A few tiny scale-model figures of a man in a navy suit stand on the bridge deck; one climbs a tiny wooden ladder against a pier. The model sits in the right two thirds of the frame; the left third is empty green cutting mat.',
    ),
  },
  {
    src: 'raw/pontemesto.jpg',
    name: 'pontemesto',
    widths: [1400, 800],
    meta: krea(
      'A white model of a payment gateway: a row of five tall arched gates built from clean white foamboard and museum card with crisp knife-cut edges. Exactly one gate, the centre one, is bright cutter-yellow. Neat lanes of small white card discs, like tokens, queue on the mat and pass through the gates. A few tiny scale-model figures of a man in a navy suit direct the lanes.',
    ),
  },
  {
    src: 'raw/keywa.jpg',
    name: 'keywa',
    widths: [1400, 800],
    meta: krea(
      'A white model of a bank vault: a thick round vault door set in a square block, built from clean white foamboard and museum card with crisp knife-cut edges. The door has three separate keyholes. Three oversized flat keys cut from card lie in front of it, each carried by tiny scale-model figures of a man in a navy suit. Exactly one key is bright cutter-yellow; the other two keys are white.',
    ),
  },
  {
    src: 'raw/manyworld.jpg',
    name: 'manyworld',
    widths: [1400, 800],
    meta: krea(
      'Three identical tiny white model towns, each on its own round white card disc, stand in a row that recedes into soft focus. Each town has small houses, a shop street and a bank with columns, built from clean white foamboard and museum card with crisp knife-cut edges. In the nearest town exactly one small house is bright cutter-yellow. A few tiny scale-model figures of a man in a navy suit walk the streets.',
    ),
  },
  {
    src: 'raw/triallens.jpg',
    name: 'triallens',
    widths: [1400, 800],
    // The render put a fingertip in the lower left corner. The crop removes it.
    crop: { left: 0.07, top: 0, width: 0.93, height: 0.9 },
    meta: krea(
      "A white cutaway model of a courtroom with no roof: a judge's bench, a witness box, two counsel tables and rows of public benches, built from clean white foamboard and museum card with crisp knife-cut edges. On one counsel table sits a neat stack of tiny white paper files. A large round magnifying lens on a slim stand, its rim bright cutter-yellow, stands over the stack of files. The lens rim is the only yellow part. A few tiny scale-model figures of a man in a navy suit stand at the tables.",
    ),
  },
  {
    src: 'raw/crowdlens.jpg',
    name: 'crowdlens',
    widths: [1400, 800],
    meta: krea(
      'A white model of a small semicircular amphitheatre with stepped tiers, built from clean white foamboard and museum card with crisp knife-cut edges. Hundreds of tiny white figurines fill the tiers as an audience. Exactly seven of the figurines, scattered through the crowd, are bright cutter-yellow. On the small stage one tiny scale-model figure of a man in a navy suit faces the crowd.',
    ),
  },
  { src: 'raw/ali.webp', name: 'ali', widths: [1312, 800], meta: photo('studio portrait of Ali Nojoumi') },
  {
    src: 'raw/ali-minis.webp',
    name: 'ali-minis',
    widths: [1312, 800],
    meta: photo('composite portrait of Ali Nojoumi with seven small copies of himself'),
  },
];

for (const j of jobs) {
  let input = sharp(j.src);
  if (j.crop) {
    const m = await sharp(j.src).metadata();
    input = input.extract({
      left: Math.round(m.width * j.crop.left),
      top: Math.round(m.height * j.crop.top),
      width: Math.round(m.width * j.crop.width),
      height: Math.round(m.height * j.crop.height),
    });
  }
  const buf = await input.toBuffer();
  for (const w of j.widths) {
    const base = sharp(buf).resize({ width: w, withoutEnlargement: true });
    const stem = join(out, `${j.name}-${w}`);
    await base.clone().avif({ quality: 54, effort: 6 }).toFile(`${stem}.avif`);
    await base.clone().webp({ quality: 80, effort: 6 }).toFile(`${stem}.webp`);
    for (const ext of ['avif', 'webp']) await writeFile(`${stem}.${ext}.json`, JSON.stringify(j.meta, null, 2));
  }
  console.log('done', j.name);
}

// Mat texture: the Krea scratch photo, flattened to a low-contrast tile and
// mirrored 2 x 2 so it repeats with no seam.
{
  const half = 640;
  const tile = await sharp('raw/mat.jpg').resize(half, half).toBuffer();
  const flop = await sharp(tile).flop().toBuffer();
  const flip = await sharp(tile).flip().toBuffer();
  const both = await sharp(tile).flip().flop().toBuffer();
  const stem = join(out, 'mat');
  await sharp({ create: { width: half * 2, height: half * 2, channels: 3, background: '#1b5a4f' } })
    .composite([
      { input: tile, left: 0, top: 0 },
      { input: flop, left: half, top: 0 },
      { input: flip, left: 0, top: half },
      { input: both, left: half, top: half },
    ])
    .webp({ quality: 62, effort: 6 })
    .toFile(`${stem}.webp`);
  await writeFile(
    `${stem}.webp.json`,
    JSON.stringify(
      {
        prompt:
          'Flat top-down macro photograph of the surface of a dark green self-healing cutting mat, filling the whole frame edge to edge. Fine matte rubber texture with many faint hairline knife scratches and light scuffs crossing in different directions. Even soft daylight, no vignette, no shadows, no objects. Uniform deep green. No grid lines, no text, no numbers, no logos.',
        model: 'google/nano-banana-pro via Krea',
        note: 'Resized and mirror-tiled 2 x 2 by scripts/images.mjs.',
        createdAt: '2026-11-10',
      },
      null,
      2,
    ),
  );
  console.log('done mat');
}

// Tape: a Krea cutout with real alpha, trimmed to the strip.
{
  const prompt =
    "A single short strip of light blue painter's masking tape, lying flat and horizontal, centred in the frame. Both short ends are torn by hand, ragged and slightly uneven. Matte crepe paper texture with fine wrinkles, slightly translucent. Flat top-down view, soft even daylight, no shadow, no surface, no text, no logos. Isolated on a transparent background.";
  await sharp('raw/tape.png').trim().resize({ width: 264 }).webp({ quality: 82, alphaQuality: 90 }).toFile(join(out, 'tape.webp'));
  await writeFile(
    join(out, 'tape.webp.json'),
    JSON.stringify({ prompt, model: 'openai/gpt-image-2.6-flare via Krea', note: 'Trimmed and resized by scripts/images.mjs.', createdAt: '2026-11-10' }, null, 2),
  );
  console.log('done tape');
}

// Fine photo grain tile, made here from noise. No image model.
{
  const size = 128;
  const buf = Buffer.alloc(size * size * 4);
  let s = 4242;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < size * size; i++) {
    const v = Math.round(rnd() * 255);
    buf[i * 4] = buf[i * 4 + 1] = buf[i * 4 + 2] = v;
    buf[i * 4 + 3] = Math.round(30 + rnd() * 70);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 4 } }).webp({ quality: 50 }).toFile(join(out, 'grain.webp'));
  await writeFile(
    join(out, 'grain.webp.json'),
    JSON.stringify({ prompt: 'Origin: random noise tile written by scripts/images.mjs. Not generated by an image model.', createdAt: '2026-11-10' }, null, 2),
  );
  console.log('done grain');
}

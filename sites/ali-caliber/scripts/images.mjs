// Turns the raw Krea renders and Ali's portraits into the files the site ships.
// Usage: node scripts/images.mjs   (run from sites/ali-caliber)
// Raw files live in ./raw (git-ignored). Each output gets a provenance sidecar.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const out = 'public/art';
await mkdir(out, { recursive: true });

const krea = (prompt, extra = {}) => ({
  prompt,
  model: 'google/nano-banana-pro via Krea',
  createdAt: '2026-11-10',
  ...extra,
});
const photo = (what) => ({
  prompt: `Origin: ${what}, supplied by Ali Nojoumi. Not generated for this site.`,
  createdAt: '2026-11-10',
});

export const PROMPTS = {
  logo: 'A minimalist architectural monogram made of the two capital letters A and N fused into one compact geometric mark, machined from brushed titanium with smoked dark glass inlays, crisp bevelled polished chamfers catching a warm gold rim light from the upper right. It looks like the emblem on a luxury watch caseback or a vault door plate. Perfectly centered, straight front-on view, generous empty margin around it, on a pure flat black background (#000000). No other objects, no extra text, no watermark, no border. Studio macro product photography, razor sharp.',
  pontemesto:
    'Abstract ultra-clean 3D isometric render of high-velocity global payment routing. Machined brushed-steel hub nodes sit on an obsidian black plane, joined by thin glowing emerald-green light conduits that carry small bright pulses. One central gateway node is larger, with a smoked glass top and a polished chamfer. A few nodes catch a warm gold rim light from the upper right. Luxury watch-macro material quality, shallow depth of field, deep black background (#07090E) with lots of dark negative space on the left. No text, no numbers, no logos, no people.',
  keywa:
    'Sleek 3D render of a cryptographic threshold-signing mechanism for institutional custody. Three interlocking brushed titanium rings surround a smoked glass core, like a vault lock crossed with a mechanical watch movement. Small clear glass key segments are seated around the rings; most glow soft emerald green, one stays dark. Polished chamfers, fine machining marks, warm gold rim light from the upper right, obsidian black background (#07090E) with dark negative space. Macro product photography, shallow depth of field. No text, no numbers, no logos.',
  simulations:
    'Cinematic dark-mode render of a simulation network. Many small machined steel nodes joined by hair-thin lines float over an obsidian black ground (#07090E). Clusters pulse with amber-gold and cyan light like live telemetry. A few nodes are tiny solid shapes of a house, an office block and a bank with columns, hinting at economic and legal agents. Subtle volumetric glow, shallow depth of field, warm gold rim light from the upper right, luxury watch-macro material quality. No text, no numbers, no logos, no people.',
  dial: 'Extreme macro photograph of a luxury steel sports watch dial with deep horizontal embossed grooves running edge to edge. The dial is a very dark navy fading to black, with a soft brushed sheen. One polished applied gold baton hour marker sits at the far right edge and catches warm light from the upper right. Most of the frame is dark grooved dial. Shallow depth of field. No brand name, no logo, no text, no numerals, no hands.',
  movement:
    'Extreme macro photograph of a mechanical watch movement seen through a sapphire caseback. Striped brushed steel bridges, a gold gear train, blued screws, and a few jewels that glow emerald green. Warm gold rim light from the upper right, deep obsidian shadows (#07090E) taking the left third of the frame, shallow depth of field. No brand names, no engraving, no text, no numbers.',
  cmor: 'Abstract 3D render of a market-sentiment instrument. A brushed steel precision stylus, like a seismograph arm, draws a glowing amber line across a pane of smoked glass. Tiny blank paper slivers drift in from the left and dissolve into cyan light particles that feed the instrument. Obsidian black background (#07090E), warm gold rim light from the upper right, luxury watch-macro material quality, shallow depth of field. No text, no numbers, no logos, no people.',
};

const jobs = [
  { src: 'raw/pontemesto.png', name: 'asset-pontemesto', widths: [1600, 900], meta: krea(PROMPTS.pontemesto) },
  { src: 'raw/keywa.png', name: 'asset-keywa', widths: [1600, 900], meta: krea(PROMPTS.keywa) },
  { src: 'raw/cmor.png', name: 'asset-cmor', widths: [1600, 900], meta: krea(PROMPTS.cmor) },
  { src: 'raw/simulations.jpg', name: 'asset-simulations', widths: [2000, 1100], meta: krea(PROMPTS.simulations) },
  { src: 'raw/dial.jpg', name: 'asset-dial', widths: [2000, 1100], meta: krea(PROMPTS.dial) },
  { src: 'raw/movement.png', name: 'asset-movement', widths: [2000, 1100], meta: krea(PROMPTS.movement) },
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
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${stem}.avif`);
    await base.clone().webp({ quality: 80, effort: 6 }).toFile(`${stem}.webp`);
    for (const ext of ['avif', 'webp']) await writeFile(`${stem}.${ext}.json`, JSON.stringify(j.meta, null, 2));
  }
  console.log('done', j.name);
}

// Monogram: the Krea render sits on black. The ground is every dark pixel that
// connects to the frame edge; everything else stays, so the smoked glass keeps
// its body. The result is a real cut-out with alpha.
{
  const S = 1200;
  const { data } = await sharp('raw/logo.png').resize(S, S).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const dark = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) {
    const m = Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);
    dark[i] = m < 46 ? 1 : 0;
  }
  const ground = new Uint8Array(S * S);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= S || y >= S) return;
    const i = y * S + x;
    if (!dark[i] || ground[i]) return;
    ground[i] = 1;
    stack.push(i);
  };
  for (let k = 0; k < S; k++) {
    push(k, 0);
    push(k, S - 1);
    push(0, k);
    push(S - 1, k);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % S;
    const y = (i - x) / S;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  const alpha = Buffer.alloc(S * S);
  for (let i = 0; i < S * S; i++) alpha[i] = ground[i] ? 0 : 255;
  const softRes = await sharp(alpha, { raw: { width: S, height: S, channels: 1 } })
    .blur(1.1)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sc = softRes.info.channels;
  const soft = Buffer.alloc(S * S);
  for (let i = 0; i < S * S; i++) soft[i] = softRes.data[i * sc];
  const rgba = Buffer.alloc(S * S * 4);
  for (let i = 0; i < S * S; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = soft[i];
  }
  const cut = await sharp(rgba, { raw: { width: S, height: S, channels: 4 } }).trim({ threshold: 2 }).png().toBuffer();
  const meta = krea(PROMPTS.logo, { note: 'Black ground removed by flood fill in scripts/images.mjs.' });
  for (const w of [640, 320]) {
    await sharp(cut).resize({ width: w }).png({ compressionLevel: 9 }).toFile(join(out, `logo-an-${w}.png`));
    await sharp(cut).resize({ width: w }).webp({ quality: 86, alphaQuality: 92, effort: 6 }).toFile(join(out, `logo-an-${w}.webp`));
    for (const ext of ['png', 'webp']) await writeFile(join(out, `logo-an-${w}.${ext}.json`), JSON.stringify(meta, null, 2));
  }
  console.log('done logo');
}

// Bezel: the Krea render is a steel ring on black. The black outside the ring
// and the black inside it are both removed by flood fill, so the ring ships as
// a real cut-out. The page lays it over the portrait as a nine-slice frame.
{
  const S = 1600;
  const { data } = await sharp('raw/bezel.png').resize(S, S).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const dark = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) dark[i] = Math.max(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) < 34 ? 1 : 0;
  const ground = new Uint8Array(S * S);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= S || y >= S) return;
    const i = y * S + x;
    if (!dark[i] || ground[i]) return;
    ground[i] = 1;
    stack.push(i);
  };
  for (let k = 0; k < S; k++) {
    push(k, 0);
    push(k, S - 1);
    push(0, k);
    push(S - 1, k);
  }
  push(S / 2, S / 2);
  while (stack.length) {
    const i = stack.pop();
    const x = i % S;
    const y = (i - x) / S;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  const alpha = Buffer.alloc(S * S);
  for (let i = 0; i < S * S; i++) alpha[i] = ground[i] ? 0 : 255;
  const softRes = await sharp(alpha, { raw: { width: S, height: S, channels: 1 } }).blur(0.9).raw().toBuffer({ resolveWithObject: true });
  const sc = softRes.info.channels;
  const rgba = Buffer.alloc(S * S * 4);
  for (let i = 0; i < S * S; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = softRes.data[i * sc];
  }
  const cut = await sharp(rgba, { raw: { width: S, height: S, channels: 4 } }).trim({ threshold: 2 }).png().toBuffer();
  const prompt =
    'A flat, straight front-on orthographic studio photograph of one empty square frame with large smoothly rounded corners: the bezel of a luxury steel sports watch with a cushion-shaped case, with nothing inside it. The frame band is slim and has the same width on all four sides, about one twentieth of the image width. Its flat top face is brushed stainless steel with fine straight satin brushing. A thin mirror-polished chamfer runs along both the inner edge and the outer edge. Soft studio light from the upper right puts a warm gold highlight on the top right corner and leaves the lower left darker. The centre of the frame is completely empty, pure flat black (#000000). The background outside the frame is pure flat black (#000000) with a small even margin. No dial, no hands, no glass, no lugs, no crown, no strap, no screws, no text, no logo, no reflections of objects.';
  const meta = krea(prompt, { note: 'Black ground and black centre removed by flood fill, then squared, in scripts/images.mjs.' });
  for (const w of [1200, 700]) {
    // forced square so the nine-slice percentages are the same on both axes
    await sharp(cut).resize(w, w, { fit: 'fill' }).webp({ quality: 88, alphaQuality: 92, effort: 6 }).toFile(join(out, `bezel-${w}.webp`));
    await writeFile(join(out, `bezel-${w}.webp.json`), JSON.stringify(meta, null, 2));
  }
  console.log('done bezel');
}

// Fine grain tile, made here from noise. No image model.
{
  const size = 128;
  const buf = Buffer.alloc(size * size * 4);
  let s = 7331;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < size * size; i++) {
    const v = Math.round(rnd() * 255);
    buf[i * 4] = buf[i * 4 + 1] = buf[i * 4 + 2] = v;
    buf[i * 4 + 3] = Math.round(4 + rnd() * 18);
  }
  await sharp(buf, { raw: { width: size, height: size, channels: 4 } }).webp({ quality: 50 }).toFile(join(out, 'grain.webp'));
  await writeFile(
    join(out, 'grain.webp.json'),
    JSON.stringify({ prompt: 'Origin: random noise tile written by scripts/images.mjs. Not generated by an image model.', createdAt: '2026-11-10' }, null, 2),
  );
  console.log('done grain');
}

/**
 * Draws the invented terrain as flat colour bands with contour lines,
 * then writes the shipped images and the share image.
 * Run: npm run terrain
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { MAP, hills, SEA } from '../src/lib/geo.js';

const OUT = new URL('../public/', import.meta.url);
const SCALE = 2; // draw at 3200 x 2000, then shrink for smooth edges
const W = MAP.w * SCALE;
const H = MAP.h * SCALE;

/* ---- seeded value noise, so every run gives the same coast ---- */
const rand = (ix, iy) => {
  let n = (ix * 374761393 + iy * 668265263) ^ 0x5bf03635;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};
const fade = (t) => t * t * (3 - 2 * t);
const noise = (x, y) => {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = fade(x - ix), fy = fade(y - iy);
  const a = rand(ix, iy), b = rand(ix + 1, iy), c = rand(ix, iy + 1), d = rand(ix + 1, iy + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
};

const height = (x, y) => {
  let h = 0;
  for (const k of hills) {
    const dx = x - k.x, dy = y - k.y;
    h += k.a * Math.exp(-(dx * dx + dy * dy) / (2 * k.s * k.s));
  }
  const n = noise(x / 90, y / 90) * 0.6 + noise(x / 38, y / 38) * 0.28 + noise(x / 15, y / 15) * 0.12;
  return h * (0.78 + n * 0.44) + (n - 0.5) * 0.09;
};

/* ---- colour bands ---- */
const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
const seaBands = [
  { below: 0.07, c: hex('#BCD5D3') },
  { below: 0.13, c: hex('#C9DEDA') },
  { below: SEA, c: hex('#D8E8E1') },
];
const landBands = [
  { below: 0.3, c: hex('#EFE8D2') },
  { below: 0.42, c: hex('#EADFC0') },
  { below: 0.54, c: hex('#E4D4AD') },
  { below: 0.66, c: hex('#DCC799') },
  { below: 0.8, c: hex('#D2B888') },
  { below: 9, c: hex('#C8A978') },
];
const bands = [...seaBands, ...landBands];
const bandOf = (h) => bands.findIndex((b) => h < b.below);
const COAST = hex('#4F7279');
const SEALINE = hex('#A9C6C5');
const CONTOUR = hex('#B59B6B');

const band = new Uint8Array(W * H);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) band[y * W + x] = bandOf(height(x / SCALE, y / SCALE));

const px = Buffer.alloc(W * H * 3);
const nSea = seaBands.length;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const b = band[i];
    let c = bands[b].c;
    // a line where the band changes, two pixels thick at draw size
    let edge = -1;
    for (const [dx, dy] of [[1, 0], [0, 1], [2, 0], [0, 2]]) {
      const xx = x + dx, yy = y + dy;
      if (xx >= W || yy >= H) continue;
      const o = band[yy * W + xx];
      if (o !== b) edge = Math.max(edge, Math.max(o, b));
    }
    if (edge >= 0) c = edge === nSea ? COAST : edge < nSea ? SEALINE : CONTOUR;
    px[i * 3] = c[0];
    px[i * 3 + 1] = c[1];
    px[i * 3 + 2] = c[2];
  }
}

const full = sharp(px, { raw: { width: W, height: H, channels: 3 } });
const note = JSON.stringify(
  { prompt: 'Origin: invented terrain drawn by scripts/terrain.mjs. Not a real place.', createdAt: '2026-11-11' },
  null,
  2,
);
for (const w of [1000, 1600, 2400]) {
  for (const fmt of ['avif', 'webp']) {
    const name = `art/terrain-${w}.${fmt}`;
    const img = full.clone().resize(w);
    await (fmt === 'avif' ? img.avif({ quality: 58 }) : img.webp({ quality: 80 })).toFile(new URL(name, OUT).pathname);
    await writeFile(new URL(`${name}.json`, OUT), note);
  }
}

/* ---- share image: the terrain with a title card ---- */
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect x="60" y="150" width="640" height="330" fill="#F4EEE0" stroke="#1C2B3A" stroke-width="3"/>
  <rect x="72" y="162" width="616" height="306" fill="none" stroke="#1C2B3A" stroke-width="1"/>
  <text x="104" y="226" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="4" fill="#B8402A">SHEET 5 · SURVEYED 2018–2026</text>
  <text x="104" y="306" font-family="DejaVu Serif, Georgia, serif" font-size="68" font-weight="700" fill="#1C2B3A">Ali Nojoumi</text>
  <text x="104" y="362" font-family="DejaVu Serif, Georgia, serif" font-style="italic" font-size="32" fill="#1C2B3A">An atlas of the work</text>
  <text x="104" y="424" font-family="DejaVu Sans, sans-serif" font-size="23" fill="#33475A">Payments · Digital asset platforms · Applied AI</text>
</svg>`);
await full
  .clone()
  .extract({ left: 500, top: 280, width: 2400, height: 1260 })
  .resize(1200, 630)
  .composite([{ input: card }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(new URL('og.jpg', OUT).pathname);
await writeFile(
  new URL('og.jpg.json', OUT),
  JSON.stringify({ prompt: 'Origin: made by scripts/terrain.mjs from the invented terrain.', createdAt: '2026-11-11' }, null, 2),
);
console.log('terrain and share image written');

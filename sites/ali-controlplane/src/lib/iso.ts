/**
 * A small isometric drawing kit. The diagrams use it so they look like the
 * scale models in the Krea renders: slabs on a grid floor, light on rails.
 * x runs down to the right, y runs down to the left, z is up.
 */
export type Pt = readonly [number, number];

const r2 = (n: number) => Math.round(n * 100) / 100;

export function isoSpace(unit: number, ox: number, oy: number) {
  const pt = (x: number, y: number, z = 0): Pt => [r2(ox + (x - y) * unit * 0.866), r2(oy + (x + y) * unit * 0.5 - z * unit)];
  const d = (pts: Pt[], close = true) => `M${pts.map((p) => `${p[0]} ${p[1]}`).join('L')}${close ? 'Z' : ''}`;
  /** The three visible faces of a box, plus its lit top edges. */
  const box = (x: number, y: number, w: number, dp: number, h: number) => ({
    top: d([pt(x, y, h), pt(x + w, y, h), pt(x + w, y + dp, h), pt(x, y + dp, h)]),
    left: d([pt(x, y + dp, h), pt(x + w, y + dp, h), pt(x + w, y + dp, 0), pt(x, y + dp, 0)]),
    right: d([pt(x + w, y, h), pt(x + w, y + dp, h), pt(x + w, y + dp, 0), pt(x + w, y, 0)]),
    rim: d([pt(x, y, h), pt(x + w, y, h), pt(x + w, y + dp, h)], false),
    centre: pt(x + w / 2, y + dp / 2, h),
    foot: pt(x + w / 2, y + dp / 2, 0),
  });
  /** A rail on the floor through grid points. */
  const rail = (pts: [number, number][]) => d(pts.map(([x, y]) => pt(x, y)), false);
  /** A flat tile on the floor. */
  const tile = (x: number, y: number, w: number, dp: number, z = 0) =>
    d([pt(x, y, z), pt(x + w, y, z), pt(x + w, y + dp, z), pt(x, y + dp, z)]);
  return { pt, d, box, rail, tile, unit };
}

export type Iso = ReturnType<typeof isoSpace>;

/** Face colours. Light comes from the upper right, as in the portraits. */
export const TONES = {
  stone: { top: '#18202d', left: '#0a0e15', right: '#111924', rim: '#94a3b8', rimOpacity: 0.34 },
  slate: { top: '#222c3c', left: '#0d121a', right: '#18212e', rim: '#cbd5e1', rimOpacity: 0.4 },
  glass: { top: '#2a3649', left: '#111a26', right: '#1d2838', rim: '#d4af37', rimOpacity: 0.7 },
  titanium: { top: '#7f8da3', left: '#39424f', right: '#5d6979', rim: '#e9edf3', rimOpacity: 0.7 },
  live: { top: '#10b981', left: '#065f46', right: '#0b8f66', rim: '#a7f3d0', rimOpacity: 0.9 },
  gold: { top: '#d4af37', left: '#6e5a17', right: '#a88a27', rim: '#f6e7a8', rimOpacity: 0.9 },
  data: { top: '#38bdf8', left: '#0c4a6e', right: '#1583b8', rim: '#bae6fd', rimOpacity: 0.9 },
} as const;

export type Tone = keyof typeof TONES;

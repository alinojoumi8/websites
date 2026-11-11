/**
 * The invented terrain. One source for the terrain picture (scripts/terrain.mjs)
 * and for the labels and route drawn over it (src/pages/index.astro).
 * All positions are in map units: 1600 wide, 1000 tall.
 */

export const MAP = { w: 1600, h: 1000 };

/** Hills. Each one is a soft bump: centre, spread, height (0 to 1). */
export const hills = [
  // Chainblock islet
  { x: 185, y: 720, s: 46, a: 0.52 },
  { x: 240, y: 765, s: 30, a: 0.36 },
  // CMOR land
  { x: 430, y: 420, s: 92, a: 0.74 },
  { x: 520, y: 545, s: 70, a: 0.5 },
  { x: 345, y: 320, s: 55, a: 0.42 },
  // Keywa range
  { x: 850, y: 390, s: 112, a: 1.0 },
  { x: 755, y: 285, s: 70, a: 0.55 },
  { x: 965, y: 505, s: 78, a: 0.56 },
  { x: 900, y: 230, s: 52, a: 0.4 },
  // Chante and MyInvestino outposts
  { x: 790, y: 775, s: 42, a: 0.5 },
  { x: 1010, y: 735, s: 46, a: 0.52 },
  // Pontemesto
  { x: 1300, y: 370, s: 96, a: 0.82 },
  { x: 1375, y: 510, s: 62, a: 0.48 },
  { x: 1235, y: 250, s: 54, a: 0.4 },
  // Open-source shoals
  { x: 1245, y: 880, s: 30, a: 0.42 },
  { x: 1345, y: 825, s: 36, a: 0.46 },
  { x: 1455, y: 790, s: 30, a: 0.42 },
];

/** Height at which sea becomes land. */
export const SEA = 0.2;

/** Stops on the route, in founding order. */
export const stops = [
  { id: 'chainblock', x: 185, y: 720, name: 'Chainblock.app', dates: '2018–2020', href: '#plate-ventures', label: 'sw' },
  { id: 'cmor', x: 430, y: 420, name: 'CMOR Group', dates: '2018–2023', href: '#plate-cmor', label: 'n', major: true },
  { id: 'keywa', x: 850, y: 390, name: 'Keywa', dates: '2020–2024', href: '#plate-keywa', label: 'n', major: true },
  { id: 'chante', x: 790, y: 775, name: 'Chante.app', dates: '2020–2025', href: '#plate-ventures', label: 's' },
  { id: 'myinvestino', x: 1010, y: 735, name: 'MyInvestino.ir', dates: '2020–2025', href: '#plate-ventures', label: 's' },
  { id: 'pontemesto', x: 1300, y: 370, name: 'Pontemesto', dates: '2026–now', href: '#plate-pontemesto', label: 'n', major: true, here: true },
];

/** Field stations. Reached by a side track from the last stop. */
export const stations = [
  { id: 'manyworld', x: 1245, y: 880, name: 'Manyworld' },
  { id: 'triallens', x: 1345, y: 825, name: 'TrialLens' },
  { id: 'crowdlens', x: 1455, y: 790, name: 'CrowdLens' },
];

/** Smooth path through points (Catmull-Rom turned into cubic curves). */
export function smooth(points, tension = 0.5) {
  const p = points;
  let d = `M${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1x = p1.x + ((p2.x - p0.x) * tension) / 3;
    const c1y = p1.y + ((p2.y - p0.y) * tension) / 3;
    const c2x = p2.x - ((p3.x - p1.x) * tension) / 3;
    const c2y = p2.y - ((p3.y - p1.y) * tension) / 3;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}

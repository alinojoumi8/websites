/**
 * Motion presets for the whole page.
 *
 * Every animated part reads its timing from this file, so one edit here retimes
 * the page, and each preset can be copied into a motion tool as a named state.
 * - EASE and SPRING feed Motion (Framer Motion) components.
 * - VARIANTS are named Motion states (initial / animate / exit).
 * - SCROLL feeds the GSAP ScrollTrigger choreography in components/App.tsx.
 */

type Bezier = [number, number, number, number];

export const EASE = {
  /** fast start, long soft landing */
  out: [0.16, 1, 0.3, 1] as Bezier,
  /** even in and out, for line drawing */
  inOut: [0.65, 0, 0.35, 1] as Bezier,
};

export const SPRING = {
  /** the loupe follows the pointer */
  loupe: { stiffness: 420, damping: 38, mass: 0.5 },
  /** the loupe opens to the whole portrait */
  iris: { stiffness: 70, damping: 19, mass: 1 },
  /** magnetic buttons and hotspots */
  magnet: { stiffness: 220, damping: 16, mass: 0.5 },
  /** figure counters */
  counter: { stiffness: 46, damping: 17, mass: 1 },
  /** sub-dial hands */
  hand: { stiffness: 34, damping: 11, mass: 1 },
  /** the sentiment needle */
  needle: { stiffness: 130, damping: 11, mass: 0.9 },
} as const;

export const VARIANTS = {
  /** a view replaces another view in the same frame */
  swap: {
    initial: { opacity: 0, y: 14, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE.out } },
    exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.22, ease: EASE.inOut } },
  },
  /** a row opens to show its detail */
  detail: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1, transition: { duration: 0.5, ease: EASE.out } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE.inOut } },
  },
  /** a new line lands in a log */
  logLine: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE.out } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
  /** the leader line from a hotspot to its row */
  leader: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1, transition: { duration: 0.55, ease: EASE.inOut } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
} as const;

export const SCROLL = {
  /** headings: lines rise from a mask */
  heading: { start: 'top 88%', duration: 1.05, stagger: 0.09, ease: 'expo.out' },
  /** small items rise in groups */
  item: { start: 'top 92%', duration: 0.95, stagger: 0.07, ease: 'expo.out', y: 28 },
  /** SVG strokes draw as they enter */
  draw: { start: 'top 80%', duration: 1.6, stagger: 0.08, ease: 'power2.inOut' },
  /** hero entrance, in seconds from page start */
  hero: { name: 0.1, lead: 0.55, actions: 0.85, portrait: 0, track: 0.9 },
} as const;

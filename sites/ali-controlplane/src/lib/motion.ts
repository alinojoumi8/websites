/**
 * Every motion preset on the page, in one place.
 * Components import these by name, so any state here can be re-timed
 * (or replaced by keyframes from a motion tool) without touching layout code.
 */
import type { Transition, Variants } from 'motion/react';

type Bezier = [number, number, number, number];

export const ease: Record<'out' | 'inOut' | 'soft', Bezier> = {
  /** exponential ease-out: the page default */
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  soft: [0.33, 1, 0.68, 1],
};

export const spring = {
  /** figures settling on the telemetry strip */
  counter: { stiffness: 55, damping: 17, mass: 1 },
  /** buttons and hotspots that lean toward the pointer */
  magnetic: { stiffness: 240, damping: 17, mass: 0.35 },
  /** the lens that follows the pointer */
  lens: { stiffness: 320, damping: 32, mass: 0.6 },
  /** panels, toggles, thumb of a switch */
  panel: { stiffness: 380, damping: 34, mass: 0.8 },
  /** the packet on the left rail, trailing the scroll */
  rail: { stiffness: 180, damping: 30, mass: 0.6 },
} satisfies Record<string, Transition>;

export const time = {
  /** lens grows to cover the portrait */
  lensOpen: { duration: 0.95, ease: ease.out } as Transition,
  lensClose: { duration: 0.6, ease: ease.inOut } as Transition,
  swap: { duration: 0.55, ease: ease.out } as Transition,
  leader: { duration: 0.5, ease: ease.out } as Transition,
  packet: { duration: 2.6, ease: ease.inOut } as Transition,
  /** headline cards step one place along their rail */
  cardShift: { duration: 0.7, ease: ease.out } as Transition,
  /** the proof line under the process table changes */
  detail: { duration: 0.22 } as Transition,
  /** the rim of the lens fades in or out */
  ring: { duration: 0.3 } as Transition,
  /** small parts leave quickly */
  out: { duration: 0.15 } as Transition,
};

/** Hero: leader number `i` draws itself from its hotspot. */
export const leaderIn = (i: number, still = false): Transition => ({ ...time.leader, delay: still ? 0 : 0.55 + i * 0.07 });
/** Hero: tag number `i` appears at the end of its leader. */
export const tagIn = (i: number): Transition => ({ delay: 0.8 + i * 0.07, duration: 0.35 });

/** Hero: headline block and stack table trade places. */
export const swapBlock: Variants = {
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: time.swap },
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)', transition: { duration: 0.3, ease: ease.inOut } },
};

/** Hero: rows of the leadership stack arrive one after another. */
export const stackList: Variants = {
  shown: { transition: { staggerChildren: 0.045, delayChildren: 0.18 } },
  hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};
export const stackRow: Variants = {
  shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.out } },
  hidden: { opacity: 0, x: -14, transition: { duration: 0.2 } },
};

/** Hero: a hotspot lands on a small Ali. */
export const hotspot: Variants = {
  hidden: { opacity: 0, scale: 0.2 },
  shown: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.35 + i * 0.07, duration: 0.6, ease: ease.out },
  }),
};

/** Hero: the glass callout beside a hotspot. */
export const callout: Variants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(6px)', transition: { duration: 0.18 } },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.16, duration: 0.45, ease: ease.out } },
};

/** Case studies: the two faces of a workbench (strategy and architecture). */
export const face: Variants = {
  hidden: { opacity: 0, y: 10, transition: { duration: 0.2, ease: ease.inOut } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.out } },
};

/** Lists that filter (skills matrix, ledgers). */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.out } },
  gone: { opacity: 0, scale: 0.98, transition: { duration: 0.18 } },
};

/** Named export table for motion tools: state name to preset. */
export const motionStates = {
  'hero.swap': swapBlock,
  'hero.stack.list': stackList,
  'hero.stack.row': stackRow,
  'hero.hotspot': hotspot,
  'hero.callout': callout,
  'hero.lens.open': time.lensOpen,
  'hero.lens.close': time.lensClose,
  'hero.lens.ring': time.ring,
  'hero.leader.in': leaderIn,
  'hero.tag.in': tagIn,
  'hero.detail': time.detail,
  'work.cardShift': time.cardShift,
  'spring.rail': spring.rail,
  'work.face': face,
  'work.packet': time.packet,
  'fit.item': listItem,
  'spring.counter': spring.counter,
  'spring.magnetic': spring.magnetic,
  'spring.lens': spring.lens,
  'spring.panel': spring.panel,
};

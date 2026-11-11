/** Lenis smooth scrolling, wired to GSAP ScrollTrigger, plus scroll-progress hooks. */
import { useEffect, useState, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'motion/react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Desktop with motion allowed: the layout that pins case studies while they draw. */
export const PIN_QUERY = '(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)';

export function useMedia(query: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const set = () => setOn(m.matches);
    set();
    m.addEventListener('change', set);
    return () => m.removeEventListener('change', set);
  }, [query]);
  return on;
}

/**
 * Progress of an element through the viewport, 0 to 1, as a motion value.
 * With `enabled` false the value stays at 1, so everything is drawn.
 */
export function useProgress(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  start = 'top top',
  end = 'bottom bottom',
): MotionValue<number> {
  const mv = useMotionValue(1);
  useEffect(() => {
    if (!enabled || !ref.current) {
      mv.set(1);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      onUpdate: (s) => mv.set(s.progress),
      onRefresh: (s) => mv.set(s.progress),
    });
    mv.set(st.progress);
    return () => st.kill();
  }, [enabled, ref, mv, start, end]);
  return mv;
}

/** Scroll the page to a y position, through Lenis when it runs. */
export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

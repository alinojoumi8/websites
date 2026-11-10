import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { startPointer } from '../lib/pointer';
import Guilloche from './Guilloche';
import { Cursor } from './ui';
import { Denominations, Hero, Light, Nav, Practice, Register, Series, Signatories, Statement } from './sections';

export default function App() {
  useEffect(() => {
    const stopPointer = startPointer();
    let lenis: Lenis | undefined;
    let tick: ((t: number) => void) | undefined;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.105, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    document.documentElement.classList.add('is-live');

    return () => {
      stopPointer();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <Guilloche />
      <Cursor />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Statement />
        <Denominations />
        <Light />
        <Practice />
        <Series />
        <Register />
        <Signatories />
      </main>
    </MotionConfig>
    </LazyMotion>
  );
}

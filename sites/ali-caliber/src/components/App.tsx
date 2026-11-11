import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap';
import { SCROLL } from '../lib/motion';
import { Bar } from './ui';
import { Hero } from './Hero';
import { Telemetry, Work } from './Work';
import { Lab } from './Lab';
import { Contact, Fit, Footer } from './Closing';

/** All scroll and entrance motion, set up once after the fonts are ready. */
function useChoreography() {
  useEffect(() => {
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.add('failsafe');
      return;
    }

    let dead = false;
    let ctx: gsap.Context | undefined;

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -64 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The dial catches the light where the pointer is.
    const dial = document.querySelector<HTMLElement>('.dial');
    const light = { x: 0.72, y: 0.18, tx: 0.72, ty: 0.18 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      light.tx = e.clientX / window.innerWidth;
      light.ty = e.clientY / window.innerHeight;
    };
    const sheen = () => {
      if (!dial) return;
      const dx = light.tx - light.x;
      const dy = light.ty - light.y;
      if (Math.abs(dx) + Math.abs(dy) < 0.0005) return;
      light.x += dx * 0.06;
      light.y += dy * 0.06;
      dial.style.setProperty('--sx', `${(light.x * 100).toFixed(2)}%`);
      dial.style.setProperty('--sy', `${(light.y * 100).toFixed(2)}%`);
      dial.style.setProperty('--sweep', `${(20 + light.x * 60).toFixed(2)}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    gsap.ticker.add(sheen);

    const show = (target: gsap.TweenTarget) => gsap.set(target, { visibility: 'visible' });

    const run = () => {
      if (dead) return;
      (window as unknown as { __caliber?: boolean }).__caliber = true;
      ctx = gsap.context(() => {
        /* ----- Hero: the watch arrives, then the name is set ----- */
        const q = (s: string) => document.querySelector<HTMLElement>(s);
        const portrait = q('[data-hero="portrait"]');
        const name = q('[data-hero="name"]');
        const lead = q('[data-hero="lead"]');
        const items = gsap.utils.toArray<HTMLElement>('[data-hero="item"]');
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        if (portrait) {
          show(portrait);
          tl.from(portrait, { autoAlpha: 0, scale: 0.93, filter: 'blur(14px)', duration: 1.9, clearProps: 'filter' }, SCROLL.hero.portrait);
        }
        if (name) {
          const split = SplitText.create(name.querySelectorAll('span'), { type: 'chars', mask: 'chars' });
          show(name);
          tl.from(split.chars, { yPercent: 112, duration: 1.15, stagger: 0.04 }, SCROLL.hero.name);
        }
        if (lead) {
          const split = SplitText.create(lead, { type: 'lines', mask: 'lines' });
          show(lead);
          tl.from(split.lines, { yPercent: 108, duration: 1, stagger: 0.08 }, SCROLL.hero.lead);
        }
        if (items.length) {
          show(items);
          tl.from(items, { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.09 }, SCROLL.hero.actions);
        }

        /* ----- Headings: lines rise from a mask ----- */
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          show(el);
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 108,
                duration: SCROLL.heading.duration,
                ease: SCROLL.heading.ease,
                stagger: SCROLL.heading.stagger,
                scrollTrigger: { trigger: el, start: SCROLL.heading.start, once: true },
              });
            },
          });
        });

        /* ----- Small items rise in groups ----- */
        const small = '[data-in]';
        gsap.set(small, { autoAlpha: 0, y: SCROLL.item.y });
        ScrollTrigger.batch(small, {
          start: SCROLL.item.start,
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              autoAlpha: 1,
              y: 0,
              duration: SCROLL.item.duration,
              ease: SCROLL.item.ease,
              stagger: SCROLL.item.stagger,
              overwrite: true,
              clearProps: 'transform',
            }),
        });

        /* ----- Hairlines draw themselves ----- */
        gsap.utils.toArray<SVGElement>('[data-draw]').forEach((el) => {
          gsap.fromTo(
            el,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: SCROLL.draw.duration, ease: SCROLL.draw.ease, scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
          );
        });

        /* ----- Each case holds still while its steps light up ----- */
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1000px) and (min-height: 700px)', () => {
          gsap.utils.toArray<HTMLElement>('[data-case]').forEach((el) => {
            gsap.fromTo(el, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.5 } });
          });
        });

        /* ----- Section art drifts a little against the scroll ----- */
        gsap.utils.toArray<HTMLElement>('.figures-art img, .lab-art img, .contact-art img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } },
          );
        });
      });
      ScrollTrigger.refresh();
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 1800))]).then(run);

    return () => {
      dead = true;
      ctx?.revert();
      gsap.ticker.remove(tick);
      gsap.ticker.remove(sheen);
      window.removeEventListener('pointermove', onMove);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useChoreography();
  return (
    <>
      <a className="skip" href="#main">
        Skip to the content
      </a>
      <div className="dial" aria-hidden="true" />
      <Bar />
      <main id="main">
        <Hero />
        <Telemetry />
        <Work />
        <Lab />
        <Fit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

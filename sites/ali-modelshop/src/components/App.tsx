import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap';
import Mat from './Mat';
import { Chrome } from './ui';
import { Contact, Figures, Hero, Models, Parts, Scale, Statement } from './sections';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

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

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -56 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const show = (target: gsap.TweenTarget) => gsap.set(target, { visibility: 'visible' });
    // Page position from layout only. A card that is mid-entrance has a
    // transform, and that must not move the trigger points of what is inside it.
    const layoutTop = (el: HTMLElement) => {
      let y = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
      return y;
    };
    const enterAt = (el: HTMLElement, share: number) => () => Math.max(0, layoutTop(el) - window.innerHeight * share);

    const run = () => {
      if (dead) return;
      (window as unknown as { __mshop?: boolean }).__mshop = true;
      ctx = gsap.context(() => {
        /* ----- Hero: the model is set down, then the name is cut in ----- */
        const frame = document.querySelector<HTMLElement>('[data-hero-frame]');
        const name = document.querySelector<HTMLElement>('[data-hero-in="name"]');
        const role = document.querySelector<HTMLElement>('[data-hero-in="role"]');
        const actions = document.querySelector<HTMLElement>('[data-hero-in="actions"]');
        const print = document.querySelector<HTMLElement>('[data-hero-in="print"]');
        const callout = document.querySelector<HTMLElement>('[data-hero-in="callout"]');

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        if (frame) tl.from(frame, { scale: 1.16, duration: 2.4 }, 0);
        if (name) {
          const split = SplitText.create(name.querySelectorAll('span'), { type: 'chars', mask: 'chars' });
          show(name);
          tl.from(split.chars, { yPercent: 108, duration: 1.15, stagger: 0.045 }, 0.15);
        }
        if (role) {
          const split = SplitText.create(role, { type: 'lines', mask: 'lines' });
          show(role);
          tl.from(split.lines, { yPercent: 105, duration: 1, stagger: 0.09 }, 0.75);
        }
        if (actions) {
          show(actions);
          tl.from(actions.children, { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 1.0);
        }
        if (print) {
          show(print);
          tl.from(print, { y: -70, rotation: -12, scale: 1.12, autoAlpha: 0, duration: 1.1, ease: 'back.out(1.5)' }, 0.9);
          tl.from(print.querySelectorAll('.tape'), { scaleX: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 1.55);
        }
        if (callout) {
          show(callout);
          tl.from(callout.querySelector('.callout-dot'), { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 1.5)
            .from(callout.querySelector('.callout-line'), { scaleX: 0, duration: 0.6 }, 1.65)
            .from(callout.querySelector('.callout-text'), { x: -14, autoAlpha: 0, duration: 0.6 }, 1.9);
        }

        // The model drifts a little against the pointer, and sinks as the page scrolls.
        if (frame) {
          const toX = gsap.quickTo(frame, 'x', { duration: 1.2, ease: 'power3.out' });
          const toY = gsap.quickTo(frame, 'y', { duration: 1.2, ease: 'power3.out' });
          const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            toX((e.clientX / window.innerWidth - 0.5) * -26);
            toY((e.clientY / window.innerHeight - 0.5) * -18);
          };
          window.addEventListener('pointermove', onMove, { passive: true });
          gsap.to(frame, {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });
          return () => window.removeEventListener('pointermove', onMove);
        }
      });

      ctx.add(() => {
        /* ----- Headings and the statement: lines rise from a cut ----- */
        gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
          show(el);
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.05,
                ease: 'expo.out',
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              });
            },
          });
        });

        // The yellow marker is drawn across the key words as they pass.
        gsap.utils.toArray<HTMLElement>('[data-mark-host]').forEach((host) => {
          gsap.fromTo(
            host,
            { '--mark': '0%' },
            { '--mark': '100%', ease: 'none', scrollTrigger: { trigger: host, start: 'top 62%', end: 'top 34%', scrub: 0.5 } },
          );
        });

        /* ----- Small items rise in groups ----- */
        const small = '[data-in]:not([data-in="card"])';
        gsap.set(small, { autoAlpha: 0, y: 30 });
        ScrollTrigger.batch(small, {
          start: 'top 92%',
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.95, ease: 'expo.out', stagger: 0.07, overwrite: true }),
        });

        /* ----- Cards are set down on the mat ----- */
        gsap.utils.toArray<HTMLElement>('[data-in="card"]').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 80, rotation: -1.6, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1.3,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          );
        });

        /* ----- Counters and dimension lines ----- */
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count);
          const v = { n: 0 };
          gsap.to(v, {
            n: end,
            duration: 1.8,
            ease: 'power3.out',
            onStart: () => (el.textContent = '0'),
            onUpdate: () => (el.textContent = fmt(v.n)),
            onComplete: () => (el.textContent = fmt(end)),
            scrollTrigger: { trigger: el, start: enterAt(el, 0.9), once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: enterAt(el, 0.9), once: true } },
          );
        });

        /* ----- Boards: each one shrinks back as the next lands on it ----- */
        const mm = gsap.matchMedia();
        mm.add('(min-width: 900px) and (min-height: 761px)', () => {
          const boards = gsap.utils.toArray<HTMLElement>('[data-board]');
          boards.forEach((b, i) => {
            const next = boards[i + 1];
            if (!next) return;
            gsap.to(b, {
              scale: 1 - (boards.length - 1 - i) * 0.022,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
            });
          });
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
      <Mat />
      <Chrome />
      <main id="main" className="page">
        <Hero />
        <Statement />
        <Figures />
        <Scale />
        <Models />
        <Parts />
        <Contact />
      </main>
    </>
  );
}

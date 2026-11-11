/** The page. One React island: it starts smooth scrolling, the heading reveals, and mounts each section. */
import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { site } from '../lib/content';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '../lib/gsap';
import { startSmoothScroll } from '../lib/scroll';
import { Icon, Monogram } from './ui';
import Rail from './Rail';
import Hero from './Hero';
import Work from './Work';
import Lab from './Lab';
import Fit from './Fit';
import Contact from './Contact';

export default function App() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    (window as unknown as { __cp?: boolean }).__cp = true;
    document.documentElement.classList.add('is-live');
    const stop = startSmoothScroll();

    // Section headings rise line by line, once, as they enter.
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 108,
              duration: 1,
              ease: 'expo.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    const onScroll = () => {
      const contact = document.getElementById('contact')?.getBoundingClientRect().top ?? Infinity;
      setPast(window.scrollY > window.innerHeight * 0.98 && contact > window.innerHeight * 0.55);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      stop();
      ctx.revert();
      window.removeEventListener('load', refresh);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <Rail />
      <header className={`bar ${past ? 'is-past' : ''}`}>
        <a href="#top" className="bar-mark" aria-label="Ali Nojoumi, back to the top">
          <Monogram size={26} />
          <span>Ali Nojoumi</span>
        </a>
        <a className="btn btn-gold btn-small bar-mail" href={`mailto:${site.email}`}>
          <Icon name="mail" size={16} />
          Email Ali
        </a>
      </header>
      <main id="main">
        <Hero />
        <Work />
        <Lab />
        <Fit />
      </main>
      <Contact />
    </MotionConfig>
  );
}

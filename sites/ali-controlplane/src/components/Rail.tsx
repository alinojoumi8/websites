/** The rail on the left edge: a map of the page, with a packet that travels as you scroll. */
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { site } from '../lib/content';
import { spring } from '../lib/motion';
import { Icon, Monogram } from './ui';

const STAGES = [
  { id: 'top', label: 'Intro' },
  { id: 'pontemesto', label: 'Pontemesto' },
  { id: 'keywa', label: 'Keywa' },
  { id: 'cmor', label: 'CMOR Group' },
  { id: 'lab', label: 'Lab' },
  { id: 'fit', label: 'Fit' },
  { id: 'contact', label: 'Contact' },
];
const LAST = STAGES.length - 1;

export default function Rail() {
  const pos = useMotionValue(0);
  const smooth = useSpring(pos, spring.rail);
  const at = useTransform(smooth, (v) => `${(v / LAST) * 100}%`);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let tops: number[] = [];
    const measure = () => {
      tops = STAGES.map((s) => (document.getElementById(s.id)?.getBoundingClientRect().top ?? 0) + window.scrollY);
    };
    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let i = 0;
      while (i < LAST && y >= tops[i + 1]) i++;
      const end = i < LAST ? tops[i + 1] : document.documentElement.scrollHeight;
      const f = i < LAST ? Math.max(0, Math.min(1, (y - tops[i]) / Math.max(1, end - tops[i]))) : 0;
      pos.set(i + f);
      setCurrent((c) => (c === i ? c : i));
    };
    const both = () => {
      measure();
      update();
    };
    both();
    const ro = new ResizeObserver(both);
    ro.observe(document.body);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [pos]);

  return (
    <nav className="rail" aria-label="Sections">
      <a href="#top" className="rail-mark" aria-label="Ali Nojoumi, back to the top">
        <Monogram size={30} />
      </a>
      <div className="rail-track">
        <span className="rail-line" aria-hidden="true" />
        <motion.span className="rail-fill" aria-hidden="true" style={{ height: at }} />
        <motion.span className="rail-packet" aria-hidden="true" style={{ top: at }} />
        <ol>
          {STAGES.map((s, i) => (
            <li key={s.id} style={{ top: `${(i / LAST) * 100}%` }} className={i === current ? 'is-current' : i < current ? 'is-past' : ''}>
              <a href={`#${s.id}`} aria-current={i === current ? 'location' : undefined}>
                <span className="rail-node" aria-hidden="true" />
                <span className="rail-label">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <a className="rail-mail" href={`mailto:${site.email}`} aria-label="Email Ali">
        <Icon name="mail" size={19} />
      </a>
    </nav>
  );
}

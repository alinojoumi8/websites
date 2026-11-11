import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from 'motion/react';
import { SPRING } from '../lib/motion';
import { nav, site } from '../lib/content';

export const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Pictures ---------- */

type PicProps = {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  w: number;
  h: number;
  eager?: boolean;
  priority?: 'high' | 'low';
  className?: string;
};

export function Pic({ name, widths, sizes, alt, w, h, eager, priority, className }: PicProps) {
  const set = (ext: string) => widths.map((x) => `/art/${name}-${x}.${ext} ${x}w`).join(', ');
  const big = Math.max(...widths);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/art/${name}-${big}.webp`}
        width={w}
        height={h}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority}
        draggable={false}
      />
    </picture>
  );
}

/* ---------- Icons: one stroke weight, square ends ---------- */

const I = ({ children }: { children: ReactNode }) => (
  <svg className="ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" aria-hidden="true">
    {children}
  </svg>
);
export const Arrow = () => (
  <I>
    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
  </I>
);
export const ArrowDown = () => (
  <I>
    <path d="M10 3v13M4.5 11 10 16.5 15.5 11" />
  </I>
);
export const ArrowOut = () => (
  <I>
    <path d="M5.5 14.5 15 5M7 5h8v8" />
  </I>
);
export const Download = () => (
  <I>
    <path d="M10 3v10M5.5 9 10 13.5 14.5 9M4 17h12" />
  </I>
);
export const Play = () => (
  <I>
    <path d="M6 4.5v11l9-5.5z" />
  </I>
);
export const Pause = () => (
  <I>
    <path d="M6.5 4.5v11M13.5 4.5v11" />
  </I>
);
export const StepIcon = () => (
  <I>
    <path d="M5 4.5v11l7-5.5zM15 4.5v11" />
  </I>
);
export const Replay = () => (
  <I>
    <path d="M4 10a6 6 0 1 0 2-4.5M4 3.5v3h3" />
  </I>
);

/** The AN mark: an A whose apex throws the diagonal of the N. */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg className={`mono-mark ${className}`} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 26 12 6l8 20M7.4 19h9.2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M12 6l15 20V6" stroke="var(--gold)" strokeWidth="2.2" strokeLinejoin="miter" strokeLinecap="square" />
    </svg>
  );
}

/** A hairline with minute ticks. It draws itself when it scrolls into view. */
export function Rule() {
  return (
    <svg className="rule" aria-hidden="true">
      <line className="rule-ticks" x1="0" y1="9" x2="100%" y2="9" />
      <line className="rule-line" data-draw x1="0" y1="1" x2="100%" y2="1" pathLength={1} />
    </svg>
  );
}

/* ---------- Magnetic wrapper ---------- */

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnet);
  const sy = useSpring(y, SPRING.magnet);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced()) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className="magnet" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

/* ---------- Pointer glow on plates ---------- */

export function glowMove(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--gx', `${e.clientX - r.left}px`);
  el.style.setProperty('--gy', `${e.clientY - r.top}px`);
}

/* ---------- Spring counter ---------- */

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

/** The real figure is in the HTML. With scripts on, it counts up once on a spring. */
export function Counter({ value, onStart }: { value: number; onStart?: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const spring = useSpring(value, SPRING.counter);

  useEffect(() => {
    if (!inView) return;
    onStart?.();
    if (reduced()) return;
    spring.jump(0);
    spring.set(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useMotionValueEvent(spring, 'change', (v) => {
    if (ref.current) ref.current.textContent = fmt(Math.min(value, Math.max(0, v)));
  });

  return <span ref={ref}>{fmt(value)}</span>;
}

/* ---------- Segmented control ---------- */

export function Seg<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" className="seg-btn" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {value === o.id && (
            <motion.span layoutId={`seg-${id}`} className="seg-thumb" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
          )}
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Live Toronto time ---------- */

export function TorontoTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="clock">{t ?? '--:--:--'}</span>;
}

/* ---------- Top bar ---------- */

export function Bar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.bar-nav a[href^="#"]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          links.forEach((a) =>
            a.getAttribute('href') === `#${en.target.id}` ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'),
          );
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', on);
      io.disconnect();
    };
  }, []);

  return (
    <header className="bar" data-solid={solid}>
      <a className="bar-brand" href="#top" aria-label="Ali Nojoumi, back to the top">
        <Monogram />
        <span>{site.name}</span>
      </a>
      <nav className="bar-nav" aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="bar-right">
        <a className="btn btn-gold btn-sm" href={`mailto:${site.email}`}>
          Email Ali
        </a>
      </div>
    </header>
  );
}

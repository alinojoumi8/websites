import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { nav, site } from '../lib/content';
import { pointer, onPointer } from '../lib/pointer';

/* ---------- Pictures ---------- */

type PicProps = {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  w: number;
  h: number;
  eager?: boolean;
  className?: string;
};

export function Pic({ name, widths, sizes, alt, w, h, eager, className }: PicProps) {
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
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : undefined}
        draggable={false}
      />
    </picture>
  );
}

/* ---------- Icons: one stroke weight ---------- */

export const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
  </svg>
);
export const ArrowOut = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
    <path d="M5.5 14.5 15 5M7 5h8v8" />
  </svg>
);

/* ---------- Magnetic wrapper ---------- */

export function Magnetic({ children, strength = 0.32 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

/* ---------- Pointer glow on cards ---------- */

export function glowMove(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--gx', `${e.clientX - r.left}px`);
  el.style.setProperty('--gy', `${e.clientY - r.top}px`);
}

/* ---------- Print: a photo held on the mat with tape ---------- */

type PrintProps = {
  children: ReactNode;
  caption?: ReactNode;
  className?: string;
  tape?: 'corners' | 'top';
  style?: CSSProperties;
  tilt?: boolean;
} & Record<`data-${string}`, string | undefined>;

export function Print({ children, caption, className = '', tape = 'corners', style, tilt = true, ...rest }: PrintProps) {
  const ref = useRef<HTMLElement>(null);
  const rx = useSpring(0, { stiffness: 140, damping: 18 });
  const ry = useSpring(0, { stiffness: 140, damping: 18 });

  const move = (e: React.PointerEvent) => {
    if (!tilt || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(-py * 9);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.figure
      ref={ref}
      className={`print ${className}`}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      {tape === 'corners' ? (
        <>
          <span className="tape tape-tl" aria-hidden="true" />
          <span className="tape tape-tr" aria-hidden="true" />
        </>
      ) : (
        <span className="tape tape-t" aria-hidden="true" />
      )}
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </motion.figure>
  );
}

/* ---------- Rulers, crosshair, navigation ---------- */

const TOP_NUMS = Array.from({ length: 40 }, (_, i) => (i + 1) * 10);
const SIDE_NUMS = Array.from({ length: 20 }, (_, i) => (i + 1) * 10);

export function Chrome() {
  const crossX = useRef<HTMLDivElement>(null);
  const crossY = useRef<HTMLDivElement>(null);
  const barMark = useRef<HTMLSpanElement>(null);
  const sideMark = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const drawPointer = () => {
      const on = pointer.live && !still;
      for (const el of [crossX.current, crossY.current, barMark.current, sideMark.current]) {
        el?.classList.toggle('is-on', on);
      }
      if (!on) return;
      const bar = 44;
      crossX.current!.style.transform = `translateX(${pointer.x}px)`;
      crossY.current!.style.transform = `translateY(${pointer.y}px)`;
      barMark.current!.style.transform = `translateX(${pointer.x}px)`;
      sideMark.current!.style.transform = `translateY(${Math.max(0, pointer.y - bar)}px)`;
    };
    const off = onPointer(drawPointer);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const el = progress.current;
      if (el?.parentElement) el.style.transform = `translateY(${p * (el.parentElement.clientHeight - 12)}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Mark the section in view in the navigation.
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
      off();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div ref={crossX} className="cross cross-x" aria-hidden="true" />
      <div ref={crossY} className="cross cross-y" aria-hidden="true" />

      <header className="bar">
        <div className="bar-nums" aria-hidden="true">
          {TOP_NUMS.map((n) => (
            <span key={n} style={{ left: `calc(var(--rule) + ${n * 10}px)` }}>
              {n}
            </span>
          ))}
        </div>
        <a className="bar-brand" href="#top">
          {site.name}
        </a>
        <nav className="bar-nav" aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={n.href === '#models' || n.href === '#contact' ? '' : 'is-hide-sm'}>
              {n.label}
            </a>
          ))}
        </nav>
        <span ref={barMark} className="bar-mark" aria-hidden="true" />
      </header>

      <div className="side" aria-hidden="true">
        <div className="side-nums">
          {SIDE_NUMS.map((n) => (
            <span key={n} style={{ top: `${n * 10}px` }}>
              {n}
            </span>
          ))}
        </div>
        <div ref={progress} className="side-progress" />
        <span ref={sideMark} className="side-mark" />
      </div>
    </>
  );
}

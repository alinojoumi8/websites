import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  animate,
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Split: text that rises out of its own line, word by word or letter by letter. */

type SplitProps = {
  text: string;
  by?: 'word' | 'char';
  className?: string;
  unitClass?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
  /** Print passes: the word lands a little out of register, then snaps true. */
  register?: boolean;
  /** CSS-only entrance for the first screen. */
  css?: boolean;
};

export function Split({ text, by = 'word', className, unitClass = '', delay = 0, stagger, amount = 0.5, register = false, css = false }: SplitProps) {
  const words = text.split(' ');
  const step = stagger ?? (by === 'char' ? 0.045 : 0.06);
  const mask = 'inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] pt-[0.06em] -mt-[0.06em]';

  // First-screen text animates in plain CSS, so it never waits for scripts.
  if (css) {
    let i = 0;
    const unit = (content: string, key: number) => (
      <span key={key} className={mask}>
        <span className={`rise-in inline-block ${unitClass}`} style={{ ['--i' as string]: i++, ['--d' as string]: `${delay}s`, ['--s' as string]: `${step}s` }}>
          {content}
        </span>
      </span>
    );
    return (
      <span className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, wi) => (
            <span key={wi}>
              {by === 'word' ? unit(word, 0) : <span className="inline-block whitespace-nowrap">{Array.from(word).map((ch, ci) => unit(ch, ci))}</span>}
              {wi < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      </span>
    );
  }

  const container = { hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } };
  const child = register
    ? {
        hidden: { y: '112%', textShadow: '-0.075em 0 0 rgba(207,123,54,0.95), 0.075em 0 0 rgba(29,156,121,0.95)' },
        show: {
          y: '0%',
          textShadow: '0em 0 0 rgba(207,123,54,0), 0em 0 0 rgba(29,156,121,0)',
          transition: { y: { duration: 1, ease: EASE }, textShadow: { duration: 1.5, ease: EASE, delay: 0.25 } },
        },
      }
    : { hidden: { y: '112%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } };

  return (
    <m.span className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi}>
            {by === 'word' ? (
              <span className={mask}>
                <m.span className={`inline-block ${unitClass}`} variants={child}>
                  {word}
                </m.span>
              </span>
            ) : (
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} className={mask}>
                    <m.span className={`inline-block ${unitClass}`} variants={child}>
                      {ch}
                    </m.span>
                  </span>
                ))}
              </span>
            )}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </m.span>
  );
}

/* ------------------------------------------------------------------ */
/* Rise: one block that settles into place when it enters the view. */

export function Rise({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'p' | 'li' | 'span';
}) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Counter: counts up to its value once, when it enters the view. */

export function Counter({ value, className, style }: { value: number; className?: string; style?: CSSProperties }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const live = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const fmt = (n: number) => Math.round(n).toLocaleString('en-CA');

  useEffect(() => {
    if (reduce || !live.current) return;
    if (!inView) {
      live.current.textContent = '0';
      return;
    }
    const controls = animate(0, value, {
      duration: value > 1000 ? 2.6 : 2,
      ease: EASE,
      onUpdate: (v) => {
        if (live.current) live.current.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={wrap} className="relative inline-grid">
      <span className="sr-only">{fmt(value)}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {fmt(value)}
      </span>
      <span ref={live} aria-hidden="true" className={`col-start-1 row-start-1 ${className ?? ''}`} style={style}>
        {fmt(value)}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic: the wrapped control leans toward the pointer and springs back. */

export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 14, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 190, damping: 14, mass: 0.5 });

  return (
    <m.span
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}

/* ------------------------------------------------------------------ */
/* Pic: one responsive picture from /public/art. */

export function Pic({
  name,
  widths,
  sizes,
  alt,
  w,
  h,
  className,
  eager = false,
  priority = eager,
}: {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  eager?: boolean;
  priority?: boolean;
}) {
  const set = (ext: string) => widths.map((x) => `/art/${name}-${x}.${ext} ${x}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/art/${name}-${widths[0]}.webp`}
        alt={alt}
        width={w}
        height={h}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className={className}
      />
    </picture>
  );
}

/* ------------------------------------------------------------------ */
/* Microtext: a rule made of tiny repeated words, like a security thread. */

export function Microtext({ words, className = '', run = false }: { words: string; className?: string; run?: boolean }) {
  // Drawn by CSS from the attribute, so it stays out of the reading order.
  const line = Array.from({ length: 14 }, () => words).join(' · ') + ' · ';
  return <div aria-hidden="true" data-text={line} className={`microtext ${run ? 'run' : ''} ${className}`} />;
}

/* ------------------------------------------------------------------ */
/* Rosette: a guilloche seal drawn on a small canvas with a foil stroke. */

export function Rosette({ size = 220, className = '', tone = 'foil' }: { size?: number; className?: string; tone?: 'foil' | 'ink' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.height = Math.round(size * dpr);
    ctx.scale(dpr, dpr);
    ctx.translate(size / 2, size / 2);

    if (tone === 'ink') {
      ctx.strokeStyle = 'rgba(7, 11, 17, 0.8)';
    } else if (typeof ctx.createConicGradient === 'function') {
      const g = ctx.createConicGradient(0.7, 0, 0);
      g.addColorStop(0, '#cf7b36');
      g.addColorStop(0.2, '#ecb964');
      g.addColorStop(0.42, '#8fd3a0');
      g.addColorStop(0.6, '#1d9c79');
      g.addColorStop(0.8, '#1b7189');
      g.addColorStop(1, '#cf7b36');
      ctx.strokeStyle = g;
    } else {
      ctx.strokeStyle = '#ecb964';
    }
    ctx.lineWidth = 0.55;
    ctx.globalAlpha = 0.9;

    const half = size / 2;
    const bands: [number, number, number, number][] = [
      [0.84, 0.115, 16, 10],
      [0.58, 0.09, 11, 9],
      [0.37, 0.07, 8, 8],
      [0.2, 0.05, 6, 6],
    ];
    for (const [R, amp, n, K] of bands) {
      for (let k = 0; k < K; k++) {
        const ph = (Math.PI * 2 * k) / K;
        ctx.beginPath();
        for (let i = 0; i <= 360; i++) {
          const a = (i / 360) * Math.PI * 2;
          const r = (R + amp * Math.sin(n * a + ph)) * half;
          const px = r * Math.cos(a);
          const py = r * Math.sin(a);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }, [size, tone]);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ width: size, height: size }} />;
}

/* ------------------------------------------------------------------ */
/* LampPortrait: the studio portrait. A lamp shows the watermark layer: the seven small Alis. */

type LampProps = {
  className?: string;
  imgClass?: string;
  sizes: string;
  radius?: number;
  /** A point to light, as fractions of the picture. Used by the job list. */
  spot?: { x: number; y: number } | null;
  showAll?: boolean;
  eager?: boolean;
  glint?: boolean;
  /** What rests in the frame: the colour photograph, or the engraved plate cut from it. */
  base?: 'photo' | 'plate';
  /** Extra picture width beyond the frame, as a fraction of the frame. The pointer pans across it, so the small Alis at the sides come into view. */
  pan?: number;
  alt: string;
  children?: ReactNode;
};

export function LampPortrait({
  className = '',
  imgClass = '',
  sizes,
  radius = 170,
  spot = null,
  showAll = false,
  eager = false,
  glint = false,
  base = 'photo',
  pan = 0,
  alt,
  children,
}: LampProps) {
  const frame = useRef<HTMLDivElement>(null);
  // On touch screens a tap shows the whole second picture, and a second tap hides it.
  const [tapped, setTapped] = useState(false);
  const layer = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const hovering = useRef(false);
  // The watermark picture loads after the page settles. It is not part of the first paint.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const arm = () => setArmed(true);
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(arm, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(arm, 1200);
    return () => window.clearTimeout(id);
  }, []);

  const lx = useMotionValue(50);
  const ly = useMotionValue(40);
  const lr = useMotionValue(0);
  const slx = useSpring(lx, { stiffness: 160, damping: 22 });
  const sly = useSpring(ly, { stiffness: 160, damping: 22 });
  const slr = useSpring(lr, { stiffness: 120, damping: 20 });
  const mask = useMotionTemplate`radial-gradient(circle ${slr}px at ${slx}% ${sly}%, #000 0%, #000 52%, transparent 100%)`;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 90, damping: 18 });
  const spy = useSpring(py, { stiffness: 90, damping: 18 });
  const srx = useSpring(rx, { stiffness: 90, damping: 18 });
  const sry = useSpring(ry, { stiffness: 90, damping: 18 });

  // The job list, or the "show all" control, can point the lamp.
  useEffect(() => {
    if (showAll || tapped) {
      lr.set(2400);
      return;
    }
    if (spot) {
      lx.set(spot.x * 100);
      ly.set(spot.y * 100);
      lr.set(radius * 0.95);
    } else if (!hovering.current) {
      lr.set(0);
    }
  }, [spot, showAll, tapped, radius, lx, ly, lr]);

  // After a tap, the picture looks left and right once, so every small Ali passes through the frame.
  useEffect(() => {
    if (!tapped || !pan || reduce || !frame.current) return;
    const reach = frame.current.offsetWidth * pan * 0.46;
    const a = animate(px, [0, reach, -reach, 0], { duration: 8, ease: 'easeInOut' });
    return () => a.stop();
  }, [tapped, pan, reduce, px]);

  // One slow pass of the lamp after the page opens, so people learn it is there.
  useEffect(() => {
    if (!glint || reduce) return;
    let cancelled = false;
    let stop = () => {};
    const t = window.setTimeout(() => {
      if (cancelled || hovering.current) return;
      lx.jump(16);
      ly.jump(64);
      lr.set(radius * 0.8);
      const reach = pan && frame.current ? frame.current.offsetWidth * pan * 0.46 : 0;
      if (reach) px.jump(reach);
      const a = animate(lx, 84, { duration: 3.4, ease: 'easeInOut' });
      const b = animate(ly, 32, { duration: 3.4, ease: 'easeInOut' });
      const c = reach ? animate(px, -reach, { duration: 3.4, ease: 'easeInOut' }) : null;
      stop = () => {
        a.stop();
        b.stop();
        c?.stop();
      };
      a.then(() => {
        if (hovering.current || cancelled) return;
        lr.set(0);
        px.set(0);
      });
    }, 2800);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      stop();
    };
  }, [glint, reduce, radius, pan, lx, ly, lr, px]);

  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      <m.div
        ref={frame}
        className={`grain relative h-full w-full overflow-hidden [border-radius:inherit] ${base === 'photo' ? 'hatch' : ''}`}
        style={{ rotateX: srx, rotateY: sry }}
        data-cursor="Light"
        onPointerUp={(e) => {
          if (e.pointerType !== 'mouse') setTapped((v) => !v);
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse' || !layer.current) return;
          hovering.current = true;
          const r = layer.current.getBoundingClientRect();
          const fx = (e.clientX - r.left) / r.width;
          const fy = (e.clientY - r.top) / r.height;
          lx.set(fx * 100);
          ly.set(fy * 100);
          if (!showAll) lr.set(radius);
          if (!reduce) {
            const fr = e.currentTarget.getBoundingClientRect();
            const ffx = (e.clientX - fr.left) / fr.width;
            px.set(pan ? (0.5 - ffx) * fr.width * pan * 0.92 : (0.5 - fx) * 26);
            py.set((0.5 - fy) * 26);
            rx.set((fy - 0.5) * -5);
            ry.set((fx - 0.5) * 6);
          }
        }}
        onPointerLeave={() => {
          hovering.current = false;
          if (!showAll && !spot && !tapped) lr.set(0);
          px.set(0);
          py.set(0);
          rx.set(0);
          ry.set(0);
        }}
      >
        <m.div
          ref={layer}
          className="absolute inset-y-[-4%]"
          style={{ left: `${-4 - pan * 50}%`, width: `${108 + pan * 100}%`, x: spx, y: spy }}
        >
          <Pic
            name={base === 'plate' ? 'ali-plate' : 'ali'}
            widths={base === 'plate' ? [640, 1280] : [800, 1312]}
            sizes={sizes}
            alt={alt}
            w={1312}
            h={1199}
            eager={eager}
            className={`absolute inset-0 h-full w-full object-cover ${imgClass}`}
          />
          {armed && (
            <m.div className="absolute inset-0" style={{ WebkitMaskImage: mask, maskImage: mask }}>
              <Pic
                name="ali-minis"
                widths={[800, 1312]}
                sizes={sizes}
                alt=""
                w={1312}
                h={1199}
                eager
                priority={false}
                className={`absolute inset-0 h-full w-full object-cover ${imgClass}`}
              />
            </m.div>
          )}
        </m.div>
        {children}
      </m.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cursor: a small ring that trails the pointer with a spring. It names what it is over. */

export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle');
  const [label, setLabel] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setOn(true);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const tagged = el?.closest?.('[data-cursor]') as HTMLElement | null;
      if (tagged) {
        setLabel(tagged.dataset.cursor ?? '');
        setMode('label');
      } else if (el?.closest?.('a, button')) {
        setMode('link');
      } else {
        setMode('idle');
      }
    };
    const leave = () => setOn(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  const size = mode === 'label' ? 78 : mode === 'link' ? 46 : 14;

  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
      <m.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/80 text-[0.72rem] font-bold uppercase tracking-[0.06em] text-plate"
        animate={{
          width: size,
          height: size,
          opacity: on ? 1 : 0,
          backgroundColor: mode === 'label' ? 'rgba(237, 230, 214, 0.94)' : 'rgba(237, 230, 214, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <span className={mode === 'label' ? 'opacity-100' : 'opacity-0'}>{label}</span>
      </m.div>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

/** Small shared parts: icons, magnetic wrapper, switch, segmented toggle, isometric slab. */
import { useEffect, useId, useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react';
import { spring } from '../lib/motion';
import { TONES, type Iso, type Tone } from '../lib/iso';

/* ---------- Icons: one family, 1.5 stroke, round joins ---------- */

const paths = {
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowDown: <path d="M12 4v15m6-6-6 6-6-6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 7 8.5 6.5L20.5 7" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M7.75 10.5v6M7.75 7.4v.1M11.5 16.5v-6m0 2.6c0-1.6 1-2.7 2.5-2.7s2.25 1 2.25 2.7v3.4" />
    </>
  ),
  github: (
    <path d="M9.5 19.5c-4 1.2-4-2-5.5-2.5m11 5v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.8 3.9 5.8 4.2 5.8 4.2a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 10.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
  ),
  download: <path d="M12 4v11m5-5-5 5-5-5M5 19.5h14" />,
  play: <path d="M7.5 5.5v13l11-6.5z" />,
  pause: <path d="M8 5.5v13M16 5.5v13" />,
  step: <path d="M6 5.5v13l9-6.5zM18 5.5v13" />,
  replay: <path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4.5v4h4" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  swap: <path d="M4 8h14m-4-4 4 4-4 4M20 16H6m4 4-4-4 4-4" />,
  key: (
    <>
      <circle cx="8" cy="15" r="3.5" />
      <path d="m10.5 12.5 8-8m-3 3 2.5 2.5M13 10l2 2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

/** The hand-drawn AN mark: the right leg of the A is the left stem of the N. */
export function Monogram({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 33 15.5 7 20 17.4" stroke="#d4af37" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M9.6 24h8" stroke="#d4af37" strokeWidth="2.4" strokeLinecap="square" />
      <path d="M20 33V7l16 26V7" stroke="#e9edf3" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/* ---------- Magnetic: the child leans toward the pointer ---------- */

export function Magnetic({
  children,
  strength = 0.26,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);
  const move = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}

/* ---------- Switch ---------- */

export function Switch({ on, onChange, label, className = '' }: { on: boolean; onChange: (v: boolean) => void; label: string; className?: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} className={`switch ${on ? 'is-on' : ''} ${className}`} onClick={() => onChange(!on)}>
      <span className="switch-track" aria-hidden="true">
        <motion.span className="switch-thumb" animate={{ x: on ? 20 : 0 }} transition={{ type: 'spring', ...spring.panel }} />
      </span>
      <span className="switch-label">{label}</span>
    </button>
  );
}

/* ---------- Segmented toggle (two or three options) ---------- */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  className = '',
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  label: string;
  className?: string;
}) {
  const group = useId();
  return (
    <div role="group" aria-label={label} className={`seg ${className}`}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} className={`seg-btn ${value === o.id ? 'is-on' : ''}`} onClick={() => onChange(o.id)}>
          {value === o.id && <motion.span layoutId={`seg-${group}`} className="seg-thumb" transition={{ type: 'spring', ...spring.panel }} />}
          <span className="seg-text">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Isometric parts ---------- */

type SlabProps = {
  iso: Iso;
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  id?: string;
  opacity?: number;
};

/** The key light is upper right, so every box throws a shadow down and to the left. Taller boxes throw longer ones. */
const castShadow = (iso: Iso, x: number, y: number, w: number, d: number, h: number) => {
  const k = 0.5 + h * 0.45;
  return iso.tile(x - 0.14 * k, y + 0.5 * k, w, d);
};

/** A box on the floor. Every colour is an attribute, so the SVG also works as a plain file. */
export function Slab({ iso, x, y, w, d, h, tone = 'stone', id, opacity = 1 }: SlabProps) {
  const b = iso.box(x, y, w, d, h);
  const t = TONES[tone];
  return (
    <g id={id} className="slab" opacity={opacity}>
      <path d={castShadow(iso, x, y, w, d, h)} fill="#000" fillOpacity="0.36" />
      <path d={b.left} fill={t.left} />
      <path d={b.right} fill={t.right} />
      <path d={b.top} fill={t.top} />
      <path d={b.rim} fill="none" stroke={t.rim} strokeOpacity={t.rimOpacity} strokeWidth="1" strokeLinejoin="round" />
    </g>
  );
}

/** A box whose faces glide to new shapes when its height or tone changes. */
export function LiveSlab({ iso, x, y, w, d, h, tone = 'stone', id }: SlabProps) {
  const b = iso.box(x, y, w, d, h);
  const t = TONES[tone];
  const tr = { type: 'spring' as const, ...spring.panel };
  return (
    <g id={id} className="slab">
      <motion.path initial={false} animate={{ d: castShadow(iso, x, y, w, d, h) }} fill="#000" fillOpacity="0.36" transition={tr} />
      <motion.path initial={false} animate={{ d: b.left, fill: t.left }} transition={tr} />
      <motion.path initial={false} animate={{ d: b.right, fill: t.right }} transition={tr} />
      <motion.path initial={false} animate={{ d: b.top, fill: t.top }} transition={tr} />
      <motion.path initial={false} animate={{ d: b.rim, stroke: t.rim }} fill="none" strokeOpacity={t.rimOpacity} strokeWidth="1" strokeLinejoin="round" transition={tr} />
    </g>
  );
}

/** The etched grid under a diagram. */
export function Floor({ iso, x0, x1, y0, y1, id = 'floor' }: { iso: Iso; x0: number; x1: number; y0: number; y1: number; id?: string }) {
  let d = '';
  for (let x = x0; x <= x1 + 0.001; x++) d += iso.rail([[x, y0], [x, y1]]);
  for (let y = y0; y <= y1 + 0.001; y++) d += iso.rail([[x0, y], [x1, y]]);
  return (
    <g id={id}>
      <path d={iso.tile(x0, y0, x1 - x0, y1 - y0)} fill="#0a0d14" />
      <path d={d} fill="none" stroke="#94a3b8" strokeOpacity="0.09" strokeWidth="1" />
    </g>
  );
}

/** A light rail on the floor. With `draw` it traces itself as the value goes 0 to 1. */
export function Conduit({
  id,
  d,
  draw,
  color = '#10b981',
  width = 2,
  dim = false,
}: {
  id?: string;
  d: string;
  draw?: MotionValue<number>;
  color?: string;
  width?: number;
  dim?: boolean;
}) {
  const common = { fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <g id={id} opacity={dim ? 0.35 : 1} style={{ transition: 'opacity .4s' }}>
      <path d={d} {...common} stroke="#94a3b8" strokeOpacity="0.16" strokeWidth={width} />
      {draw ? (
        <>
          <motion.path d={d} {...common} stroke={color} strokeOpacity="0.28" strokeWidth={width + 5} style={{ pathLength: draw }} />
          <motion.path d={d} {...common} stroke={color} strokeWidth={width} style={{ pathLength: draw }} />
        </>
      ) : (
        <>
          <path d={d} {...common} stroke={color} strokeOpacity="0.28" strokeWidth={width + 5} />
          <path d={d} {...common} stroke={color} strokeWidth={width} />
        </>
      )}
    </g>
  );
}

/** A label beside a point of a diagram. Negative `dy` puts it above the point, positive below. */
export function Tag({ at, title, sub, anchor = 'middle', dy = -16 }: { at: readonly [number, number]; title: string; sub?: string; anchor?: 'start' | 'middle' | 'end'; dy?: number }) {
  const [x, y] = at;
  const up = dy < 0;
  const titleY = up ? y + dy - 7 - (sub ? 18 : 0) : y + dy + 18;
  const text = { stroke: '#07090e', strokeWidth: 4, paintOrder: 'stroke' as const, strokeLinejoin: 'round' as const };
  return (
    <g fontFamily="Inter Variable, Inter, system-ui, sans-serif" textAnchor={anchor}>
      <path d={`M${x} ${y}V${y + dy}`} stroke="#94a3b8" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx={x} cy={y} r="2.5" fill="#cbd5e1" />
      <text x={x} y={titleY} fontSize="17" fontWeight="600" fill="#e9edf3" {...text}>
        {title}
      </text>
      {sub && (
        <text x={x} y={titleY + 18} fontSize="14.5" fill="#b6c2d3" {...text}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Holds a diagram. On a phone the diagram is wider than the screen, so this scrolls sideways and starts at the middle. */
export function Scroller({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.scrollWidth > el.clientWidth + 4) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);
  return (
    <div ref={ref} className="diagram-scroll">
      {children}
    </div>
  );
}

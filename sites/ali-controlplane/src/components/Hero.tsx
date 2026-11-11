/**
 * The first screen. A clean portrait with a glass lens parked on one shoulder:
 * through the lens the composite photo shows. The lens follows the pointer, and
 * the switch opens it over the whole portrait and lists the small Alis as processes.
 */
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, animate, motion, motionValue, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { offDuty, personas, site } from '../lib/content';
import { hotspot as hotspotV, leaderIn, spring, stackList, stackRow, swapBlock, tagIn, time } from '../lib/motion';
import { useMedia } from '../lib/scroll';
import { Icon, Magnetic, Switch } from './ui';
import Telemetry from './Telemetry';

type Corner = 'bl' | 'br' | 'l';
type Spot = { dot: [number, number]; path: [number, number][]; corner: Corner };

/**
 * Where each hotspot sits on the photo, the road its leader takes, and which corner
 * of the callout meets the end of the leader. All in percent of the photo. Each road
 * is drawn so it never crosses a small Ali's face.
 */
const SPOTS: Record<string, Spot> = {
  megaphone: {
    dot: [91.4, 31.2],
    path: [
      [95.6, 31.2],
      [95.6, 13.4],
    ],
    corner: 'br',
  },
  lightbulb: { dot: [68.6, 24.2], path: [[68.6, 18.2]], corner: 'bl' },
  laptop: {
    dot: [15.4, 40.4],
    path: [
      [11.4, 40.4],
      [11.4, 26.4],
    ],
    corner: 'bl',
  },
  clipboard: {
    dot: [90.6, 77.2],
    path: [
      [94.8, 77.2],
      [94.8, 60.4],
    ],
    corner: 'br',
  },
  ladder: {
    dot: [6.2, 64.4],
    path: [
      [2.8, 64.4],
      [2.8, 48.6],
    ],
    corner: 'bl',
  },
  watch: {
    dot: [28.4, 73.6],
    path: [
      [28.4, 85],
      [36.6, 85],
    ],
    corner: 'l',
  },
  shades: {
    dot: [61.2, 80.6],
    path: [
      [58, 80.6],
      [58, 63.4],
    ],
    corner: 'bl',
  },
  asleep: { dot: [31.4, 92.6], path: [[36.2, 92.6]], corner: 'l' },
};
/** Where the lens rests: over the two small Alis on his shoulder. */
const PARK = { x: 79.6, y: 31.5 };

const idleCopy: Record<string, { title: string; proof: string }> = {
  shades: { title: 'Off duty', proof: 'No KPI assigned.' },
  asleep: { title: 'Asleep', proof: 'The other six cover for him.' },
};

type Row = { id: string; title: string; proof: string; idle: boolean } & Spot;
const rows: Row[] = [
  ...personas.map((p) => ({ id: p.id, title: p.title, proof: p.proof, idle: false, ...SPOTS[p.id] })),
  ...offDuty.map((o) => ({ id: o.id, ...idleCopy[o.id], idle: true, ...SPOTS[o.id] })),
];
const running = rows.filter((r) => !r.idle).length;
const leaderD = (r: Row) => `M${r.dot[0]} ${r.dot[1]}${r.path.map(([x, y]) => `L${x} ${y}`).join('')}`;
const endOf = (r: Row) => r.path[r.path.length - 1];

function Portrait({ name, alt, eager, className }: { name: string; alt: string; eager?: boolean; className?: string }) {
  const sizes = '(min-width: 1024px) 62vw, 100vw';
  return (
    <picture>
      <source type="image/avif" srcSet={`/art/${name}-800.avif 800w, /art/${name}-1312.avif 1312w`} sizes={sizes} />
      <source type="image/webp" srcSet={`/art/${name}-800.webp 800w, /art/${name}-1312.webp 1312w`} sizes={sizes} />
      <img
        className={className}
        src={`/art/${name}-1312.webp`}
        width={1312}
        height={1199}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'low'}
        draggable={false}
      />
    </picture>
  );
}

function Hotspot({ row, index, active, mag, onPick }: { row: Row; index: number; active: boolean; mag: { x: MotionValue<number>; y: MotionValue<number> }; onPick: (id: string) => void }) {
  const x = useSpring(mag.x, spring.magnetic);
  const y = useSpring(mag.y, spring.magnetic);
  return (
    <motion.button
      type="button"
      className={`hotspot ${row.idle ? 'is-idle' : ''} ${active ? 'is-active' : ''}`}
      style={{ left: `${row.dot[0]}%`, top: `${row.dot[1]}%`, x, y }}
      variants={hotspotV}
      custom={index}
      initial="hidden"
      animate="shown"
      exit="hidden"
      aria-pressed={active}
      aria-label={`${row.id}: ${row.title}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onPick(row.id)}
      onFocus={() => onPick(row.id)}
      onClick={() => onPick(row.id)}
    >
      <span className="hotspot-ring" aria-hidden="true" />
      <span className="hotspot-dot" aria-hidden="true" />
    </motion.button>
  );
}

function StackTable({ active, onPick, shown }: { active: string | null; onPick: (id: string) => void; shown: boolean }) {
  const current = rows.find((r) => r.id === active);
  return (
    <motion.div className="stack" variants={stackList} initial={false} animate={shown ? 'shown' : 'hidden'}>
      <div className="stack-head">
        <h2 className="stack-title">Leadership stack</h2>
        <p className="stack-count">
          {rows.length} processes · {running} running
        </p>
      </div>
      <ul className="stack-rows">
        {rows.map((r) => (
          <motion.li key={r.id} variants={stackRow}>
            <button
              type="button"
              className={`stack-row ${active === r.id ? 'is-active' : ''} ${r.idle ? 'is-idle' : ''}`}
              aria-pressed={active === r.id}
              onPointerEnter={(e) => e.pointerType === 'mouse' && onPick(r.id)}
              onFocus={() => onPick(r.id)}
              onClick={() => onPick(r.id)}
            >
              <span className="stack-dot" aria-hidden="true" />
              <span className="stack-id">{r.id}</span>
              <span className="stack-name">{r.title}</span>
              <span className="stack-state">{r.idle ? 'idle' : 'running'}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <div className="stack-detail" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={current?.id ?? 'none'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={time.detail}>
            {current ? current.proof : 'Pick a process, or point at one of the small Alis.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const desk = useMedia('(min-width: 1024px)');
  const [inspect, setInspect] = useState(false);
  const [ready, setReady] = useState(false);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [clock, setClock] = useState('');
  const frame = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const px = useMotionValue(PARK.x);
  const py = useMotionValue(PARK.y);
  const radius = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${px}% ${py}%, #000 calc(100% - 1.5px), transparent 100%)`;
  const ringSize = useTransform(radius, (r) => r * 2);
  const ringLeft = useMotionTemplate`${px}%`;
  const ringTop = useMotionTemplate`${py}%`;
  const layerOpacity = useTransform(radius, (r) => (r < 1 ? 0 : 1));
  const mags = useMemo(() => rows.map(() => ({ x: motionValue(0), y: motionValue(0) })), []);

  // After the page settles, the lens opens on his shoulder. The composite is on
  // screen before the visitor does anything.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The lens: parked or following the pointer, or grown over the whole portrait.
  useEffect(() => {
    const el = frame.current;
    if (!el || !width) return;
    const open = Math.min(150, Math.max(62, width * 0.152));
    const target = inspect ? Math.hypot(width, el.clientHeight) * 1.7 : ready ? open : 0;
    const closing = wasOpen.current && !inspect;
    wasOpen.current = inspect;
    if (reduce) {
      radius.set(target);
      return;
    }
    const controls = animate(radius, target, inspect ? time.lensOpen : closing ? time.lensClose : { type: 'spring', ...spring.lens });
    return () => controls.stop();
  }, [inspect, ready, width, reduce, radius]);

  const park = () => {
    mags.forEach((m) => {
      m.x.set(0);
      m.y.set(0);
    });
    if (inspect) return;
    if (reduce) {
      px.set(PARK.x);
      py.set(PARK.y);
      return;
    }
    animate(px, PARK.x, { type: 'spring', ...spring.lens });
    animate(py, PARK.y, { type: 'spring', ...spring.lens });
  };

  // Show the first process once the stack is open, so the mechanism explains itself.
  useEffect(() => {
    if (!inspect) {
      setActive(null);
      px.set(PARK.x);
      py.set(PARK.y);
      return;
    }
    const t = window.setTimeout(() => setActive((a) => a ?? 'megaphone'), 950);
    return () => window.clearTimeout(t);
  }, [inspect, px, py]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setInspect(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Toronto time. A real reading, updated each second.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    const fx = e.clientX - r.left;
    const fy = e.clientY - r.top;
    if (!inspect) {
      px.set((fx / r.width) * 100);
      py.set((fy / r.height) * 100);
      return;
    }
    if (reduce) return;
    rows.forEach((row, i) => {
      const dx = fx - (row.dot[0] / 100) * r.width;
      const dy = fy - (row.dot[1] / 100) * r.height;
      const near = Math.hypot(dx, dy) < 70;
      mags[i].x.set(near ? dx * 0.32 : 0);
      mags[i].y.set(near ? dy * 0.32 : 0);
    });
  };

  return (
    <section id="top" className={`hero ${inspect ? 'is-inspect' : ''}`} aria-label="Introduction">
      <div className="hero-light" aria-hidden="true" />

      <p className="hero-status">
        <span className="status-dot" aria-hidden="true" />
        <span>Toronto</span>
        <time className="hero-clock" suppressHydrationWarning>
          {clock || '--:--:--'}
        </time>
        <span className="hero-open">Open to Director and VP of Product roles</span>
      </p>

      <div className="hero-copy">
        <div className="hero-swap">
          <motion.div className="hero-head" variants={swapBlock} initial={false} animate={inspect && desk ? 'hidden' : 'shown'}>
            <h1 className="hero-title">
              <span className="hero-name">Ali Nojoumi</span>
              <span className="hero-dash" aria-hidden="true">
                {' '}
                —{' '}
              </span>
              <span className="sr-only">: </span>
              {site.line}
            </h1>
            <p className="hero-role">Product leader for payments, digital asset platforms and applied AI systems. Fintech co-founder, based in Toronto.</p>
          </motion.div>

          <div className="hero-stack hero-stack-desk" inert={!inspect}>
            <motion.div variants={swapBlock} initial={false} animate={inspect ? 'shown' : 'hidden'}>
              <StackTable active={active} onPick={setActive} shown={inspect} />
            </motion.div>
          </div>
        </div>
        <div className="hero-actions">
          <Magnetic>
            <a className="btn btn-gold" href={`mailto:${site.email}`}>
              <Icon name="mail" />
              Email Ali
            </a>
          </Magnetic>
          <Switch on={inspect} onChange={setInspect} label="Inspect leadership stack" />
          <p className="hero-hint">The lens on his shoulder follows your pointer. The switch opens it all the way.</p>
        </div>
      </div>

      <div ref={frame} className="hero-frame" onPointerMove={onMove} onPointerLeave={park}>
        <div className="hero-bleed" aria-hidden="true">
          <span />
        </div>
        <div className="hero-photo">
          <Portrait name="ali" eager alt="Ali Nojoumi in a navy jacket, chin resting on his hand, a steel watch on his wrist." className="hero-img" />
          <motion.div className="hero-reveal" style={{ maskImage: mask, WebkitMaskImage: mask, opacity: layerOpacity }}>
            <Portrait
              name="ali-minis"
              alt="The same portrait with seven small copies of Ali at work on his shoulders and arms: one with a megaphone, one under a light bulb, one on a laptop, one with a clipboard, one on a ladder, one in sunglasses, one asleep."
              className="hero-img"
            />
          </motion.div>
        </div>

        <motion.div
          className="lens-ring"
          aria-hidden="true"
          style={{ left: ringLeft, top: ringTop, width: ringSize, height: ringSize }}
          animate={{ opacity: ready && !inspect ? 1 : 0 }}
          transition={time.ring}
        />

        <AnimatePresence>
          {inspect && (
            <motion.svg key="leaders" className="hero-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" exit={{ opacity: 0, transition: time.out }}>
              {rows.map((row, i) => (
                <motion.path
                  key={row.id}
                  id={`leader-${row.id}`}
                  className={active === row.id ? 'is-active' : ''}
                  d={leaderD(row)}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={leaderIn(i, !!reduce)}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
        <AnimatePresence>{inspect && rows.map((row, i) => <Hotspot key={row.id} row={row} index={i} active={active === row.id} mag={mags[i]} onPick={setActive} />)}</AnimatePresence>
        <AnimatePresence>
          {inspect &&
            rows.map((row, i) => (
              <motion.span
                key={`tag-${row.id}`}
                className={`hero-tag at-${row.corner} ${active === row.id ? 'is-active' : ''} ${row.idle ? 'is-idle' : ''}`}
                style={{ left: `${endOf(row)[0]}%`, top: `${endOf(row)[1]}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: tagIn(i) }}
                exit={{ opacity: 0, transition: time.out }}
                aria-hidden="true"
              >
                <span className="tag-id">{row.id}</span>
                <span className="tag-title">{row.title}</span>
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {inspect && (
          <motion.div className="hero-stack hero-stack-phone" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={time.swap}>
            <StackTable active={active} onPick={setActive} shown />
          </motion.div>
        )}
      </AnimatePresence>

      <noscript>
        <div className="hero-noscript">
          <h2>Leadership stack</h2>
          <ul>
            {rows.map((r) => (
              <li key={r.id}>
                <strong>{r.title}.</strong> {r.proof}
              </li>
            ))}
          </ul>
        </div>
      </noscript>

      <Telemetry />
    </section>
  );
}

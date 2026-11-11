import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { offDuty, personas, site } from '../lib/content';
import { SPRING, VARIANTS } from '../lib/motion';
import { Arrow, ArrowDown, Magnetic, Pic, TorontoTime, reduced } from './ui';

/** Which bezel edge the gold line leaves from, so it never crosses the face. */
const EXIT: Record<string, 'top' | 'right' | 'bottom' | 'left'> = {
  megaphone: 'right',
  lightbulb: 'top',
  laptop: 'left',
  clipboard: 'right',
  ladder: 'left',
  watch: 'bottom',
};

const PAD = 16; // the track sits this far outside the bezel
const SAMPLES = 280;

export function Hero() {
  const [inspect, setInspect] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0, r: 0 });
  const [sec, setSec] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGRectElement>(null);
  const leaderRef = useRef<SVGPathElement>(null);
  const hovering = useRef(false);
  const inspectRef = useRef(false);

  /* ----- the loupe ----- */
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const sx = useSpring(lx, SPRING.loupe);
  const sy = useSpring(ly, SPRING.loupe);
  const r = useSpring(0, SPRING.iris);
  const mask = useMotionTemplate`radial-gradient(circle ${r}px at ${sx}px ${sy}px, #000 0, #000 calc(100% - 1.5px), transparent 100%)`;
  const lensR = () => Math.max(84, (photoRef.current?.clientWidth ?? 700) * 0.15);
  const ringSize = useTransform(r, (v) => Math.min(v, lensR()) * 2);
  const ringOpacity = useTransform(r, (v) => {
    const l = lensR();
    return v <= l * 1.05 ? Math.min(1, v / (l * 0.5)) : Math.max(0, 1 - (v - l) / (l * 0.6));
  });

  const setRadius = useCallback(
    (to: number) => {
      if (reduced()) r.jump(to);
      else r.set(to);
    },
    [r],
  );

  const open = useCallback(
    (on: boolean) => {
      inspectRef.current = on;
      setInspect(on);
      const el = photoRef.current;
      if (!el) return;
      if (on) {
        if (!hovering.current) {
          sx.jump(el.clientWidth / 2);
          sy.jump(el.clientHeight / 2);
          lx.jump(el.clientWidth / 2);
          ly.jump(el.clientHeight / 2);
        }
        setRadius(Math.hypot(el.clientWidth, el.clientHeight) * 1.05);
        window.setTimeout(() => inspectRef.current && setActive((a) => a ?? personas[0].id), reduced() ? 0 : 520);
      } else {
        setRadius(hovering.current ? lensR() : 0);
        setActive(null);
      }
    },
    [lx, ly, sx, sy, setRadius],
  );

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    const b = photoRef.current!.getBoundingClientRect();
    hovering.current = true;
    if (inspectRef.current) return;
    lx.jump(e.clientX - b.left);
    ly.jump(e.clientY - b.top);
    sx.jump(e.clientX - b.left);
    sy.jump(e.clientY - b.top);
    setRadius(lensR());
  };
  const move = (e: React.PointerEvent) => {
    if (inspectRef.current || !hovering.current) return;
    const b = photoRef.current!.getBoundingClientRect();
    lx.set(e.clientX - b.left);
    ly.set(e.clientY - b.top);
  };
  const leave = () => {
    hovering.current = false;
    if (!inspectRef.current) setRadius(0);
  };

  /* ----- sizes, clock ----- */
  useEffect(() => {
    setMounted(true);
    setSec(new Date().getSeconds() + new Date().getMilliseconds() / 1000);
    const el = bezelRef.current!;
    const ro = new ResizeObserver(() => {
      const cs = getComputedStyle(el);
      setBox({ w: el.offsetWidth, h: el.offsetHeight, r: parseFloat(cs.borderTopLeftRadius) || 0 });
      if (inspectRef.current && photoRef.current) {
        r.jump(Math.hypot(photoRef.current.clientWidth, photoRef.current.clientHeight) * 1.05);
      }
    });
    ro.observe(el);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && inspectRef.current && open(false);
    window.addEventListener('keydown', esc);
    return () => {
      ro.disconnect();
      window.removeEventListener('keydown', esc);
    };
  }, [open, r]);

  /* ----- the gold line: row, along the bezel track, to the small Ali ----- */
  useEffect(() => {
    if (!inspect || !active) return;
    let raf = 0;
    let frames = 0;
    const draw = () => {
      const hero = heroRef.current;
      const track = trackRef.current;
      const path = leaderRef.current;
      const hot = hero?.querySelector<HTMLElement>(`[data-hot="${active}"]`);
      const row = hero?.querySelector<HTMLElement>(`[data-row="${active}"] .stack-row`);
      if (!hero || !track || !path || !hot || !row) return;
      const H = hero.getBoundingClientRect();
      const T = track.ownerSVGElement!.getBoundingClientRect();
      const a = hot.getBoundingClientRect();
      const b = row.getBoundingClientRect();
      const ox = T.left - H.left;
      const oy = T.top - H.top;
      const hx = a.left + a.width / 2 - H.left;
      const hy = a.top + a.height / 2 - H.top;

      // where the line starts: the side of the row that faces the watch
      const side = b.right <= T.left + 8;
      const start = side
        ? { x: b.right - H.left + 10, y: b.top + b.height / 2 - H.top }
        : { x: Math.max(5, b.left - H.left - 9), y: b.top + b.height / 2 - H.top };

      const total = track.getTotalLength();
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < SAMPLES; i++) {
        const p = track.getPointAtLength((i / SAMPLES) * total);
        pts.push({ x: p.x + ox, y: p.y + oy });
      }
      const nearest = (x: number, y: number) => {
        let best = 0;
        let d = Infinity;
        pts.forEach((p, i) => {
          const q = (p.x - x) ** 2 + (p.y - y) ** 2;
          if (q < d) {
            d = q;
            best = i;
          }
        });
        return best;
      };
      const far = 4000;
      const edge = EXIT[active] ?? 'left';
      const out =
        edge === 'top' ? { x: hx, y: hy - far } : edge === 'bottom' ? { x: hx, y: hy + far } : edge === 'left' ? { x: hx - far, y: hy } : { x: hx + far, y: hy };
      // stacked layout: the row is under the watch, so rise straight up the page gutter first
      const i0 = side ? nearest(start.x, start.y) : nearest(start.x, T.bottom - H.top);
      const i1 = nearest(out.x, out.y);
      const fwd = (i1 - i0 + SAMPLES) % SAMPLES;
      const dir = fwd <= SAMPLES / 2 ? 1 : -1;
      const steps = dir === 1 ? fwd : SAMPLES - fwd;
      let d = side
        ? `M${start.x.toFixed(1)} ${start.y.toFixed(1)}`
        : `M${(b.left - H.left - 1).toFixed(1)} ${start.y.toFixed(1)}L${start.x.toFixed(1)} ${start.y.toFixed(1)}L${start.x.toFixed(1)} ${pts[i0].y.toFixed(1)}`;
      for (let k = 0; k <= steps; k++) {
        const p = pts[(i0 + dir * k + SAMPLES * 2) % SAMPLES];
        d += `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      }
      d += `L${hx.toFixed(1)} ${hy.toFixed(1)}`;
      path.setAttribute('d', d);
    };
    // rows move while one closes and one opens, so follow them for a moment
    const loop = () => {
      draw();
      if (frames++ < 48) raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('resize', draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', draw);
    };
  }, [active, inspect, box]);

  /* ----- track geometry ----- */
  const tw = box.w + PAD * 2;
  const th = box.h + PAD * 2;
  const tr = box.r + PAD;
  const per = 2 * (tw - 2 * tr) + 2 * (th - 2 * tr) + 2 * Math.PI * tr;
  const noon = per > 0 ? ((tw / 2 - tr) / per) * 240 : 0;

  return (
    <section className="hero" id="top" ref={heroRef} data-inspect={inspect}>
      <div className="hero-copy">
        <h1 className="hero-name" data-hero="name">
          <span>Ali</span> <span>Nojoumi</span>
        </h1>
        <p className="hero-line" data-hero="lead">
          {site.line}
        </p>

        <div className="fold fold-default" inert={mounted && inspect}>
          <div>
            <p className="hero-role" data-hero="item">
              Product leader for payments, digital asset platforms and applied AI systems. Fintech co-founder, based in Toronto.
            </p>
            <div className="hero-actions" data-hero="item">
              <Magnetic>
                <a className="btn btn-gold" href={`mailto:${site.email}`}>
                  Email Ali <Arrow />
                </a>
              </Magnetic>
              <a className="btn btn-steel" href="#work">
                See the work <ArrowDown />
              </a>
            </div>
            <p className="hero-hint" data-hero="item">
              <span className="hint-fine">Move the loupe over the portrait, or flip the switch on it.</span>
              <span className="hint-coarse">Flip the switch by the portrait to meet the team.</span>
            </p>
          </div>
        </div>

        <div className="fold fold-stack" inert={mounted && !inspect}>
          <div>
            <p className="hero-hint">Seven small Alis do the work. Pick one.</p>
            <ol className="stack" aria-label="Leadership stack">
              {personas.map((p) => (
                <li key={p.id} data-row={p.id} data-active={active === p.id}>
                  <button
                    type="button"
                    className="stack-row"
                    aria-expanded={active === p.id}
                    onClick={() => setActive(p.id)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                  >
                    <span className="stack-prop">{p.prop}</span>
                    <span className="stack-title">{p.title}</span>
                  </button>
                  <div className="stack-more">
                    <p>{p.proof}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="hero-watch" data-hero="portrait">
        <div className="bezel" ref={bezelRef}>
          {box.w > 0 && (
            <svg className="track" width={tw} height={th} viewBox={`0 0 ${tw} ${th}`} style={{ left: -PAD, top: -PAD, '--noon': -noon } as CSSProperties} aria-hidden="true">
              <rect id="track-minutes" className="track-min" x="1" y="1" width={tw - 2} height={th - 2} rx={tr} pathLength={240} />
              <rect id="track-hours" className="track-hr" x="1" y="1" width={tw - 2} height={th - 2} rx={tr} pathLength={240} />
              <rect
                id="track-seconds"
                className="track-sec"
                ref={trackRef}
                x="1"
                y="1"
                width={tw - 2}
                height={th - 2}
                rx={tr}
                pathLength={240}
                style={{ animationDelay: `${-sec}s` }}
              />
            </svg>
          )}
          <div
            className="photo"
            ref={photoRef}
            onPointerEnter={enter}
            onPointerMove={move}
            onPointerLeave={leave}
            onClick={(e) => {
              if (!inspect && !(e.target as HTMLElement).closest('button')) open(true);
            }}
          >
            <Pic
              name="ali"
              widths={[800, 1312]}
              sizes="(min-width: 1000px) 58vw, 94vw"
              w={1312}
              h={1199}
              eager
              priority="high"
              alt="Studio portrait of Ali Nojoumi in a navy jacket, chin resting on his hand, a steel sports watch on his wrist."
            />
            <motion.div className="photo-reveal" style={{ maskImage: mask, WebkitMaskImage: mask }}>
              <Pic
                name="ali-minis"
                widths={[800, 1312]}
                sizes="(min-width: 1000px) 58vw, 94vw"
                w={1312}
                h={1199}
                eager
                priority="low"
                alt={
                  inspect
                    ? 'The same portrait with seven small copies of Ali at work on his shoulders and arms: one with a megaphone, one under a light bulb, one on a laptop, one on a ladder, one with a clipboard, one in sunglasses, one asleep.'
                    : ''
                }
              />
            </motion.div>
            <motion.div className="loupe" style={{ x: sx, y: sy, width: ringSize, height: ringSize, opacity: ringOpacity }} aria-hidden="true" />

            {personas.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="hotspot"
                data-hot={p.id}
                data-active={active === p.id}
                style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': i } as CSSProperties}
                tabIndex={inspect ? 0 : -1}
                aria-hidden={!inspect}
                aria-label={`${p.prop}: ${p.title}`}
                onClick={() => setActive(p.id)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && inspect && setActive(p.id)}
                onFocus={() => inspect && setActive(p.id)}
              >
                <span className="hotspot-ring" />
                <span className="hotspot-core" />
              </button>
            ))}
            {offDuty.map((o, i) => (
              <button
                key={o.id}
                type="button"
                className="hotspot hotspot-idle"
                data-tip={o.x < 35 ? 'start' : 'mid'}
                style={{ left: `${o.x}%`, top: `${o.y}%`, '--i': personas.length + i } as CSSProperties}
                tabIndex={inspect ? 0 : -1}
                aria-hidden={!inspect}
                aria-label={o.label}
              >
                <span className="hotspot-core" />
                <span className="hotspot-tip" aria-hidden="true">
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-switch">
          <button type="button" role="switch" aria-checked={inspect} className="switch" onClick={() => open(!inspect)}>
            <span className="switch-track" aria-hidden="true">
              <span className="switch-thumb" />
            </span>
            <span className="switch-label">Inspect leadership stack</span>
          </button>
        </div>
      </div>

      <svg className="leader" aria-hidden="true">
        <AnimatePresence>
          {inspect && active && (
            <motion.path
              key={active}
              ref={leaderRef}
              id="leader-line"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              variants={VARIANTS.leader}
              initial={reduced() ? 'animate' : 'initial'}
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </svg>

      <div className="hero-foot" data-hero="item">
        <p className="hero-clock">
          <span className="live-dot" aria-hidden="true" />
          <span>Toronto</span>
          <TorontoTime />
        </p>
        <span className="hero-ticks" aria-hidden="true" />
        <a className="hero-cue" href="#figures">
          Open the case back <ArrowDown />
        </a>
      </div>
    </section>
  );
}

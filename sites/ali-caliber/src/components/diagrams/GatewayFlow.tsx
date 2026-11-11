import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'motion/react';
import { pontemesto } from '../../lib/content';
import { VARIANTS } from '../../lib/motion';
import { reduced } from '../ui';

type NodeId = keyof typeof pontemesto.nodes;

const NODES: { id: NodeId; x: number; y: number; r: number; label: [number, number] }[] = [
  { id: 'merchant', x: 70, y: 200, r: 20, label: [70, 246] },
  { id: 'onboarding', x: 215, y: 200, r: 20, label: [215, 246] },
  { id: 'gateway', x: 390, y: 200, r: 34, label: [390, 262] },
  { id: 'exchange', x: 560, y: 92, r: 20, label: [560, 54] },
  { id: 'liquidity', x: 560, y: 308, r: 20, label: [560, 354] },
  { id: 'settlement', x: 700, y: 200, r: 20, label: [700, 246] },
];

const CONDUITS = [
  { id: 'conduit-merchant-onboarding', d: 'M90 200H195' },
  { id: 'conduit-onboarding-gateway', d: 'M235 200H356' },
  { id: 'conduit-gateway-exchange', d: 'M421 186C470 170 490 92 540 92' },
  { id: 'conduit-gateway-liquidity', d: 'M421 214C470 230 490 308 540 308' },
  { id: 'conduit-exchange-settlement', d: 'M580 92C640 92 650 170 685 187' },
  { id: 'conduit-liquidity-settlement', d: 'M580 308C640 308 650 230 685 213' },
];

const ROUTES = {
  exchange: 'M70 200H390C470 170 490 92 560 92C640 92 650 170 700 200',
  liquidity: 'M70 200H390C470 230 490 308 560 308C640 308 650 230 700 200',
};

/**
 * The gateway diagram as plain layered SVG. Every part has a named id, so the
 * file at /exports/gateway-routing.svg can go straight into a motion tool.
 */
export function GatewaySvg({
  selected,
  lit,
  onSelect,
  pulseRef,
}: {
  selected?: NodeId;
  lit?: Set<string>;
  onSelect?: (id: NodeId) => void;
  pulseRef?: React.Ref<SVGCircleElement>;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="flow-svg"
      viewBox="0 0 760 400"
      role={onSelect ? 'group' : 'img'}
      aria-label="Payment route: merchant, onboarding, gateway API, then an exchange or a liquidity provider, then settlement."
    >
      <defs>
        <linearGradient id="gw-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cbd5e1" />
          <stop offset="0.45" stopColor="#64748b" />
          <stop offset="1" stopColor="#1e2633" />
        </linearGradient>
        <radialGradient id="gw-glass" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#3b4656" />
          <stop offset="1" stopColor="#0b0f16" />
        </radialGradient>
      </defs>

      <g id="layer-conduits" fill="none" strokeLinecap="round">
        {CONDUITS.map((c, i) => (
          <path key={c.id} id={c.id} d={c.d} stroke="#3a4657" strokeWidth="2" pathLength={1} className="flow-conduit" style={{ ['--d' as string]: i }} />
        ))}
      </g>
      <g id="layer-flow" fill="none" strokeLinecap="round">
        {CONDUITS.map((c, i) => (
          <path key={c.id} id={`${c.id}-flow`} d={c.d} stroke="#10b981" strokeWidth="2" strokeDasharray="3 15" className="flow-dash" style={{ ['--d' as string]: i }} />
        ))}
      </g>
      <g id="layer-routes" fill="none" stroke="none">
        <path id="route-exchange" d={ROUTES.exchange} />
        <path id="route-liquidity" d={ROUTES.liquidity} />
      </g>

      <g id="layer-nodes">
        {NODES.map((n) => {
          const on = selected === n.id;
          const hot = lit?.has(n.id);
          const label = pontemesto.nodes[n.id].label;
          return (
            <g
              key={n.id}
              id={`node-${n.id}`}
              className="flow-node"
              data-on={on || undefined}
              data-lit={hot || undefined}
              {...(onSelect
                ? {
                    role: 'button',
                    tabIndex: 0,
                    'aria-pressed': on,
                    'aria-label': label,
                    onClick: () => onSelect(n.id),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(n.id);
                      }
                    },
                  }
                : {})}
            >
              <circle className="flow-halo" cx={n.x} cy={n.y} r={n.r + 9} fill="none" stroke={on ? '#d4af37' : '#94a3b8'} strokeOpacity={on ? 0.9 : 0.22} strokeWidth="1" strokeDasharray="1 5" />
              <circle cx={n.x} cy={n.y} r={n.r} fill="url(#gw-steel)" />
              <circle className="flow-face" cx={n.x} cy={n.y} r={n.r - 5} fill="url(#gw-glass)" stroke={hot ? '#10b981' : '#0b0f16'} strokeWidth="1.5" />
              {n.id === 'gateway' && <circle cx={n.x} cy={n.y} r={n.r - 14} fill="none" stroke="#d4af37" strokeWidth="1.5" />}
              <circle className="flow-pip" cx={n.x} cy={n.y} r="3" fill={hot ? '#10b981' : on ? '#d4af37' : '#94a3b8'} />
            </g>
          );
        })}
      </g>

      <g id="layer-labels" fontFamily="'Inter Variable', Inter, system-ui, sans-serif" fontSize="13" fontWeight="500" textAnchor="middle" fill="#cbd5e1">
        {NODES.map((n) => (
          <text key={n.id} id={`label-${n.id}`} x={n.label[0]} y={n.label[1]} fill={selected === n.id ? '#f0d77a' : '#cbd5e1'}>
            {pontemesto.nodes[n.id].label}
          </text>
        ))}
      </g>

      <g id="layer-pulse">
        <circle id="pulse" ref={pulseRef} r="6" fill="#d4af37" opacity="0" />
      </g>
    </svg>
  );
}

type Line = { key: number; time: string; event: string; note: string };

const clock = () => {
  const d = new Date();
  const p = (n: number, l = 2) => String(n).padStart(l, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
};

export function GatewayFlow() {
  const [selected, setSelected] = useState<NodeId>('gateway');
  const [lit, setLit] = useState<Set<string>>(new Set());
  const [log, setLog] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const pulse = useRef<SVGCircleElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const key = useRef(0);
  const stop = useRef<(() => void) | null>(null);

  useEffect(() => () => stop.current?.(), []);

  const run = () => {
    if (running) return;
    const via: 'exchange' | 'liquidity' = count % 2 === 0 ? 'liquidity' : 'exchange';
    const path = wrap.current?.querySelector<SVGPathElement>(`#route-${via}`);
    const dot = pulse.current;
    if (!path || !dot) return;
    const total = path.getTotalLength();
    const seen = new Set<string>();
    const order: { id: NodeId; event: string; note: string }[] = [
      { id: 'merchant', event: 'payment.created', note: 'merchant sends a payment' },
      { id: 'onboarding', event: 'merchant.verified', note: 'onboarding requirements met' },
      { id: 'gateway', event: 'route.selected', note: via === 'exchange' ? 'via exchange API' : 'via liquidity provider API' },
      { id: via, event: 'quote.accepted', note: via === 'exchange' ? 'exchange fills the order' : 'liquidity provider fills the order' },
      { id: 'settlement', event: 'payment.settled', note: 'processing partner settles' },
    ];
    const at = (id: NodeId) => NODES.find((n) => n.id === id)!;

    setRunning(true);
    setLit(new Set());
    setLog([]);
    dot.setAttribute('opacity', '1');

    const step = (v: number) => {
      const p = path.getPointAtLength(v * total);
      dot.setAttribute('cx', p.x.toFixed(1));
      dot.setAttribute('cy', p.y.toFixed(1));
      for (const o of order) {
        const n = at(o.id);
        if (!seen.has(o.id) && Math.hypot(p.x - n.x, p.y - n.y) < 7) {
          seen.add(o.id);
          setLit(new Set(seen));
          setSelected(o.id);
          setLog((l) => [...l, { key: key.current++, time: clock(), event: o.event, note: o.note }].slice(-5));
        }
      }
    };
    const done = () => {
      dot.setAttribute('opacity', '0');
      setRunning(false);
      setCount((c) => c + 1);
    };

    if (reduced()) {
      // no travel: land on each node in turn
      [0, 0.19, 0.42, 0.72, 1].forEach((v) => step(v));
      done();
      return;
    }
    const ctl = animate(0, 1, { duration: 3, ease: 'linear', onUpdate: step, onComplete: done });
    stop.current = () => ctl.stop();
  };

  const node = pontemesto.nodes[selected];

  return (
    <div className="diagram diagram-flow" ref={wrap}>
      <GatewaySvg selected={selected} lit={lit} onSelect={setSelected} pulseRef={pulse} />
      <div className="diagram-side">
        <div className="readout" aria-live="polite">
          <h4>{node.label}</h4>
          <p>{node.text}</p>
        </div>
        <div className="console">
          <div className="console-head">
            <button type="button" className="btn btn-emerald btn-sm" onClick={run} disabled={running}>
              {running ? 'Routing' : count ? 'Route another payment' : 'Route a test payment'}
            </button>
            <p className="demo-note">Simplified model. Event names are examples, not the production API.</p>
          </div>
          <ol className="log" aria-live="polite" aria-label="Events from the test payment">
            <AnimatePresence initial={false}>
              {log.map((l) => (
                <motion.li key={l.key} variants={VARIANTS.logLine} initial="initial" animate="animate" exit="exit">
                  <time>{l.time}</time>
                  <b>{l.event}</b>
                  <span>{l.note}</span>
                </motion.li>
              ))}
            </AnimatePresence>
            {log.length === 0 && <li className="log-empty">No events yet. Route a payment, or select a node.</li>}
          </ol>
        </div>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { digest, mulberry32 } from '../../lib/prng';
import { Pause, Play, Replay, Seg, StepIcon, reduced } from '../ui';

type Kind = 'household' | 'business' | 'bank';
type Agent = { id: string; kind: Kind; x: number; y: number; bal: number };
type Rate = 'low' | 'high';
type Entry = { t: number; what: string; from: string; to: string; amount: number; ok: boolean };
type World = { t: number; agents: Agent[]; ledger: Entry[]; debits: number; credits: number; rejected: number };

const SEED = 1998;

const start = (): Agent[] => [
  ...Array.from({ length: 6 }, (_, i) => ({ id: `H${i + 1}`, kind: 'household' as Kind, x: 44, y: 34 + i * 38, bal: 120 })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: `B${i + 1}`, kind: 'business' as Kind, x: 240, y: 62 + i * 76, bal: 420 })),
  { id: 'BANK', kind: 'bank' as Kind, x: 436, y: 138, bal: 1500 },
];

const fresh = (): World => ({ t: 0, agents: start(), ledger: [], debits: 0, credits: 0, rejected: 0 });

/** One step of the toy economy. Same random source and same rates give the same world. */
function tick(w: World, rnd: () => number, rate: Rate): World {
  const hs = w.agents.filter((a) => a.kind === 'household');
  const bs = w.agents.filter((a) => a.kind === 'business');
  const bank = w.agents.find((a) => a.kind === 'bank')!;
  const pick = <T,>(list: T[]) => list[Math.floor(rnd() * list.length)];
  const between = (lo: number, hi: number) => Math.round(lo + rnd() * (hi - lo));
  const buy = rate === 'low' ? 0.4 : 0.24;
  const roll = rnd();

  let what: string;
  let from: Agent;
  let to: Agent;
  let amount: number;
  if (roll < 0.3) {
    what = 'wage';
    from = pick(bs);
    to = pick(hs);
    amount = between(22, 44);
  } else if (roll < 0.3 + buy) {
    what = 'purchase';
    from = pick(hs);
    to = pick(bs);
    amount = rate === 'low' ? between(18, 70) : between(12, 46);
  } else if (roll < 0.86) {
    what = 'loan interest';
    from = pick(bs);
    to = bank;
    amount = rate === 'low' ? between(10, 22) : between(38, 74);
  } else {
    what = 'deposit interest';
    from = bank;
    to = pick(hs);
    amount = rate === 'low' ? between(2, 6) : between(8, 16);
  }

  const ok = from.bal >= amount;
  const agents = ok
    ? w.agents.map((a) => (a.id === from.id ? { ...a, bal: a.bal - amount } : a.id === to.id ? { ...a, bal: a.bal + amount } : a))
    : w.agents;
  const t = w.t + 1;
  return {
    t,
    agents,
    ledger: [{ t, what, from: from.id, to: to.id, amount, ok }, ...w.ledger].slice(0, 5),
    debits: w.debits + (ok ? amount : 0),
    credits: w.credits + (ok ? amount : 0),
    rejected: w.rejected + (ok ? 0 : 1),
  };
}

const hashOf = (w: World) => digest(`${w.t}|${w.agents.map((a) => a.bal).join(',')}`);
const money = (n: number) => n.toFixed(2);

export function Manyworld() {
  const [world, setWorld] = useState<World>(fresh);
  const [rate, setRate] = useState<Rate>('low');
  const [running, setRunning] = useState(false);
  const [proof, setProof] = useState<{ run: string; replay: string; ticks: number } | null>(null);
  const [busy, setBusy] = useState(false);

  const rnd = useRef(mulberry32(SEED));
  const history = useRef<Rate[]>([]);
  const worldRef = useRef(world);
  const rateRef = useRef(rate);
  const auto = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: '-20% 0px -20% 0px' });
  worldRef.current = world;
  rateRef.current = rate;

  const step = useCallback(() => {
    history.current.push(rateRef.current);
    const next = tick(worldRef.current, rnd.current, rateRef.current);
    worldRef.current = next;
    setWorld(next);
    setProof(null);
  }, []);

  // starts by itself the first time it is seen, then stops after a short run
  useEffect(() => {
    if (inView && !auto.current && !reduced()) {
      auto.current = true;
      setRunning(true);
    }
    if (!inView) setRunning(false);
  }, [inView]);

  useEffect(() => {
    if (!running || busy) return;
    const id = window.setInterval(() => {
      step();
      if (worldRef.current.t >= 48 && worldRef.current.t % 48 === 0) setRunning(false);
    }, 620);
    return () => window.clearInterval(id);
  }, [running, busy, step]);

  const replay = () => {
    if (busy || history.current.length === 0) return;
    const rates = [...history.current];
    const runHash = hashOf(worldRef.current);
    setRunning(false);
    setBusy(true);
    const r = mulberry32(SEED);
    let w = fresh();
    let i = 0;
    const finish = () => {
      rnd.current = r;
      worldRef.current = w;
      setWorld(w);
      setProof({ run: runHash, replay: hashOf(w), ticks: rates.length });
      setBusy(false);
    };
    if (reduced()) {
      for (const rt of rates) w = tick(w, r, rt);
      finish();
      return;
    }
    setWorld(w);
    const per = Math.max(1, Math.ceil(rates.length / 40));
    const id = window.setInterval(() => {
      for (let k = 0; k < per && i < rates.length; k++, i++) w = tick(w, r, rates[i]);
      setWorld(w);
      if (i >= rates.length) {
        window.clearInterval(id);
        finish();
      }
    }, 45);
  };

  const last = world.ledger[0];
  const at = (id: string) => world.agents.find((a) => a.id === id)!;
  const total = world.agents.reduce((s, a) => s + a.bal, 0);

  return (
    <div className="mw" ref={root}>
      <div className="mw-stage">
        <p className="mw-cols" aria-hidden="true">
          <span>Households</span>
          <span>Businesses</span>
          <span>Bank</span>
        </p>
        <svg viewBox="0 14 480 266" role="img" aria-label={`Toy economy at step ${world.t}: six households, three businesses and one bank exchange payments.`}>
          {last && (
            <line
              key={world.t}
              className="mw-flash"
              data-ok={last.ok}
              x1={at(last.from).x}
              y1={at(last.from).y}
              x2={at(last.to).x}
              y2={at(last.to).y}
              stroke={last.ok ? '#38bdf8' : '#d4af37'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={last.ok ? undefined : '3 6'}
            />
          )}
          <g id="mw-agents">
            {world.agents.map((a) => {
              const hot = last && (last.from === a.id || last.to === a.id);
              const size = a.kind === 'bank' ? 26 : a.kind === 'business' ? 18 : 11;
              return (
                <g key={a.id} className="mw-agent" data-hot={hot || undefined}>
                  {a.kind === 'household' && <path d={`M${a.x - size} ${a.y + size - 2}V${a.y - 2}L${a.x} ${a.y - size}L${a.x + size} ${a.y - 2}V${a.y + size - 2}Z`} />}
                  {a.kind === 'business' && <rect x={a.x - size} y={a.y - size} width={size * 2} height={size * 2} rx="3" />}
                  {a.kind === 'bank' && (
                    <path d={`M${a.x - size} ${a.y + size}V${a.y - 8}L${a.x} ${a.y - size}L${a.x + size} ${a.y - 8}V${a.y + size}ZM${a.x - 12} ${a.y - 2}V${a.y + size - 6}M${a.x} ${a.y - 2}V${a.y + size - 6}M${a.x + 12} ${a.y - 2}V${a.y + size - 6}`} />
                  )}
                  <text
                    x={a.kind === 'household' ? a.x + 20 : a.x}
                    y={a.kind === 'household' ? a.y + 6 : a.y + size + 16}
                    textAnchor={a.kind === 'household' ? 'start' : 'middle'}
                  >
                    {a.bal}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mw-side">
        <div className="mw-controls">
          <button type="button" className="btn btn-steel btn-sm" onClick={() => setRunning((r) => !r)} disabled={busy}>
            {running ? <Pause /> : <Play />}
            {running ? 'Pause' : 'Run'}
          </button>
          <button type="button" className="btn btn-steel btn-sm" onClick={step} disabled={busy || running}>
            <StepIcon />
            Step
          </button>
          <button type="button" className="btn btn-steel btn-sm" onClick={replay} disabled={busy || world.t === 0}>
            <Replay />
            Replay
          </button>
          <Seg
            id="mw-rate"
            label="Interest rate"
            value={rate}
            onChange={setRate}
            options={[
              { id: 'low', label: 'Low rates' },
              { id: 'high', label: 'High rates' },
            ]}
          />
        </div>

        <div className="ledger-wrap">
        <table className="ledger">
          <caption className="sr-only">The last five ledger entries</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Entry</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Amount</th>
              <th scope="col">Check</th>
            </tr>
          </thead>
          <tbody>
            {world.ledger.length === 0 && (
              <tr className="ledger-empty">
                <td colSpan={6}>No entries yet. Run it, or take one step.</td>
              </tr>
            )}
            {world.ledger.map((e) => (
              <tr key={e.t} data-ok={e.ok}>
                <td>{String(e.t).padStart(3, '0')}</td>
                <td>{e.what}</td>
                <td>{e.to}</td>
                <td>{e.from}</td>
                <td>{money(e.amount)}</td>
                <td>{e.ok ? 'valid' : 'rejected'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <dl className="mw-stats">
          <div>
            <dt>Debits</dt>
            <dd>{money(world.debits)}</dd>
          </div>
          <div>
            <dt>Credits</dt>
            <dd>{money(world.credits)}</dd>
          </div>
          <div>
            <dt>Money in the system</dt>
            <dd>{money(total)}</dd>
          </div>
          <div>
            <dt>Rejected</dt>
            <dd>{world.rejected}</dd>
          </div>
        </dl>

        <p className="mw-proof" aria-live="polite" data-ok={proof ? proof.run === proof.replay : undefined}>
          {proof
            ? `Replayed ${proof.ticks} steps. Run ${proof.run}, replay ${proof.replay}. ${proof.run === proof.replay ? 'They match.' : 'They differ.'}`
            : world.t === 0
              ? 'Every payment is checked against the payer’s balance, then posted as one debit and one credit.'
              : `State ${hashOf(world)} at step ${world.t}. Replay runs the same steps again from the same seed.`}
        </p>
        <p className="demo-note">A toy model that runs in your browser. The real engine is in the repository.</p>
      </div>
    </div>
  );
}

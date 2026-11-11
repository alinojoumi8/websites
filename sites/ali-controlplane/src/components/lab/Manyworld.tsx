/**
 * Manyworld, in miniature. Six agents trade. Every transaction is validated,
 * booked twice, and the whole run can be replayed to the same digest.
 * A toy written for this page, not the real engine.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { isoSpace, type Tone } from '../../lib/iso';
import { digest, mulberry32 } from '../../lib/prng';
import { Conduit, Floor, Icon, LiveSlab, Scroller } from '../ui';

type Agent = { id: string; kind: 'household' | 'business' | 'bank'; x: number; y: number; w: number; start: number };
const AGENTS: Agent[] = [
  { id: 'H1', kind: 'household', x: 0.4, y: 0.4, w: 1.1, start: 120 },
  { id: 'H2', kind: 'household', x: 0.4, y: 2.5, w: 1.1, start: 120 },
  { id: 'H3', kind: 'household', x: 0.4, y: 4.6, w: 1.1, start: 120 },
  { id: 'B1', kind: 'business', x: 3.9, y: 1.0, w: 1.5, start: 400 },
  { id: 'B2', kind: 'business', x: 3.9, y: 3.7, w: 1.5, start: 400 },
  { id: 'BK', kind: 'bank', x: 7.6, y: 2.2, w: 1.8, start: 900 },
];
const of = (kind: Agent['kind']) => AGENTS.filter((a) => a.kind === kind);

type Entry = { n: number; kind: string; from: string; to: string; amount: number; ok: boolean; reason?: string };
const SEED = 20260311;
const MAX = 48;

/** Run the world for `ticks` steps. Same inputs, same result, every time. */
function simulate(ticks: number, shockFrom: number | null) {
  const rand = mulberry32(SEED);
  const bal: Record<string, number> = Object.fromEntries(AGENTS.map((a) => [a.id, a.start]));
  const ledger: Entry[] = [];
  const pick = <T,>(xs: T[]) => xs[Math.floor(rand() * xs.length)];
  for (let n = 1; n <= ticks; n++) {
    const tight = shockFrom !== null && n > shockFrom;
    const roll = rand();
    // With tight credit the bank stops lending and businesses repay instead.
    const kind = tight ? (roll < 0.3 ? 'wage' : roll < 0.62 ? 'purchase' : roll < 0.8 ? 'deposit' : 'repayment') : roll < 0.28 ? 'wage' : roll < 0.62 ? 'purchase' : roll < 0.74 ? 'deposit' : roll < 0.9 ? 'loan' : 'repayment';
    const h = pick(of('household')).id;
    const b = pick(of('business')).id;
    const size = rand();
    const [from, to, amount] =
      kind === 'wage' ? [b, h, 30 + Math.round(size * (tight ? 20 : 40))] : kind === 'purchase' ? [h, b, 20 + Math.round(size * 110)] : kind === 'deposit' ? [h, 'BK', 20 + Math.round(size * 40)] : kind === 'loan' ? ['BK', b, 80 + Math.round(size * 80)] : [b, 'BK', 40 + Math.round(size * 60)];
    const ok = bal[from] >= amount;
    if (ok) {
      bal[from] -= amount;
      bal[to] += amount;
    }
    ledger.push({ n, kind, from, to, amount, ok, reason: ok ? undefined : `balance ${bal[from]}` });
  }
  return { bal, ledger, hash: digest(JSON.stringify(ledger)) };
}

const iso = isoSpace(43, 262, 44);
const heightOf = (balance: number) => 0.25 + Math.min(2.3, balance / 420);
const centre = (a: Agent): [number, number] => [a.x + a.w / 2, a.y + a.w / 2];

export default function Manyworld({ active }: { active: boolean }) {
  const [tick, setTick] = useState(14);
  const [playing, setPlaying] = useState(false);
  const [shock, setShock] = useState<number | null>(null);
  const [proof, setProof] = useState<{ hash: string; at: number; same: boolean } | null>(null);
  const replay = useRef<{ target: number; hash: string } | null>(null);
  const world = useMemo(() => simulate(tick, shock), [tick, shock]);
  const last = world.ledger[world.ledger.length - 1];

  useEffect(() => {
    if (!playing || !active) return;
    if (tick >= MAX || (replay.current && tick >= replay.current.target)) {
      if (replay.current) {
        setProof({ hash: world.hash, at: tick, same: world.hash === replay.current.hash });
        replay.current = null;
      }
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setTick((t) => t + 1), replay.current ? 90 : 650);
    return () => window.clearTimeout(id);
  }, [playing, active, tick, world.hash]);

  const startReplay = () => {
    replay.current = { target: tick, hash: world.hash };
    setProof(null);
    setTick(0);
    setPlaying(true);
  };
  const a = last ? AGENTS.find((q) => q.id === last.from) : undefined;
  const b = last ? AGENTS.find((q) => q.id === last.to) : undefined;
  const flow = a && b ? iso.rail([centre(a), [centre(b)[0], centre(a)[1]], centre(b)]) : '';
  const toneOf = (ag: Agent): Tone => (last && last.ok && ag.id === last.to ? 'data' : last && ag.id === last.from ? (last.ok ? 'slate' : 'gold') : ag.kind === 'bank' ? 'titanium' : ag.kind === 'business' ? 'slate' : 'stone');

  return (
    <div className="demo demo-manyworld">
      <div className="demo-stage">
        <Scroller>
        <svg viewBox="0 0 640 420" className="diagram-svg" role="img" aria-label={`Six agents after ${tick} transactions. ${last ? `Last: ${last.kind} of ${last.amount} from ${last.from} to ${last.to}, ${last.ok ? 'booked' : 'rejected'}.` : ''}`}>
          <Floor iso={iso} x0={-0.2} x1={9.8} y0={-0.2} y1={6.2} />
          {flow && <Conduit key={tick} d={flow} color={last.ok ? '#38bdf8' : '#d4af37'} dim={!last.ok} />}
          {AGENTS.map((ag) => (
            <g key={ag.id}>
              <LiveSlab iso={iso} x={ag.x} y={ag.y} w={ag.w} d={ag.w} h={heightOf(world.bal[ag.id])} tone={toneOf(ag)} />
            </g>
          ))}
          <g fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize="13" fontWeight="500" textAnchor="middle" stroke="#07090e" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
            {AGENTS.map((ag) => {
              const [px, py] = iso.pt(ag.x + ag.w, ag.y + ag.w);
              return (
                <text key={ag.id} x={px} y={py + 19} fill="#e9edf3">
                  {ag.id} {world.bal[ag.id]}
                </text>
              );
            })}
          </g>
        </svg>
        </Scroller>
        <p className="demo-legend">
          <span>H households</span>
          <span>B businesses</span>
          <span>BK bank</span>
          <span>height is balance</span>
        </p>
      </div>
      <div className="demo-side">
        <div className="demo-controls">
          <button type="button" className="btn btn-line" onClick={() => { replay.current = null; setPlaying((p) => !p); }} disabled={tick >= MAX && !playing}>
            <Icon name={playing ? 'pause' : 'play'} size={15} />
            {playing ? 'Pause' : 'Run'}
          </button>
          <button type="button" className="btn btn-line" onClick={() => setTick((t) => Math.min(MAX, t + 1))} disabled={playing || tick >= MAX}>
            <Icon name="step" size={15} />
            Step
          </button>
          <button type="button" className="btn btn-line" onClick={startReplay} disabled={playing || tick === 0}>
            <Icon name="replay" size={15} />
            Replay
          </button>
        </div>
        <label className="check">
          <input type="checkbox" checked={shock !== null} onChange={(e) => setShock(e.target.checked ? tick : null)} disabled={playing && !!replay.current} />
          <span>Tighten credit from here on</span>
        </label>
        <ol className="ledger" aria-label="Ledger, newest first" aria-live="off">
          {world.ledger
            .slice(-5)
            .reverse()
            .map((e) => (
              <li key={e.n} className={e.ok ? '' : 'is-rejected'}>
                <span className="ledger-n">{String(e.n).padStart(3, '0')}</span>
                <span className="ledger-kind">{e.kind}</span>
                {e.ok ? (
                  <span className="ledger-entry">
                    DR {e.to} · CR {e.from}
                  </span>
                ) : (
                  <span className="ledger-entry">
                    {e.from} to {e.to} rejected, {e.reason}
                  </span>
                )}
                <span className="ledger-amount">{e.amount}</span>
              </li>
            ))}
          {world.ledger.length === 0 && <li className="ledger-empty">No transactions yet. Press Run or Step.</li>}
        </ol>
        <p className="digest" aria-live="polite">
          <span>
            Transaction {tick} of {MAX} · digest <code>{world.hash}</code>
          </span>
          {proof && <span className={proof.same ? 'is-ok' : 'is-warn'}>{proof.same ? `Replay matched at transaction ${proof.at}.` : 'Replay did not match.'}</span>}
        </p>
      </div>
    </div>
  );
}

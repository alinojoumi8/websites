import { useEffect, useMemo, useState } from 'react';
import { mulberry32 } from '../../lib/prng';
import { Replay, Seg } from '../ui';

type Scenario = 'launch' | 'ad' | 'news';
type Reaction = 0 | 1 | 2; // positive, neutral, negative

const SEGMENTS = [
  { name: 'Customers', tone: '#e8ecf2', ring: false },
  { name: 'Prospects', tone: '#7b8aa0', ring: false },
  { name: 'Press', tone: '#e8ecf2', ring: true },
  { name: 'Investors', tone: '#7b8aa0', ring: true },
];
const REACTIONS = ['Positive', 'Neutral', 'Negative'];
const PER = 24;

/** Sample scenarios written for this page. Chance of positive and neutral, per segment. */
const SCENARIOS: Record<Scenario, { label: string; doc: string; odds: [number, number][]; sources: string[] }> = {
  launch: {
    label: 'Product launch',
    doc: 'launch-brief.pdf',
    odds: [
      [0.66, 0.22],
      [0.44, 0.36],
      [0.34, 0.46],
      [0.52, 0.3],
    ],
    sources: ['section 2, pricing', 'section 4, onboarding', 'section 1, positioning'],
  },
  ad: {
    label: 'Advertising',
    doc: 'campaign-script.pdf',
    odds: [
      [0.48, 0.38],
      [0.38, 0.3],
      [0.2, 0.46],
      [0.3, 0.5],
    ],
    sources: ['scene 1, opening claim', 'scene 3, call to action', 'end card'],
  },
  news: {
    label: 'Company news',
    doc: 'press-statement.pdf',
    odds: [
      [0.3, 0.42],
      [0.24, 0.5],
      [0.18, 0.4],
      [0.42, 0.3],
    ],
    sources: ['paragraph 1, the announcement', 'paragraph 3, the timeline', 'closing quote'],
  },
};

const STORE = 'ali-caliber.crowdlens.reviews';
const COLS = 9;
const ZONE_W = 152;
const GAP = 13;

export function CrowdLens() {
  const [scenario, setScenario] = useState<Scenario>('launch');
  const [run, setRun] = useState(1);
  const [reviews, setReviews] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STORE);
      if (saved) setReviews(JSON.parse(saved));
    } catch {
      /* storage is optional */
    }
  }, []);

  const s = SCENARIOS[scenario];
  const people = useMemo(() => {
    const rnd = mulberry32(run * 7919 + scenario.length * 31 + scenario.charCodeAt(0));
    const slots = [0, 0, 0];
    return SEGMENTS.flatMap((_, seg) =>
      Array.from({ length: PER }, (_, i) => {
        const roll = rnd();
        const [p, n] = s.odds[seg];
        const reaction: Reaction = roll < p ? 0 : roll < p + n ? 1 : 2;
        const slot = slots[reaction]++;
        return {
          id: `${seg}-${i}`,
          seg,
          reaction,
          x: 14 + reaction * (ZONE_W + 8) + (slot % COLS) * GAP * 1.2,
          y: 10 + Math.floor(slot / COLS) * GAP,
        };
      }),
    );
  }, [scenario, run, s]);

  const total = people.length;
  const counts = [0, 1, 2].map((r) => people.filter((p) => p.reaction === r).length);
  const pct = (n: number) => Math.round((n / total) * 100);
  const lead = (r: number) => {
    const by = SEGMENTS.map((seg, i) => ({ name: seg.name, n: people.filter((p) => p.seg === i && p.reaction === r).length }));
    return by.sort((a, b) => b.n - a.n)[0];
  };
  const key = `${scenario}-${run}`;
  const reviewed = reviews[key];

  const review = () => {
    const next = { ...reviews, [key]: new Date().toLocaleTimeString('en-CA', { hour12: false }) };
    setReviews(next);
    try {
      window.sessionStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* storage is optional */
    }
  };

  return (
    <div className="cl">
      <div className="cl-controls">
        <Seg
          id="cl-scenario"
          label="Scenario"
          value={scenario}
          onChange={(v) => {
            setScenario(v);
            setRun(1);
          }}
          options={(Object.keys(SCENARIOS) as Scenario[]).map((id) => ({ id, label: SCENARIOS[id].label }))}
        />
        <button type="button" className="btn btn-steel btn-sm" onClick={() => setRun((r) => r + 1)}>
          <Replay />
          Run it again
        </button>
      </div>

      <ol className="cl-zones" aria-label={`Run ${run} of the ${s.label.toLowerCase()} scenario, ${total} simulated people`}>
        {REACTIONS.map((r, i) => (
          <li key={r}>
            <span>{r}</span>
            <b>{pct(counts[i])}%</b>
          </li>
        ))}
      </ol>
      <svg className="cl-room" viewBox="0 0 496 150" aria-hidden="true">
        <g id="cl-people">
          {people.map((p) => {
            const seg = SEGMENTS[p.seg];
            return (
              <circle
                key={p.id}
                className="cl-dot"
                r={seg.ring ? 3.4 : 4.2}
                fill={seg.ring ? 'none' : seg.tone}
                stroke={seg.ring ? seg.tone : 'none'}
                strokeWidth="1.6"
                style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
              />
            );
          })}
        </g>
      </svg>

      <ul className="cl-legend" aria-label="Audience segments">
        {SEGMENTS.map((seg) => (
          <li key={seg.name}>
            <span style={seg.ring ? { boxShadow: `inset 0 0 0 2px ${seg.tone}` } : { background: seg.tone }} />
            {seg.name}
          </li>
        ))}
      </ul>

      <div className="cl-report" data-reviewed={reviewed ? true : undefined}>
        <h5>
          Report, run {run} · {s.doc}
        </h5>
        <ul>
          {REACTIONS.map((r, i) => (
            <li key={r}>
              <b>
                {r} {pct(counts[i])}%
              </b>
              <span>
                Strongest among {lead(i).name.toLowerCase()}. <cite>Source: {s.sources[i]}</cite>
              </span>
            </li>
          ))}
        </ul>
        <div className="cl-review">
          <button type="button" className="btn btn-steel btn-sm" onClick={review} disabled={!!reviewed}>
            {reviewed ? 'Review saved' : 'Save a human review'}
          </button>
          <p aria-live="polite">{reviewed ? `Reviewed by a person at ${reviewed}.` : 'No person has reviewed this run yet.'}</p>
        </div>
      </div>
      <p className="demo-note">A sample audience of {total} with made-up odds. It shows the shape of a run. It is not a forecast.</p>
    </div>
  );
}

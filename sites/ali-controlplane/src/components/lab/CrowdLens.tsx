/**
 * CrowdLens, in miniature. A scenario document goes in, a synthetic audience reacts,
 * the report links each line to its source paragraph, and a person signs off.
 * Scenarios and the audience are invented for this page.
 */
import { useMemo, useState } from 'react';
import { isoSpace } from '../../lib/iso';
import { mulberry32 } from '../../lib/prng';
import { Floor, Icon, Scroller, Segmented } from '../ui';

type ScenarioId = 'launch' | 'ad' | 'news';
const SEGMENTS = ['Students', 'Families', 'Shop owners', 'Retirees'] as const;

/** For each scenario: its document, and per segment the chance of [interested, sceptical] and the paragraph that drives it. */
const SCENARIOS: Record<ScenarioId, { label: string; doc: string[]; lean: [number, number, number][] }> = {
  launch: {
    label: 'Product launch',
    doc: ['A budgeting app adds joint accounts for two people.', 'Each partner sees shared bills and keeps a private balance.', 'The joint account costs four dollars a month after a free trial.'],
    lean: [
      [0.45, 0.25, 3],
      [0.75, 0.1, 2],
      [0.3, 0.3, 1],
      [0.25, 0.45, 3],
    ],
  },
  ad: {
    label: 'Advertisement',
    doc: ['The ad says: switch your bank in ten minutes.', 'Small print: transfers of direct debits take up to seven days.', 'A cash bonus is paid after three months of use.'],
    lean: [
      [0.6, 0.15, 3],
      [0.35, 0.4, 2],
      [0.4, 0.35, 2],
      [0.15, 0.6, 2],
    ],
  },
  news: {
    label: 'Company news',
    doc: ['A payments company raises card fees next quarter.', 'Accounts with fewer than fifty payments a month pay the most.', 'The company promises next-day settlement in return.'],
    lean: [
      [0.1, 0.5, 1],
      [0.15, 0.55, 1],
      [0.35, 0.5, 3],
      [0.1, 0.4, 1],
    ],
  },
};
const PER = 24;
const COLOURS = { interested: '#38bdf8', neutral: '#3b4658', sceptical: '#d4af37' } as const;
type Reaction = keyof typeof COLOURS;

function simulate(id: ScenarioId) {
  const rand = mulberry32(id === 'launch' ? 11 : id === 'ad' ? 23 : 37);
  return SCENARIOS[id].lean.map(([yes, no]) =>
    Array.from({ length: PER }, (): Reaction => {
      const r = rand();
      return r < yes ? 'interested' : r < yes + no ? 'sceptical' : 'neutral';
    }),
  );
}

const iso = isoSpace(26, 206, 56);
/** Where each group's name stands: a corner of its block, then up or down, clear of the tiles. */
const LABELS: [number, number, number, 'start' | 'middle' | 'end'][] = [
  [0, -0.1, -16, 'middle'],
  [15.6, -0.1, -16, 'end'],
  [-0.1, 8.1, 16, 'start'],
  [15.6, 8.1, 16, 'end'],
];

export default function CrowdLens() {
  const [id, setId] = useState<ScenarioId>('launch');
  const [para, setPara] = useState<number | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const [review, setReview] = useState<Record<string, string>>({});
  const crowd = useMemo(() => simulate(id), [id]);
  const sc = SCENARIOS[id];

  const sign = (verdict: string) => setReview({ ...review, [id]: `${verdict} at ${new Date().toLocaleTimeString('en-CA', { hour12: false })}` });

  return (
    <div className="demo demo-crowdlens">
      <div className="demo-stage">
        <Segmented value={id} onChange={(v) => { setId(v); setPara(null); }} options={(Object.keys(SCENARIOS) as ScenarioId[]).map((k) => ({ id: k, label: SCENARIOS[k].label }))} label="Scenario" className="seg-small" />
        <Scroller>
        <svg viewBox="0 0 584 410" className="diagram-svg" role="img" aria-label={`A synthetic audience of ${PER * 4} people in four groups, coloured by reaction to the scenario.`}>
          <Floor iso={iso} x0={-0.4} x1={15.6} y0={-0.6} y1={8.4} />
          {crowd.map((seg, s) =>
            seg.map((r, i) => {
              const col = i % 6;
              const row = Math.floor(i / 6);
              const x = (s % 2) * 8.4 + col * 1.2;
              const y = Math.floor(s / 2) * 4.4 + row * 0.92;
              const lift = r === 'interested' ? 0.5 : r === 'sceptical' ? 0.22 : 0.06;
              return <path key={`${s}-${i}`} d={iso.tile(x, y, 0.95, 0.7, lift)} fill={COLOURS[r]} opacity={hot === null || hot === s ? 1 : 0.22} style={{ transition: `fill .5s ${(s * 24 + i) * 6}ms, d .5s ${(s * 24 + i) * 6}ms, opacity .3s` }} />;
            }),
          )}
          <g fontFamily="Inter Variable, Inter, system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#e9edf3" stroke="#07090e" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
            {SEGMENTS.map((name, s) => {
              const [gx, gy, dy, anchor] = LABELS[s];
              const [px, py] = iso.pt(gx, gy);
              return (
                <g key={name} opacity={hot === null || hot === s ? 1 : 0.35}>
                  <path d={`M${px} ${py}V${py + dy}`} stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.7" paintOrder="normal" />
                  <text x={px} y={py + dy + (dy < 0 ? -6 : 15)} textAnchor={anchor}>
                    {name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        </Scroller>
        <p className="demo-legend">
          <span className="key key-data">interested</span>
          <span className="key key-gold">sceptical</span>
          <span className="key key-steel">neutral</span>
          <span>{PER * 4} synthetic people</span>
        </p>
      </div>
      <div className="demo-side">
        <h4 className="demo-h">Scenario document</h4>
        <ol className="doc">
          {sc.doc.map((p, i) => (
            <li key={p} className={para === i + 1 ? 'is-focus' : ''}>
              {p}
            </li>
          ))}
        </ol>
        <h4 className="demo-h">Report</h4>
        <ul className="report">
          {SEGMENTS.map((name, s) => {
            const yes = crowd[s].filter((r) => r === 'interested').length;
            const no = crowd[s].filter((r) => r === 'sceptical').length;
            const src = sc.lean[s][2];
            return (
              <li key={name} onPointerEnter={() => setHot(s)} onPointerLeave={() => setHot(null)}>
                <span className="report-name">{name}</span>
                <span className="report-nums">
                  {yes} interested · {no} sceptical
                </span>
                <button type="button" className="cite" onPointerEnter={() => setPara(src)} onPointerLeave={() => setPara(null)} onFocus={() => setPara(src)} onBlur={() => setPara(null)} aria-label={`Source: paragraph ${src} of the scenario document`}>
                  ¶{src}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="demo-controls">
          <button type="button" className="btn btn-line" onClick={() => sign('Approved')}>
            <Icon name="check" size={15} />
            Approve report
          </button>
          <button type="button" className="btn btn-line" onClick={() => sign('Sent back')}>
            <Icon name="replay" size={15} />
            Send back
          </button>
        </div>
        <p className="digest" aria-live="polite">
          {review[id] ? <span className="is-ok">Human review saved: {review[id]}.</span> : <span>No human review saved for this scenario yet.</span>}
        </p>
      </div>
    </div>
  );
}

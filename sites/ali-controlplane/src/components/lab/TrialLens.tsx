/**
 * TrialLens, in miniature. A rehearsal's decision trace, where every step links
 * to source evidence, exhibits can be excluded, and each state can be saved as an audit record.
 * The matter and its exhibits are invented for this page.
 */
import { useState } from 'react';
import { Icon } from '../ui';

const EXHIBITS = [
  { id: 'E1', title: 'Supply contract, clause 7', text: 'Delivery within 30 days of the order.' },
  { id: 'E2', title: 'Email of March 3', text: 'The supplier proposes a 45-day schedule. No reply on file.' },
  { id: 'E3', title: 'Delivery note', text: 'Goods received on day 52.' },
  { id: 'E4', title: 'Phone call summary', text: 'A third party recalls that the buyer agreed to wait. Hearsay.' },
] as const;
type ExhibitId = (typeof EXHIBITS)[number]['id'];

const STEPS: { id: string; text: string; cites: ExhibitId[]; side: 'for' | 'against' }[] = [
  { id: 'S1', text: 'The contract set a 30-day deadline.', cites: ['E1'], side: 'for' },
  { id: 'S2', text: 'The goods arrived on day 52.', cites: ['E3'], side: 'for' },
  { id: 'S3', text: 'Nothing in writing changed the deadline.', cites: ['E2'], side: 'for' },
  { id: 'R1', text: 'The buyer agreed to wait.', cites: ['E4'], side: 'against' },
];

type Allowed = Record<ExhibitId, boolean>;
const START: Allowed = { E1: true, E2: true, E3: true, E4: false };

function decide(allowed: Allowed) {
  const holds = (id: string) => STEPS.find((s) => s.id === id)!.cites.every((c) => allowed[c]);
  if (!holds('S1') || !holds('S2')) return { tone: 'warn', text: 'No finding. A step lost its source.' };
  if (holds('R1') && !holds('S3')) return { tone: 'warn', text: 'Contested. The opposing point stands unanswered.' };
  if (holds('R1')) return { tone: 'ok', text: 'Late delivery, with one opposing point on the record.' };
  return { tone: 'ok', text: 'Late delivery. Every step links to an allowed exhibit.' };
}

type Record_ = { n: number; time: string; allowed: string; finding: string };

export default function TrialLens() {
  const [allowed, setAllowed] = useState<Allowed>(START);
  const [focus, setFocus] = useState<ExhibitId | null>(null);
  const [records, setRecords] = useState<Record_[]>([]);
  const finding = decide(allowed);

  const save = () =>
    setRecords((r) => [
      {
        n: r.length + 1,
        time: new Date().toLocaleTimeString('en-CA', { hour12: false }),
        allowed: EXHIBITS.filter((e) => allowed[e.id])
          .map((e) => e.id)
          .join(' ') || 'none',
        finding: finding.text,
      },
      ...r,
    ]);

  return (
    <div className="demo demo-triallens">
      <div className="trial-col">
        <h4 className="demo-h">Evidence</h4>
        <ul className="exhibits">
          {EXHIBITS.map((e) => (
            <li key={e.id} className={`exhibit ${allowed[e.id] ? '' : 'is-out'} ${focus === e.id ? 'is-focus' : ''}`}>
              <div className="exhibit-body">
                <p className="exhibit-title">
                  <code>{e.id}</code> {e.title}
                </p>
                <p className="exhibit-text">{e.text}</p>
              </div>
              <label className="check check-tight">
                <input type="checkbox" checked={allowed[e.id]} onChange={(ev) => setAllowed({ ...allowed, [e.id]: ev.target.checked })} />
                <span>{allowed[e.id] ? 'In use' : 'Excluded'}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="trial-col">
        <h4 className="demo-h">Decision trace: was the delivery late?</h4>
        <ol className="trace">
          {STEPS.map((s) => {
            const ok = s.cites.every((c) => allowed[c]);
            return (
              <li key={s.id} className={`trace-step ${ok ? 'is-held' : 'is-cut'} ${s.side === 'against' ? 'is-against' : ''}`}>
                <span className="trace-node" aria-hidden="true" />
                <p className="trace-text">
                  {s.side === 'against' && <span className="trace-side">Opposing point. </span>}
                  {s.text}
                  {!ok && <span className="trace-cut"> Source excluded.</span>}
                </p>
                <p className="trace-cites">
                  {s.cites.map((c) => (
                    <button key={c} type="button" className="cite" onPointerEnter={() => setFocus(c)} onPointerLeave={() => setFocus(null)} onFocus={() => setFocus(c)} onBlur={() => setFocus(null)} aria-label={`Source ${c}: ${EXHIBITS.find((e) => e.id === c)!.title}`}>
                      {c}
                    </button>
                  ))}
                </p>
              </li>
            );
          })}
        </ol>
        <p className={`finding is-${finding.tone}`} aria-live="polite">
          {finding.text}
        </p>
        <div className="audit">
          <button type="button" className="btn btn-line" onClick={save}>
            <Icon name="download" size={15} />
            Save audit record
          </button>
          <ol className="audit-list" aria-label="Saved audit records" aria-live="polite">
            {records.length === 0 && <li className="ledger-empty">No records saved in this visit.</li>}
            {records.slice(0, 3).map((r) => (
              <li key={r.n}>
                <code>
                  #{r.n} {r.time}
                </code>
                <span>
                  in use {r.allowed}: {r.finding}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

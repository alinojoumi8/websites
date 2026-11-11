import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Statement = { id: string; text: string; trace: string };
type TraceStep = { id: string; text: string; uses: string[] };
type Exhibit = { id: string; name: string; fact: string };

/** A sample matter written for this page. It is not a real case. */
const STATEMENTS: Statement[] = [
  { id: 'S1', text: 'The delivery was six days late.', trace: 'T1' },
  { id: 'S2', text: 'The buyer was warned before the due date.', trace: 'T2' },
  { id: 'S3', text: 'The buyer accepted the new date.', trace: 'T3' },
];
const TRACE: TraceStep[] = [
  { id: 'T1', text: 'Compare the due date with the delivery date.', uses: ['A', 'B'] },
  { id: 'T2', text: 'Check that the notice was sent before the due date.', uses: ['C'] },
  { id: 'T3', text: 'Match the reply to the notice it answers.', uses: ['C', 'D'] },
];
const EXHIBITS: Exhibit[] = [
  { id: 'A', name: 'Purchase order', fact: 'Due June 3' },
  { id: 'B', name: 'Carrier log', fact: 'Delivered June 9' },
  { id: 'C', name: 'Seller email', fact: 'Sent May 30' },
  { id: 'D', name: 'Buyer reply', fact: 'Sent May 31' },
];
const EDGES: [string, string][] = [
  ['S1', 'T1'],
  ['S2', 'T2'],
  ['S3', 'T3'],
  ['T1', 'A'],
  ['T1', 'B'],
  ['T2', 'C'],
  ['T3', 'C'],
  ['T3', 'D'],
];
const STORE = 'ali-caliber.triallens.audit';

type Audit = { time: string; text: string };
const now = () => new Date().toLocaleTimeString('en-CA', { hour12: false });

export function TrialLens() {
  const [selected, setSelected] = useState('S1');
  const [excluded, setExcluded] = useState<string[]>([]);
  const [audit, setAudit] = useState<Audit[]>([]);
  const [paths, setPaths] = useState<{ key: string; d: string; from: string; to: string }[]>([]);
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STORE);
      if (saved) setAudit(JSON.parse(saved));
    } catch {
      /* storage is optional */
    }
  }, []);

  const record = (text: string) =>
    setAudit((a) => {
      const next = [{ time: now(), text }, ...a].slice(0, 12);
      try {
        window.sessionStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* storage is optional */
      }
      return next;
    });

  // connector lines follow the real positions of the boxes
  useLayoutEffect(() => {
    const el = board.current;
    if (!el) return;
    const draw = () => {
      const B = el.getBoundingClientRect();
      const box = (id: string) => el.querySelector<HTMLElement>(`[data-node="${id}"]`)?.getBoundingClientRect();
      setPaths(
        EDGES.flatMap(([from, to]) => {
          const a = box(from);
          const b = box(to);
          if (!a || !b) return [];
          const x1 = a.right - B.left;
          const y1 = a.top + a.height / 2 - B.top;
          const x2 = b.left - B.left;
          const y2 = b.top + b.height / 2 - B.top;
          const mx = (x1 + x2) / 2;
          return [{ key: `${from}-${to}`, from, to, d: `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` }];
        }),
      );
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = (id: string) => TRACE.find((t) => t.id === id)!;
  const supported = (s: Statement) => step(s.trace).uses.every((e) => !excluded.includes(e));
  const sel = STATEMENTS.find((s) => s.id === selected)!;
  const live = new Set([sel.id, sel.trace, ...step(sel.trace).uses]);

  const toggle = (e: Exhibit) => {
    const out = excluded.includes(e.id);
    const next = out ? excluded.filter((x) => x !== e.id) : [...excluded, e.id];
    setExcluded(next);
    record(`Exhibit ${e.id} (${e.name}) ${out ? 'admitted again' : 'excluded'} by the reviewer.`);
    for (const s of STATEMENTS) {
      const was = step(s.trace).uses.every((x) => !excluded.includes(x));
      const is = step(s.trace).uses.every((x) => !next.includes(x));
      if (was !== is) record(`Statement ${s.id} is now ${is ? 'supported' : 'unsupported'}.`);
    }
  };

  return (
    <div className="tl">
      <div className="tl-board" ref={board}>
        <svg className="tl-lines" aria-hidden="true">
          {paths.map((p) => (
            <path
              key={p.key}
              id={`trace-${p.key}`}
              d={p.d}
              data-live={(live.has(p.from) && live.has(p.to)) || undefined}
              data-cut={excluded.includes(p.to) || undefined}
            />
          ))}
        </svg>

        <div className="tl-col">
          <h5>Rehearsal</h5>
          {STATEMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="tl-node tl-statement"
              data-node={s.id}
              data-live={live.has(s.id) || undefined}
              data-bad={!supported(s) || undefined}
              aria-pressed={selected === s.id}
              onClick={() => {
                setSelected(s.id);
                record(`Trace opened for statement ${s.id}.`);
              }}
            >
              <b>{s.id}</b>
              <span>{s.text}</span>
              <i>{supported(s) ? 'Supported' : 'Unsupported'}</i>
            </button>
          ))}
        </div>

        <div className="tl-col">
          <h5>Decision trace</h5>
          {TRACE.map((t) => (
            <div key={t.id} className="tl-node tl-trace" data-node={t.id} data-live={live.has(t.id) || undefined}>
              <b>{t.id}</b>
              <span>{t.text}</span>
            </div>
          ))}
        </div>

        <div className="tl-col">
          <h5>Source evidence</h5>
          {EXHIBITS.map((e) => {
            const out = excluded.includes(e.id);
            return (
              <button
                key={e.id}
                type="button"
                className="tl-node tl-exhibit"
                data-node={e.id}
                data-live={live.has(e.id) || undefined}
                data-out={out || undefined}
                aria-pressed={!out}
                aria-label={`Exhibit ${e.id}, ${e.name}, ${e.fact}. ${out ? 'Excluded. Select to admit.' : 'Admitted. Select to exclude.'}`}
                onClick={() => toggle(e)}
              >
                <b>{e.id}</b>
                <span>
                  {e.name}
                  <em>{e.fact}</em>
                </span>
                <i>{out ? 'Excluded' : 'Admitted'}</i>
              </button>
            );
          })}
        </div>
      </div>

      <div className="tl-audit">
        <h5>Audit record, saved for this visit</h5>
        <ol aria-live="polite">
          {audit.length === 0 && <li className="log-empty">Nothing recorded yet. Exclude an exhibit to see what breaks.</li>}
          {audit.slice(0, 4).map((a, i) => (
            <li key={`${a.time}-${i}-${a.text}`}>
              <time>{a.time}</time>
              <span>{a.text}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="demo-note">A sample matter written for this page. It is not a real case and not legal advice.</p>
    </div>
  );
}

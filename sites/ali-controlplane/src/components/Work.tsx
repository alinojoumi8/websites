/**
 * Three case studies. Each has a wide cover, then a workbench that pins on desktop
 * while the scroll draws its diagram. Two views: product strategy, system architecture.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { cmor, keywa, pontemesto, ventures, type Step } from '../lib/content';
import { face, time } from '../lib/motion';
import { PIN_QUERY, scrollToY, useMedia, useProgress } from '../lib/scroll';
import { Icon, Scroller, Segmented } from './ui';
import { RoutingSvg, type NodeId, type View } from './diagrams/Routing';
import { DEPTS, SAMPLE_ADDRESS, ThresholdSvg, deptCount, deptOk, initialSigners, rotations, scripted, walletOk, type Signer } from './diagrams/Threshold';
import { FINS, SAMPLES, SentimentSvg, respond, scoreHeadline, type Scored } from './diagrams/Sentiment';

type Ctx = { view: View; step: number; progress: MotionValue<number>; pinned: boolean };

const VIEWS: { id: View; label: string }[] = [
  { id: 'strategy', label: 'Product strategy' },
  { id: 'architecture', label: 'System architecture' },
];

export function Cover({ name, alt }: { name: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  return (
    <div ref={ref} className="case-cover-art">
      <motion.div className="case-cover-move" style={{ y }}>
        <picture>
          <source type="image/avif" srcSet={`/art/${name}-800.avif 800w, /art/${name}-1400.avif 1400w, /art/${name}-2400.avif 2400w`} sizes="100vw" />
          <source type="image/webp" srcSet={`/art/${name}-800.webp 800w, /art/${name}-1400.webp 1400w, /art/${name}-2400.webp 2400w`} sizes="100vw" />
          <img src={`/art/${name}-1400.webp`} width={2400} height={1018} alt={alt} loading="lazy" decoding="async" />
        </picture>
      </motion.div>
    </div>
  );
}

function CaseShell({
  id,
  accent,
  name,
  aka,
  meta,
  link,
  challenge,
  outcome,
  steps,
  cover,
  coverAlt,
  diagramKey,
  onProgress,
  children,
}: {
  id: string;
  accent: 'live' | 'gold' | 'data';
  name: string;
  aka?: string;
  meta: string[];
  link?: { href: string; label: string };
  challenge: string;
  outcome: string;
  steps: Step[];
  cover: string;
  coverAlt: string;
  /** One line that names the parts of the diagram, shown on phones where its labels are hidden. */
  diagramKey: string;
  onProgress?: (v: number) => void;
  children: (ctx: Ctx) => { panel: ReactNode; stage: ReactNode };
}) {
  const pin = useRef<HTMLDivElement>(null);
  const pinned = useMedia(PIN_QUERY);
  const progress = useProgress(pin, pinned);
  const [view, setView] = useState<View>('strategy');
  const n = steps.length;
  const [step, setStep] = useState(n - 1);
  const toStep = (v: number) => Math.min(n - 1, Math.floor(v * n * 0.999));

  useMotionValueEvent(progress, 'change', (v) => {
    onProgress?.(v);
    if (pinned) setStep(toStep(v));
  });
  useEffect(() => {
    setStep(pinned ? toStep(progress.get()) : n - 1);
    onProgress?.(pinned ? progress.get() : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned]);

  const jump = (i: number) => {
    if (!pinned || !pin.current) return;
    const r = pin.current.getBoundingClientRect();
    scrollToY(window.scrollY + r.top + ((i + 0.5) / n) * (r.height - window.innerHeight));
  };

  const { panel, stage } = children({ view, step, progress, pinned });

  return (
    <article id={id} className={`case case-${accent}`} aria-labelledby={`${id}-name`}>
      <header className="case-cover">
        <Cover name={cover} alt={coverAlt} />
        <div className="case-cover-copy wrap">
          <h3 id={`${id}-name`} className="case-name">
            {name}
          </h3>
          <p className="case-meta">
            {aka && <span>{aka}</span>}
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
            {link && (
              <a href={link.href} rel="noopener" target="_blank">
                {link.label}
                <Icon name="arrowUpRight" size={14} />
              </a>
            )}
          </p>
          <p className="case-outcome">{outcome}</p>
        </div>
      </header>

      <div ref={pin} className="case-pin">
        <div className="case-bench wrap">
          <div className="case-panel">
            <p className="case-challenge">{challenge}</p>
            <Segmented value={view} onChange={setView} options={VIEWS} label={`${name}: choose a view`} />
            <AnimatePresence mode="wait" initial={false}>
              {view === 'strategy' ? (
                <motion.ol key="strategy" className="runbook" variants={face} initial="hidden" animate="shown" exit="hidden">
                  {steps.map((s, i) => (
                    <li key={s.title} className={`runbook-step ${pinned ? (i === step ? 'is-now' : i < step ? 'is-done' : 'is-next') : 'is-done'}`}>
                      <button type="button" className="runbook-title" onClick={() => jump(i)} aria-current={pinned && i === step ? 'step' : undefined} disabled={!pinned}>
                        <span className="runbook-mark" aria-hidden="true" />
                        {s.title}
                      </button>
                      <p className="runbook-text">{s.text}</p>
                    </li>
                  ))}
                </motion.ol>
              ) : (
                <motion.div key="architecture" className="inspector" variants={face} initial="hidden" animate="shown" exit="hidden">
                  {panel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="case-stage">
            <Scroller>{stage}</Scroller>
            <p className="diagram-key">{diagramKey}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Pontemesto ---------- */

const nodeIds: NodeId[] = ['merchant', 'onboarding', 'gateway', 'exchange', 'liquidity', 'settlement'];
const stepNodes: NodeId[][] = [['merchant'], ['onboarding'], ['gateway', 'exchange', 'liquidity'], ['gateway'], ['settlement']];
const runStages = [
  { at: 0, label: 'Merchant sends a payment', status: 'received' },
  { at: 0.42, label: 'Gateway accepts and routes it', status: 'routed' },
  { at: 0.68, label: 'Liquidity provider fills it', status: 'filled' },
  { at: 0.93, label: 'Processing partner settles it', status: 'settled' },
];
const nodeNames = Object.fromEntries(nodeIds.map((n) => [n, pontemesto.nodes[n].label])) as Record<NodeId, string>;

function RoutingStage({ ctx, node, onNode, packet, runRef }: { ctx: Ctx; node: NodeId; onNode: (n: NodeId) => void; packet: { x: MotionValue<number>; y: MotionValue<number>; o: MotionValue<number> }; runRef: React.RefObject<SVGPathElement | null> }) {
  const p = ctx.progress;
  const draw = {
    merchants: useTransform(p, [0.02, 0.2], [0, 1]),
    onboard: useTransform(p, [0.2, 0.36], [0, 1]),
    fan: useTransform(p, [0.4, 0.6], [0, 1]),
    settle: useTransform(p, [0.72, 0.9], [0, 1]),
  };
  const lit = ctx.view === 'strategy' ? stepNodes[ctx.step] : [node];
  return <RoutingSvg view={ctx.view} lit={lit} draw={draw} onNode={onNode} names={nodeNames} packet={packet} runRef={runRef} />;
}

function Pontemesto() {
  const [node, setNode] = useState<NodeId>('gateway');
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState(-1);
  const runRef = useRef<SVGPathElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const o = useMotionValue(0);
  const running = stage >= 0 && stage < runStages.length - 1;

  useEffect(() => {
    const path = runRef.current;
    if (!run || !path) return;
    const len = path.getTotalLength();
    o.set(1);
    const c = animate(0, 1, {
      ...time.packet,
      onUpdate: (t) => {
        const pt = path.getPointAtLength(t * len);
        x.set(pt.x);
        y.set(pt.y);
        const s = runStages.reduce((k, st, i) => (t >= st.at ? i : k), 0);
        setStage((prev) => (prev === s ? prev : s));
      },
      onComplete: () => animate(o, 0, { duration: 0.5 }),
    });
    return () => c.stop();
  }, [run, x, y, o]);

  const status = stage < 0 ? 'none yet' : runStages[stage].status;
  return (
    <CaseShell
      id="pontemesto"
      accent="live"
      name={pontemesto.name}
      meta={[pontemesto.role, pontemesto.dates]}
      link={pontemesto.link}
      challenge={pontemesto.challenge}
      outcome={pontemesto.outcome}
      steps={pontemesto.steps}
      cover="asset-pontemesto"
      diagramKey="From left to right: merchants, onboarding, the payment gateway, then exchanges and liquidity providers, then the processing partner."
      coverAlt="An isometric model of payment routing: small slabs on the left send green light rails into one tall gateway block, which fans out to vault blocks on the right."
    >
      {(ctx) => ({
        panel: (
          <>
            <ul className="chips" aria-label="Parts of the system">
              {nodeIds.map((n) => (
                <li key={n}>
                  <button type="button" className={`chip ${node === n ? 'is-on' : ''}`} aria-pressed={node === n} onClick={() => setNode(n)}>
                    {pontemesto.nodes[n].label}
                  </button>
                </li>
              ))}
            </ul>
            <p className="inspector-text" aria-live="polite">
              {pontemesto.nodes[node].text}
            </p>
            <div className="run">
              <button type="button" className="btn btn-line" onClick={() => { setStage(0); setRun((r) => r + 1); }} disabled={running}>
                <Icon name="play" size={16} />
                Run a sample payment
              </button>
              <ol className="run-log" aria-live="polite">
                {runStages.map((s, i) => (
                  <li key={s.status} className={stage >= i ? 'is-done' : ''}>
                    <Icon name="check" size={13} />
                    {s.label}
                  </li>
                ))}
              </ol>
            </div>
            <pre className="payload" tabIndex={0} aria-label="Illustrative message">
              <code>{`{\n  "payment": "sample-${String(Math.max(run, 1)).padStart(4, '0')}",\n  "merchant": "onboarded",\n  "route": "liquidity-provider",\n  "status": "${status}"\n}`}</code>
            </pre>
            <p className="toy-note">A sample run. The message shape is an illustration, not Pontemesto's API.</p>
          </>
        ),
        stage: <RoutingStage ctx={ctx} node={node} onNode={(n) => setNode(n)} packet={{ x, y, o }} runRef={runRef} />,
      })}
    </CaseShell>
  );
}

/* ---------- Keywa ---------- */

const sig = (s: Signer[]) => s.map((x) => `${x.id}${x.ok ? 1 : 0}${x.gen}`).join('');

function ThresholdStage({ ctx, signers, onSigner }: { ctx: Ctx; signers: Signer[]; onSigner: (id: string) => void }) {
  const draw = useTransform(ctx.progress, [0.02, 0.26], [0, 1]);
  return <ThresholdSvg signers={signers} view={ctx.view} onSigner={onSigner} draw={draw} />;
}

function Keywa() {
  const [auto, setAuto] = useState<Signer[]>(() => scripted(1));
  const [manual, setManual] = useState<Signer[] | null>(null);
  const [mode, setMode] = useState<'approve' | 'replace'>('approve');
  const signers = manual ?? auto;
  const signed = walletOk(signers);
  const swaps = rotations(signers);

  const onProgress = (v: number) => {
    const next = scripted(v);
    setAuto((prev) => (sig(prev) === sig(next) ? prev : next));
  };
  const act = (id: string) =>
    setManual(
      signers.map((s) => (s.id !== id ? s : mode === 'approve' ? { ...s, ok: !s.ok } : { ...s, ok: false, gen: s.gen + 1 })),
    );

  return (
    <CaseShell
      id="keywa"
      accent="gold"
      name={keywa.name}
      aka={keywa.aka}
      meta={[keywa.role, keywa.dates, keywa.note]}
      challenge={keywa.challenge}
      outcome={keywa.outcome}
      steps={keywa.steps}
      cover="asset-keywa"
      diagramKey="Three departments, three signers each, feed one wallet. Green is approved. Gold is a replaced signer. The plate at the end is the wallet address."
      coverAlt="An isometric model of a signing mechanism: brushed titanium rings around a smoked glass core, set with small glass segments that glow green and gold."
      onProgress={onProgress}
    >
      {(ctx) => ({
        panel: (
          <>
            <p className="inspector-text">{keywa.paper}</p>
            <div className="signer-head">
              <Segmented
                value={mode}
                onChange={setMode}
                options={[
                  { id: 'approve', label: 'Approve' },
                  { id: 'replace', label: 'Replace a signer' },
                ]}
                label="What a click on a signer does"
                className="seg-small"
              />
              <button type="button" className="link-btn" onClick={() => { setManual(initialSigners()); setMode('approve'); }}>
                <Icon name="replay" size={14} />
                Reset
              </button>
            </div>
            <ul className="depts">
              {DEPTS.map((d, k) => (
                <li key={d.code} className={deptOk(signers, k) ? 'is-ok' : ''}>
                  <span className="dept-name">{d.name}</span>
                  <span className="dept-signers">
                    {signers
                      .filter((s) => s.dept === k)
                      .map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`signer ${s.ok ? 'is-ok' : ''} ${s.gen > 1 ? 'is-new' : ''}`}
                          aria-pressed={s.ok}
                          aria-label={`${mode === 'approve' ? (s.ok ? 'Withdraw approval of' : 'Approve as') : 'Replace'} signer ${s.id}${s.gen > 1 ? ' (new key share)' : ''}`}
                          onClick={() => act(s.id)}
                        >
                          <Icon name={mode === 'replace' ? 'swap' : s.ok ? 'check' : 'key'} size={13} />
                          {s.id}
                        </button>
                      ))}
                  </span>
                  <span className="dept-count">{deptCount(signers, k)} of 3</span>
                </li>
              ))}
            </ul>
            <dl className="wallet-readout" aria-live="polite">
              <div>
                <dt>Wallet</dt>
                <dd className={signed ? 'is-ok' : ''}>{signed ? 'Signed' : 'Waiting for two departments'}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  <code>{SAMPLE_ADDRESS}</code>
                </dd>
              </div>
              <div>
                <dt>Signers replaced</dt>
                <dd>
                  {swaps}
                  {swaps > 0 && <span className="same"> · address unchanged</span>}
                </dd>
              </div>
            </dl>
            <p className="toy-note">A simplified model of the whitepaper's idea. The thresholds, department names and address are examples.</p>
          </>
        ),
        stage: <ThresholdStage ctx={ctx} signers={signers} onSigner={act} />,
      })}
    </CaseShell>
  );
}

/* ---------- CMOR Group ---------- */

const rotate = (k: number): Scored[] => Array.from({ length: FINS }, (_, i) => scoreHeadline(SAMPLES[(i + k) % SAMPLES.length]));

function Cmor() {
  const [auto, setAuto] = useState(5);
  const autoRef = useRef(5);
  const [manual, setManual] = useState<Scored[] | null>(null);
  const [beat, setBeat] = useState(0);
  const [text, setText] = useState('');
  const history = manual ?? rotate(auto);
  const last = history[history.length - 1];
  const r = respond(last.score);

  const push = (headline: string) => {
    const clean = headline.trim().slice(0, 120);
    if (!clean) return;
    setManual([...history.slice(1), scoreHeadline(clean)]);
    setBeat((b) => b + 1);
    setText('');
  };
  const submit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    push(text);
  };
  const marked = last.text.split(/(\s+)/).map((w, i) => {
    const hit = last.hits.find((h) => h.word === w.toLowerCase().replace(/[^a-z]/g, ''));
    return hit ? (
      <mark key={i} className={hit.sign > 0 ? 'up' : 'down'}>
        {w}
      </mark>
    ) : (
      w
    );
  });

  return (
    <CaseShell
      id="cmor"
      accent="data"
      name={cmor.name}
      meta={[cmor.role, cmor.dates]}
      challenge={cmor.challenge}
      outcome={cmor.outcome}
      steps={cmor.steps}
      cover="asset-cmor"
      diagramKey="Headlines ride the rail into the scorer. Each bar is one score, and the line joins them. The last bar is the newest."
      coverAlt="An isometric model of a sentiment engine: blank cards ride a rail into a glass block, and a glowing amber line leaves it and rises and falls over a row of steel fins."
      onProgress={(v) => {
        const k = Math.min(5, Math.floor(v * 6 * 0.999));
        if (k === autoRef.current) return;
        autoRef.current = k;
        setAuto(k);
        setBeat((b) => b + 1);
      }}
    >
      {(ctx) => ({
        panel: (
          <>
            <form className="headline-form" onSubmit={submit}>
              <label htmlFor="headline">Type a headline</label>
              <div className="headline-row">
                <input id="headline" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Bank posts record profit" maxLength={120} autoComplete="off" />
                <button type="submit" className="btn btn-line" disabled={!text.trim()}>
                  Score it
                </button>
              </div>
            </form>
            <ul className="chips" aria-label="Or try a sample headline">
              {[SAMPLES[1], SAMPLES[3], SAMPLES[8]].map((s) => (
                <li key={s}>
                  <button type="button" className="chip" onClick={() => push(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
            <div className="score" aria-live="polite">
              <p className="score-headline">{marked}</p>
              <dl className="wallet-readout">
                <div>
                  <dt>Score</dt>
                  <dd>
                    <code>
                      {last.score > 0 ? '+' : ''}
                      {last.score.toFixed(2)}
                    </code>
                  </dd>
                </div>
                <div>
                  <dt>Response</dt>
                  <dd className={r.id === 'on' ? 'is-ok' : r.id === 'off' ? 'is-warn' : ''}>
                    {r.label}: {r.action}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="toy-note">A toy that counts words, with sample headlines written for this page. CMOR's system was not this simple.</p>
          </>
        ),
        stage: <SentimentSvg history={history} view={ctx.view} beat={beat} />,
      })}
    </CaseShell>
  );
}

/* ---------- The other ventures, on one timeline ---------- */

const FIRST = 2018;
const LAST = 2026;
const spans = [
  { id: 'chainblock', name: 'Chainblock.app', from: 2018, to: 2020 },
  { id: 'cmor', name: 'CMOR Group', from: 2018, to: 2023 },
  { id: 'keywa', name: 'Keywa', from: 2020, to: 2024 },
  { id: 'myinvestino', name: 'MyInvestino.ir', from: 2020, to: 2025 },
  { id: 'chante', name: 'Chante.app', from: 2020, to: 2025 },
  { id: 'pontemesto', name: 'Pontemesto', from: 2026, to: 2026, open: true },
];
const years = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);

function Ventures() {
  const [hot, setHot] = useState<string | null>(null);
  return (
    <div className="ventures wrap" id="ventures">
      <div className="ventures-head">
        <h3 className="h3">Other ventures, same years</h3>
        <p className="lead-small">Concurrent ventures. Dates show active leadership roles, to the year.</p>
      </div>
      <div className="bento">
        <figure className="bento-time" aria-label="Timeline of ventures, 2018 to 2026">
          <ol className="time-years" aria-hidden="true">
            {years.map((y) => (
              <li key={y}>{y}</li>
            ))}
          </ol>
          <ul className="time-rows">
            {spans.map((s) => (
              <li key={s.id} className={`time-row ${hot && hot !== s.id ? 'is-dim' : ''} ${hot === s.id ? 'is-hot' : ''} ${ventures.some((v) => v.id === s.id) ? 'is-venture' : ''}`}>
                <span className={`time-bar ${s.open ? 'is-open' : ''}`} style={{ gridColumn: `${s.from - FIRST + 1} / ${s.to - FIRST + 2}` }} />
                <span className={`time-label ${s.open ? 'is-before' : ''}`} style={{ gridColumn: s.open ? `${s.from - FIRST - 2} / ${s.from - FIRST + 1}` : `${s.from - FIRST + 1} / ${s.to - FIRST + 2}` }}>
                  <span className="time-name">{s.name}</span>
                  <span className="time-dates">
                    {s.from}
                    {s.open ? ' to present' : ` to ${s.to}`}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </figure>
        {ventures.map((v) => (
          <article
            key={v.id}
            className={`bento-cell bento-${v.id} ${hot === v.id ? 'is-hot' : ''}`}
            onPointerEnter={() => setHot(v.id)}
            onPointerLeave={() => setHot(null)}
            onFocus={() => setHot(v.id)}
            onBlur={() => setHot(null)}
            tabIndex={0}
          >
            <h4 className="bento-name">{v.name}</h4>
            <p className="bento-meta">
              {v.role} · {v.dates}
            </p>
            <p className="bento-text">{v.text}</p>
            <p className="bento-carry">{v.carry}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="section-head wrap">
        <h2 id="work-title" className="h2" data-split>
          Find what is missing. Then build it.
        </h2>
        <p className="lead">
          Three companies. Every case has two views: the product decisions, and the system that came out of them.
        </p>
      </div>
      <Pontemesto />
      <Keywa />
      <Cmor />
      <Ventures />
    </section>
  );
}

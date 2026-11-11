import { useState, type CSSProperties, type ReactNode } from 'react';
import { AnimatePresence, motion, useSpring } from 'motion/react';
import { cmor, figures, keywa, pontemesto, ventures, type Step } from '../lib/content';
import { SPRING, VARIANTS } from '../lib/motion';
import { ArrowOut, Counter, Pic, Seg, glowMove, reduced, Rule } from './ui';
import { GatewayFlow } from './diagrams/GatewayFlow';
import { ThresholdVault } from './diagrams/ThresholdVault';
import { SentimentTape } from './diagrams/SentimentTape';

/* ---------- Four figures on sub-dial registers ---------- */

function Figure({ f }: { f: (typeof figures)[number] }) {
  const hand = useSpring(0, SPRING.hand);
  return (
    <li className="figure">
      <svg className="subdial" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="27" className="subdial-edge" />
        <circle cx="30" cy="30" r="23" className="subdial-min" pathLength={60} strokeDasharray="0.35 0.65" />
        <circle cx="30" cy="30" r="23" className="subdial-hr" pathLength={60} strokeDasharray="0.6 4.4" />
        <motion.g style={{ rotate: hand }}>
          <rect width="60" height="60" fill="none" />
          <path d="M30 35V9" className="subdial-hand" />
        </motion.g>
        <circle cx="30" cy="30" r="2.4" className="subdial-pin" />
      </svg>
      <div>
        <p className="figure-num">
          <span className="figure-pre">{f.prefix}</span>
          <Counter value={f.value} onStart={() => (reduced() ? hand.jump(360) : hand.set(360))} />
          {f.suffix}
        </p>
        <p className="figure-label">{f.label}</p>
        <p className="figure-scope">{f.scope}</p>
      </div>
    </li>
  );
}

export function Telemetry() {
  return (
    <section className="figures" id="figures" aria-labelledby="figures-h">
      <Pic
        className="figures-art"
        name="asset-dial"
        widths={[1100, 2000]}
        sizes="100vw"
        w={2000}
        h={1116}
        alt=""
      />
      <h2 id="figures-h" className="sr-only">
        Four figures on the record
      </h2>
      <ul className="figures-strip" data-in>
        {figures.map((f) => (
          <Figure key={f.id} f={f} />
        ))}
      </ul>
    </section>
  );
}

/* ---------- Case studies ---------- */

type View = 'strategy' | 'system';

function Rail({ steps }: { steps: Step[] }) {
  return (
    <ol className="rail" style={{ '--count': steps.length } as CSSProperties}>
      {steps.map((s, i) => (
        <li key={s.title} style={{ '--n': i } as CSSProperties}>
          <span className="rail-n" aria-hidden="true">
            {i + 1}
          </span>
          <h4>{s.title}</h4>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Case({
  id,
  name,
  meta,
  challenge,
  outcome,
  steps,
  art,
  artAlt,
  systemLabel,
  system,
  extra,
}: {
  id: string;
  name: ReactNode;
  meta: ReactNode;
  challenge: string;
  outcome: string;
  steps: Step[];
  art: string;
  artAlt: string;
  systemLabel: string;
  system: ReactNode;
  extra?: ReactNode;
}) {
  const [view, setView] = useState<View>('strategy');
  return (
    <article className="case" id={id} data-case data-view={view}>
      <div className="case-pin">
        <div className="case-copy">
          <h3 className="case-name" data-split>
            {name}
          </h3>
          <p className="case-meta" data-in>
            {meta}
          </p>
          <p className="case-challenge" data-in>
            {challenge}
          </p>
          <p className="case-outcome" data-in>
            {outcome}
          </p>
          {extra}
          <div data-in>
            <Seg
              id={id}
              label={`${id} view`}
              value={view}
              onChange={setView}
              options={[
                { id: 'strategy', label: 'Product strategy' },
                { id: 'system', label: systemLabel },
              ]}
            />
          </div>
        </div>

        <div className="case-stage" data-in onPointerMove={glowMove}>
          <Pic className="case-art" name={art} widths={[900, 1600]} sizes="(min-width: 1000px) 58vw, 100vw" w={1600} h={1195} alt={artAlt} />
          <AnimatePresence mode="wait" initial={false}>
            {view === 'strategy' ? (
              <motion.div key="strategy" className="case-view case-view-strategy" {...VARIANTS.swap}>
                <Rail steps={steps} />
              </motion.div>
            ) : (
              <motion.div key="system" className="case-view case-view-system" {...VARIANTS.swap}>
                {system}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function Ventures() {
  return (
    <div className="ventures">
      <div className="ventures-note" data-in>
        <h3 data-split>The other builds</h3>
        <p>Three more ventures ran beside the main ones. The dates show active leadership roles.</p>
      </div>
      {ventures.map((v) => (
        <article key={v.id} className={`venture venture-${v.id}`} data-in onPointerMove={glowMove}>
          <h4>{v.name}</h4>
          <p className="venture-meta">
            {v.role} <span className="venture-dates">{v.dates}</span>
          </p>
          <p className="venture-text">{v.text}</p>
          <p className="venture-carry">{v.carry}</p>
        </article>
      ))}
    </div>
  );
}

export function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-h">
      <header className="section-head">
        <h2 id="work-h" data-split>
          Three products, opened up.
        </h2>
        <p data-in>
          Each one began with a real need and no path to it. Read the product view, then switch to the system view and run the mechanism yourself.
        </p>
        <Rule />
      </header>

      <Case
        id={pontemesto.id}
        name={pontemesto.name}
        meta={
          <>
            {pontemesto.role} · {pontemesto.dates} ·{' '}
            <a href={pontemesto.link.href} target="_blank" rel="noreferrer">
              {pontemesto.link.label}
              <ArrowOut />
            </a>
          </>
        }
        challenge={pontemesto.challenge}
        outcome={pontemesto.outcome}
        steps={pontemesto.steps}
        art="asset-pontemesto"
        artAlt="3D render: steel hub nodes on a black plane, joined by glowing emerald conduits, with one larger glass-topped gateway node."
        systemLabel="Payment route"
        system={<GatewayFlow />}
      />

      <Case
        id={keywa.id}
        name={
          <>
            {keywa.name} <small>{keywa.aka}</small>
          </>
        }
        meta={
          <>
            {keywa.role} · {keywa.dates} · {keywa.note}
          </>
        }
        challenge={keywa.challenge}
        outcome={keywa.outcome}
        steps={keywa.steps}
        art="asset-keywa"
        artAlt="3D render: three interlocking titanium rings around a glass core, with small key segments that glow emerald."
        systemLabel="Threshold signing"
        system={<ThresholdVault />}
        extra={
          <p className="case-paper" data-in>
            {keywa.paper}
          </p>
        }
      />

      <Case
        id={cmor.id}
        name={cmor.name}
        meta={
          <>
            {cmor.role} · {cmor.dates} · {cmor.full}
          </>
        }
        challenge={cmor.challenge}
        outcome={cmor.outcome}
        steps={cmor.steps}
        art="asset-cmor"
        artAlt="3D render: a steel stylus draws a glowing amber line on smoked glass while paper slivers turn into cyan particles."
        systemLabel="News sentiment"
        system={<SentimentTape />}
      />

      <Ventures />
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  figures,
  footnotes,
  jobs,
  parts,
  projects,
  site,
  statement,
  statementAfter,
  statementMark,
} from '../lib/content';
import { Arrow, ArrowOut, Magnetic, Pic, Print, glowMove } from './ui';

const fmt = (n: number) => n.toLocaleString('en-US');

/* ---------- Hero: the table ---------- */

export function Hero() {
  return (
    <section id="top" className="hero on-mat">
      <div className="hero-art" data-hero-art>
        <div className="hero-frame" data-hero-frame>
          <Pic
            name="hero"
            widths={[960, 1600, 2400]}
            sizes="(min-width: 768px) 110vw, 230vw"
            w={2400}
            h={1340}
            eager
            alt="Model photo: a white card bridge on a green cutting mat. One span of the bridge is yellow. Tiny figures in navy suits stand on the deck, and one holds a ladder against a pier."
          />
          <p className="callout" style={{ left: '50.5%', top: '30%' }} data-hero-in="callout">
            <span className="callout-dot" aria-hidden="true" />
            <span className="callout-line" aria-hidden="true" />
            <span className="callout-text">The missing span, set in place</span>
          </p>
        </div>
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-print" data-hero-in="print">
        <Print caption="Ali, at 1:1">
          <div className="print-photo grain">
            <Pic
              name="ali"
              widths={[800, 1312]}
              sizes="(min-width: 768px) 16vw, 31vw"
              w={1312}
              h={1199}
              eager
              alt="Ali Nojoumi. A studio portrait in a navy jacket, chin on his hand."
            />
          </div>
        </Print>
      </div>

      <div className="hero-copy">
        <h1 className="hero-name" data-hero-in="name" aria-label={site.name}>
          <span aria-hidden="true">Ali</span>
          <span aria-hidden="true">Nojoumi</span>
        </h1>
        <p className="hero-role" data-hero-in="role">
          Product leader for payments and digital asset platforms. I build the missing piece between a real need and a
          live product.
        </p>
        <div className="hero-actions" data-hero-in="actions">
          <span className="act">
            <Magnetic>
              <a className="btn btn-yellow" href={site.mailto}>
                Start a conversation <Arrow />
              </a>
            </Magnetic>
          </span>
          <span className="act">
            <a className="btn btn-ghost" href="#models">
              See the models
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Statement ---------- */

export function Statement() {
  const [before, after] = statement.split(statementMark);
  return (
    <section className="statement on-mat">
      <div className="wrap">
        <p className="statement-text" data-split="lines" data-mark-host>
          {before}
          <mark data-mark>{statementMark}</mark>
          {after}
        </p>
        <div className="statement-after">
          {statementAfter.map((t) => (
            <p key={t} className="lead" data-in>
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Figures: the drawing sheet ---------- */

export function Figures() {
  return (
    <section id="figures" className="figures">
      <div className="wrap">
        <div className="card sheet glow on-card" onPointerMove={glowMove} data-in="card">
          <div className="sheet-head">
            <h2 className="h2" data-split="lines">
              Four things
              <br />I can measure
            </h2>
            <p className="muted" style={{ maxWidth: '24em', margin: 0 }}>
              Each figure comes from my resume, dated October 2026. The lines are drawn to show order, not exact scale.
            </p>
          </div>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {figures.map((f) => (
              <li key={f.text} className="fig">
                <p className="fig-num">
                  {f.before && <small>{f.before}</small>}
                  <span data-count={f.value}>{fmt(f.value)}</span>
                  {f.after && <small className="after">{f.after}</small>}
                </p>
                <div>
                  <div className="dim" style={{ ['--span' as string]: f.span }}>
                    <span className="dim-label tag">{f.source}</span>
                    <span className="dim-line" data-draw />
                  </div>
                  <p className="fig-text">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Scale: one founder, a whole team ---------- */

type ScaleMode = 'one' | 'team';

export function Scale() {
  // Without scripts the team picture and its numbers show, so the list below makes sense.
  const [mode, setMode] = useState<ScaleMode>('team');
  const [active, setActive] = useState<string | null>(null);
  const photo = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) return;
    setMode('one');
    const el = photo.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setMode('team');
        }, 1400);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const pick = (m: ScaleMode) => {
    touched.current = true;
    setMode(m);
    if (m === 'one') setActive(null);
  };
  const focusJob = (id: string | null) => {
    touched.current = true;
    if (id) setMode('team');
    setActive(id);
  };

  const loupeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || mode !== 'one') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lx', `${e.clientX - r.left}px`);
    el.style.setProperty('--ly', `${e.clientY - r.top}px`);
    el.dataset.loupe = 'on';
  };
  const loupeOff = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.dataset.loupe = 'off';
  };

  const job = jobs.find((j) => j.id === active);
  const zoom = job ? 2.15 : 1;

  return (
    <section id="scale" className="scale on-mat">
      <div className="wrap">
        <h2 className="h2" data-split="lines">
          One founder at 1:1.
          <br />A whole team at 1:87.
        </h2>
        <div className="scale-grid">
          <div className="scale-stick" data-in>
            <Print className="scale-print" tilt={false} caption={
                <>
                  At 1:1 the picture hides the team. Switch to 1:87 to see them.
                  <span className="only-fine"> With a mouse, the lens finds them too.</span>
                </>
              }>
              <div
                ref={photo}
                className="print-photo scale-photo grain"
                data-scale={mode}
                data-loupe="off"
                onPointerMove={loupeMove}
                onPointerLeave={loupeOff}
              >
                <div
                  className="scale-zoom"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: job ? `${job.x * 100}% ${job.y * 100}%` : '50% 50%',
                    ['--z' as string]: zoom,
                  }}
                >
                  <Pic
                    name="ali"
                    widths={[800, 1312]}
                    sizes="(min-width: 1000px) 52vw, 92vw"
                    w={1312}
                    h={1199}
                    alt="Ali Nojoumi. A studio portrait in a navy jacket, chin on his hand."
                  />
                  <Pic
                    className="scale-team"
                    name="ali-minis"
                    widths={[800, 1312]}
                    sizes="(min-width: 1000px) 52vw, 92vw"
                    w={1312}
                    h={1199}
                    alt="The same portrait with seven small copies of Ali on his jacket. One types on a laptop, one climbs a ladder, one thinks under a light bulb, one shouts through a megaphone, one wears sunglasses, one fills in a checklist and one sleeps."
                  />
                  <AnimatePresence>
                    {mode === 'team' &&
                      jobs.map((j, i) => (
                        <motion.button
                          key={j.id}
                          type="button"
                          className="pin"
                          style={{ left: `${j.x * 100}%`, top: `${j.y * 100}%` }}
                          initial={{ opacity: 0, scale: 0.2, y: -18 }}
                          animate={{ opacity: 1, scale: 1 / zoom, y: 0 }}
                          exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.15 } }}
                          transition={{ type: 'spring', stiffness: 380, damping: 20, delay: active ? 0 : 0.25 + i * 0.07 }}
                          aria-pressed={active === j.id}
                          aria-label={`${i + 1}. ${j.label}`}
                          onClick={() => focusJob(active === j.id ? null : j.id)}
                        >
                          <i>{i + 1}</i>
                        </motion.button>
                      ))}
                  </AnimatePresence>
                </div>
                <div className="scale-loupe" aria-hidden="true">
                  <img src="/art/ali-minis-1312.webp" alt="" loading="lazy" decoding="async" width={1312} height={1199} />
                </div>
                <span className="scale-ring" aria-hidden="true" />
              </div>
            </Print>
          </div>

          <div>
            <p className="lead" data-in>
              At the start, a product has no team. One person does each job until the team exists. Change the scale to
              see the jobs.
            </p>
            <div className="switch" role="group" aria-label="Scale of the picture" style={{ marginTop: '1.6rem' }} data-in>
              {(
                [
                  ['one', '1:1', 'One founder'],
                  ['team', '1:87', 'The team'],
                ] as const
              ).map(([m, ratio, label]) => (
                <button key={m} type="button" aria-pressed={mode === m} onClick={() => pick(m)}>
                  {mode === m && (
                    <motion.i
                      layoutId="switch-thumb"
                      className="switch-thumb"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span>
                    <b>{ratio}</b>
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <ol className="jobs" onPointerLeave={() => active && setActive(null)}>
              {jobs.map((j, i) => (
                <li key={j.id} data-in>
                  <button
                    type="button"
                    className="job"
                    aria-pressed={active === j.id}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && focusJob(j.id)}
                    onFocus={() => focusJob(j.id)}
                    onClick={() => focusJob(active === j.id && !window.matchMedia('(hover: hover)').matches ? null : j.id)}
                  >
                    <span className="job-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="job-label">{j.label}</span>
                    <span className="job-note">{j.note}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Models: five stacked boards ---------- */

const PHOTO_SIZE: Record<string, [number, number]> = {
  pontemesto: [1400, 1045],
  keywa: [1400, 1045],
  manyworld: [1400, 1045],
  triallens: [1400, 1012],
  crowdlens: [1400, 1045],
};

export function Models() {
  return (
    <section id="models" className="models">
      <div className="wrap">
        <div className="models-head on-mat">
          <h2 className="h2" data-split="lines">
            Five models
            <br />
            on the table
          </h2>
          <p className="lead" data-in>
            Each model stands for a product I built. The products are real. The model photos are generated pictures.
          </p>
        </div>

        {projects.map((p, i) => (
          <article
            key={p.id}
            className="board card glow on-card"
            style={{ ['--i' as string]: i }}
            onPointerMove={glowMove}
            data-board
          >
            <div className="board-in">
              <div className="board-photo grain">
                <Pic
                  name={p.id}
                  widths={[800, 1400]}
                  sizes="(min-width: 900px) 50vw, 92vw"
                  w={PHOTO_SIZE[p.id][0]}
                  h={PHOTO_SIZE[p.id][1]}
                  alt={p.alt}
                />
                <p className="board-cap" style={{ margin: 0 }}>
                  {p.model}
                </p>
              </div>
              <div className="board-text">
                <h3 className="board-name">{p.name}</h3>
                <p className="tag muted" style={{ margin: '0.75rem 0 0' }}>
                  {p.kind}
                </p>
                <p className="muted" style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>
                  {p.role}
                </p>
                <p className="board-line">{p.line}</p>
                <ul className="board-points">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {p.href && (
                  <div className="board-foot">
                    <a className="btn btn-ink" href={p.href} target="_blank" rel="noreferrer">
                      {p.hrefLabel} <ArrowOut />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Parts list ---------- */

export function Parts() {
  return (
    <section id="parts" className="parts on-mat">
      <div className="wrap">
        <h2 className="h2" data-split="lines">
          Other parts
          <br />I cut
        </h2>
        <div className="parts-table">
          {parts.map((p) => (
            <article key={p.name} className="part" data-in>
              <p className="part-years" style={{ margin: 0 }}>
                {p.years}
              </p>
              <div>
                <h3 className="part-name">
                  <span>{p.name}</span>
                </h3>
                <p className="tag muted" style={{ margin: '0.45rem 0 0' }}>
                  {p.role}
                </p>
              </div>
              <p className="part-text">{p.text}</p>
            </article>
          ))}
        </div>
        <dl className="notes">
          {footnotes.map((n) => (
            <div key={n.label} data-in>
              <dt className="tag">{n.label}</dt>
              <dd>{n.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="card contact-card glow on-card" onPointerMove={glowMove} data-in="card">
          <div>
            <h2 className="contact-title" data-split="lines">
              Is a piece <em>missing</em> on your table?
            </h2>
            <p className="lead muted" style={{ marginTop: '1.6rem' }}>
              I would welcome a conversation about your team's priorities and where I could contribute. I am in
              Toronto, and open to GTA, remote and relocation anywhere in Canada.
            </p>
            <div className="contact-links">
              <Magnetic>
                <a className="btn btn-yellow" href={site.mailto}>
                  Email Ali <Arrow />
                </a>
              </Magnetic>
              <a className="btn btn-ghost" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowOut />
              </a>
              <a className="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
                GitHub <ArrowOut />
              </a>
            </div>
            <p className="muted" style={{ margin: '1.1rem 0 0', fontSize: '0.95rem' }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <Print className="sleeper" tape="top" caption="The 1:87 Ali sleeps. The 1:1 Ali answers email.">
            <div className="print-photo grain">
              <img
                src="/art/ali-minis-1312.webp"
                width={1312}
                height={1199}
                loading="lazy"
                decoding="async"
                alt="A small copy of Ali asleep on his folded arms, with three letters Z above his head."
              />
            </div>
          </Print>
        </div>
        <footer className="foot">
          <p>© 2026 Ali Nojoumi. Toronto.</p>
          <p>Model photos: generated with Krea. Portraits: supplied by Ali.</p>
        </footer>
      </div>
    </section>
  );
}

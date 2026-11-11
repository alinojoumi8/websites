/** Skills mapped to proof, with pill filters. Then education and languages. */
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { education, languages, proofs, skills, type SkillId } from '../lib/content';
import { listItem } from '../lib/motion';

export default function Fit() {
  const [skill, setSkill] = useState<SkillId | 'all'>('all');
  const shown = proofs.filter((p) => skill === 'all' || p.skills.includes(skill));
  const label = skill === 'all' ? 'all skills' : skills.find((s) => s.id === skill)!.label;
  return (
    <section id="fit" className="fit" aria-labelledby="fit-title">
      <div className="section-head wrap">
        <h2 id="fit-title" className="h2" data-split>
          Eight skills. Each one has proof.
        </h2>
        <p className="lead">Pick a skill. The list shows where it was used.</p>
      </div>
      <div className="fit-grid wrap">
        <div className="pills" role="group" aria-label="Filter the proof by skill">
          <button type="button" className={`pill ${skill === 'all' ? 'is-on' : ''}`} aria-pressed={skill === 'all'} onClick={() => setSkill('all')}>
            All skills
            <span className="pill-count">{proofs.length}</span>
          </button>
          {skills.map((s) => (
            <button key={s.id} type="button" className={`pill ${skill === s.id ? 'is-on' : ''}`} aria-pressed={skill === s.id} onClick={() => setSkill(skill === s.id ? 'all' : s.id)}>
              {s.label}
              <span className="pill-count">{proofs.filter((p) => p.skills.includes(s.id)).length}</span>
            </button>
          ))}
        </div>
        <div className="proofs">
          <p className="proofs-count" aria-live="polite">
            {shown.length} of {proofs.length} proof points for {label}
          </p>
          <ul className="proofs-list">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li key={p.id} layout variants={listItem} initial="hidden" animate="shown" exit="gone" className="proof">
                  <span className="proof-at">{p.at}</span>
                  <span className="proof-text">{p.text}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
      <div className="background wrap">
        <div>
          <h3 className="h3">Education</h3>
          <dl className="facts">
            {education.map((e) => (
              <div key={e.title}>
                <dt>{e.title}</dt>
                <dd>
                  {e.where} <span className="facts-when">{e.when}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="h3">Languages</h3>
          <dl className="facts">
            {languages.map((l) => (
              <div key={l.name}>
                <dt>{l.name}</dt>
                <dd>{l.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

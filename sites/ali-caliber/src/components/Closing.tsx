import { useState } from 'react';
import { motion } from 'motion/react';
import { education, languages, proofs, site, skills, type SkillId } from '../lib/content';
import { ArrowOut, Download, Magnetic, Monogram, Pic, glowMove, Rule } from './ui';

/* ---------- Fit: pick a skill, see the proof ---------- */

export function Fit() {
  const [skill, setSkill] = useState<SkillId | 'all'>('all');
  const hit = (p: (typeof proofs)[number]) => skill === 'all' || p.skills.includes(skill);
  const ordered = [...proofs].sort((a, b) => Number(hit(b)) - Number(hit(a)));
  const n = proofs.filter(hit).length;
  const label = skill === 'all' ? 'all eight skills' : skills.find((s) => s.id === skill)!.label;

  return (
    <section className="fit" id="fit" aria-labelledby="fit-h">
      <header className="section-head">
        <h2 id="fit-h" data-split>
          Pick a skill. See the proof.
        </h2>
        <p data-in>Eight skills a product director needs in payments and digital assets. Each one points at work that shipped.</p>
        <Rule />
      </header>

      <div className="fit-grid">
        <div className="pills" role="group" aria-label="Skills" data-in>
          <button type="button" className="pill" aria-pressed={skill === 'all'} onClick={() => setSkill('all')}>
            All skills
          </button>
          {skills.map((s) => (
            <button key={s.id} type="button" className="pill" aria-pressed={skill === s.id} onClick={() => setSkill(s.id)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="proofs" data-in>
          <p className="proofs-count" aria-live="polite">
            <b>{n}</b> {n === 1 ? 'proof' : 'proofs'} for {label}
          </p>
          <ul>
            {ordered.map((p) => (
              <motion.li key={p.id} layout="position" transition={{ type: 'spring', stiffness: 320, damping: 34 }} data-on={hit(p) || undefined}>
                <span className="proof-at">{p.at}</span>
                <span className="proof-text">{p.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="school" data-in>
        <h3>Education and languages</h3>
        <dl>
          {education.map((e) => (
            <div key={e.title}>
              <dt>{e.title}</dt>
              <dd>
                {e.where} <span>{e.when}</span>
              </dd>
            </div>
          ))}
          <div>
            <dt>Languages</dt>
            <dd>
              {languages.map((l) => (
                <span key={l.name} className="lang">
                  {l.name} <span>{l.level}</span>
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

export function Contact() {
  const keys = [
    { id: 'email', label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <ArrowOut />, gold: true },
    { id: 'linkedin', label: 'LinkedIn', value: site.linkedinLabel, href: site.linkedin, icon: <ArrowOut />, out: true },
    { id: 'github', label: 'GitHub', value: site.githubLabel, href: site.github, icon: <ArrowOut />, out: true },
    { id: 'dossier', label: 'Executive dossier', value: 'PDF, two pages', href: site.dossier, icon: <Download />, download: true },
  ];
  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <Pic
        className="contact-art"
        name="asset-movement"
        widths={[1100, 2000]}
        sizes="100vw"
        w={2000}
        h={1116}
        alt="Macro photo of a watch movement through a glass case back: steel bridges, gold gears and green jewels."
      />
      <div className="contact-in">
        <img className="contact-mark" src="/art/logo-an-320.webp" srcSet="/art/logo-an-320.webp 1x, /art/logo-an-640.webp 2x" width="320" height="286" alt="" loading="lazy" data-in />
        <h2 id="contact-h" data-split>
          Tell me what is missing on your team.
        </h2>
        <p className="contact-line" data-in>
          I would welcome a conversation about your priorities and where I could contribute. I am based in {site.location}. {site.open}
        </p>
        <ul className="keys">
          {keys.map((k) => (
            <li key={k.id} data-in>
              <Magnetic strength={0.18}>
                <a
                  className={`key${k.gold ? ' key-gold' : ''}`}
                  href={k.href}
                  onPointerMove={glowMove}
                  {...(k.out ? { target: '_blank', rel: 'noreferrer' } : {})}
                  {...(k.download ? { download: '' } : {})}
                >
                  <span className="key-label">{k.label}</span>
                  <span className="key-value">{k.value}</span>
                  {k.icon}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <p className="foot-brand">
        <Monogram />
        {site.name}
      </p>
      <p>The demos on this page are small models with sample data. The figures come from his resume, dated October 2026.</p>
      <p>
        <a href="#top">Back to the top</a>
      </p>
    </footer>
  );
}

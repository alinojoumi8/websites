/** The lab: one console, three open-source projects, each as a small toy that runs here. */
import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { lab } from '../lib/content';
import { face } from '../lib/motion';
import { Icon } from './ui';
import { Cover } from './Work';
import Manyworld from './lab/Manyworld';
import TrialLens from './lab/TrialLens';
import CrowdLens from './lab/CrowdLens';

const TABS = [
  { id: 'manyworld', data: lab.manyworld, status: 'Open source', note: 'A toy world with six agents, written for this page. The real platform runs far larger experiments.' },
  { id: 'triallens', data: lab.triallens, status: 'Open source · experimental', note: 'The matter and its four exhibits are invented. This is a rehearsal tool, not legal advice.' },
  { id: 'crowdlens', data: lab.crowdlens, status: 'In development', note: 'The scenarios and the audience are invented. Results show the idea, not a forecast.' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function Lab() {
  const [tab, setTab] = useState<TabId>('manyworld');
  const panel = useRef<HTMLDivElement>(null);
  const inView = useInView(panel, { amount: 0.15 });
  const current = TABS.find((t) => t.id === tab)!;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex((t) => t.id === tab);
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % TABS.length : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i + TABS.length - 1) % TABS.length : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next].id);
    (e.currentTarget.querySelectorAll('[role="tab"]')[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="lab" className="lab" aria-labelledby="lab-title">
      <header className="case-cover lab-cover">
        <Cover name="asset-simulations" alt="A dark plane covered with a network of small lights, amber in some clusters and cyan in others, with tiny models of a house, an office block, a bank and a courthouse among them." />
        <div className="case-cover-copy wrap">
          <h2 id="lab-title" className="case-name">
            The lab
          </h2>
          <p className="case-outcome">Three open-source projects that keep the work hands-on. Each one runs here as a small toy with sample data.</p>
        </div>
      </header>
      <div className="lab-console wrap">
        <div className="lab-tabs" role="tablist" aria-label="Lab projects" aria-orientation="vertical" onKeyDown={onKey}>
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls="lab-panel" tabIndex={tab === t.id ? 0 : -1} className={`lab-tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>
              <span className="lab-tab-name">{t.data.name}</span>
              <span className="lab-tab-kind">{t.data.kind}</span>
              <span className="lab-tab-status">{t.status}</span>
            </button>
          ))}
        </div>
        <div ref={panel} className="lab-panel" role="tabpanel" id="lab-panel" aria-labelledby={`tab-${tab}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} variants={face} initial="hidden" animate="shown" exit="hidden">
              <div className="lab-about">
                <p>{current.data.text}</p>
                <a className="repo" href={current.data.href} rel="noopener" target="_blank">
                  <Icon name="github" size={16} />
                  {current.data.repo}
                  <Icon name="arrowUpRight" size={14} />
                </a>
              </div>
              {tab === 'manyworld' && <Manyworld active={inView} />}
              {tab === 'triallens' && <TrialLens />}
              {tab === 'crowdlens' && <CrowdLens />}
              <p className="toy-note">{current.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

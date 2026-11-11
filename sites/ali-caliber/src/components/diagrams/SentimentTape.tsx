import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { SPRING } from '../../lib/motion';
import { reduced } from '../ui';

const SAMPLES = [
  'Central bank cuts rates as inflation cools',
  'Exporter misses earnings and cuts forecast',
  'Chipmaker beats estimates on record demand',
  'Regulator opens probe into regional lender',
  'Trade talks stall while markets wait for data',
  'Currency slides after surprise rate hike',
];

const POS = ['cuts rates', 'beats', 'record', 'surge', 'surges', 'rally', 'rallies', 'upgrade', 'upgrades', 'growth', 'strong', 'cools', 'approval', 'approves', 'wins', 'profit', 'expands', 'recovery', 'rebounds', 'jumps', 'gains', 'eases'];
const NEG = ['cuts forecast', 'misses', 'plunge', 'plunges', 'selloff', 'downgrade', 'downgrades', 'recession', 'default', 'weak', 'hike', 'sanctions', 'probe', 'loss', 'losses', 'layoffs', 'falls', 'slides', 'stall', 'stalls', 'fraud', 'crisis', 'warns', 'slump'];

export function score(text: string) {
  let t = ` ${text.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ')} `;
  const hits: { word: string; sign: 1 | -1 }[] = [];
  const take = (list: string[], sign: 1 | -1) => {
    // phrases first, so "cuts rates" and "cuts forecast" are read whole
    for (const w of [...list].sort((a, b) => b.length - a.length)) {
      if (t.includes(` ${w} `)) {
        hits.push({ word: w, sign });
        t = t.replace(` ${w} `, ' _ ');
      }
    }
  };
  take(POS, 1);
  take(NEG, -1);
  const p = hits.filter((h) => h.sign === 1).length;
  const n = hits.length - p;
  const value = hits.length ? (p - n) / Math.max(2, p + n) : 0;
  return { value, hits };
}

const call = (v: number) => (v >= 0.4 ? 'Open a long bias' : v <= -0.4 ? 'Open a short bias' : 'Stand aside');

export function SentimentTape() {
  const [text, setText] = useState(SAMPLES[0]);
  const [auto, setAuto] = useState(true);
  const idx = useRef(0);
  const inputId = useId();
  const s = useMemo(() => score(text), [text]);
  const needle = useSpring(0, SPRING.needle);

  useEffect(() => {
    const to = s.value * 78;
    if (reduced()) needle.jump(to);
    else needle.set(to);
  }, [s.value, needle]);

  useEffect(() => {
    if (!auto || reduced()) return;
    const id = window.setInterval(() => {
      idx.current = (idx.current + 1) % SAMPLES.length;
      setText(SAMPLES[idx.current]);
    }, 3400);
    return () => window.clearInterval(id);
  }, [auto]);

  const ticks = Array.from({ length: 21 }, (_, i) => -78 + (i * 156) / 20);
  const tone = s.value >= 0.4 ? 'long' : s.value <= -0.4 ? 'short' : 'flat';

  return (
    <div className="diagram diagram-tape">
      <div className="tape">
        <label htmlFor={inputId}>Write a headline, or pick one</label>
        <input
          id={inputId}
          type="text"
          value={text}
          maxLength={90}
          spellCheck={false}
          autoComplete="off"
          onFocus={() => setAuto(false)}
          onChange={(e) => {
            setAuto(false);
            setText(e.target.value);
          }}
        />
        <ul className="tape-list">
          {SAMPLES.map((h) => (
            <li key={h}>
              <button
                type="button"
                aria-pressed={h === text}
                onClick={() => {
                  setAuto(false);
                  setText(h);
                }}
              >
                {h}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="gauge" data-tone={tone}>
        <svg viewBox="0 0 240 150" aria-hidden="true">
          <g id="gauge-ticks" stroke="#94a3b8" strokeLinecap="square">
            {ticks.map((a, i) => (
              <line key={i} x1="120" y1={i % 5 === 0 ? 18 : 24} x2="120" y2="32" strokeWidth={i % 5 === 0 ? 2 : 1} strokeOpacity={i % 5 === 0 ? 0.9 : 0.45} transform={`rotate(${a} 120 128)`} />
            ))}
          </g>
          <motion.g id="gauge-needle" style={{ rotate: needle }}>
            {/* this empty square puts the centre of the group on the hub, so the needle turns about it */}
            <rect x="6" y="14" width="228" height="228" fill="none" />
            <path d="M120 128V30" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M120 128v14" stroke="#d4af37" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
          <circle cx="120" cy="128" r="6" fill="#0b0f16" stroke="#cbd5e1" strokeWidth="1.5" />
        </svg>
        <div className="gauge-scale" aria-hidden="true">
          <span>Short</span>
          <span>Flat</span>
          <span>Long</span>
        </div>
        <div className="gauge-out" aria-live="polite">
          <p className="gauge-score">
            {s.value > 0 ? '+' : s.value < 0 ? '−' : ''}
            {Math.abs(s.value).toFixed(2)}
          </p>
          <p className="gauge-call">{call(s.value)}</p>
          <p className="gauge-why">
            {s.hits.length ? (
              <>
                Read:{' '}
                {s.hits.map((h, i) => (
                  <span key={i} data-sign={h.sign}>
                    {h.word}
                  </span>
                ))}
              </>
            ) : (
              'No signal words found.'
            )}
          </p>
        </div>
        <p className="demo-note">A toy word list that runs in your browser, with headlines written for this page. The CMOR system was a larger build.</p>
      </div>
    </div>
  );
}

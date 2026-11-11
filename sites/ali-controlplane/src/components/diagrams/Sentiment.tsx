/**
 * CMOR Group: a toy news-sentiment engine as an isometric model.
 * Headlines ride a rail into a scorer; each score sets the height of a fin and bends a line.
 * The scorer only counts words. It stands in for the idea, not for CMOR's system.
 */
import { motion } from 'motion/react';
import { isoSpace, type Tone } from '../../lib/iso';
import { spring, time } from '../../lib/motion';
import { Floor, LiveSlab, Slab, Tag } from '../ui';
import type { View } from './Routing';

const UP = ['beats', 'beat', 'surge', 'surges', 'rally', 'rallies', 'record', 'growth', 'grows', 'upgrade', 'upgrades', 'approval', 'approves', 'cut', 'cuts', 'eases', 'strong', 'profit', 'gains', 'rebound', 'rebounds', 'deal', 'expands', 'raises', 'tops', 'recovers', 'wins'];
const DOWN = ['misses', 'miss', 'plunge', 'plunges', 'falls', 'fall', 'default', 'defaults', 'downgrade', 'downgrades', 'probe', 'lawsuit', 'recall', 'weak', 'loss', 'losses', 'layoffs', 'sanctions', 'warns', 'warning', 'hike', 'hikes', 'slump', 'slumps', 'halts', 'bankruptcy', 'fraud', 'tariffs', 'strike', 'shortage'];

export type Scored = { text: string; score: number; hits: { word: string; sign: 1 | -1 }[] };

/** Count the words that lean up or down. That is the whole model. */
export function scoreHeadline(text: string): Scored {
  const hits: Scored['hits'] = [];
  for (const raw of text.toLowerCase().split(/[^a-z]+/)) {
    if (UP.includes(raw)) hits.push({ word: raw, sign: 1 });
    else if (DOWN.includes(raw)) hits.push({ word: raw, sign: -1 });
  }
  const sum = hits.reduce((n, h) => n + h.sign, 0);
  const score = hits.length ? Math.max(-1, Math.min(1, sum / (hits.length + 0.6))) : 0;
  return { text, score: Math.round(score * 100) / 100, hits };
}

export const respond = (score: number) =>
  score >= 0.3 ? { id: 'on', label: 'Risk on', action: 'add exposure' } : score <= -0.3 ? { id: 'off', label: 'Risk off', action: 'cut exposure' } : { id: 'hold', label: 'Hold', action: 'send no order' };

/** Sample headlines written for this page. None is a real news item. */
export const SAMPLES = [
  'Central bank cuts rates as inflation eases',
  'Chipmaker beats forecasts and raises guidance',
  'Retailer warns of weak holiday sales',
  'Regulator opens probe into lender after losses',
  'Oil falls as supply recovers',
  'Airline halts flights during pilot strike',
  'Bank posts record profit on strong trading',
  'Automaker announces recall and layoffs',
  'Currency rebounds after trade deal',
  'Tech shares slump as tariffs hit exports',
  'Insurer wins approval for merger',
  'Port shortage delays shipments, exporter warns',
];
export const FINS = 12;
export const initialHistory = () => SAMPLES.slice(0, FINS).map(scoreHeadline);

const iso = isoSpace(57, 300, 36);
const finH = (score: number) => 0.55 + (score + 1) * 0.75;
const finX = (i: number) => 7.5 + i * 0.6;

export function SentimentSvg({ history, view = 'architecture', beat = 0 }: { history: Scored[]; view?: View; beat?: number }) {
  const last = history[history.length - 1];
  const line =
    `M${iso.pt(6.7, 3.45, 1).join(' ')}` + history.map((s, i) => `L${iso.pt(finX(i) + 0.17, 3.45, finH(s.score)).join(' ')}`).join('');
  const r = respond(last.score);
  const tone = (s: Scored, i: number): Tone => (i !== history.length - 1 ? 'titanium' : s.score >= 0.3 ? 'live' : s.score <= -0.3 ? 'gold' : 'slate');
  const step = iso.pt(0.85, 0)[0] - iso.pt(0, 0)[0];
  const stepY = iso.pt(0.85, 0)[1] - iso.pt(0, 0)[1];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 690" role="img" aria-labelledby="sentiment-title sentiment-desc" className="diagram-svg">
      <title id="sentiment-title">A toy news-sentiment engine</title>
      <desc id="sentiment-desc">
        Headlines enter a scorer. Each score becomes one bar and one point on a line. The newest score is {last.score.toFixed(2)}, and the response is {r.label}: {r.action}.
      </desc>
      <Floor iso={iso} x0={-0.9} x1={15.1} y0={2} y1={5} />
      <g id="headline-rail">
        <Slab iso={iso} x={-0.6} y={3.0} w={5.4} d={0.95} h={0.1} tone="titanium" />
        <motion.g key={beat} initial={beat ? { x: -step, y: -stepY } : false} animate={{ x: 0, y: 0 }} transition={time.cardShift}>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={iso.tile(-0.3 + i * 0.85, 3.14, 0.56, 0.66, 0.13)} fill="#e9edf3" fillOpacity={0.5 + i * 0.1} />
          ))}
        </motion.g>
      </g>
      <g id="scorer">
        <Slab iso={iso} x={4.8} y={2.5} w={1.9} d={1.9} h={1.9} tone="glass" />
      </g>
      <g id="fins">
        {history.map((s, i) => (
          <LiveSlab key={i} iso={iso} x={finX(i)} y={2.9} w={0.34} d={1.1} h={finH(s.score)} tone={tone(s, i)} />
        ))}
      </g>
      <g id="signal-line" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <motion.path initial={false} animate={{ d: line }} transition={{ type: 'spring', ...spring.panel }} stroke="#d4af37" strokeOpacity="0.3" strokeWidth="8" />
        <motion.path initial={false} animate={{ d: line }} transition={{ type: 'spring', ...spring.panel }} stroke="#f2cf63" strokeWidth="2.2" />
      </g>
      {(['strategy', 'architecture'] as View[]).map((v) => (
        <g key={v} id={`labels-${v}`} opacity={view === v ? 1 : 0} style={{ transition: 'opacity .45s' }} aria-hidden={view !== v}>
          <Tag at={iso.pt(1.2, 3.95, 0.1)} title={v === 'strategy' ? 'Global news' : 'Headline stream'} anchor="end" dy={30} />
          <Tag at={iso.pt(4.8, 2.5, 1.9)} title={v === 'strategy' ? 'Read it first' : 'Sentiment scorer'} sub={v === 'strategy' ? 'faster than a person' : 'a word counter here'} dy={-20} />
          <Tag at={iso.pt(finX(FINS - 1) + 0.6, 4.0, 0)} title={v === 'strategy' ? 'Automated response' : `${r.label}: ${r.action}`} sub={v === 'strategy' ? undefined : `score ${last.score > 0 ? '+' : ''}${last.score.toFixed(2)}`} anchor="end" dy={34} />
        </g>
      ))}
    </svg>
  );
}

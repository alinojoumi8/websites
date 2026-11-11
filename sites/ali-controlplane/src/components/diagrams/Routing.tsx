/**
 * Pontemesto: payment routing as an isometric model.
 * One SVG, named layers: #floor, #rails, #nodes, #labels-strategy, #labels-architecture, #packet.
 */
import { type KeyboardEvent, type RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';
import { isoSpace, type Tone } from '../../lib/iso';
import { Conduit, Floor, Slab, Tag } from '../ui';

export type NodeId = 'merchant' | 'onboarding' | 'gateway' | 'exchange' | 'liquidity' | 'settlement';
export type View = 'strategy' | 'architecture';

const iso = isoSpace(50, 320, 72);

type Box = { id: NodeId; key: string; x: number; y: number; w: number; d: number; h: number; tone: Tone };
const boxes: Box[] = [
  { id: 'merchant', key: 'merchant-1', x: 0.2, y: 0.4, w: 1.5, d: 1.3, h: 0.3, tone: 'stone' },
  { id: 'merchant', key: 'merchant-2', x: 0.2, y: 2.5, w: 1.5, d: 1.3, h: 0.3, tone: 'stone' },
  { id: 'merchant', key: 'merchant-3', x: 0.2, y: 4.6, w: 1.5, d: 1.3, h: 0.3, tone: 'stone' },
  { id: 'onboarding', key: 'onboarding', x: 3.0, y: 2.0, w: 1.7, d: 2.3, h: 0.5, tone: 'slate' },
  { id: 'gateway', key: 'gateway', x: 5.7, y: 1.8, w: 1.8, d: 2.7, h: 1.5, tone: 'glass' },
  { id: 'exchange', key: 'exchange', x: 9.3, y: 0.2, w: 1.8, d: 1.6, h: 0.7, tone: 'slate' },
  { id: 'liquidity', key: 'liquidity', x: 9.3, y: 3.1, w: 1.8, d: 1.6, h: 0.7, tone: 'slate' },
  { id: 'settlement', key: 'settlement', x: 12.7, y: 2.8, w: 1.9, d: 2.1, h: 1.0, tone: 'titanium' },
];

// The boxes stand apart, so every rail between them stays in view.
const rails = {
  merchants: iso.rail([[1.7, 1.05], [2.35, 1.05], [2.35, 2.6], [3.0, 2.6]]) + iso.rail([[1.7, 3.15], [3.0, 3.15]]) + iso.rail([[1.7, 5.25], [2.35, 5.25], [2.35, 3.7], [3.0, 3.7]]),
  onboard: iso.rail([[4.7, 3.15], [5.7, 3.15]]),
  fan: iso.rail([[7.5, 2.4], [8.4, 2.4], [8.4, 1.0], [9.3, 1.0]]) + iso.rail([[7.5, 3.9], [9.3, 3.9]]),
  settle: iso.rail([[11.1, 3.9], [12.7, 3.9]]) + iso.rail([[11.1, 1.0], [11.9, 1.0], [11.9, 3.3], [12.7, 3.3]]),
};
/** The road one sample payment takes. */
export const runPath = iso.rail([[1.7, 3.15], [6.6, 3.15], [6.6, 3.9], [13.6, 3.9]]);

type Label = { id: NodeId; at: readonly [number, number]; title: string; sub?: string; anchor?: 'start' | 'middle' | 'end'; dy?: number };
const spots: Record<NodeId, Pick<Label, 'at' | 'anchor' | 'dy'>> = {
  merchant: { at: iso.pt(0.95, 1.05, 0.3), anchor: 'start', dy: -24 },
  onboarding: { at: iso.pt(3.0, 4.3, 0), anchor: 'end', dy: 26 },
  gateway: { at: iso.pt(5.7, 1.8, 1.5), dy: -22 },
  exchange: { at: iso.pt(9.3, 0.2, 0.7), anchor: 'start', dy: -26 },
  liquidity: { at: iso.pt(11.1, 4.7, 0), anchor: 'end', dy: 28 },
  settlement: { at: iso.pt(14.6, 4.9, 0), anchor: 'end', dy: 28 },
};
const words: Record<View, Record<NodeId, { title: string; sub?: string }>> = {
  strategy: {
    merchant: { title: 'High-risk merchants', sub: 'ready before a path existed' },
    onboarding: { title: 'Onboarding', sub: 'requirements set by Ali' },
    gateway: { title: 'Payment gateway', sub: 'designed by Ali' },
    exchange: { title: 'Exchanges' },
    liquidity: { title: 'Liquidity providers' },
    settlement: { title: 'Processing partner', sub: 'selected and contracted' },
  },
  architecture: {
    merchant: { title: 'Merchant integration' },
    onboarding: { title: 'Onboarding', sub: 'requirements' },
    gateway: { title: 'Gateway API' },
    exchange: { title: 'Exchange API' },
    liquidity: { title: 'Liquidity-provider API' },
    settlement: { title: 'Settlement', sub: 'processing partner' },
  },
};
const ids = Object.keys(spots) as NodeId[];
const labels: Record<View, Label[]> = {
  strategy: ids.map((id) => ({ id, ...spots[id], ...words.strategy[id] })),
  architecture: ids.map((id) => ({ id, ...spots[id], ...words.architecture[id] })),
};

export type RoutingDraw = { merchants: MotionValue<number>; onboard: MotionValue<number>; fan: MotionValue<number>; settle: MotionValue<number> };

export function RoutingSvg({
  view = 'architecture',
  lit = [],
  draw,
  onNode,
  names,
  packet,
  runRef,
}: {
  view?: View;
  lit?: NodeId[];
  draw?: RoutingDraw;
  onNode?: (id: NodeId) => void;
  names?: Record<NodeId, string>;
  packet?: { x: MotionValue<number>; y: MotionValue<number>; o: MotionValue<number> };
  runRef?: RefObject<SVGPathElement | null>;
}) {
  const hot: Tone = view === 'strategy' ? 'gold' : 'live';
  const key = (id: NodeId) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNode?.(id);
    }
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 680" role="img" aria-labelledby="routing-title routing-desc" className="diagram-svg">
      <title id="routing-title">Payment routing at Pontemesto</title>
      <desc id="routing-desc">
        Merchants connect through onboarding to the payment gateway. The gateway connects to exchanges and liquidity providers, and payments settle with the processing partner.
      </desc>
      <Floor iso={iso} x0={-0.6} x1={15.4} y0={-0.4} y1={6.6} />
      <g id="rails">
        <Conduit id="rail-merchants" d={rails.merchants} draw={draw?.merchants} />
        <Conduit id="rail-onboarding" d={rails.onboard} draw={draw?.onboard} />
        <Conduit id="rail-exchange-liquidity" d={rails.fan} draw={draw?.fan} />
        <Conduit id="rail-settlement" d={rails.settle} draw={draw?.settle} />
        <path id="rail-run" ref={runRef} d={runPath} fill="none" stroke="none" />
      </g>
      <g id="nodes">
        {boxes.map((b) => {
          const on = lit.includes(b.id);
          const slab = <Slab iso={iso} x={b.x} y={b.y} w={b.w} d={b.d} h={b.h} tone={on ? hot : b.tone} />;
          return onNode ? (
            <g key={b.key} id={`node-${b.key}`} className="node" role="button" tabIndex={0} aria-pressed={on} aria-label={names?.[b.id] ?? b.id} onClick={() => onNode(b.id)} onKeyDown={key(b.id)}>
              {slab}
            </g>
          ) : (
            <g key={b.key} id={`node-${b.key}`}>
              {slab}
            </g>
          );
        })}
      </g>
      {(['strategy', 'architecture'] as View[]).map((v) => (
        <g key={v} id={`labels-${v}`} opacity={view === v ? 1 : 0} style={{ transition: 'opacity .45s' }} aria-hidden={view !== v}>
          {labels[v].map((l) => (
            <Tag key={l.id} at={l.at} title={l.title} sub={l.sub} anchor={l.anchor} dy={l.dy} />
          ))}
        </g>
      ))}
      {packet && (
        <motion.g id="packet" style={{ x: packet.x, y: packet.y, opacity: packet.o }}>
          <circle r="13" fill="#10b981" fillOpacity="0.28" />
          <circle r="5" fill="#d1fae5" />
        </motion.g>
      )}
    </svg>
  );
}

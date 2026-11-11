/**
 * Keywa: two-layer threshold signing as an isometric model.
 * Layer one: signers inside a department. Layer two: departments inside the organization.
 * One SVG, named layers: #floor, #rails, #departments, #wallet, #labels-strategy, #labels-architecture.
 * The thresholds, department names and the address are examples written for this page.
 */
import { type KeyboardEvent } from 'react';
import { type MotionValue } from 'motion/react';
import { isoSpace } from '../../lib/iso';
import { Conduit, Floor, LiveSlab, Slab, Tag } from '../ui';
import type { View } from './Routing';

export type Signer = { id: string; dept: number; ok: boolean; gen: number };

export const DEPTS = [
  { code: 'T', name: 'Treasury' },
  { code: 'O', name: 'Operations' },
  { code: 'C', name: 'Compliance' },
] as const;
export const NEED_SIGNERS = 2;
export const NEED_DEPTS = 2;
export const SAMPLE_ADDRESS = '0x7A3f…C21e';

export const initialSigners = (): Signer[] => DEPTS.flatMap((d, k) => [1, 2, 3].map((n) => ({ id: `${d.code}${n}`, dept: k, ok: false, gen: 1 })));
export const deptCount = (s: Signer[], k: number) => s.filter((x) => x.dept === k && x.ok).length;
export const deptOk = (s: Signer[], k: number) => deptCount(s, k) >= NEED_SIGNERS;
export const deptsOk = (s: Signer[]) => DEPTS.filter((_, k) => deptOk(s, k)).length;
export const walletOk = (s: Signer[]) => deptsOk(s) >= NEED_DEPTS;
export const rotations = (s: Signer[]) => s.reduce((n, x) => n + (x.gen - 1), 0);

/** The guided run the scroll plays before the visitor touches anything. */
export function scripted(p: number): Signer[] {
  const s = initialSigners();
  const approve = (id: string) => {
    const x = s.find((q) => q.id === id);
    if (x) x.ok = true;
  };
  if (p >= 0.12) approve('T1');
  if (p >= 0.22) approve('T2');
  if (p >= 0.36) approve('O1');
  if (p >= 0.48) approve('O2');
  if (p >= 0.72) {
    const x = s.find((q) => q.id === 'T3');
    if (x) x.gen = 2;
  }
  return s;
}

const iso = isoSpace(46, 356, 64);
const Y0 = (k: number) => 0.3 + k * 2.6;
const railFor = (k: number) =>
  k === 1 ? iso.rail([[6.8, Y0(1) + 0.95], [9.8, Y0(1) + 0.95]]) : iso.rail([[6.8, Y0(k) + 0.95], [8.4, Y0(k) + 0.95], [8.4, 3.75], [9.8, 3.75]]);

function FloorText({ x, y, children, size = 16, fill = '#cbd5e1' }: { x: number; y: number; children: string; size?: number; fill?: string }) {
  const [px, py] = iso.pt(x, y);
  return (
    <text className="floor-text" transform={`matrix(0.866 0.5 -0.866 0.5 ${px} ${py})`} fontFamily="JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace" fontSize={size} fill={fill} letterSpacing="0.04em">
      {children}
    </text>
  );
}

export function ThresholdSvg({
  signers,
  view = 'architecture',
  onSigner,
  draw,
}: {
  signers: Signer[];
  view?: View;
  onSigner?: (id: string) => void;
  draw?: MotionValue<number>;
}) {
  const signed = walletOk(signers);
  const key = (id: string) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSigner?.(id);
    }
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" role="img" aria-labelledby="threshold-title threshold-desc" className="diagram-svg">
      <title id="threshold-title">Two-layer threshold signing</title>
      <desc id="threshold-desc">
        Three departments each hold three signers. A department approves when two of its three signers approve. The wallet signs when two of the three departments approve. A signer can be replaced and the wallet address stays the same.
      </desc>
      <Floor iso={iso} x0={-0.4} x1={15.6} y0={-0.4} y1={8.6} />
      <g id="rails">
        {DEPTS.map((d, k) => (
          <Conduit key={d.code} id={`rail-${d.name.toLowerCase()}`} d={railFor(k)} draw={draw} color={deptOk(signers, k) ? '#10b981' : '#94a3b8'} dim={!deptOk(signers, k)} />
        ))}
        <Conduit id="rail-address" d={iso.rail([[12.3, 3.75], [13.1, 3.75]])} draw={draw} color={signed ? '#10b981' : '#94a3b8'} dim={!signed} />
      </g>
      <g id="departments">
        {DEPTS.map((d, k) => {
          const y0 = Y0(k);
          const ok = deptOk(signers, k);
          return (
            <g key={d.code} id={`department-${d.name.toLowerCase()}`}>
              <Slab iso={iso} x={0.6} y={y0} w={6.2} d={1.9} h={0.2} tone="stone" />
              <FloorText x={0.9} y={y0 + 1.84}>{`${d.name.toUpperCase()}  ${deptCount(signers, k)} OF 3`}</FloorText>
              {signers
                .filter((s) => s.dept === k)
                .map((s, j) => {
                  const slab = (
                    <LiveSlab iso={iso} x={1.1 + j * 1.5} y={y0 + 0.4} w={0.9} d={0.9} h={s.ok ? 0.95 : 0.5} tone={s.ok ? 'live' : s.gen > 1 ? 'gold' : 'slate'} />
                  );
                  return onSigner ? (
                    <g key={s.id + s.gen} id={`signer-${s.id}`} className="node" role="button" tabIndex={0} aria-pressed={s.ok} aria-label={`Signer ${s.id}, ${d.name}${s.gen > 1 ? ', new key share' : ''}`} onClick={() => onSigner(s.id)} onKeyDown={key(s.id)}>
                      {slab}
                    </g>
                  ) : (
                    <g key={s.id} id={`signer-${s.id}`}>
                      {slab}
                    </g>
                  );
                })}
              <g id={`gate-${d.name.toLowerCase()}`}>
                <LiveSlab iso={iso} x={5.7} y={y0 + 0.5} w={0.75} d={0.9} h={ok ? 0.7 : 0.25} tone={ok ? 'live' : 'stone'} />
              </g>
            </g>
          );
        })}
      </g>
      <g id="wallet">
        <LiveSlab iso={iso} x={9.8} y={2.5} w={2.5} d={2.5} h={2} tone={signed ? 'live' : 'glass'} />
        <Slab iso={iso} x={13.1} y={3.1} w={1.7} d={1.3} h={0.14} tone="titanium" />
      </g>
      {(['strategy', 'architecture'] as View[]).map((v) => (
        <g key={v} id={`labels-${v}`} opacity={view === v ? 1 : 0} style={{ transition: 'opacity .45s' }} aria-hidden={view !== v}>
          <Tag
            at={iso.pt(0.6, 0.3, 0.2)}
            title={v === 'strategy' ? 'Departments approve' : 'Layer one'}
            sub={v === 'strategy' ? 'each team signs for itself' : `signers: ${NEED_SIGNERS} of 3 in a department`}
            dy={-24}
          />
          <Tag
            at={iso.pt(9.8, 2.5, 2)}
            title={v === 'strategy' ? (signed ? 'The organization signs' : 'The organization waits') : 'Layer two'}
            sub={v === 'strategy' ? `${deptsOk(signers)} of 3 departments approve` : `departments: ${NEED_DEPTS} of 3`}
            anchor="start"
            dy={-22}
          />
        </g>
      ))}
      <g id="address">
        <Tag at={iso.pt(14.8, 4.4, 0)} title="Wallet address" sub={`${SAMPLE_ADDRESS} · unchanged`} anchor="end" dy={34} />
      </g>
    </svg>
  );
}

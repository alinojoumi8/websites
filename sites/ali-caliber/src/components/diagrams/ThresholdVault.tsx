import { useMemo, useState } from 'react';
import { keywa } from '../../lib/content';
import { mulberry32 } from '../../lib/prng';
import { Seg } from '../ui';

const DEPTS = ['Treasury', 'Operations', 'Compliance'];
/** centre angle of each department, in degrees, clockwise from 3 o'clock */
const ANGLES = [-90, 30, 150];
const C = 210;
const R_SIGNER = 172;
const R_DEPT = 118;
const R_ORG = 72;
const NEED = 2;
export const DEMO_ADDRESS = '0x8a3f…51c7';

type Signer = { id: string; dept: number; n: number; share: string; ok: boolean; gen: number };

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;
const arc = (r: number, from: number, to: number, sweep = 1) => {
  const [x1, y1] = pt(r, from);
  const [x2, y2] = pt(r, to);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};
const hex4 = (rnd: () => number) =>
  Math.floor(rnd() * 65536)
    .toString(16)
    .padStart(4, '0');

export function initialSigners(seed = 20): Signer[] {
  const rnd = mulberry32(seed);
  return DEPTS.flatMap((_, d) =>
    [0, 1, 2].map((n) => ({ id: `${d}-${n}`, dept: d, n, share: hex4(rnd), ok: false, gen: 0 })),
  );
}

/**
 * The two-layer threshold diagram as plain layered SVG with named ids.
 * Also served at /exports/threshold-vault.svg.
 */
export function VaultSvg({
  signers,
  onSigner,
  mode = 'approve',
}: {
  signers: Signer[];
  onSigner?: (id: string) => void;
  mode?: 'approve' | 'replace';
}) {
  const deptOk = DEPTS.map((_, d) => signers.filter((s) => s.dept === d && s.ok).length >= NEED);
  const signed = deptOk.filter(Boolean).length >= NEED;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="vault-svg"
      viewBox="0 0 420 420"
      role={onSigner ? 'group' : 'img'}
      aria-label="Two-layer threshold signing: nine signers in three departments around one wallet."
      data-signed={signed || undefined}
    >
      <defs>
        <linearGradient id="vt-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cbd5e1" />
          <stop offset="0.5" stopColor="#64748b" />
          <stop offset="1" stopColor="#1e2633" />
        </linearGradient>
        <radialGradient id="vt-glass" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#3b4656" />
          <stop offset="1" stopColor="#0b0f16" />
        </radialGradient>
        {ANGLES.map((a, d) =>
          a < 0 ? (
            <path key={d} id={`vt-label-path-${d}`} d={arc(136, a - 50, a + 50, 1)} />
          ) : (
            <path key={d} id={`vt-label-path-${d}`} d={arc(148, a + 50, a - 50, 0)} />
          ),
        )}
      </defs>

      <g id="layer-rings" fill="none">
        <circle id="ring-signers" cx={C} cy={C} r={R_SIGNER} stroke="#94a3b8" strokeOpacity="0.2" strokeDasharray="1 7" />
        <circle id="ring-organization" className="vault-org" cx={C} cy={C} r={R_ORG} stroke={signed ? '#10b981' : '#3a4657'} strokeWidth="6" />
        <circle cx={C} cy={C} r={R_ORG + 9} stroke="#94a3b8" strokeOpacity="0.25" />
      </g>

      <g id="layer-spokes" fill="none" strokeLinecap="round">
        {signers.map((s) => {
          const a = ANGLES[s.dept] + (s.n - 1) * 30;
          const [x1, y1] = pt(R_DEPT + 11, a);
          const [x2, y2] = pt(R_DEPT + 6, a);
          return <line key={s.id} id={`spoke-${s.id}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.ok ? '#10b981' : '#64748b'} strokeWidth="3" />;
        })}
        {ANGLES.map((a, d) => {
          const [x1, y1] = pt(R_DEPT - 7, a);
          const [x2, y2] = pt(R_ORG + 4, a);
          return <line key={d} id={`spoke-dept-${d}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={deptOk[d] ? '#10b981' : '#3a4657'} strokeWidth="2" />;
        })}
      </g>

      <g id="layer-departments" fill="none" strokeLinecap="round">
        {ANGLES.map((a, d) => (
          <path key={d} id={`dept-${d}`} className="vault-dept" d={arc(R_DEPT, a - 46, a + 46)} stroke={deptOk[d] ? '#10b981' : '#64748b'} strokeWidth="10" />
        ))}
      </g>

      <g id="layer-labels" fontFamily="'Inter Variable', Inter, system-ui, sans-serif" fontSize="12.5" fontWeight="600" letterSpacing="0.6" fill="#cbd5e1">
        {DEPTS.map((name, d) => (
          <text key={d} id={`label-dept-${d}`} fill={deptOk[d] ? '#6ee7b7' : '#cbd5e1'}>
            <textPath href={`#vt-label-path-${d}`} startOffset="50%" textAnchor="middle">
              {name}
            </textPath>
          </text>
        ))}
      </g>

      <g id="layer-signers">
        {signers.map((s) => {
          const a = ANGLES[s.dept] + (s.n - 1) * 30;
          const [x, y] = pt(R_SIGNER, a);
          const name = `${DEPTS[s.dept]} signer ${s.n + 1}`;
          return (
            <g
              key={`${s.id}-${s.gen}`}
              id={`signer-${s.id}`}
              className="vault-signer"
              data-ok={s.ok || undefined}
              data-new={s.gen > 0 || undefined}
              {...(onSigner
                ? {
                    role: 'button',
                    tabIndex: 0,
                    'aria-pressed': mode === 'approve' ? s.ok : undefined,
                    'aria-label':
                      mode === 'approve'
                        ? `${name}, key share ${s.share}. ${s.ok ? 'Approved. Select to withdraw.' : 'Select to approve.'}`
                        : `${name}, key share ${s.share}. Select to replace this signer.`,
                    onClick: () => onSigner(s.id),
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSigner(s.id);
                      }
                    },
                  }
                : {})}
            >
              <circle cx={x} cy={y} r="22" fill="transparent" />
              <circle cx={x} cy={y} r="15" fill="url(#vt-steel)" />
              <circle cx={x} cy={y} r="10.5" fill={s.ok ? '#10b981' : 'url(#vt-glass)'} stroke="#0b0f16" strokeWidth="1.5" />
              {s.ok && <path d={`M${x - 4.5} ${y + 0.2}l3 3 6-6.4`} fill="none" stroke="#04130d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            </g>
          );
        })}
      </g>

      <g id="layer-core">
        <circle id="core" cx={C} cy={C} r="44" fill="url(#vt-glass)" stroke={signed ? '#10b981' : '#d4af37'} strokeWidth="1.5" />
        <text
          id="core-state"
          x={C}
          y={C + 4.5}
          textAnchor="middle"
          fontFamily="'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace"
          fontSize="12.5"
          fontWeight="600"
          fill={signed ? '#6ee7b7' : '#f0d77a'}
        >
          {signed ? 'SIGNED' : 'LOCKED'}
        </text>
      </g>
    </svg>
  );
}

export function ThresholdVault() {
  const [signers, setSigners] = useState<Signer[]>(() => initialSigners());
  const [mode, setMode] = useState<'approve' | 'replace'>('approve');
  const [note, setNote] = useState<string>('Select signers to approve the transaction.');
  const [swaps, setSwaps] = useState(0);
  const rnd = useMemo(() => mulberry32(77), []);

  const counts = DEPTS.map((_, d) => signers.filter((s) => s.dept === d && s.ok).length);
  const deptOk = counts.map((c) => c >= NEED);
  const depts = deptOk.filter(Boolean).length;
  const signed = depts >= NEED;

  const onSigner = (id: string) => {
    const s = signers.find((x) => x.id === id)!;
    const name = `${DEPTS[s.dept]} signer ${s.n + 1}`;
    if (mode === 'approve') {
      setSigners((all) => all.map((x) => (x.id === id ? { ...x, ok: !x.ok } : x)));
      setNote(s.ok ? `${name} withdrew approval.` : `${name} approved with key share ${s.share}.`);
    } else {
      const share = hex4(rnd);
      setSigners((all) => all.map((x) => (x.id === id ? { ...x, share, ok: false, gen: x.gen + 1 } : x)));
      setSwaps((n) => n + 1);
      setNote(`${name} replaced. New key share ${share}. The wallet address did not change.`);
    }
  };

  const reset = () => {
    setSigners(initialSigners());
    setSwaps(0);
    setMode('approve');
    setNote('Reset. Select signers to approve the transaction.');
  };

  return (
    <div className="diagram diagram-vault" data-mode={mode}>
      <VaultSvg signers={signers} onSigner={onSigner} mode={mode} />
      <div className="diagram-side">
        <Seg
          id="vault-mode"
          label="What a click does"
          value={mode}
          onChange={(m) => {
            setMode(m);
            setNote(m === 'approve' ? 'Select signers to approve the transaction.' : 'Select a signer to replace. Watch the address.');
          }}
          options={[
            { id: 'approve', label: 'Approve' },
            { id: 'replace', label: 'Replace a signer' },
          ]}
        />

        <dl className="vault-state">
          <div>
            <dt>Layer 1. Inside each department, 2 of 3 signers</dt>
            <dd>
              <ul className="vault-depts">
                {DEPTS.map((d, i) => (
                  <li key={d} data-ok={deptOk[i] || undefined}>
                    <span>{d}</span>
                    <b>{counts[i]}/3</b>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Layer 2. Across the organization, 2 of 3 departments</dt>
            <dd className="vault-org-state" data-ok={signed || undefined}>
              <b>{depts}/3</b>
              <span>{signed ? 'Transaction signed' : 'Waiting for approvals'}</span>
            </dd>
          </div>
          <div>
            <dt>Wallet address</dt>
            <dd className="vault-address" key={swaps} data-flash={swaps > 0 || undefined}>
              <code>{DEMO_ADDRESS}</code>
              <span>{swaps === 0 ? 'demo address' : `unchanged after ${swaps} ${swaps === 1 ? 'replacement' : 'replacements'}`}</span>
            </dd>
          </div>
        </dl>

        <p className="vault-note" aria-live="polite">
          {note}
        </p>
        <div className="console-head">
          <button type="button" className="btn btn-steel btn-sm" onClick={reset}>
            Reset
          </button>
          <p className="demo-note">A simplified model of the idea in the whitepaper. Departments and thresholds are examples.</p>
        </div>
        <p className="sr-only">{keywa.paper}</p>
      </div>
    </div>
  );
}

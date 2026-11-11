/** The four resume figures on a glass strip. Each settles on a spring when it comes into view. */
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { figures } from '../lib/content';
import { spring } from '../lib/motion';

const fmt = (n: number) => Math.round(n).toLocaleString('en-CA');

function Counter({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [live, setLive] = useState(false);
  // The value starts at its final figure. It only drops to zero at the moment
  // the count-up begins, so a page that never animates still shows the truth.
  const n = useMotionValue(value);
  const text = useTransform(n, fmt);

  useEffect(() => {
    if (!reduce) setLive(true);
  }, [reduce]);
  useEffect(() => {
    if (!live || !inView) return;
    // jump, not set: a set would hand the spring a large downward speed and the figure would dip below zero
    n.jump(0);
    const c = animate(n, value, { type: 'spring', ...spring.counter, delay: delay / 1000 });
    return () => c.stop();
  }, [live, inView, value, delay, n]);

  return (
    <span ref={ref} className={`figure-num ${live ? 'is-live' : ''}`}>
      {live ? <motion.span>{text}</motion.span> : fmt(value)}
    </span>
  );
}

export default function Telemetry() {
  return (
    <div className="telemetry" id="figures">
      <span className="telemetry-rail" aria-hidden="true" />
      <dl className="telemetry-grid">
        {figures.map((f, i) => (
          <div key={f.id} className="figure">
            <dt className="figure-label">{f.label}</dt>
            <dd className="figure-value">
              <span className="figure-affix">{f.prefix}</span>
              <Counter value={f.value} delay={i * 140} />
              <span className="figure-affix">{f.suffix}</span>
            </dd>
            <dd className="figure-scope">{f.scope}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

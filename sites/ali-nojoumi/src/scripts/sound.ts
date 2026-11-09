// Small synthesized foley. Off until the visitor turns it on.
let ctx: AudioContext | null = null;
let on = false;

export const toggleSound = () => {
  on = !on;
  if (on && !ctx) ctx = new AudioContext();
  if (on && ctx?.state === 'suspended') void ctx.resume();
  return on;
};

function burst(dur: number, type: BiquadFilterType, f0: number, f1: number, q: number, gain: number) {
  if (!on || !ctx) return;
  const t = ctx.currentTime;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const flt = ctx.createBiquadFilter();
  flt.type = type;
  flt.frequency.setValueAtTime(f0, t);
  flt.frequency.exponentialRampToValueAtTime(f1, t + dur);
  flt.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.18);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(flt).connect(g).connect(ctx.destination);
  src.start(t);
}

export const sfx = {
  flip: () => burst(0.42, 'bandpass', 900, 3200, 0.7, 0.14),
  thump: () => {
    burst(0.14, 'lowpass', 420, 90, 0.9, 0.5);
    burst(0.05, 'highpass', 2400, 3200, 0.7, 0.1);
  },
  tick: () => burst(0.025, 'highpass', 3000, 5000, 1, 0.05),
};

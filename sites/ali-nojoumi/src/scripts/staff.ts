// The staff: paper puppets that live above the pages and hop between spreads.
import gsap from 'gsap';

type Spot = { x: number; y: number; h: number; flip?: boolean };
type Member = {
  id: string;
  ar: number;
  note?: string;
  doodle?: string;
  spots: Record<number, Spot>;
  el?: HTMLElement;
  drop: number;
  hop: number;
};

const CAST: Omit<Member, 'drop' | 'hop'>[] = [
  { id: 'laptop', ar: 0.74, note: 'APIs', spots: {
    0: { x: 0.345, y: 20.6, h: 6.2 },
    1: { x: 0.155, y: 24.6, h: 5.6 },
    5: { x: 0.42, y: 4.75, h: 3.7 },
  } },
  { id: 'ladder', ar: 0.425, note: 'Raising', spots: {
    0: { x: 0.205, y: 24.8, h: 8.7 },
    1: { x: 0.445, y: 20.4, h: 6.2 },
    4: { x: 0.585, y: 24.9, h: 8.4 },
  } },
  { id: 'clipboard', ar: 0.354, note: 'Roadmap', spots: {
    0: { x: 0.098, y: 24.7, h: 7 },
    1: { x: 0.215, y: 20.4, h: 6.2 },
  } },
  { id: 'bulb', ar: 0.48, note: 'What is missing?', spots: {
    0: { x: 0.703, y: 19.9, h: 5.5 },
    1: { x: 0.105, y: 20.4, h: 6.2 },
  }, doodle: `<svg class="doodle bulb-d" viewBox="0 0 60 70" style="left:18%;top:-24%;width:58%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M30 12c-11 0-18 8-18 18 0 7 4 11 7 15 2 3 2 5 2 7h18c0-2 0-4 2-7 3-4 7-8 7-15 0-10-7-18-18-18z" fill="#e8a317"/><path d="M22 58h16M25 65h10M4 12l6 5M56 12l-6 5M30 1v6"/></svg>` },
  { id: 'megaphone', ar: 0.478, note: 'Hiring!', spots: {
    0: { x: 0.78, y: 19.4, h: 5.8 },
    1: { x: 0.325, y: 20.4, h: 6.2 },
  }, doodle: `<svg class="doodle mega-d" viewBox="0 0 40 40" style="left:-30%;top:0%;width:34%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M34 6 14 2M34 20H8M34 34l-20 4"/></svg>` },
  { id: 'shades', ar: 0.484, note: 'Contracts', spots: {
    0: { x: 0.888, y: 23, h: 6 },
    1: { x: 0.27, y: 24.6, h: 5.6 },
    5: { x: 0.77, y: 24.85, h: 4.6 },
  } },
  { id: 'sleeping', ar: 1.677, note: 'Keys are safe', spots: {
    0: { x: 0.525, y: 25.3, h: 3.3 },
    1: { x: 0.41, y: 24.7, h: 2.8 },
    3: { x: 0.24, y: 25.3, h: 2.6 },
    6: { x: 0.175, y: 19.6, h: 2.6 },
  }, doodle: `<svg class="doodle zzz" viewBox="0 0 60 60" style="left:68%;top:-46%;width:22%" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 42h14L4 58h14M24 22h12L24 36h12M42 4h12L42 16h12"/></svg>` },
  { id: 'pushing', ar: 0.963, spots: { 2: { x: 0.505, y: 24.8, h: 4.4 } } },
  { id: 'walking', ar: 0.596, spots: { 2: { x: 0.7, y: 24.85, h: 4.2 } } },
  { id: 'key', ar: 0.53, spots: { 3: { x: 0.5, y: 24.8, h: 6.4 } } },
  { id: 'stamp', ar: 0.482, spots: { 3: { x: 0.8, y: 24.85, h: 5.8, flip: true } } },
  { id: 'reading', ar: 0.419, spots: { 4: { x: 0.86, y: 17.5, h: 4.2 } } },
  { id: 'rope', ar: 0.287, spots: { 1: { x: 0.5, y: 11.4, h: 8.5 }, 2: { x: 0.5, y: 7.6, h: 6 }, 4: { x: 0.5, y: 13.6, h: 8 } } },
  { id: 'pen', ar: 0.83, spots: { 6: { x: 0.33, y: 24.85, h: 4.6 } } },
  { id: 'pointing', ar: 0.6, spots: { 6: { x: 0.43, y: 19.8, h: 6.2 } } },
  { id: 'waving', ar: 0.407, spots: { 6: { x: 0.77, y: 24.85, h: 5.6 }, 7: { x: 0.5, y: 24.9, h: 8.6 } } },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function createStaff() {
  const host = document.getElementById('staff')!;
  const members: Member[] = CAST.map((c) => ({ ...c, drop: 0, hop: 0 }));
  let vw = window.innerWidth, row = window.innerHeight / 25, H0 = row * 8;
  const noteEl = document.createElement('div');
  noteEl.className = 'ali-note';
  host.appendChild(noteEl);

  members.forEach((m, idx) => {
    const el = document.createElement('div');
    el.className = 'ali';
    el.dataset.id = m.id;
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    if (m.spots[0]) img.src = `/ali/${m.id}.webp`;
    else img.dataset.src = `/ali/${m.id}.webp`;
    el.appendChild(img);
    if (m.doodle) el.insertAdjacentHTML('beforeend', m.doodle);
    el.style.display = 'none';
    host.appendChild(el);
    m.el = el;
    void idx;
  });

  const loadRest = () => host.querySelectorAll<HTMLImageElement>('img[data-src]').forEach((i) => {
    i.src = i.dataset.src!;
    i.removeAttribute('data-src');
  });
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(loadRest, { timeout: 2500 });
  else setTimeout(loadRest, 1500);

  // small idle loops, one per doodle
  gsap.to('.zzz', { y: -8, opacity: 0.45, duration: 1.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.mega-d', { scale: 1.2, transformOrigin: '100% 50%', duration: 0.26, yoyo: true, repeat: -1, ease: 'power1.inOut' });
  gsap.fromTo('.bulb-d', { opacity: 0.25 }, { opacity: 1, duration: 0.07, yoyo: true, repeat: 7, repeatDelay: 0.12, delay: 1.5, ease: 'none' });

  const measure = () => {
    vw = window.innerWidth;
    row = window.innerHeight / 25;
    H0 = row * 8;
    members.forEach((m) => {
      m.el!.style.width = `${m.ar * H0}px`;
      m.el!.style.height = `${H0}px`;
    });
  };
  measure();

  let lastI = -1, lastT = -1;
  const update = (i: number, t: number, force = false) => {
    if (!force && i === lastI && Math.abs(t - lastT) < 0.0005) return;
    lastI = i; lastT = t;
    members.forEach((m, idx) => {
      const a = m.spots[i];
      const b = m.spots[i + 1];
      const el = m.el!;
      if ((!a && !b) || (t <= 0 && !a)) {
        if (el.style.display !== 'none') el.style.display = 'none';
        return;
      }
      if (el.style.display === 'none') el.style.display = 'block';
      const delay = (idx % 6) * 0.035;
      const local = clamp((t - delay) / (0.8 - delay));
      const tt = ease(local);
      const off = m.id === 'rope' ? -2 : 26 + (a || b)!.h;
      const from = a || { x: b!.x, y: off, h: b!.h, flip: b!.flip };
      const to = b || { x: m.id === 'rope' ? a!.x : a!.x + (a!.x > 0.5 ? 0.06 : -0.06), y: off, h: a!.h, flip: a!.flip };
      const x = (from.x + (to.x - from.x) * tt) * vw;
      const hops = Math.max(1, Math.round(Math.abs(to.x - from.x) * 7));
      const arc = Math.abs(Math.sin(local * Math.PI * hops)) * row * (1.2 + (1 - local) * 2);
      const y = (from.y + (to.y - from.y) * tt) * row - arc * (t > 0 ? 1 : 0) + m.drop * row - m.hop * row;
      const h = from.h + (to.h - from.h) * tt;
      const rot = t > 0 ? Math.sin(local * Math.PI * hops * 2) * 9 : 0;
      const flip = (local < 0.5 ? from.flip : to.flip) ? -1 : 1;
      const s = h / 8;
      const w = m.ar * H0;
      el.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px,${(y - H0).toFixed(1)}px,0) rotate(${(rot + m.hop * -7).toFixed(2)}deg) scale(${(s * flip).toFixed(4)},${s.toFixed(4)})`;
      el.classList.toggle('touch', t <= 0 && !!a && i <= 1);
    });
  };

  const rerender = () => update(lastI < 0 ? 0 : lastI, lastT < 0 ? 0 : lastT, true);

  members.forEach((m) => {
    const el = m.el!;
    const go = () => {
      gsap.to(m, { hop: 1.1, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: 1, onUpdate: rerender });
      if (m.note && lastI === 0) {
        const r = el.getBoundingClientRect();
        noteEl.textContent = m.note;
        noteEl.style.transform = `translate(${Math.max(8, r.left + r.width / 2 - 40)}px,${Math.max(8, r.top - 30)}px)`;
        noteEl.style.opacity = '1';
      }
    };
    el.addEventListener('pointerenter', go);
    el.addEventListener('pointerleave', () => { noteEl.style.opacity = '0'; });
  });

  document.querySelectorAll<HTMLElement>('.payroll tr[data-ali]').forEach((tr) => {
    const m = members.find((x) => x.id === tr.dataset.ali);
    if (!m) return;
    tr.addEventListener('pointerenter', () => {
      gsap.killTweensOf(m, 'hop');
      gsap.to(m, { hop: 1.5, duration: 0.2, ease: 'power3.out', onUpdate: rerender });
    });
    tr.addEventListener('pointerleave', () => {
      gsap.to(m, { hop: 0, duration: 0.32, ease: 'power2.inOut', onUpdate: rerender });
    });
  });

  const dropIn = (delay = 0) => {
    const list = members.filter((m) => m.spots[0]);
    list.forEach((m, i) => {
      m.drop = -((m.spots[0].y) + 2);
      gsap.to(m, { drop: 0, duration: 0.7, delay: delay + i * 0.09, ease: 'bounce.out', onUpdate: rerender });
    });
    rerender();
  };

  return { update, measure: () => { measure(); rerender(); }, dropIn, rerender };
}

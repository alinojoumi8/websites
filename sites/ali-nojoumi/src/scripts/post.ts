// Motion grammar: inking, stamping, posting figures. Marks stay once made.
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { sfx } from './sound';

gsap.registerPlugin(SplitText);

const HIDE = 'inset(-30% 100% -30% 0%)';
const SHOW = 'inset(-30% 0% -30% 0%)';

export function mountOdometers() {
  document.querySelectorAll<HTMLElement>('[data-odo]').forEach((el) => {
    const text = el.textContent || '';
    el.textContent = '';
    for (const ch of text) {
      if (/\d/.test(ch)) {
        const dg = document.createElement('span');
        dg.className = 'dg';
        dg.dataset.d = ch;
        dg.setAttribute('aria-hidden', 'true');
        const col = document.createElement('span');
        col.className = 'col';
        for (let i = 0; i < 30; i++) {
          const b = document.createElement('b');
          b.textContent = String(i % 10);
          col.appendChild(b);
        }
        dg.appendChild(col);
        el.appendChild(dg);
      } else {
        const s = document.createElement('span');
        s.setAttribute('aria-hidden', 'true');
        s.textContent = ch;
        el.appendChild(s);
      }
    }
  });
}

const finalOdo = (root: ParentNode) =>
  root.querySelectorAll<HTMLElement>('.dg').forEach((dg) => {
    gsap.set(dg.firstElementChild, { yPercent: -(((20 + Number(dg.dataset.d)) / 30) * 100) });
  });

export function prepare(root: HTMLElement) {
  root.querySelectorAll('[data-ink]').forEach((e) => gsap.set(e, { clipPath: HIDE }));
  root.querySelectorAll('[data-stamp]:not(.manual)').forEach((e) => gsap.set(e, { autoAlpha: 0 }));
  root.querySelectorAll<HTMLElement>('.dg').forEach((dg) => gsap.set(dg.firstElementChild, { yPercent: 0 }));
}

export function showAll(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-ink]').forEach((e) => gsap.set(e, { clearProps: 'clipPath' }));
  root.querySelectorAll('[data-stamp]:not(.manual)').forEach((e) => gsap.set(e, { autoAlpha: 0.92 }));
  finalOdo(root);
}

export function stampIn(el: HTMLElement, at = 0, jolt?: Element | null) {
  const rot = getComputedStyle(el).getPropertyValue('--rot') || '-8deg';
  const tl = gsap.timeline({ delay: at });
  tl.fromTo(el, { autoAlpha: 0, scale: 2.3, rotation: parseFloat(rot) - 7 }, { autoAlpha: 0.92, scale: 1, rotation: parseFloat(rot), duration: 0.2, ease: 'power4.in', onComplete: () => sfx.thump() });
  if (jolt) tl.fromTo(jolt, { y: 0 }, { y: 2, duration: 0.05, yoyo: true, repeat: 1, ease: 'none', clearProps: 'y' });
  return tl;
}

const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();

/** Posts everything on a spread once the type has loaded, so lines split where they will really break. */
export function post(root: HTMLElement) {
  void fontsReady.then(() => runPost(root));
}

function runPost(root: HTMLElement) {
  const inks = Array.from(root.querySelectorAll<HTMLElement>('[data-ink]'));
  const rows = inks.map((el) => ({ el, y: el.getBoundingClientRect().top + window.scrollY * 0 }));
  const min = Math.min(...rows.map((r) => r.y));
  const unit = Math.max(20, parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row')) || 30);
  const rowH = unit || 30;
  const tl = gsap.timeline();
  rows.forEach(({ el, y }) => {
    const at = Math.min(0.62, ((y - min) / rowH) * 0.03);
    const split = new SplitText(el, { type: 'lines', linesClass: 'ln', aria: 'none' });
    gsap.set(el, { clearProps: 'clipPath' });
    tl.fromTo(split.lines, { clipPath: HIDE }, {
      clipPath: SHOW,
      duration: 0.42,
      ease: 'power2.out',
      stagger: 0.07,
      clearProps: 'clipPath',
      onComplete: () => split.revert(),
    }, at);
  });
  const end = tl.duration();
  root.querySelectorAll<HTMLElement>('[data-stamp]:not(.manual)').forEach((s, i) => stampIn(s, end * 0.72 + i * 0.1));
  const digits = Array.from(root.querySelectorAll<HTMLElement>('.dg'));
  if (digits.length) {
    const ticks = gsap.to({}, { duration: 1.4, repeat: 0, onUpdate() { if (Math.random() < 0.34) sfx.tick(); } });
    tl.add(ticks, 0);
    digits.forEach((dg) => {
      const d = Number(dg.dataset.d);
      // the two printed halves share a position, so a digit rolls the same on both pages
      const parent = dg.parentElement!;
      const idx = Array.from(parent.querySelectorAll('.dg')).indexOf(dg);
      tl.fromTo(dg.firstElementChild, { yPercent: 0 }, { yPercent: -(((20 + d) / 30) * 100), duration: 1 + idx * 0.09, ease: 'power3.out' }, 0.05);
    });
  }
  return tl;
}

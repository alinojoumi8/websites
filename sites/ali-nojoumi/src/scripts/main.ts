import gsap from 'gsap';
import { Marble, layPattern } from './marble';
import { mountOdometers, post, prepare, showAll } from './post';
import { initSigning } from './signing';
import { initEconomy } from './economy';
import { initEntry } from './entry';
import { toggleSound } from './sound';
import { initBook } from './book';

const root = document.documentElement;
const isBook = root.classList.contains('book');
const still = root.classList.contains('still');
const intro = !root.classList.contains('no-intro') ? (document.getElementById('intro') as HTMLElement | null) : null;

mountOdometers();
initSigning();
initEconomy();
initEntry();

const soundBtn = document.getElementById('sound') as HTMLButtonElement | null;
soundBtn?.addEventListener('click', () => {
  const on = toggleSound();
  soundBtn.setAttribute('aria-pressed', String(on));
  soundBtn.textContent = on ? 'Sound on' : 'Sound off';
});

if (still) {
  document.querySelectorAll('svg').forEach((s) => s.pauseAnimations?.());
  showAll(document);
}

const book = isBook ? initBook({ heldForIntro: !!intro }) : null;

/* ---------- Stacked layout: posts as sections arrive ---------- */
if (!isBook) {
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>('.tab'));
  const spy = new IntersectionObserver((list) => {
    list.forEach((e) => {
      if (!e.isIntersecting) return;
      tabs.forEach((t) => {
        if (t.getAttribute('href') === `#${e.target.id}`) t.setAttribute('aria-current', 'true');
        else t.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.spread').forEach((s) => spy.observe(s));
}
if (!isBook && !still) {
  const pages = document.querySelectorAll<HTMLElement>('.page');
  pages.forEach((p, i) => { if (i > 0 || intro) prepare(p); });
  const seen = new WeakSet<Element>();
  const io = new IntersectionObserver((list) => {
    list.forEach((e) => {
      if (e.isIntersecting && !seen.has(e.target)) {
        seen.add(e.target);
        post(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  pages.forEach((p, i) => { if (i > 0) io.observe(p); });
  if (!intro && pages[0]) showAll(pages[0]);
}

/* ---------- Opening the book ---------- */
function finishIntro() {
  try { sessionStorage.setItem('opened', '1'); } catch { /* private mode */ }
  root.classList.add('no-intro');
  book?.buildEndpaperLater();
}

if (intro) {
  const canvas = document.getElementById('intro-marble') as HTMLCanvasElement;
  const scale = Math.min(0.9, 1200 / window.innerWidth);
  const m = Marble.create(canvas, scale);
  let done = false;
  let raf = 0;

  const open = () => {
    if (done) return;
    done = true;
    window.removeEventListener('keydown', open);
    window.removeEventListener('pointerdown', open);
    window.removeEventListener('wheel', open);
    cancelAnimationFrame(raf);
    const hero = document.querySelector<HTMLElement>('.page');
    if (book) book.releaseIntro();
    else if (hero) post(hero);
    gsap.to('.plate, .intro-skip', { autoAlpha: 0, duration: 0.2 });
    gsap.to(intro, {
      rotateY: -118, transformPerspective: window.innerWidth * 1.6, autoAlpha: 0, duration: 0.95, ease: 'power3.inOut',
      onComplete: () => { intro.remove(); m?.destroy(); finishIntro(); },
    });
  };

  if (!m || m.software) {
    open();
  } else {
    layPattern(m, 4242, { start: 0.05, spread: 1.15, grow: 0.5, count: 58 });
    const t0 = performance.now();
    let frames = 0;
    let last = t0;
    let slow = 0;
    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      m.render(t);
      // a device that cannot keep up gets the book opened early rather than a stuttering intro
      if (frames++ > 1) slow += now - last > 90 ? 2 : now - last > 50 ? 1 : 0;
      last = now;
      if (slow >= 6 || t >= 2.62) open();
      else raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('keydown', open, { once: true });
    window.addEventListener('pointerdown', open, { once: true });
    window.addEventListener('wheel', open, { once: true, passive: true });
  }
} else {
  book?.showHero();
  book?.buildEndpaperLater();
}

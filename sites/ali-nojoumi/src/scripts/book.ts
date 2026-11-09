// The book: scroll turns real leaves about the gutter.
import gsap from 'gsap';
import Lenis from 'lenis';
import { createStaff } from './staff';
import { post, prepare, showAll } from './post';
import { sfx } from './sound';
import { Marble, layPattern } from './marble';

type P = { l: HTMLElement; r: HTMLElement; ls: HTMLElement; rs: HTMLElement; lc: HTMLElement; rc: HTMLElement };

const DWELL = 0.34;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function initBook(opts: { heldForIntro: boolean }) {
  const root = document.documentElement;
  const track = document.getElementById('book') as HTMLElement;
  const spreads = Array.from(document.querySelectorAll<HTMLElement>('.spread'));
  const N = spreads.length;
  const pages: P[] = spreads.map((s) => {
    const l = s.querySelector<HTMLElement>('.page.l')!;
    const r = s.querySelector<HTMLElement>('.page.r')!;
    return { l, r, ls: l.querySelector('.shade')!, rs: r.querySelector('.shade')!, lc: l.querySelector('.cast')!, rc: r.querySelector('.cast')! };
  });
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>('.tab'));
  const staff = createStaff();
  const posted = new Set<number>();
  let vw = 0, vh = 0, seg = 0, persp = 0, rowPx = 0;

  // Blink sits above the printed face while the first spread rests.
  const blink = document.createElement('img');
  blink.src = '/portrait/blink.webp';
  blink.alt = '';
  blink.className = 'blink';
  document.getElementById('staff')!.appendChild(blink);

  const layout = () => {
    vw = window.innerWidth;
    vh = window.innerHeight;
    rowPx = Math.floor(vh / 25);
    root.style.setProperty('--row', `${vh / 25}px`);
    seg = Math.round(vh * 1.25);
    persp = Math.round(vw * 1.75);
    track.style.height = `${seg * (N - 1) + vh}px`;
    staff.measure();
    const A = ((vh / 25) * 29) / 2600; // page pixels per portrait pixel
    const left = vw / 2 - 1202 * A;
    const top = (vh / 25) * 5.75;
    blink.style.left = `${left + 872 * A}px`;
    blink.style.top = `${top + 586.5 * A}px`;
    blink.style.width = `${634.1 * A}px`;
    blink.style.height = `${190.2 * A}px`;
  };

  const flat = (el: HTMLElement) => { el.style.transform = ''; el.style.zIndex = '1'; };
  let visible = new Set<HTMLElement>();
  const show = (next: Set<HTMLElement>) => {
    visible.forEach((e) => { if (!next.has(e)) { e.classList.remove('on'); flat(e); } });
    next.forEach((e) => { if (!visible.has(e)) e.classList.add('on'); });
    visible = next;
  };
  const clearShade = (p: P) => { p.ls.style.opacity = '0'; p.rs.style.opacity = '0'; p.lc.style.opacity = '0'; p.rc.style.opacity = '0'; };

  let lastCurrent = -1;
  let lastTurning = false;

  const mark = (k: number) => {
    if (k === lastCurrent) return;
    lastCurrent = k;
    tabs.forEach((t, j) => {
      if (j === Math.min(k, tabs.length - 1) && k < tabs.length) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });
    if (k >= tabs.length) tabs.forEach((t) => t.removeAttribute('aria-current'));
    combToggle(k === N - 1);
    if (k >= N - 3) idleBuild();
  };

  const enter = (k: number) => {
    if (posted.has(k) || k < 0) return;
    posted.add(k);
    post(spreads[k]);
  };

  let captureAt: number | null = null;
  const frame = (scrollPos: number) => {
    const scroll = captureAt !== null ? (Number.isInteger(captureAt) ? restY(captureAt) : seg * Math.floor(captureAt) + seg * (DWELL + (1 - DWELL) * (captureAt % 1))) : scrollPos;
    const s = Math.min(N - 1, Math.max(0, scroll / seg));
    let i = Math.min(N - 2, Math.floor(s));
    let f = s - i;
    if (s >= N - 1) { i = N - 1; f = 0; }
    const t = i >= N - 1 || f < DWELL ? 0 : smooth((f - DWELL) / (1 - DWELL));

    if (t <= 0) {
      const A = pages[i];
      show(new Set([A.l, A.r]));
      flat(A.l); flat(A.r);
      clearShade(A);
      if (lastTurning) { lastTurning = false; }
      enterSafe(i);
      mark(i);
    } else {
      const A = pages[i], B = pages[i + 1];
      const lifted = t < 0.5;
      const next = new Set<HTMLElement>([A.l, B.r, lifted ? A.r : B.l]);
      show(next);
      flat(A.l); flat(B.r);
      clearShade(A); clearShade(B);
      const lift = Math.sin(Math.PI * t);
      if (lifted) {
        A.r.style.zIndex = '4';
        A.r.style.transform = `perspective(${persp}px) rotateY(${(-180 * t).toFixed(2)}deg) skewY(${(lift * -1.4).toFixed(2)}deg)`;
        A.rs.style.opacity = (t * 2 * 0.85).toFixed(3);
      } else {
        B.l.style.zIndex = '4';
        B.l.style.transform = `perspective(${persp}px) rotateY(${(180 * (1 - t)).toFixed(2)}deg) skewY(${(lift * 1.4).toFixed(2)}deg)`;
        B.ls.style.opacity = ((1 - t) * 2 * 0.85).toFixed(3);
      }
      B.rc.style.opacity = (lift * 0.85).toFixed(3);
      A.lc.style.opacity = (lift * 0.85).toFixed(3);
      if (!lastTurning) { lastTurning = true; sfx.flip(); }
      if (t > 0.55) enterSafe(i + 1);
      mark(t > 0.5 ? i + 1 : i);
    }
    staff.update(i, t);
    blink.style.display = 'none';
    resting = t <= 0 && i === 0;
  };

  let introHold = opts.heldForIntro;
  const enterSafe = (k: number) => { if (!(introHold && k === 0)) enter(k); };

  let resting = false;
  const blinkLoop = () => {
    if (resting && !document.hidden) {
      blink.style.display = 'block';
      gsap.delayedCall(0.13, () => { blink.style.display = 'none'; });
    }
    gsap.delayedCall(2.6 + Math.random() * 3.4, blinkLoop);
  };
  gsap.delayedCall(4, blinkLoop);

  // Scrolling
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9, smoothWheel: true });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ({ scroll }: { scroll: number }) => { frame(scroll); onActivity(); });

  const restY = (k: number) => (k >= N - 1 ? seg * (N - 1) : seg * k + seg * DWELL * 0.45);
  const goTo = (k: number, immediate = false) => {
    const clamped = Math.max(0, Math.min(N - 1, k));
    const dist = Math.abs(clamped - Math.round(window.scrollY / seg));
    lenis.scrollTo(restY(clamped), immediate ? { immediate: true, force: true } : { duration: Math.min(2.6, 0.9 + dist * 0.42), force: true, easing: (x: number) => 1 - Math.pow(1 - x, 3) });
  };

  // Let a resting page settle if the reader stops mid-turn.
  let idle = 0;
  function onActivity() {
    window.clearTimeout(idle);
    idle = window.setTimeout(() => {
      // a stalled frame is not the reader stopping: wait until the motion has really ended
      if (lenis.isScrolling) { onActivity(); return; }
      const s = window.scrollY / seg;
      const i = Math.floor(s), f = s - i;
      if (i >= N - 1 || f <= DWELL) return;
      goTo(f > 0.62 ? i + 1 : i);
    }, 170);
  }

  let linkJump = 0;
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#fo-"]');
    if (!a) return;
    e.preventDefault();
    const k = Number(a.getAttribute('href')!.slice(4)) - 1;
    linkJump = performance.now() + 3200;
    goTo(k);
    const target = k === 6 ? document.getElementById('entry-text') : spreads[k];
    window.setTimeout(() => target?.focus({ preventScroll: true }), 1400);
  });

  window.addEventListener('keydown', (e) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.altKey || e.metaKey || e.ctrlKey) return;
    const cur = lastCurrent < 0 ? 0 : lastCurrent;
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && tag !== 'BUTTON' && tag !== 'A')) { e.preventDefault(); goTo(cur + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(cur - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(N - 1); }
  });

  // A focused control always brings its page up.
  document.addEventListener('focusin', (e) => {
    const sp = (e.target as HTMLElement).closest<HTMLElement>('.spread');
    if (!sp) return;
    const k = spreads.indexOf(sp);
    if (k !== lastCurrent && performance.now() > linkJump) goTo(k, true);
  });

  // Comb the back endpaper. Built only when the reader nears the end.
  const idleBuild = () => { if (!marble && !building) { building = true; buildEndpaper(); } };
  let building = false;
  const combCanvas = document.getElementById('comb') as HTMLCanvasElement;
  let marble: Marble | null = null;
  let combBusy = false;
  const paintComb = (now: number) => {
    if (!marble) return;
    const busy = marble.render(now / 1000);
    if (busy) requestAnimationFrame(paintComb); else combBusy = false;
  };
  const kick = () => { if (!combBusy) { combBusy = true; requestAnimationFrame(paintComb); } };

  const buildEndpaper = () => {
    marble = Marble.create(combCanvas, Math.min(1, 1100 / vw));
    if (!marble || marble.software) {
      marble = null;
      root.classList.add('no-comb');
      document.querySelectorAll<HTMLElement>('.marble').forEach((m) => m.style.setProperty('--endpaper', 'url("/marble.webp")'));
      return;
    }
    layPattern(marble, (Date.now() & 0xffff) + 17, { count: 74 });
    marble.render();
    combCanvas.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      document.querySelectorAll<HTMLElement>('.marble').forEach((m) => m.style.setProperty('--endpaper', `url("${url}")`));
    }, 'image/webp', 0.86);
    let last: [number, number] | null = null;
    const toUv = (e: PointerEvent): [number, number] => [(e.clientX / vw) * marble!.aspect, 1 - e.clientY / vh];
    combCanvas.addEventListener('pointerdown', (e) => { last = toUv(e); combCanvas.setPointerCapture(e.pointerId); });
    combCanvas.addEventListener('pointermove', (e) => {
      if (!last || !marble) return;
      const p = toUv(e);
      const dx = p[0] - last[0], dy = p[1] - last[1];
      const d = Math.hypot(dx, dy);
      if (d < 0.006) return;
      marble.comb(last[0], last[1], dx, dy, Math.min(0.5, d * 3.2), 0.035);
      last = p;
      kick();
    });
    const up = () => { last = null; };
    combCanvas.addEventListener('pointerup', up);
    combCanvas.addEventListener('pointercancel', up);
    combCanvas.addEventListener('dblclick', (e) => {
      if (!marble) return;
      const p = toUv(e as PointerEvent);
      marble.drop(p[0], p[1], 0.09, Math.floor(Math.random() * 7), performance.now() / 1000, 0.4);
      kick();
    });
  };
  function combToggle(on: boolean) {
    document.getElementById('colophon')?.classList.toggle('show', on);
    if (!combCanvas) return;
    if (on) {
      combCanvas.style.opacity = '1';
      combCanvas.style.pointerEvents = 'auto';
    } else {
      combCanvas.style.opacity = '0';
      combCanvas.style.pointerEvents = 'none';
    }
  }

  // Setup
  root.classList.add('running');
  layout();
  spreads.forEach((s, k) => { if (k > 0 || opts.heldForIntro) prepare(s); });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  frame(0);
  if (import.meta.env.DEV) {
    // Headless screenshots cannot scroll a sticky stage, so the dev server can open a folio directly.
    const k = new URLSearchParams(location.search).get('capture');
    if (k !== null) { captureAt = Number(k) - 1; frame(0); lenis.stop(); }
  }
  const firstHash = String((window as any).__fo || '').match(/^#fo-(\d)$/);
  if (firstHash) {
    const k = Number(firstHash[1]) - 1;
    window.scrollTo(0, restY(k));
    lenis.resize();
    goTo(k, true);
    frame(restY(k));
  }

  window.addEventListener('resize', () => {
    const m = window.matchMedia('(min-width:1100px) and (min-height:620px) and (min-aspect-ratio:5/4)').matches;
    if (!m) { window.location.reload(); return; }
    layout();
    frame(window.scrollY);
  });


  return {
    frame, staff, goTo, spreads,
    buildEndpaperLater: () => { if (lastCurrent >= N - 3) idleBuild(); },
    releaseIntro: () => {
      introHold = false;
      const hero = spreads[0];
      const names = hero.querySelectorAll('.name');
      const portraits = hero.querySelectorAll<HTMLElement>('.portrait');
      gsap.fromTo(names, { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 0.9, ease: 'power3.out', clearProps: 'clipPath' });
      gsap.fromTo(portraits, { yPercent: 62 }, { yPercent: 0, duration: 1, delay: 0.12, ease: 'expo.out', clearProps: 'transform' });
      staff.dropIn(0.55);
      posted.delete(0);
      gsap.delayedCall(0.4, () => enter(0));
    },
    showHero: () => showAll(spreads[0]),
    resize: layout,
    rowPx: () => rowPx,
  };
}

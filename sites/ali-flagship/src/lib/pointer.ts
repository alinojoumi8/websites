/**
 * One shared pointer. It feeds the WebGL plate, the foil and the engraved type.
 * On devices with no mouse, the page scroll tilts the foil instead.
 */
export const pointer = {
  /** raw target, 0..1 of the viewport */
  x: 0.62,
  y: 0.38,
  /** smoothed, 0..1 of the viewport */
  sx: 0.62,
  sy: 0.38,
  fine: false,
  moved: false,
};

let started = false;

export function startPointer(): () => void {
  if (started || typeof window === 'undefined') return () => {};
  started = true;

  pointer.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    pointer.fine = true;
    pointer.moved = true;
    pointer.x = e.clientX / window.innerWidth;
    pointer.y = e.clientY / window.innerHeight;
  };
  const onScroll = () => {
    if (pointer.fine && pointer.moved) return;
    const s = window.scrollY;
    pointer.x = 0.5 + 0.36 * Math.sin(s * 0.0021 + 0.6);
    pointer.y = 0.42 + 0.22 * Math.cos(s * 0.0016);
  };

  // Only sections on screen get the variables, so style work stays small.
  const live = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const el = en.target as HTMLElement;
        if (en.isIntersecting) live.add(el);
        else live.delete(el);
      }
    },
    { rootMargin: '10% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-ptr]').forEach((el) => io.observe(el));

  let raf = 0;
  let lastX = -1;
  let lastY = -1;
  const tick = () => {
    pointer.sx += (pointer.x - pointer.sx) * 0.09;
    pointer.sy += (pointer.y - pointer.sy) * 0.09;
    if (Math.abs(pointer.sx - lastX) > 0.0004 || Math.abs(pointer.sy - lastY) > 0.0004) {
      lastX = pointer.sx;
      lastY = pointer.sy;
      const mx = pointer.sx.toFixed(4);
      const my = pointer.sy.toFixed(4);
      live.forEach((el) => {
        el.style.setProperty('--mx', mx);
        el.style.setProperty('--my', my);
      });
    }
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // Start settled, so the first frames do no extra style work.
  pointer.sx = pointer.x;
  pointer.sy = pointer.y;
  raf = requestAnimationFrame(tick);

  return () => {
    started = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('scroll', onScroll);
  };
}

/**
 * One shared pointer, in CSS pixels of the viewport.
 * It feeds the mat grid, the crosshair and the ruler marks.
 */
export const pointer = {
  x: -9999,
  y: -9999,
  /** true after a real mouse or pen moved */
  live: false,
};

type Listener = () => void;
const listeners = new Set<Listener>();
let started = false;

export function onPointer(fn: Listener): () => void {
  listeners.add(fn);
  if (!started && typeof window !== 'undefined') {
    started = true;
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.live = true;
        listeners.forEach((l) => l());
      },
      { passive: true },
    );
    document.addEventListener('pointerleave', () => {
      pointer.live = false;
      listeners.forEach((l) => l());
    });
  }
  return () => listeners.delete(fn);
}

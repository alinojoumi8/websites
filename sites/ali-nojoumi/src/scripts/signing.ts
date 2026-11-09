// Two-layer threshold approval, illustrated. No keys here: the interface shows the rule.
import { stampIn } from './post';
import { sfx } from './sound';
import gsap from 'gsap';

const DEPT = 3, PER = 3, NEED = 2;

export function initSigning() {
  const root = document.getElementById('signing');
  if (!root) return;
  const signed = Array.from({ length: DEPT }, () => Array<boolean>(PER).fill(false));
  const btns = Array.from(root.querySelectorAll<HTMLButtonElement>('.signer'));
  const status = document.getElementById('sign-status')!;
  const note = document.getElementById('addr-note')!;
  const stamp = document.getElementById('released') as HTMLElement;
  const replace = document.getElementById('replace') as HTMLButtonElement;
  const clear = document.getElementById('clear') as HTMLButtonElement;
  const reduced = document.documentElement.classList.contains('still');
  let released = false;
  let nextReplace = 0;
  gsap.set(stamp, { autoAlpha: 0 });

  const paint = () => {
    let okDept = 0;
    signed.forEach((row, d) => {
      const n = row.filter(Boolean).length;
      const ok = n >= NEED;
      if (ok) okDept++;
      const st = root.querySelector<HTMLElement>(`[data-state="${d}"]`)!;
      st.textContent = ok ? 'Approved' : `${n} of ${NEED}`;
      st.classList.toggle('ok', ok);
    });
    const left = Math.max(0, NEED - okDept);
    if (okDept >= NEED) {
      status.textContent = 'Both layers reached. The withdrawal is released.';
      if (!released) {
        released = true;
        if (reduced) gsap.set(stamp, { autoAlpha: 0.92 });
        else stampIn(stamp, 0.05, root);
      }
    } else {
      status.textContent = `Waiting for ${left} ${left === 1 ? 'department' : 'departments'}.`;
      if (released) {
        released = false;
        gsap.to(stamp, { autoAlpha: 0, duration: 0.15 });
      }
    }
  };

  btns.forEach((b) => {
    b.addEventListener('click', () => {
      const d = Number(b.dataset.d), s = Number(b.dataset.s);
      signed[d][s] = !signed[d][s];
      b.setAttribute('aria-pressed', String(signed[d][s]));
      sfx.tick();
      paint();
    });
  });

  replace.addEventListener('click', () => {
    const list = btns.filter((b) => !b.classList.contains('replaced'));
    if (!list.length) {
      note.textContent = 'Everyone has been replaced by Ali. Same address.';
      return;
    }
    const b = list[nextReplace % list.length];
    nextReplace += 2;
    b.classList.add('replaced');
    const also = document.createElement('span');
    also.className = 'also';
    also.textContent = 'also Ali';
    b.querySelector('.who')!.after(also);
    b.setAttribute('aria-label', `${b.getAttribute('aria-label')}, replaced`);
    note.textContent = 'Signer replaced. Address unchanged.';
    if (!reduced) gsap.fromTo('#addr', { backgroundColor: 'rgba(255,197,49,.55)' }, { backgroundColor: 'rgba(255,197,49,0)', duration: 0.9 });
    sfx.tick();
  });

  clear.addEventListener('click', () => {
    signed.forEach((r) => r.fill(false));
    btns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    note.textContent = 'Sample address';
    paint();
  });

  paint();
}

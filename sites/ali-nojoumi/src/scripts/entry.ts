// The last row of the book. Posting it inks the row, stamps it, and opens an email to Ali.
import gsap from 'gsap';
import { stampIn } from './post';

const ADDRESS = 'alinojoumi8@gmail.com';
const HINT = 'Posting opens an email to me with your words in it.';

export function initEntry() {
  const form = document.getElementById('entry') as HTMLFormElement | null;
  if (!form) return;
  const input = document.getElementById('entry-text') as HTMLInputElement;
  const msg = document.getElementById('entry-msg')!;
  const date = document.getElementById('entry-date')!;
  const stamp = document.getElementById('entry-stamp') as HTMLElement;
  const still = document.documentElement.classList.contains('still');
  date.textContent = new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
  gsap.set(stamp, { autoAlpha: 0 });

  input.addEventListener('input', () => {
    msg.removeAttribute('data-error');
    msg.textContent = HINT;
    if (form.classList.contains('is-posted')) {
      form.classList.remove('is-posted');
      gsap.to(stamp, { autoAlpha: 0, duration: 0.12 });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) {
      msg.setAttribute('data-error', '');
      msg.textContent = 'Write what is missing first, then post the entry.';
      input.focus();
      return;
    }
    const again = form.classList.contains('is-posted');
    form.classList.add('is-posted');
    if (!again) {
      if (still) gsap.set(stamp, { autoAlpha: 0.92 });
      else stampIn(stamp, 0.02, form.closest('.page'));
    }
    const subject = encodeURIComponent('Open entry: what is missing on our team');
    const body = encodeURIComponent(`Ali,\n\nWhat is missing on our team:\n${text}\n\n`);
    // let the stamp land before the email app takes over
    window.setTimeout(() => {
      window.location.href = `mailto:${ADDRESS}?subject=${subject}&body=${body}`;
    }, again || still ? 0 : 280);
    msg.textContent = `Posted. Your email app should open now. If it does not, write to ${ADDRESS}.`;
  });
}

// TODO before launch: set to the intake form's POST endpoint.
const INTAKE_ENDPOINT = '';
const $ = id => document.getElementById(id);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile menu
const menuBtn = $('menuBtn'), menu = $('mobileMenu');
const setMenu = open => { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', open); menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
menuBtn.onclick = () => setMenu(menu.hidden);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

// Chaos to chronology
const stage = $('stage'), sortBtn = $('sortBtn');
const setStage = s => {
  stage.dataset.state = s;
  sortBtn.querySelector('span').textContent = s === 'order' ? 'Scatter the file' : 'Put it in order';
  stage.setAttribute('aria-label', 'Sample file: six documents ' + (s === 'order' ? 'in date order, each with a finding' : 'scattered and out of order'));
};
sortBtn.onclick = () => setStage(stage.dataset.state === 'order' ? 'chaos' : 'order');
if (!reduced) {
  setStage('chaos');
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); setTimeout(() => setStage('order'), 900); } }, { threshold: .25 }).observe(stage);
}

// Hero film: plays once in view unless the visitor prefers less motion or data
const film = $('film'), filmBtn = $('filmBtn');
const startFilm = () => film.play().catch(() => { filmBtn.textContent = 'Play film'; });
film.onplay = () => { filmBtn.textContent = 'Pause film'; };
film.onpause = () => { filmBtn.textContent = film.ended ? 'Watch again' : 'Play film'; };
filmBtn.onclick = () => film.paused ? startFilm() : film.pause();
if (!reduced && !navigator.connection?.saveData) {
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); startFilm(); } }, { threshold: .4 }).observe(film);
}

// Service index: exactly one panel open
const svcBtns = [...document.querySelectorAll('.svc')];
svcBtns.forEach((b, i) => b.onclick = () => {
  svcBtns.forEach((x, n) => {
    x.setAttribute('aria-expanded', n === i);
    $('p' + n).hidden = n !== i;
  });
  // On phones the panel opens below its row: bring the row to the top so the panel clears the bottom bar.
  if (matchMedia('(max-width:767px)').matches) b.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
});

const openHash = () => { const m = location.hash.match(/^#p(\d)$/); if (m && svcBtns[m[1]]) svcBtns[m[1]].click(); };
addEventListener('hashchange', openHash); openHash();

// Savings estimator
const money = n => '$' + Math.round(n).toLocaleString('en-CA');
const calc = () => {
  const firm = $('rate').value * $('hours').value, sup = firm * $('share').value / 100;
  $('rateO').textContent = money($('rate').value) + '/hr';
  $('hoursO').textContent = $('hours').value + ' hours';
  $('shareO').textContent = $('share').value + '%';
  $('saved').textContent = money(firm - sup);
  $('firm').textContent = money(firm); $('sup').textContent = money(sup);
  $('rate').setAttribute('aria-valuetext', $('rateO').textContent);
  $('hours').setAttribute('aria-valuetext', $('hoursO').textContent);
  $('share').setAttribute('aria-valuetext', $('shareO').textContent);
  $('shareEcho').textContent = $('share').value + '%';
  return 'A firm: about ' + money(firm) + '. Difference: about ' + money(firm - sup);
};
['rate', 'hours', 'share'].forEach(id => { $(id).oninput = calc; $(id).onchange = () => { $('calcLive').textContent = calc(); }; });
calc();

// Signature comparison
const sigWipe = () => { $('sigBox').style.setProperty('--w', $('sig').value + '%'); $('sigLine').setAttribute('x1', 5.2 * $('sig').value); $('sigLine').setAttribute('x2', 5.2 * $('sig').value); $('sig').setAttribute('aria-valuetext', $('sig').value + ' percent of the questioned signature shown'); };
$('sig').oninput = sigWipe; sigWipe();

// Intake form
const form = $('intakeForm'), msg = $('formMsg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  let first = null;
  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.checkValidity() || !f.value.trim();
    f.setAttribute('aria-invalid', bad);
    const err = f.parentElement.querySelector('.err');
    err.id = f.id + '-err'; f.setAttribute('aria-describedby', [f.dataset.hint, err.id].filter(Boolean).join(' '));
    err.classList.toggle('hidden', !bad);
    if (bad && !first) first = f;
  });
  if (first) { first.focus(); msg.textContent = ''; return; }
  if (!INTAKE_ENDPOINT) { msg.textContent = 'This form is not connected yet, so nothing was sent.'; return; }
  const btn = form.querySelector('button'); btn.disabled = true; msg.textContent = 'Sending…';
  try {
    const r = await fetch(INTAKE_ENDPOINT, { method: 'POST', body: new FormData(form) });
    if (!r.ok) throw 0;
    form.reset(); msg.textContent = "Thanks. We've got it and will reply by email to set up your triage.";
  } catch { msg.textContent = "That didn't go through. Check your connection and try again."; }
  btn.disabled = false;
});
// Mobile CTA: after the hero, until the form is on screen
const vis = { top: true, intake: false }, mbar = $('mbar');
new IntersectionObserver(es => { es.forEach(e => vis[e.target.id] = e.isIntersecting); mbar.hidden = vis.top || vis.intake; }).observe($('top'));
const io2 = new IntersectionObserver(es => { es.forEach(e => vis.intake = e.isIntersecting); mbar.hidden = vis.top || vis.intake; }); io2.observe($('intake'));
$('yr').textContent = new Date().getFullYear();

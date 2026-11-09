// A toy double-entry economy, one posting at a time.
// Deterministic and kept in whole cents, so the columns always match and a replay writes the same books.
type Kind = 'h' | 'b' | 'k';
type Acct = { kind: Kind; name: string; cash: number; debt: number };
type Line = { dr: string; cr: string; amt: number; ok: boolean } | { bf: number };

const mulberry = (a: number) => () => {
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const SEED = 19981;
const ROWS = 11;
const POST_MS = 320;
const LOW = 0.02;
const HIGH = 0.12;
const HOUSEHOLDS = 22;
const FIRMS = 6;
const BANKS = 2;
const HOLD = 'Every payment posts twice. Struck lines were refused.';

const money = (cents: number) =>
  (cents / 100).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function initEconomy() {
  const root = document.getElementById('economy');
  const body = document.getElementById('e-rows');
  if (!root || !body) return;
  const el = (id: string) => document.getElementById(id) as HTMLElement;
  const dr = el('e-dr');
  const cr = el('e-cr');
  const refusedEl = el('e-rj');
  const rateEl = el('e-rate');
  const status = el('e-status');
  const shockBtn = el('e-shock') as HTMLButtonElement;
  const replayBtn = el('e-replay') as HTMLButtonElement;
  const html = document.documentElement;
  const still = html.classList.contains('still');
  const page = root.closest('.page') as HTMLElement;

  const rows = Array.from({ length: ROWS }, () => body.appendChild(document.createElement('tr')));

  let rnd = mulberry(SEED);
  let accts: Acct[] = [];
  let H: number[] = [];
  let B: number[] = [];
  let K: number[] = [];
  let count = 0;
  let debits = 0;
  let credits = 0;
  let refused = 0;
  let rate = LOW;
  let lines: Line[] = [];
  const shocks: number[] = [];
  const firstRun = new Map<number, string>();
  let replaying = false;
  let replayShocks: number[] = [];
  let matched = 0;
  let differs = false;

  const paintRow = (tr: HTMLTableRowElement, line: Line | undefined, fresh: boolean) => {
    tr.className = '';
    if (!line) {
      tr.innerHTML = '<td></td><td></td><td class="mid"></td><td></td>';
      return;
    }
    if ('bf' in line) {
      const v = money(line.bf);
      tr.className = 'bf';
      tr.innerHTML = `<td colspan="2" class="n">B/F ${v}</td><td colspan="2" class="n mid">B/F ${v}</td>`;
      return;
    }
    const v = money(line.amt);
    tr.innerHTML = `<td>${line.dr}</td><td class="n">${v}</td><td class="mid">${line.cr}</td><td class="n">${v}</td>`;
    if (!line.ok) tr.classList.add('refused');
    if (fresh) tr.classList.add('new');
  };

  const paintAll = () => rows.forEach((tr, i) => paintRow(tr, lines[i], false));

  const paintTotals = () => {
    dr.textContent = money(debits);
    cr.textContent = money(credits);
    refusedEl.textContent = refused.toLocaleString('en-CA');
    rateEl.textContent = `${Math.round(rate * 100)}%`;
  };

  const seedWorld = () => {
    rnd = mulberry(SEED);
    accts = [];
    lines = [];
    count = 0;
    debits = 0;
    credits = 0;
    refused = 0;
    rate = LOW;
    for (let i = 0; i < HOUSEHOLDS; i++) accts.push({ kind: 'h', name: `House ${String(i + 1).padStart(2, '0')}`, cash: 3000 + Math.round(rnd() * 4000), debt: 0 });
    for (let i = 0; i < FIRMS; i++) accts.push({ kind: 'b', name: `Firm ${i + 1}`, cash: 14000, debt: 0 });
    for (let i = 0; i < BANKS; i++) accts.push({ kind: 'k', name: `Bank ${i + 1}`, cash: 60000, debt: 0 });
    const of = (k: Kind) => accts.flatMap((a, i) => (a.kind === k ? [i] : []));
    H = of('h');
    B = of('b');
    K = of('k');
    shockBtn.setAttribute('aria-pressed', 'false');
    shockBtn.textContent = 'Raise rates';
  };

  const pick = (list: number[]) => list[Math.floor(rnd() * list.length)];
  const cents = (from: number, spread: number) => Math.round((from + rnd() * spread) * 100);

  const step = (paint: boolean) => {
    const r = rnd();
    const spend = Math.max(0.14, 0.46 - (rate - LOW) * 3);
    const lend = Math.max(0.03, 0.14 - (rate - LOW) * 1.1);
    let from: number;
    let to: number;
    let amt: number;
    let loan = false;
    let repay = false;
    if (r < spend) {
      from = pick(H);
      to = pick(B);
      amt = cents(2, 14);
    } else if (r < spend + lend) {
      from = pick(K);
      to = pick(H);
      amt = cents(14, 22);
      loan = true;
    } else if (r < spend + lend + 0.24) {
      from = pick(B);
      to = pick(H);
      amt = cents(6, 20);
    } else {
      from = pick(H);
      to = pick(K);
      amt = Math.min(cents(6, 16), accts[from].debt);
      repay = true;
      if (accts[from].debt <= 0) {
        // nothing owed, so this one becomes a wage
        to = from;
        from = pick(B);
        amt = cents(6, 20);
        repay = false;
      }
    }
    if (lines.length >= ROWS) {
      lines = [{ bf: debits }];
      if (paint) paintAll();
    }
    const payer = accts[from];
    const payee = accts[to];
    const ok = payer.cash >= amt;
    if (ok) {
      payer.cash -= amt;
      payee.cash += amt;
      debits += amt; // the receiving account is debited
      credits += amt; // the paying account is credited
      if (loan) payee.debt += amt;
      if (repay) payer.debt = Math.max(0, payer.debt - amt);
    } else {
      refused++;
    }
    count++;
    const line: Line = { dr: payee.name, cr: payer.name, amt, ok };
    lines.push(line);
    if (paint) paintRow(rows[lines.length - 1], line, true);
  };

  const digest = () => `${debits}|${credits}|${refused}`;

  const toggleRate = () => {
    rate = rate > LOW ? LOW : HIGH;
    shockBtn.setAttribute('aria-pressed', String(rate > LOW));
    shockBtn.textContent = rate > LOW ? 'Lower rates' : 'Raise rates';
  };

  const finishReplay = () => {
    replaying = false;
    shockBtn.disabled = false;
    replayBtn.disabled = false;
    status.textContent = differs ? 'Replay differs from the first run.' : `Replay finished. Same books for ${matched.toLocaleString('en-CA')} postings.`;
  };

  const tick = (paint: boolean) => {
    if (replaying) {
      while (replayShocks.length && replayShocks[0] === count) {
        toggleRate();
        replayShocks.shift();
      }
    }
    step(paint);
    if (!replaying) {
      firstRun.set(count, digest());
      return;
    }
    if (firstRun.get(count) === digest()) matched = count;
    else differs = true;
    if (!firstRun.has(count + 1)) finishReplay();
  };

  let running = false;
  let last = 0;
  const loop = (now: number) => {
    if (!running) return;
    if (replaying) {
      if (now - last > 33) {
        last = now;
        const burst = Math.max(1, Math.ceil(firstRun.size / 90));
        for (let i = 0; i < burst && replaying; i++) tick(false);
        paintAll();
        paintTotals();
      }
    } else if (now - last > POST_MS) {
      last = now;
      tick(true);
      paintTotals();
    }
    requestAnimationFrame(loop);
  };
  const start = () => {
    if (running || document.hidden) return;
    running = true;
    requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
  };
  const onPage = () => !html.classList.contains('book') || page.classList.contains('on');

  shockBtn.addEventListener('click', () => {
    if (replaying) return;
    shocks.push(count);
    toggleRate();
    status.textContent = rate > LOW ? 'Rates are up. Fewer purchases, more repayments.' : 'Rates are back down.';
    if (still) {
      for (let i = 0; i < 8; i++) tick(false);
      paintAll();
    }
    paintTotals();
  });

  replayBtn.addEventListener('click', () => {
    if (replaying) return;
    replayShocks = [...shocks];
    seedWorld();
    matched = 0;
    differs = false;
    replaying = true;
    shockBtn.disabled = true;
    replayBtn.disabled = true;
    status.textContent = 'Replaying with the same seed and the same rate changes.';
    if (still) {
      while (replaying) tick(false);
    }
    paintAll();
    paintTotals();
  });

  seedWorld();
  // open the book partway down a page, so it never starts blank
  for (let i = 0; i < 17; i++) tick(false);
  paintAll();
  paintTotals();
  status.textContent = HOLD;
  if (still) return;

  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && onPage()) start();
    else stop();
  }, { threshold: 0.1 }).observe(root);

  // in book mode, pages show and hide without any intersection change
  new MutationObserver(() => {
    if (!html.classList.contains('book')) return;
    if (page.classList.contains('on')) start();
    else stop();
  }).observe(page, { attributes: true, attributeFilter: ['class'] });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (onPage()) start();
  });
}

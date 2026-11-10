import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { figures, footnotes, jobs, practice, projects, register, site, statement, statementAfter } from '../lib/content';
import { Arrow, Counter, LampPortrait, Magnetic, Microtext, Pic, Rise, Rosette, Split } from './ui';

const PAD = 'px-[5vw] 3xl:px-[7vw]';
const SERIAL = 'AN 2018 2026';

/* ------------------------------------------------------------------ */

export function Nav() {
  const [ink, setInk] = useState(false);
  const [shade, setShade] = useState('#070b11');
  const [hidden, setHidden] = useState(false);

  // Over a colour flood the bar switches to dark ink. It steps aside on the way down and returns on the way up.
  useEffect(() => {
    const floods = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="ink"]'));
    let last = window.scrollY;
    const onScroll = () => {
      const probe = 28;
      const flood = floods.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setInk(!!flood);
      setShade(flood ? getComputedStyle(flood).backgroundColor : '#070b11');
      const y = window.scrollY;
      if (y < 140 || y < last - 6) setHidden(false);
      else if (y > last + 6) setHidden(true);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const link = 'link-line text-[0.8rem] font-semibold uppercase tracking-[0.07em]';

  return (
    <header
      style={{ ['--shade' as string]: shade }}
      className={`nav-shade fixed inset-x-0 top-0 z-50 transition-[color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:translate-y-0 ${ink ? 'on-flood text-plate' : 'text-bone'} ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <a
        href="#work"
        className="absolute left-4 top-3 -translate-y-20 rounded-full bg-bone px-4 py-2 text-[0.8rem] font-bold text-plate focus-visible:translate-y-0"
      >
        Skip to the work
      </a>
      <nav aria-label="Main" className={`flex items-center justify-between py-5 ${PAD}`}>
        <a href="#top" className="text-[0.95rem] font-black uppercase tracking-[-0.01em] [font-stretch:125%]">
          Ali Nojoumi
        </a>
        <ul className="flex items-center gap-5 sm:gap-8">
          <li><a className={link} href="#work">Work</a></li>
          <li><a className={link} href="#register">Record</a></li>
          <li><a className={link} href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="top" ref={ref} data-ptr className="relative isolate overflow-hidden">
      {/* Krea plate render */}
      <m.div
        aria-hidden="true"
        className="hero-art absolute right-[-34vw] top-[20svh] -z-10 aspect-video w-[max(150vw,96svh)] lg:right-[-24vw] lg:top-[-5svh] lg:w-[max(84vw,128svh)]"
        style={{ y: artY, scale: artScale }}
      >
        <div className="hero-art-drift art-in grain relative h-full w-full">
          <Pic name="hero" widths={[960, 1600, 2400]} sizes="96vw" alt="" w={2752} h={1536} eager className="h-full w-full object-cover" />
        </div>
      </m.div>

      <div className={`relative flex min-h-[100svh] flex-col pb-6 pt-24 lg:pt-28 ${PAD}`}>
        <div className="relative flex-1">
          {/* The serial, first setting */}
          <p className="serial fade-up text-[0.95rem] text-bone lg:pt-[2svh]" style={{ ['--d' as string]: '0.9s' }}>
            {SERIAL}
          </p>
          <p data-needs-js className="fade-up mt-3 text-[0.8rem] font-semibold text-mist lg:hidden" style={{ ['--d' as string]: '1.1s' }}>
            Tap the window
          </p>

          {/* The polymer window: the engraved plate rests in it, a lamp shows the colour picture */}
          <m.div
            className="relative z-10 -mb-[11vw] ml-auto mt-2 w-[60vw] max-w-[23rem] lg:absolute lg:right-[10vw] lg:top-[-1svh] lg:mb-0 lg:mt-0 lg:w-[min(27vw,45svh)] lg:max-w-none"
            style={{ y: windowY }}
          >
            <div className="window-in">
              <div className="note polymer rounded-full">
                <LampPortrait
                  base="plate"
                  className="aspect-[100/138] rounded-full"
                  imgClass="object-[50%_16%]"
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  radius={170}
                  pan={0.5}
                  eager
                  glint
                  alt="Ali Nojoumi. An engraved line portrait cut from his studio photograph: hand at his chin, steel watch."
                >
                  <div aria-hidden="true" className="foil-tex absolute inset-y-0 right-[11%] z-[2] w-[10%]" />
                </LampPortrait>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-[6%] -left-[22%] z-20 hidden lg:block">
              <div className="seal-spin">
                <Rosette size={150} />
              </div>
            </div>
            <p data-needs-js className="pointer-events-none absolute right-full top-[9%] z-20 mr-3 hidden whitespace-nowrap rounded-full bg-plate px-4 py-2 text-[0.8rem] font-semibold text-bone ring-1 ring-bone/25 lg:block">
              <span className="hint-fine">Hold a light to the window</span>
              <span className="hint-coarse">Tap the window</span>
            </p>
          </m.div>
        </div>

        <m.h1 className="display pointer-events-none relative z-20 text-[min(17.7vw,29svh)]" style={{ y: nameY }}>
          <span className="sr-only">Ali Nojoumi</span>
          <span aria-hidden="true" className="block">
            <Split text="Ali" by="char" unitClass="engraved" delay={0.15} css />
          </span>
          <span aria-hidden="true" className="block">
            <Split text="Nojoumi" by="char" unitClass="engraved" delay={0.3} css />
          </span>
        </m.h1>

        <div className="relative z-20 mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-[34rem]">
            <p className="text-[clamp(1.3rem,1.9vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] [font-stretch:112%]">
              <Split text="Product leader for payments and digital asset platforms." delay={0.8} css />
            </p>
            <p className="serial fade-up mt-3 text-mist" style={{ ['--d' as string]: '1.2s' }}>
              {SERIAL} · Fintech co-founder · Toronto
            </p>
          </div>
          <div className="fade-up" style={{ ['--d' as string]: '1.3s' }}>
            <Magnetic>
              <a href={site.mailto} className="btn-foil group flex items-center gap-3 rounded-full bg-bone py-4 pl-7 pr-6 text-[1.02rem] font-bold text-plate">
                <span className="relative">Start a conversation</span>
                <Arrow className="relative text-[1.15em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.st-word',
        { opacity: 0.4 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section data-ptr className={`relative py-[clamp(6rem,15vw,13rem)] ${PAD}`}>
      <Microtext words="Ali Nojoumi product leader payments digital assets Toronto" className="mb-[clamp(3rem,7vw,6rem)] text-mist" run />
      <p
        ref={ref}
        className="max-w-[17ch] text-[clamp(2.3rem,6.6vw,7rem)] font-bold leading-[0.98] tracking-[-0.035em] [font-stretch:108%]"
      >
        {statement.split(' ').map((w, i) => (
          <span key={i} className="st-word inline-block">
            {w}
            {' '}
          </span>
        ))}
      </p>
      <div className="mt-[clamp(2.5rem,6vw,5rem)] grid gap-6 lg:grid-cols-12">
        <div aria-hidden="true" className="foil foil-rule self-center lg:col-span-6" />
        <Rise as="p" className="max-w-[46ch] text-[1.15rem] text-mist lg:col-span-5 lg:col-start-8">
          {statementAfter}
        </Rise>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Denominations() {
  return (
    <section data-ptr data-nav="ink" className={`flood-emerald on-flood relative isolate overflow-hidden py-[clamp(5rem,11vw,10rem)] ${PAD}`}>
      <div aria-hidden="true" className="flood-tex -z-10" />
      <div className="grid items-end gap-6 lg:grid-cols-12">
        <h2 className="display text-[clamp(2.6rem,7.4vw,7.6rem)] lg:col-span-8">
          <Split text="Four figures on the record." register />
        </h2>
        <Rise as="p" className="max-w-[30ch] text-[1.15rem] font-semibold lg:col-span-4 lg:pb-3">
          Each one has a source and a date.
        </Rise>
      </div>

      <ul className="mt-[clamp(3rem,7vw,6rem)]">
        {figures.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={f.unit} className="grid items-end gap-x-8 gap-y-4 border-t border-plate/35 py-[clamp(1.5rem,3.5vw,3rem)] lg:grid-cols-12">
              <div className={`display flex items-start leading-[0.8] lg:col-span-8 ${flip ? 'lg:order-2 lg:justify-end' : ''}`} style={{ fontSize: f.size }}>
                {f.before && <span className="mr-[0.06em] mt-[0.1em] text-[0.36em]">{f.before}</span>}
                <Counter value={f.value} className="engraved" style={{ ['--ink' as string]: 'var(--color-plate)' }} />
                {f.after && <span className="ml-[0.08em] mt-[0.1em] text-[0.36em]">{f.after}</span>}
              </div>
              <div className={`lg:col-span-4 lg:pb-[1.2vw] ${flip ? 'lg:order-1' : ''}`}>
                <h3 className="text-[clamp(1.3rem,1.9vw,1.9rem)] font-extrabold uppercase leading-none tracking-[-0.015em] [font-stretch:118%]">
                  {f.unit}
                </h3>
                <p className="mt-3 max-w-[38ch] font-medium">{f.text}</p>
                <p className="serial mt-4">{f.source}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <Microtext words="Every number traces to the resume with its scope and date" className="mt-2 border-t border-plate/35 pt-4" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Light() {
  const [spot, setSpot] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const active = jobs.find((j) => j.id === spot) ?? null;

  return (
    <section id="light" data-ptr className={`relative py-[clamp(6rem,14vw,12rem)] ${PAD}`}>
      <div className="grid items-start gap-x-[4vw] gap-y-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-24 lg:col-span-7">
          <Rise y={40}>
            <div className="note">
              <LampPortrait
                className="note-frame aspect-[1312/1199]"
                sizes="(min-width: 1024px) 54vw, 90vw"
                radius={190}
                spot={active}
                showAll={showAll}
                alt="Ali Nojoumi, studio portrait. Under the lamp, seven small copies of him appear around the large one: one with a laptop, one on a ladder, one with a light bulb, one with a megaphone, one in sunglasses, one with a clipboard, and one asleep."
              >
                <span aria-hidden="true" className="note-corner left-[22px] top-[18px]">7</span>
                <span aria-hidden="true" className="note-corner bottom-[18px] right-[22px]">7</span>
              </LampPortrait>
            </div>
          </Rise>
          <noscript>
            <img
              className="note-frame mt-6 w-full"
              src="/art/ali-minis-800.webp"
              width={1312}
              height={1199}
              alt="The second picture: seven small copies of Ali around the large portrait. One has a laptop, one climbs a ladder, one has a light bulb, one a megaphone, one wears sunglasses, one holds a clipboard, and one is asleep."
            />
          </noscript>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="serial text-mist">Portrait and watermark · two photographs, one frame</p>
            <button
              type="button"
              data-needs-js
              aria-pressed={showAll}
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-bone/40 px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-plate"
            >
              {showAll ? 'Hide the watermark' : 'Show the whole watermark'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-[5vw]">
          <h2 className="display text-[clamp(2.5rem,5.4vw,5.6rem)]">
            <Split text="Hold it to the light." register />
          </h2>
          <Rise as="p" className="mt-7 max-w-[42ch] text-[1.15rem] text-mist">
            A banknote hides a second picture in its paper. This portrait hides seven. A new financial product needs many jobs
            done before it has a team. I have done each of them.
          </Rise>
          <ul className="mt-9">
            {jobs.map((j) => (
              <li key={j.id}>
                <button
                  type="button"
                  aria-pressed={spot === j.id}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setSpot(j.id)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setSpot(null)}
                  onFocus={() => setSpot(j.id)}
                  onBlur={() => setSpot(null)}
                  onClick={() => setSpot((s) => (s === j.id ? null : j.id))}
                  className="group relative grid w-full grid-cols-1 gap-x-6 gap-y-1 border-t border-bone/15 py-4 text-left sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-baseline"
                >
                  <span aria-hidden="true" className="foil foil-rule absolute inset-x-0 -top-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-pressed:scale-x-100" />
                  <span className="text-[1.2rem] font-bold leading-tight tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [font-stretch:112%] group-hover:translate-x-2 group-aria-pressed:translate-x-2">
                    {j.label}
                  </span>
                  <span className="text-[0.95rem] text-mist">{j.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Practice() {
  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };

  return (
    <section data-ptr className={`relative pb-[clamp(6rem,14vw,12rem)] ${PAD}`}>
      <h2 className="display max-w-[15ch] text-[clamp(2.5rem,6.4vw,6.6rem)]">
        <Split text="From a need to a live product." register />
      </h2>
      {/* Four proofs pulled from the plate. They sit a little out of line, like sheets on a bench. */}
      <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-x-7 gap-y-9 lg:grid-cols-12">
        {practice.map((p, i) => (
          <Rise key={p.title} delay={(i % 2) * 0.12} className={`${p.span} ${i % 2 === 1 ? 'lg:mt-16' : ''}`}>
            <div className="note h-full">
              <article onPointerMove={onMove} className="plate-card flex h-full min-h-[19rem] flex-col justify-between p-8 sm:p-10 lg:min-h-[23rem] lg:p-12">
                <div aria-hidden="true" className="plate-tex" />
                <div aria-hidden="true" className="plate-lamp" />
                <h3 className="max-w-[13ch] text-[clamp(1.75rem,3vw,3.1rem)] font-black uppercase leading-[0.92] tracking-[-0.025em] [font-stretch:122%]">
                  {p.title}
                </h3>
                <p className="plate-copy mt-12 max-w-[46ch] text-[1.05rem]">{p.text}</p>
              </article>
            </div>
          </Rise>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Series() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
      sec.classList.add('is-row');
      const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const panels = gsap.utils.toArray<HTMLElement>('.series-panel', tr);

      const label = () => {
        if (!count.current) return;
        const mid = window.innerWidth * 0.5;
        let n = 0;
        panels.forEach((p, i) => {
          if (p.getBoundingClientRect().left < mid) n = i + 1;
        });
        const text = n ? `${projects[n - 1].name} · ${n} of ${projects.length}` : 'Series';
        if (count.current.textContent !== text) count.current.textContent = text;
      };

      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: 'none',
        onUpdate: label,
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
          },
        },
      });

      panels.forEach((panel) => {
        const img = panel.querySelector('.series-img');
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        );
      });

      // Keyboard focus inside a panel brings that panel on screen.
      const onFocus = (e: FocusEvent) => {
        const panel = (e.target as Element).closest<HTMLElement>('.series-panel, .series-intro');
        const st = tween.scrollTrigger;
        if (!panel || !st) return;
        const d = dist();
        const at = d ? Math.min(1, panel.offsetLeft / d) : 0;
        window.scrollTo({ top: st.start + at * (st.end - st.start) });
      };
      tr.addEventListener('focusin', onFocus);

      return () => {
        tr.removeEventListener('focusin', onFocus);
        sec.classList.remove('is-row');
        gsap.set(tr, { clearProps: 'transform' });
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={section} data-ptr className="series relative">
      <div ref={track} className="series-track py-[clamp(5rem,12vw,9rem)] lg:py-0">
        <div className={`series-intro flex flex-col justify-center ${PAD}`}>
          <h2 className="display text-[clamp(2.8rem,8vw,8.5rem)]">
            <Split text="Issued so far." register />
          </h2>
          <Rise as="p" className="mt-7 max-w-[40ch] text-[1.15rem] text-mist">
            Two companies, two open-source projects, and one product in development.
          </Rise>
          <div aria-hidden="true" className="row-hint mt-10 items-center gap-4 text-mist">
            <div className="seal-spin"><Rosette size={92} /></div>
            <span className="text-[0.85rem] font-semibold">Keep scrolling. The series moves sideways.</span>
          </div>
        </div>

        {projects.map((p) => (
          <article key={p.id} className={`series-panel flex flex-col justify-center gap-y-[clamp(1.5rem,3vw,2.5rem)] lg:pb-20 lg:pt-24 ${PAD}`}>
            <h3 className="display text-[clamp(2.4rem,8.6vw,9.4rem)]">{p.name}</h3>
            <div className="series-body grid items-start gap-x-[4vw] gap-y-8 lg:grid-cols-12">
              <div className="series-fig note w-full lg:col-span-5">
                <div className="note-frame grain absolute inset-0">
                  <div className="series-img absolute inset-y-0 -inset-x-[8%]">
                    <Pic name={p.id} widths={[720, 1200]} sizes="(min-width: 1024px) 38vw, 90vw" alt={p.alt} w={1856} h={2304} className="h-full w-full object-cover" />
                  </div>
                  <span aria-hidden="true" className="serial absolute bottom-[18px] left-[18px] z-[4] bg-plate px-2 py-1 text-bone">{p.serial}</span>
                  <div aria-hidden="true" className="foil-tex absolute inset-y-0 right-0 z-[2] w-[5px]" />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pt-1">
                <p className="max-w-[34ch] text-[clamp(1.2rem,1.7vw,1.7rem)] font-medium leading-[1.25] tracking-[-0.01em]">{p.line}</p>
                <ul className="mt-6 max-w-[52ch] text-mist">
                  <li className="serial border-t border-bone/12 py-3">
                    {p.series} · {p.role}
                  </li>
                  {p.points.map((pt) => (
                    <li key={pt} className="border-t border-bone/12 py-2.5">
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href={p.href} className="link-line mt-7 inline-flex items-center gap-2 text-[1.05rem] font-semibold" {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {p.hrefLabel}
                  <Arrow />
                  {p.href.startsWith('http') && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={`series-progress pointer-events-none absolute inset-x-0 bottom-6 ${PAD}`}>
        <div className="flex items-center gap-5">
          <span ref={count} className="serial w-[15rem] text-mist">Series</span>
          <div className="relative h-px flex-1 bg-bone/15">
            <div ref={bar} className="foil absolute inset-0 origin-left scale-x-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Register() {
  return (
    <section id="register" data-ptr className={`relative py-[clamp(6rem,14vw,12rem)] ${PAD}`}>
      <div className="grid items-end gap-6 lg:grid-cols-12">
        <h2 className="display text-[clamp(2.5rem,6.4vw,6.6rem)] lg:col-span-8">
          <Split text="The full register." register />
        </h2>
        <Rise as="p" className="max-w-[34ch] text-[1.1rem] text-mist lg:col-span-4 lg:pb-3">
          Six ventures since 2018. Some ran at the same time.
        </Rise>
      </div>

      <ul className="mt-[clamp(2.5rem,5vw,4.5rem)]">
        {register.map((r) => (
          <li key={r.name} className="group relative grid grid-cols-1 items-baseline gap-x-6 gap-y-1.5 border-t border-bone/15 py-6 lg:grid-cols-12 lg:py-8">
            <span aria-hidden="true" className="foil foil-rule absolute inset-x-0 -top-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            <span className="serial text-mist lg:col-span-2">{r.years}</span>
            <h3 className="text-[clamp(1.8rem,3.4vw,3.5rem)] font-black uppercase leading-none tracking-[-0.025em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [font-stretch:122%] group-hover:translate-x-3 lg:col-span-4">
              {r.name}
            </h3>
            <span className="font-semibold lg:col-span-2">{r.role}</span>
            <p className="max-w-[46ch] text-mist lg:col-span-4">{r.text}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-[clamp(3rem,6vw,5rem)] grid gap-8 border-t border-bone/15 pt-8 lg:grid-cols-3">
        {footnotes.map((f) => (
          <div key={f.label}>
            <dt className="text-[1.05rem] font-bold [font-stretch:112%]">{f.label}</dt>
            <dd className="mt-2 max-w-[40ch] text-mist">{f.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Signatories() {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', hour12: false });
    const set = () => setClock(fmt.format(new Date()));
    set();
    const id = window.setInterval(set, 20000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="contact" data-ptr data-nav="ink" className={`flood-copper on-flood relative isolate overflow-hidden pb-8 pt-[clamp(5rem,12vw,10rem)] ${PAD}`}>
      <div aria-hidden="true" className="flood-tex -z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[6vw] top-[4vw] -z-10 opacity-40">
        <div className="seal-spin"><Rosette size={420} tone="ink" /></div>
      </div>

      <h2 className="display max-w-[11ch] text-[clamp(2.9rem,10vw,11.5rem)]">
        <Split text="This note needs a second signature." stagger={0.05} register />
      </h2>

      <div className="mt-[clamp(3rem,7vw,6rem)] grid items-end gap-x-[4vw] gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="max-w-[30ch] text-[clamp(1.25rem,1.8vw,1.75rem)] font-semibold leading-[1.22] tracking-[-0.01em]">
            I enjoy finding what is missing, assembling the right team and turning a hard problem into a working product.
          </p>
          <p className="mt-5 max-w-[42ch] font-medium">
            If your team has a hard problem in payments or digital assets, write to me. I am based in Toronto and open to GTA,
            remote and relocation anywhere in Canada.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-plate/45 py-5">
            <span className="serial">Signatory 1 of 2 · Signed</span>
            <span className="text-[clamp(1.5rem,2.6vw,2.6rem)] font-black uppercase leading-none tracking-[-0.02em] [font-stretch:122%]">Ali Nojoumi</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-y border-plate/45 py-5">
            <span className="serial">Signatory 2 of 2 · Open</span>
            <Magnetic strength={0.4}>
              <a
                href={site.mailto}
                data-cursor="Write"
                className="group flex items-center gap-3 rounded-full bg-plate py-5 pl-8 pr-7 text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold text-bone transition-colors duration-300 hover:bg-bone hover:text-plate"
              >
                Sign with an email
                <Arrow className="text-[1.15em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <ul className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap gap-x-10 gap-y-3 text-[1.1rem] font-bold">
        <li><a className="link-line" href={`mailto:${site.email}`}>{site.email}</a></li>
        <li><a className="link-line" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li>
        <li><a className="link-line" href={site.github} target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span></a></li>
      </ul>

      <footer className="serial mt-[clamp(4rem,8vw,7rem)] flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-plate/45 pt-5">
        <span>© 2026 Ali Nojoumi · {SERIAL}</span>
        <span>
          Toronto <time>{clock || '··:··'}</time>
        </span>
        <span>3D art made with Krea. Portraits supplied by Ali.</span>
      </footer>
    </section>
  );
}

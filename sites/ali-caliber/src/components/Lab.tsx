import { lab } from '../lib/content';
import { ArrowOut, Pic, glowMove, Rule } from './ui';
import { Manyworld } from './lab/Manyworld';
import { TrialLens } from './lab/TrialLens';
import { CrowdLens } from './lab/CrowdLens';

function Repo({ href, repo }: { href: string; repo: string }) {
  return (
    <a className="repo" href={href} target="_blank" rel="noreferrer">
      {repo}
      <ArrowOut />
    </a>
  );
}

export function Lab() {
  const { manyworld, triallens, crowdlens } = lab;
  return (
    <section className="lab" id="lab" aria-labelledby="lab-h">
      <div className="lab-top">
        <Pic
          className="lab-art"
          name="asset-simulations"
          widths={[1100, 2000]}
          sizes="100vw"
          w={2000}
          h={1116}
          alt="3D render: a network of small steel nodes lit amber and cyan, with tiny models of a house, an office block and a bank."
        />
        <header className="section-head">
          <h2 id="lab-h" data-split>
            The lab is still running.
          </h2>
          <p data-in>
            Three open-source projects keep the work hands-on. Each one runs a small sample right here, and the full code is on GitHub.
          </p>
        <Rule />
        </header>
      </div>

      <article className="bench bench-wide" data-in onPointerMove={glowMove}>
        <header className="bench-head">
          <div>
            <h3>
              {manyworld.name} <small>{manyworld.aka}</small>
            </h3>
            <p className="bench-kind">{manyworld.kind}</p>
          </div>
          <Repo href={manyworld.href} repo={manyworld.repo} />
        </header>
        <p className="bench-text">{manyworld.text}</p>
        <Manyworld />
      </article>

      <div className="bench-pair">
        <article className="bench" data-in onPointerMove={glowMove}>
          <header className="bench-head">
            <div>
              <h3>{triallens.name}</h3>
              <p className="bench-kind">{triallens.kind}</p>
            </div>
            <Repo href={triallens.href} repo={triallens.repo} />
          </header>
          <p className="bench-text">{triallens.text}</p>
          <TrialLens />
        </article>

        <article className="bench" data-in onPointerMove={glowMove}>
          <header className="bench-head">
            <div>
              <h3>{crowdlens.name}</h3>
              <p className="bench-kind">
                {crowdlens.kind} · <span className="chip-live">{crowdlens.status}</span>
              </p>
            </div>
            <Repo href={crowdlens.href} repo={crowdlens.repo} />
          </header>
          <p className="bench-text">{crowdlens.text}</p>
          <CrowdLens />
        </article>
      </div>
    </section>
  );
}

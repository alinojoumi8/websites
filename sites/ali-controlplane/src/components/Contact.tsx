/** The close: a full gold field, four magnetic actions, and the footer. */
import { nav, site } from '../lib/content';
import { Icon, Magnetic } from './ui';

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-field">
        <div className="contact-grid wrap">
          <div className="contact-copy">
            <h2 id="contact-title" className="contact-title" data-split>
              Tell me what is missing.
            </h2>
            <p className="contact-lead">
              I enjoy finding what is missing, assembling the right team and turning a hard problem into a working product. I would welcome a conversation about your team's priorities and where I could contribute.
            </p>
            <ul className="contact-actions">
              <li>
                <Magnetic>
                  <a className="btn btn-dark btn-big" href={`mailto:${site.email}`}>
                    <Icon name="mail" size={20} />
                    <span>{site.email}</span>
                  </a>
                </Magnetic>
              </li>
              <li>
                <Magnetic>
                  <a className="btn btn-ink" href={site.linkedin} rel="noopener me" target="_blank">
                    <Icon name="linkedin" />
                    LinkedIn
                  </a>
                </Magnetic>
              </li>
              <li>
                <Magnetic>
                  <a className="btn btn-ink" href={site.github} rel="noopener me" target="_blank">
                    <Icon name="github" />
                    GitHub
                  </a>
                </Magnetic>
              </li>
              <li>
                <Magnetic>
                  <a className="btn btn-ink" href={site.dossier} download>
                    <Icon name="download" />
                    Executive dossier, PDF
                  </a>
                </Magnetic>
              </li>
            </ul>
            <p className="contact-place">
              {site.location}. {site.open}
            </p>
          </div>
          <picture className="contact-seal">
            <source type="image/webp" srcSet="/art/logo-an-360.webp 360w, /art/logo-an-720.webp 720w" sizes="(min-width: 1024px) 30vw, 50vw" />
            <img src="/art/logo-an-720.png" width={720} height={532} alt="" loading="lazy" decoding="async" />
          </picture>
        </div>
      </div>
      <footer className="footer wrap">
        <p>© 2026 Ali Nojoumi. Every figure on this page comes from his resume of October 2026.</p>
        <ul className="footer-nav">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
          <li>
            <a href="#top">Top</a>
          </li>
        </ul>
        <p className="footer-note">Diagrams and demos are toy models with sample data. Art rendered with Krea. Built with Astro, Motion, GSAP and Lenis.</p>
      </footer>
    </section>
  );
}

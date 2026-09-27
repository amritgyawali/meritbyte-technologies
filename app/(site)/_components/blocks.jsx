// Small building blocks shared by the content pages.

import { entryPath } from "../../../lib/content.mjs";
import { slugify } from "../../../lib/markdown.mjs";

export function Answer({ label = "Short answer", children }) {
  return (
    <aside className="answer" aria-label={label}>
      <p className="answer__label">{label}</p>
      <p className="answer__text">{children}</p>
    </aside>
  );
}

export function Prose({ html }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Toc({ headings }) {
  const items = headings.filter((h) => h.level === 2);
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__label">On this page</p>
      <ol>
        {items.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// A grid of links to other entries (services, posts, locations...).
export function EntryCards({ entries, label, heading, describe = (e) => e.lead || e.description }) {
  if (!entries?.length) return null;
  return (
    <section className="related" aria-labelledby={`${label}-heading`}>
      <h2 id={`${label}-heading`} className="related__heading">
        {heading}
      </h2>
      <ul className="cards">
        {entries.map((entry) => (
          <li key={entry.slug} className="card">
            <a className="card__link" href={entryPath(entry)}>
              <span className="card__title">{entry.title || entry.name}</span>
              <span className="card__text">{describe(entry)}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CtaBand({
  heading = "Tell us what you are building.",
  text = "Write a few lines about what you have now, what you want instead and when you need it. A person replies within one business day with questions, a scope or an honest no.",
  primary = { href: "/contact", label: "Start a project" },
  secondary = { href: "/free-website", label: "Free website design for small businesses" }
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{heading}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__actions">
          <a className="button" href={primary.href}>
            {primary.label}
          </a>
          {secondary ? (
            <a className="button button--quiet" href={secondary.href}>
              {secondary.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// FAQ list for pages written in JSX (content pages get theirs from Markdown).
export function FaqList({ faqs, heading = "Frequently asked questions" }) {
  const id = heading === "Frequently asked questions" ? "faq" : slugify(heading);
  return (
    <section className="faq faq--standalone" aria-labelledby={id}>
      <h2 id={id}>{heading}</h2>
      {faqs.map((faq) => (
        <div key={faq.question} className="faq__item">
          <h3>{faq.question}</h3>
          <p>{faq.answerText}</p>
          {faq.more ? (
            <p className="faq__more">
              <a className="textlink" href={faq.more.href}>
                {faq.more.label}
              </a>
            </p>
          ) : null}
        </div>
      ))}
    </section>
  );
}

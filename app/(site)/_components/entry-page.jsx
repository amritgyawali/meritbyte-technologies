// The shared layout for service, location and industry pages: breadcrumbs,
// hero with the short answer beside it, the Markdown body with a sidebar,
// related links and a call to action.

import Breadcrumbs from "./breadcrumbs";
import JsonLd from "./json-ld";
import { Answer, CtaBand, Prose } from "./blocks";

export default function EntryPage({
  crumbs,
  label,
  h1,
  lead,
  summary,
  summaryLabel = "In short",
  actions,
  aside,
  html,
  after,
  cta,
  schema
}) {
  return (
    <>
      <JsonLd data={schema} />
      <main id="main">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>

        <section className="page-hero">
          <div className="container page-hero__grid">
            <div>
              <p className="label">{label}</p>
              <h1>{h1}</h1>
              <p className="page-hero__lead">{lead}</p>
              <div className="page-hero__actions">
                {actions || (
                  <>
                    <a className="button" href="/contact">
                      Start a project
                    </a>
                    <a className="button button--quiet" href="/pricing">
                      How pricing works
                    </a>
                  </>
                )}
              </div>
            </div>
            {summary ? <Answer label={summaryLabel}>{summary}</Answer> : null}
          </div>
        </section>

        <section className="article">
          <div className="container">
            <div className="article__grid">
              <div>
                <Prose html={html} />
              </div>
              <aside className="article__aside">{aside}</aside>
            </div>
            {after}
          </div>
        </section>
      </main>
      <CtaBand {...cta} />
    </>
  );
}

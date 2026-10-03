import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand } from "../_components/blocks";
import { GLOSSARY, termId, termLetter } from "../../../lib/glossary.mjs";
import { ORG_ID, breadcrumbSchema, graph, pageMetadata, webPageSchema } from "../../../lib/seo.mjs";
import { absoluteUrl } from "../../../lib/site.mjs";

const PATH = "/glossary";
const TITLE = "Web Development, SEO and AI Glossary | Meritbyte";
const DESCRIPTION =
  "Plain-English definitions of web development, SEO, AEO, GEO, cloud and AI terms, from 301 redirects to RAG, each linked to a guide that explains it in depth.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web development glossary",
    "seo glossary",
    "what is aeo",
    "what is geo",
    "digital marketing terms"
  ]
});

export default function GlossaryPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Glossary", path: PATH }
  ];
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "en", { numeric: true }));
  const letters = [...new Set(terms.map((t) => termLetter(t.term)))];
  const setId = `${absoluteUrl(PATH)}#terms`;

  const schema = graph(
    webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, about: { "@id": setId } }),
    {
      "@type": "DefinedTermSet",
      "@id": setId,
      name: "Web development, SEO and AI glossary",
      description: DESCRIPTION,
      url: absoluteUrl(PATH),
      publisher: { "@id": ORG_ID },
      hasDefinedTerm: terms.map((t) => ({
        "@type": "DefinedTerm",
        "@id": `${absoluteUrl(PATH)}#${termId(t.term)}`,
        name: t.term,
        description: t.definition,
        url: `${absoluteUrl(PATH)}#${termId(t.term)}`,
        inDefinedTermSet: { "@id": setId }
      }))
    },
    breadcrumbSchema(crumbs)
  );

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
              <p className="label">Glossary</p>
              <h1>Web, search and AI terms, defined in plain English.</h1>
              <p className="page-hero__lead">
                The words that come up in every website, app and SEO project, each explained in
                a few sentences you could quote to your board, with a link to the guide that goes
                deeper.
              </p>
            </div>
            <Answer label="About this glossary">
              This glossary from Meritbyte Technologies, a Nepal-based web, software and SEO
              company, defines {terms.length} common terms in web development, search engine
              optimization, answer engine optimization (AEO), generative engine optimization
              (GEO), cloud and AI, each in a short, self-contained definition.
            </Answer>
          </div>
        </section>

        <section className="article">
          <div className="container">
            <nav className="az" aria-label="Glossary index">
              {letters.map((letter) => (
                <a key={letter} href={`#letter-${letter === "#" ? "0" : letter}`}>
                  {letter}
                </a>
              ))}
            </nav>

            <div className="glossary">
              {letters.map((letter) => (
                <section
                  key={letter}
                  className="glossary__group"
                  aria-labelledby={`letter-${letter === "#" ? "0" : letter}`}
                >
                  <h2 id={`letter-${letter === "#" ? "0" : letter}`} className="glossary__letter">
                    {letter === "#" ? "0–9" : letter}
                  </h2>
                  <div className="glossary__list">
                    {terms
                      .filter((t) => termLetter(t.term) === letter)
                      .map((t) => (
                        <article key={t.term} className="glossary__item" id={termId(t.term)}>
                          <h3>{t.term}</h3>
                          <p>{t.definition}</p>
                          <p className="glossary__more">
                            <a className="textlink" href={t.href}>
                              More on {t.term.replace(/\s*\(.*\)$/, "")}
                            </a>
                          </p>
                        </article>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CtaBand
        heading="Rather we handled the jargon?"
        text="Tell us what you want your website, app or search presence to do. We reply within one business day in plain language, with a scope and a number."
      />
    </>
  );
}

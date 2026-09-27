import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, FaqList } from "../_components/blocks";
import { getCollection } from "../../../lib/content.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema
} from "../../../lib/seo.mjs";
import { NEPAL_TIME, OVERLAP } from "../../../lib/timezones.mjs";

const TITLE = "Website Developer: Nepal, USA, Australia, Canada | Meritbyte";
const DESCRIPTION =
  "A Nepal-based website developer for businesses in Nepal, the USA, Australia, Canada, the UK, New Zealand, the UAE and Singapore. Time-zone overlap, laws and pricing.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/website-developer",
  keywords: [
    "website developer",
    "hire website developer",
    "best website developer in nepal",
    "offshore website developer",
    "remote web development company"
  ]
});

const FAQS = [
  {
    question: "Where is Meritbyte Technologies based?",
    answerText:
      "Meritbyte Technologies is based in Nepal. The whole team works from Nepal and serves clients in Nepal directly and clients in the USA, Australia, Canada, the UK, New Zealand, the UAE, Singapore and elsewhere remotely. There are no offices abroad, so meetings with international clients are video calls, backed by written specs and weekly written updates."
  },
  {
    question: "Why hire a website developer in Nepal if my business is in another country?",
    answerText:
      "Mainly cost and time. Rates in Nepal are lower than agency rates in Sydney, London, Toronto or New York, and Nepal's UTC+5:45 time zone gives same-day overlap with Australia, Asia, the Gulf and the UK, and overnight progress for North America. The trade-off is no in-person meetings, which we cover with clear written scopes, demos every two weeks and a staging site you can open at any time."
  },
  {
    question: "Do you know the laws that apply to websites in my country?",
    answerText:
      "Each location page covers the rules we build for in that market, such as WCAG accessibility and ADA risk in the USA, the Privacy Act 1988 in Australia, PIPEDA and CASL in Canada, UK GDPR and PECR cookie consent in the UK, and Nepal's Individual Privacy Act 2075. We build to them; for legal sign-off on your policies you should still use a lawyer in your country."
  },
  {
    question: "How do payments and contracts work for international clients?",
    answerText:
      "You get a written scope and a fixed price for the first milestone before any work starts. After that, work runs in two-week blocks you can stop at the end of. Domains, hosting, payment gateways and ad accounts are opened in your company's name, so your money and data never sit in our accounts."
  }
];

export default function LocationsPage() {
  const all = getCollection("locations");
  const countries = all.filter((l) => l.type === "country");
  const citiesOf = (slug) => all.filter((l) => l.type === "city" && l.country === slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/website-developer" }
  ];

  const schema = graph(
    webPageSchema({
      path: "/website-developer",
      title: TITLE,
      description: DESCRIPTION,
      type: "CollectionPage"
    }),
    itemListSchema(all.map((l) => ({ name: `Website developer in ${l.name}`, path: `/website-developer/${l.slug}` }))),
    faqSchema(FAQS),
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
              <p className="label">Locations</p>
              <h1>A website developer in Nepal, working for businesses worldwide.</h1>
              <p className="page-hero__lead">
                We build for businesses across Nepal, and from Nepal for businesses in the USA,
                Australia, Canada, the UK and beyond: on your laws, your currency and a
                working-hours overlap we plan around.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/website-developer/nepal">
                  Website developer in Nepal
                </a>
                <a className="button button--quiet" href="/contact">
                  Start a project
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies is a Nepal-based website and software developer. It serves
              businesses across Nepal directly and clients in the USA, Australia, Canada, the UK,
              New Zealand, the UAE and Singapore remotely, with a fixed price on the first
              milestone, two-week build blocks and everything registered in the client&apos;s name.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Countries and cities we build for</h2>
              <p>Each page covers the local laws, payments, search habits and time-zone overlap.</p>
            </div>
            <ul className="cards">
              {countries.map((c) => {
                const cities = citiesOf(c.slug);
                return (
                  <li key={c.slug} className="card">
                    <div className="card__link">
                      <a className="card__title" href={`/website-developer/${c.slug}`}>
                        Website developer in {c.name}
                      </a>
                      <span className="card__text">{c.lead}</span>
                      {cities.length ? (
                        <span className="card__meta">
                          {cities.map((city, i) => (
                            <span key={city.slug}>
                              {i ? " · " : ""}
                              <a className="textlink" href={`/website-developer/${city.slug}`}>
                                {city.name}
                              </a>
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Working hours overlap with Nepal</h2>
              <p>{NEPAL_TIME}. Daylight saving changes the gap in some markets; Nepal never moves.</p>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Market</th>
                    <th scope="col">Time zone</th>
                    <th scope="col">Difference</th>
                    <th scope="col">Overlap</th>
                  </tr>
                </thead>
                <tbody>
                  {OVERLAP.map((row) => (
                    <tr key={row.market}>
                      <td>{row.market}</td>
                      <td>{row.zone}</td>
                      <td>{row.offset}</td>
                      <td>{row.overlap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <FaqList faqs={FAQS} />
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}

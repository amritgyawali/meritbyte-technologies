import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand } from "../_components/blocks";
import { getCollection } from "../../../lib/content.mjs";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema
} from "../../../lib/seo.mjs";

const TITLE = "Industries: Websites and Software by Sector | Meritbyte";
const DESCRIPTION =
  "Websites, apps and software for hotels, travel companies, clinics, schools, real estate, retail, NGOs, startups and professional firms, built by Meritbyte Technologies.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/industries",
  keywords: [
    "industry website development",
    "hotel website design",
    "travel agency website",
    "healthcare website development",
    "education website development"
  ]
});

export default function IndustriesPage() {
  const industries = getCollection("industries");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" }
  ];
  const schema = graph(
    webPageSchema({ path: "/industries", title: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
    itemListSchema(industries.map((i) => ({ name: i.title, path: `/industries/${i.slug}` }))),
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
              <p className="label">Industries</p>
              <h1>The same stack, shaped around how your industry sells.</h1>
              <p className="page-hero__lead">
                A hotel needs direct bookings, a clinic needs appointments and privacy, a
                consultancy needs enquiries that turn into enrolments. These pages cover what we
                build first in each sector, and why.
              </p>
            </div>
            <Answer label="In short">
              Meritbyte Technologies builds websites, booking and ordering systems, portals and
              apps for hospitality, travel and tourism, healthcare, education, real estate, retail
              and e-commerce, nonprofits, startups and SaaS, and professional services firms, in
              Nepal and for clients abroad.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <ul className="cards">
              {industries.map((i) => (
                <li key={i.slug} className="card">
                  <a className="card__link" href={`/industries/${i.slug}`}>
                    <span className="card__title">{i.title}</span>
                    <span className="card__text">{i.lead}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <CtaBand
        heading="Your industry is not listed?"
        text="Most of what we build carries across sectors: a booking flow, a customer portal, a catalogue with search. Tell us what your business does and we will say plainly whether we are a good fit."
      />
    </>
  );
}

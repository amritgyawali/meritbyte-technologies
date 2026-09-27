import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, EntryCards, FaqList } from "../_components/blocks";
import { pick } from "../../../lib/content.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema
} from "../../../lib/seo.mjs";

const TITLE = "Website and Software Development Pricing | Meritbyte";
const DESCRIPTION =
  "How Meritbyte Technologies prices websites, apps and software: a free scope, a fixed price for the first milestone, then two-week blocks or a monthly retainer.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/pricing",
  keywords: [
    "website development pricing",
    "software development pricing",
    "web design packages",
    "fixed price website",
    "website retainer"
  ]
});

const MODELS = [
  {
    name: "Project",
    priced: "Fixed price for the first milestone, then priced per two-week block",
    fit: "A new website, store, app or platform with a clear outcome"
  },
  {
    name: "Retainer",
    priced: "A set number of days each month, agreed in advance",
    fit: "SEO, marketing, maintenance and steady improvements"
  },
  {
    name: "Embedded",
    priced: "Per engineer, per month",
    fit: "Teams that need extra hands inside their own process"
  }
];

const DRIVERS = [
  ["Unique page templates", "Ten pages built from three layouts cost far less than ten one-off designs."],
  ["Custom features", "Booking, payments, member areas, calculators and portals are where most of the budget goes."],
  ["Integrations", "Payment gateways (Stripe, eSewa, Khalti), CRMs, ERPs and booking systems each add setup and testing."],
  ["Content", "Writing, translating and photographing content takes longer than most people plan for."],
  ["Languages", "A second language doubles the content work and adds layout and SEO work (hreflang, fonts, right-to-left)."],
  ["Catalogue size", "For stores: product count, variants and how the data gets in."],
  ["Compliance", "Accessibility (WCAG 2.2 AA), privacy and cookie consent, and industry rules add review time."],
  ["Timeline", "A hard deadline can mean more people in parallel, which costs more per week."],
  ["After launch", "Hosting, monitoring, updates and improvements are a separate, predictable monthly cost."]
];

const INCLUDED = [
  "A written scope with the assumptions behind the price",
  "A staging URL from the first week and a written update every week",
  "Mobile-first, accessible build tested on real phones",
  "Technical SEO basics: clean URLs, titles, structured data, sitemap, fast pages",
  "Analytics and consent set up in your accounts",
  "Code, domain, hosting and credentials in your name, with documentation"
];

const FAQS = [
  {
    question: "Why is there no fixed price list?",
    answerText:
      "Because two projects with the same page count can differ in cost by several times, depending on features, integrations and content. A price list either overcharges simple projects or hides extras in the small print. Instead you get a written scope and a fixed price for the first milestone, free, before anything starts."
  },
  {
    question: "Is the quote free?",
    answerText:
      "Yes. You tell us what you need and get back a scope, a timeline and a number. There is no paid discovery phase standing between you and that answer. For large or unclear projects we may suggest a short paid discovery, but only if you want one."
  },
  {
    question: "Can you work to a fixed budget?",
    answerText:
      "Yes. Tell us the budget and we scope to it: what fits in the first milestone, what can wait for a later block, and what is not worth building yet. That conversation is usually more useful than a quote for a wish list."
  },
  {
    question: "What happens if the work takes longer than planned?",
    answerText:
      "On the first milestone, that is our risk: the price is fixed. After that, each two-week block is planned and priced before it starts, you see a demo at the end, and you decide whether to continue, change direction or stop."
  },
  {
    question: "How much does a website cost?",
    answerText:
      "It depends on the market and the features. Our cost guides give typical ranges for Nepal, the USA, Australia, Canada and the UK, and explain what moves the number. For a firm figure for your project, send a few lines through the contact page."
  }
];

export default function PricingPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ];
  const guides = pick("blog", [
    "website-cost-in-nepal",
    "website-cost-usa",
    "website-cost-australia",
    "website-cost-canada",
    "website-cost-uk",
    "custom-software-development-cost",
    "mobile-app-development-cost",
    "website-maintenance-guide",
    "how-to-compare-web-development-quotes"
  ]);
  const schema = graph(
    webPageSchema({ path: "/pricing", title: TITLE, description: DESCRIPTION }),
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
              <p className="label">Pricing</p>
              <h1>A number before you commit, and no twelve-month lock-in.</h1>
              <p className="page-hero__lead">
                Every project starts with a free written scope and a fixed price for the first
                milestone. After that you pay for two-week blocks you can stop at the end of, or
                a set number of days a month.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/contact">
                  Get a scope and a price
                </a>
                <a className="button button--quiet" href="/free-website">
                  Free design for small businesses
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies prices work in three ways: projects with a fixed price for
              the first milestone and then two-week blocks, monthly retainers for ongoing work,
              and embedded engineers billed per month. The scope and first price are free and in
              writing before anything starts.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Three ways to pay</h2>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    <th scope="col">How it is priced</th>
                    <th scope="col">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS.map((m) => (
                    <tr key={m.name}>
                      <td>{m.name}</td>
                      <td>{m.priced}</td>
                      <td>{m.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>What moves the price</h2>
              <p>The questions in your scope are mostly about these.</p>
            </div>
            <div className="support-grid">
              {DRIVERS.map(([name, body]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container about__grid">
            <div className="about__head">
              <p className="label">Every project</p>
              <h2>Included whatever the size</h2>
            </div>
            <ul className="signup__list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <EntryCards
              entries={guides}
              label="cost-guides"
              heading="Cost guides by market and project type"
              describe={(p) => p.description}
            />
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

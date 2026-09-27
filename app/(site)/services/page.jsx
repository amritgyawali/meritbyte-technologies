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

const TITLE = "IT Services: Web, Software, AI, SEO and Cloud | Meritbyte";
const DESCRIPTION =
  "Web development, website design, e-commerce, mobile apps, custom software, AI, SEO, marketing, cloud and security from Meritbyte Technologies, a Nepal-based IT company.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
  keywords: [
    "it services company",
    "it company in nepal",
    "web development services",
    "software development services",
    "seo services"
  ]
});

const GROUPS = [
  {
    name: "Build",
    text: "Websites, stores, apps and the software behind them.",
    slugs: [
      "web-development",
      "website-design",
      "ecommerce-development",
      "wordpress-development",
      "mobile-app-development",
      "software-development",
      "ai-development"
    ]
  },
  {
    name: "Grow",
    text: "Getting found on Google and in AI answers, and turning visits into enquiries.",
    slugs: ["seo-services", "digital-marketing"]
  },
  {
    name: "Design and quality",
    text: "The parts people touch, and the testing that keeps them working.",
    slugs: ["ui-ux-design", "qa-testing"]
  },
  {
    name: "Run and protect",
    text: "Hosting, pipelines, security, data and day-to-day IT.",
    slugs: ["cloud-devops", "cybersecurity", "data-analytics", "managed-it-services"]
  }
];

const ENGAGEMENTS = [
  {
    name: "Project",
    body: "A defined outcome. The first milestone has a fixed price; after that we plan in two-week blocks you can stop at the end of."
  },
  {
    name: "Retainer",
    body: "A set number of days each month for ongoing development, SEO, marketing or support."
  },
  {
    name: "Embedded",
    body: "Our engineers in your standups, working in your tools and reporting to your own leads."
  }
];

const FAQS = [
  {
    question: "What IT services does Meritbyte Technologies offer?",
    answerText:
      "Meritbyte Technologies builds websites, web apps, online stores, mobile apps, custom software and AI tools, and handles the SEO, digital marketing, cloud hosting, DevOps, security, QA, data dashboards and managed IT around them. Most clients start with one service and add others once the first piece is live."
  },
  {
    question: "Can one team handle a project that needs several services?",
    answerText:
      "Yes, and that is the main reason clients hire a full-service company instead of three vendors. The website, the hosting, the tracking and the SEO share one project manager, one backlog and one invoice, so nothing falls through the gap between agencies."
  },
  {
    question: "Do you work with businesses outside Nepal?",
    answerText:
      "Yes. The team is based in Nepal and works remotely with businesses in the USA, Australia, Canada, the UK, New Zealand, the UAE, Singapore and elsewhere. Nepal is UTC+5:45, which gives a same-day overlap with Australia, Asia, the Gulf and Europe, and overnight progress for North America."
  },
  {
    question: "How are projects priced?",
    answerText:
      "After a free scoping conversation you get a written scope, a timeline and a fixed price for the first milestone. After that, work is planned in two-week blocks with a demo at the end of each, and you can stop at the end of any block. Retainers are a set number of days a month."
  },
  {
    question: "Who owns the code, domain and accounts?",
    answerText:
      "You do. Repositories, domains, hosting, analytics and ad accounts are set up in your name, and you get documentation at handover. If you later move the work in-house or to another firm, nothing breaks."
  }
];

export default function ServicesPage() {
  const services = getCollection("services");
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" }
  ];

  const schema = graph(
    webPageSchema({ path: "/services", title: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
    itemListSchema(services.map((s) => ({ name: s.title, path: `/services/${s.slug}` }))),
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
              <p className="label">Services</p>
              <h1>IT services for businesses that want one team, not five vendors.</h1>
              <p className="page-hero__lead">
                We write the software, design the site, run the servers under it and do the
                search and campaign work that brings people to it. Fifteen services, grouped
                below by what they do for you.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/contact">
                  Start a project
                </a>
                <a className="button button--quiet" href="/process">
                  How we work
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies is a Nepal-based IT company offering web development, website
              design, e-commerce, WordPress, mobile apps, custom software, AI development, SEO,
              digital marketing, UI/UX, QA, cloud and DevOps, cybersecurity, data analytics and
              managed IT to businesses in Nepal and worldwide.
            </Answer>
          </div>
        </section>

        {GROUPS.map((group) => (
          <section className="listing" key={group.name}>
            <div className="container">
              <div className="listing__head">
                <h2>{group.name}</h2>
                <p>{group.text}</p>
              </div>
              <ul className="index-list">
                {group.slugs
                  .map((slug) => bySlug.get(slug))
                  .filter(Boolean)
                  .map((s) => (
                    <li key={s.slug}>
                      <a href={`/services/${s.slug}`}>
                        <span className="index-list__title">{s.title}</span>
                        <span className="index-list__text">{s.lead}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Three ways to work with us</h2>
              <p>
                Whichever you choose, code and accounts are in your name and you get a written
                update every week.
              </p>
            </div>
            <div className="engagements">
              {ENGAGEMENTS.map((item) => (
                <div className="engagement" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
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

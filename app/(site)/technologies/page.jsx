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

const TITLE = "Our Technology Stack: Next.js, React, Node.js | Meritbyte";
const DESCRIPTION =
  "The technology stack Meritbyte Technologies builds with: Next.js, React, Node.js, Python, Flutter, React Native, Shopify and AWS, and how we choose between them.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/technologies",
  keywords: [
    "technology stack",
    "web development technologies",
    "software development stack",
    "next.js development company",
    "react development company"
  ]
});

const GROUPS = [
  {
    name: "Web front ends",
    text: "Sites that rank and load fast, and interfaces people use all day.",
    slugs: ["nextjs", "react"]
  },
  {
    name: "Back ends, data and AI",
    text: "APIs, integrations, background jobs, data pipelines and AI features.",
    slugs: ["nodejs", "python"]
  },
  {
    name: "Mobile apps",
    text: "iOS and Android from one codebase, released under your own store accounts.",
    slugs: ["flutter", "react-native"]
  },
  {
    name: "Commerce and cloud",
    text: "Online stores, and the infrastructure everything else runs on.",
    slugs: ["shopify", "aws"]
  }
];

// The rest of the stack, each pointing at the service page that covers it.
const ALSO = [
  { name: "TypeScript and JavaScript", href: "/services/web-development" },
  { name: "WordPress", href: "/services/wordpress-development" },
  { name: "WooCommerce", href: "/services/ecommerce-development" },
  { name: "Go and .NET", href: "/services/software-development" },
  { name: "PostgreSQL", href: "/services/software-development" },
  { name: "Azure and Google Cloud", href: "/services/cloud-devops" },
  { name: "Terraform", href: "/services/cloud-devops" },
  { name: "Docker and Kubernetes", href: "/services/cloud-devops" },
  { name: "Figma", href: "/services/ui-ux-design" },
  { name: "Playwright and Cypress", href: "/services/qa-testing" },
  { name: "Power BI and Looker Studio", href: "/services/data-analytics" },
  { name: "Google Search Console and GA4", href: "/services/seo-services" }
];

const FAQS = [
  {
    question: "Which technology stack does Meritbyte Technologies use?",
    answerText:
      "Mostly TypeScript and JavaScript with Next.js, React and Node.js for the web; Python for data and AI work; Flutter or React Native for mobile apps; WordPress, WooCommerce and Shopify where a platform fits; PostgreSQL for data; and AWS, Azure or Google Cloud with Terraform and Docker for infrastructure."
  },
  {
    question: "How do you choose the technology for a project?",
    answerText:
      "On four questions: who will edit and maintain it after launch, what it must connect to, how fast it must be, and how easy it will be to hire for later. We prefer widely used, well-documented tools over fashionable ones, and the scope explains every choice in plain language."
  },
  {
    question: "Can you work with the stack we already have?",
    answerText:
      "Usually, yes. Much of our work is extending or rescuing existing systems. We start with a short review of the code and infrastructure, then recommend whether to extend, refactor or replace each part. We do not recommend a rewrite just because we would prefer a different framework."
  },
  {
    question: "Will we be locked into your technology choices?",
    answerText:
      "No. We choose mainstream, open-source tools that many developers know, keep the code in your repository and the hosting in your account, and hand over documentation. If you later move the work in-house or to another firm, they can pick it up."
  }
];

export default function TechnologiesPage() {
  const technologies = getCollection("technologies");
  const bySlug = new Map(technologies.map((t) => [t.slug, t]));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Technologies", path: "/technologies" }
  ];
  const schema = graph(
    webPageSchema({ path: "/technologies", title: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
    itemListSchema(technologies.map((t) => ({ name: `${t.title} development`, path: `/technologies/${t.slug}` }))),
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
              <p className="label">Technologies</p>
              <h1>Mainstream tools, chosen for the people who maintain them next.</h1>
              <p className="page-hero__lead">
                We build with widely used, well-documented technology, so the code you pay for
                can be picked up by any competent developer later. These pages cover what we build
                with each one, and when we would choose something else.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/contact">
                  Start a project
                </a>
                <a className="button button--quiet" href="/hire-developers">
                  Hire developers
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies builds websites and web apps with Next.js, React and
              Node.js, data and AI features with Python, mobile apps with Flutter and React
              Native, online stores on Shopify and WooCommerce, and runs them on AWS, Azure or
              Google Cloud, all written in mainstream, open-source tools.
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
                  .map((t) => (
                    <li key={t.slug}>
                      <a href={`/technologies/${t.slug}`}>
                        <span className="index-list__title">{t.title} development</span>
                        <span className="index-list__text">{t.lead}</span>
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
              <h2>Also in our stack</h2>
              <p>Covered on the service pages for the work they support.</p>
            </div>
            <ul className="chips chips--links">
              {ALSO.map((item) => (
                <li key={item.name}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <FaqList faqs={FAQS} />
          </div>
        </section>
      </main>
      <CtaBand
        heading="Not sure which stack fits?"
        text="Tell us what the product must do, who will maintain it and what it connects to. You get back a recommendation with the reasoning, a scope and a number, within one business day."
      />
    </>
  );
}

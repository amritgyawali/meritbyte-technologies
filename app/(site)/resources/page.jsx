import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand } from "../_components/blocks";
import { PostCards } from "../blog/post-cards";
import { BLOG_CATEGORIES, getCollection } from "../../../lib/content.mjs";
import { GLOSSARY } from "../../../lib/glossary.mjs";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema
} from "../../../lib/seo.mjs";

const PATH = "/resources";
const TITLE = "Free Guides on Websites, SEO, Apps and AI | Meritbyte";
const DESCRIPTION =
  "Free guides, checklists and definitions from Meritbyte Technologies on website costs, SEO, AEO and GEO, apps, AI and hiring developers, written for business owners.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web development resources",
    "website guides",
    "seo guides for small business",
    "website checklist"
  ]
});

const TOOLS = [
  {
    href: "/glossary",
    title: "Glossary",
    text: `${GLOSSARY.length} web, SEO and AI terms defined in plain English, from 301 redirects to RAG.`
  },
  {
    href: "/faq",
    title: "Frequently asked questions",
    text: "Cost, ownership, timelines, SEO, AEO and GEO, and working with a team in Nepal."
  },
  {
    href: "/process",
    title: "How we work",
    text: "From the free scoping call to launch and support, step by step."
  },
  {
    href: "/free-website",
    title: "Free website design idea",
    text: "Small businesses can ask for a free design idea for their website, with no obligation."
  },
  {
    href: "/subscribe",
    title: "Newsletter",
    text: "Occasional emails about websites and apps for businesses. Unsubscribe at any time."
  },
  {
    href: "/sitemap",
    title: "Site map",
    text: "Every page on this site, grouped by section."
  }
];

export default function ResourcesPage() {
  const posts = getCollection("blog");
  const latest = posts.slice(0, 6);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: PATH }
  ];
  const schema = graph(
    webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
    itemListSchema([
      ...Object.entries(BLOG_CATEGORIES).map(([slug, cat]) => ({
        name: cat.name,
        path: `/blog/category/${slug}`
      })),
      ...TOOLS.map((t) => ({ name: t.title, path: t.href }))
    ]),
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
              <p className="label">Resources</p>
              <h1>Guides for the person paying for the website.</h1>
              <p className="page-hero__lead">
                What things cost, what to ask, what to avoid. {posts.length} guides, a glossary
                and a few free tools, written to be useful whether or not you hire us.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/blog">
                  Read the blog
                </a>
                <a className="button button--quiet" href="/glossary">
                  Open the glossary
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies publishes free guides on website and app costs in Nepal, the
              USA, Australia, Canada and the UK; SEO, answer engine and generative engine
              optimization; web development choices; AI for business; and hiring developers, plus
              a glossary of common terms.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Guides by topic</h2>
              <p>Each topic page lists every guide in it.</p>
            </div>
            <ul className="index-list">
              {Object.entries(BLOG_CATEGORIES).map(([slug, cat]) => {
                const count = posts.filter((p) => p.category === slug).length;
                return (
                  <li key={slug}>
                    <a href={`/blog/category/${slug}`}>
                      <span className="index-list__title">
                        {cat.name} <span className="index-list__count">({count})</span>
                      </span>
                      <span className="index-list__text">{cat.description}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Latest guides</h2>
              <p>
                <a className="textlink" href="/blog">
                  All {posts.length} guides
                </a>
              </p>
            </div>
            <PostCards posts={latest} />
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Reference and free tools</h2>
              <p>Short answers, how we work, and things you can ask us for at no cost.</p>
            </div>
            <ul className="cards">
              {TOOLS.map((tool) => (
                <li key={tool.href} className="card">
                  <a className="card__link" href={tool.href}>
                    <span className="card__title">{tool.title}</span>
                    <span className="card__text">{tool.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}

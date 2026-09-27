import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand } from "../_components/blocks";
import { CategoryNav, PostCards } from "./post-cards";
import { BLOG_CATEGORIES, getCollection } from "../../../lib/content.mjs";
import { ORG_ID, WEBSITE_ID, breadcrumbSchema, graph, pageMetadata } from "../../../lib/seo.mjs";
import { SITE, absoluteUrl } from "../../../lib/site.mjs";

const TITLE = "Blog: Web Development, SEO and Software Guides | Meritbyte";
const DESCRIPTION =
  "Practical guides on website costs, hiring developers, SEO, AEO and GEO, e-commerce, apps, AI and cloud, for businesses in Nepal, the USA, Australia, Canada and the UK.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
  keywords: [
    "web development blog",
    "website cost guide",
    "seo guide",
    "answer engine optimization",
    "nepal it blog"
  ]
});

// Guides to show first: the questions most people arrive with.
const START_HERE = [
  "best-website-developer-in-nepal-checklist",
  "website-cost-in-nepal",
  "website-cost-usa",
  "website-cost-australia",
  "answer-engine-optimization-aeo",
  "generative-engine-optimization-geo"
];

export default function BlogPage() {
  const posts = getCollection("blog");
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const featured = START_HERE.map((s) => bySlug.get(s)).filter(Boolean);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" }
  ];

  const schema = graph(
    {
      "@type": "Blog",
      "@id": `${SITE.url}/blog#blog`,
      url: absoluteUrl("/blog"),
      name: "Meritbyte Technologies blog",
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORG_ID },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: absoluteUrl(`/blog/${p.slug}`),
        datePublished: p.date
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
              <p className="label">Blog</p>
              <h1>Straight answers about websites, software and search.</h1>
              <p className="page-hero__lead">
                What things cost, how to hire, what to build first and how to get found on Google
                and in AI answers. Written for the person paying the invoice, with the trade-offs
                left in.
              </p>
            </div>
            <Answer label="What you will find here">
              {posts.length} guides from Meritbyte Technologies on website and app costs in Nepal,
              the USA, Australia, Canada and the UK, choosing a developer, SEO, answer engine and
              generative engine optimization, e-commerce, security, AI and cloud.
            </Answer>
          </div>
          <div className="container" style={{ marginTop: 36 }}>
            <CategoryNav />
          </div>
        </section>

        {featured.length ? (
          <section className="listing">
            <div className="container">
              <div className="listing__head">
                <h2>Start here</h2>
                <p>The questions most people arrive with.</p>
              </div>
              <PostCards posts={featured} />
            </div>
          </section>
        ) : null}

        {Object.entries(BLOG_CATEGORIES).map(([slug, cat]) => {
          const inCat = posts.filter((p) => p.category === slug);
          if (!inCat.length) return null;
          return (
            <section className="listing" key={slug} id={slug}>
              <div className="container">
                <div className="listing__head">
                  <h2>{cat.name}</h2>
                  <a className="textlink" href={`/blog/category/${slug}`}>
                    All {inCat.length} posts in {cat.name.toLowerCase()}
                  </a>
                </div>
                <PostCards posts={inCat} showCategory={false} />
              </div>
            </section>
          );
        })}
      </main>
      <CtaBand
        heading="Want these in your inbox?"
        text="One email now and then with practical ideas for websites, apps and getting found online. No flood, and an unsubscribe link in every email."
        primary={{ href: "/subscribe", label: "Subscribe" }}
        secondary={{ href: "/contact", label: "Or start a project" }}
      />
    </>
  );
}

import { notFound } from "next/navigation";

import Breadcrumbs from "../../_components/breadcrumbs";
import JsonLd from "../../_components/json-ld";
import { Answer, CtaBand, EntryCards, Prose, Toc } from "../../_components/blocks";
import { BLOG_CATEGORIES, getCollection, getEntry, pick } from "../../../../lib/content.mjs";
import { formatDate } from "../../../../lib/format.mjs";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema
} from "../../../../lib/seo.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollection("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getEntry("blog", slug);
  if (!post) return {};
  return pageMetadata({
    generatedImage: true,
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated || post.date,
    section: BLOG_CATEGORIES[post.category]?.name
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getEntry("blog", slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const category = BLOG_CATEGORIES[post.category];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/category/${post.category}` }] : []),
    { name: post.title, path }
  ];

  // Related posts: the ones the author picked, topped up from the same category.
  const picked = pick("blog", post.related).filter((p) => p.slug !== slug);
  const sameCategory = getCollection("blog").filter(
    (p) => p.category === post.category && p.slug !== slug && !picked.some((r) => r.slug === p.slug)
  );
  const related = [...picked, ...sameCategory].slice(0, 3);
  const services = pick("services", post.services);

  const schema = graph(
    webPageSchema({ path, title: post.seoTitle, description: post.description }),
    articleSchema({ ...post, categoryName: category?.name }, path),
    faqSchema(post.faqs),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <main id="main">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>

        <header className="page-hero page-hero--post">
          <div className="container page-hero__grid">
            <div>
              <p className="label">
                <a href={`/blog/category/${post.category}`}>{category?.name || "Blog"}</a>
              </p>
              <h1>{post.title}</h1>
              <p className="page-hero__lead">{post.description}</p>
              <p className="page-hero__meta">
                <span>
                  By <a href="/about">Meritbyte Technologies</a>
                </span>
                <span>
                  Published <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                {post.updated && post.updated !== post.date ? (
                  <span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                ) : null}
                <span>{post.minutes} min read</span>
              </p>
            </div>
            <div>
              <Answer>{post.summary}</Answer>
              {post.takeaways?.length ? (
                <div className="takeaways">
                  <h2>Key takeaways</h2>
                  <ul>
                    {post.takeaways.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <article className="article">
          <div className="container">
            <div className="article__grid article__grid--left">
              <aside className="article__aside">
                <Toc headings={post.headings} />
                {services.length ? (
                  <div className="aside-box">
                    <p className="aside-box__label">Need help with this?</p>
                    <ul className="plain">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <a href={`/services/${s.slug}`}>{s.title}</a>
                        </li>
                      ))}
                    </ul>
                    <a className="button" href="/contact">
                      Ask us
                    </a>
                  </div>
                ) : null}
              </aside>
              <div>
                <Prose html={post.html} />
                <div className="byline">
                  <p className="aside-box__label">About the author</p>
                  <p>
                    Written by the team at <a href="/about">Meritbyte Technologies</a>, a
                    Nepal-based web and software development company that builds websites, apps
                    and AI tools and does the SEO and marketing around them for businesses in
                    Nepal, the USA, Australia, Canada, the UK and beyond. Spotted something out of
                    date? Write to <a href="mailto:hello@meritbyte.com">hello@meritbyte.com</a>.
                  </p>
                </div>
              </div>
            </div>
            <EntryCards
              entries={related}
              label="related"
              heading="Keep reading"
              describe={(p) => p.description}
            />
          </div>
        </article>
      </main>
      <CtaBand />
    </>
  );
}

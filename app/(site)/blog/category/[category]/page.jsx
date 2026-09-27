import { notFound } from "next/navigation";

import Breadcrumbs from "../../../_components/breadcrumbs";
import JsonLd from "../../../_components/json-ld";
import { CtaBand } from "../../../_components/blocks";
import { CategoryNav, PostCards } from "../../post-cards";
import { BLOG_CATEGORIES, getCollection } from "../../../../../lib/content.mjs";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  pageMetadata,
  webPageSchema
} from "../../../../../lib/seo.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BLOG_CATEGORIES).map((category) => ({ category }));
}

const titleFor = (cat) => `${cat.name} Guides | Meritbyte Technologies Blog`;

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = BLOG_CATEGORIES[category];
  if (!cat) return {};
  return pageMetadata({
    title: titleFor(cat),
    description: cat.description,
    path: `/blog/category/${category}`
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = BLOG_CATEGORIES[category];
  if (!cat) notFound();

  const posts = getCollection("blog").filter((p) => p.category === category);
  const path = `/blog/category/${category}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: cat.name, path }
  ];
  const schema = graph(
    webPageSchema({ path, title: titleFor(cat), description: cat.description, type: "CollectionPage" }),
    itemListSchema(posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))),
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
          <div className="container">
            <p className="label">Blog</p>
            <h1>{cat.name}</h1>
            <p className="page-hero__lead">{cat.description}</p>
            <div style={{ marginTop: 32 }}>
              <CategoryNav current={category} />
            </div>
          </div>
        </section>
        <section className="listing">
          <div className="container">
            <PostCards posts={posts} showCategory={false} />
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}

import { notFound } from "next/navigation";

import { EntryCards } from "../../_components/blocks";
import EntryPage from "../../_components/entry-page";
import { getCollection, getEntry, pick } from "../../../../lib/content.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  serviceSchema,
  webPageSchema
} from "../../../../lib/seo.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCollection("technologies").map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tech = getEntry("technologies", slug);
  if (!tech) return {};
  return pageMetadata({
    generatedImage: true,
    title: tech.seoTitle,
    description: tech.description,
    path: `/technologies/${slug}`,
    keywords: tech.keywords
  });
}

export default async function TechnologyPage({ params }) {
  const { slug } = await params;
  const tech = getEntry("technologies", slug);
  if (!tech) notFound();

  const path = `/technologies/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Technologies", path: "/technologies" },
    { name: tech.title, path }
  ];
  const services = pick("services", tech.services);
  const related = pick("technologies", tech.related);
  const posts = pick("blog", tech.posts);

  // The technology itself, tied to its official site and encyclopedia entry so
  // search engines and AI assistants know which "React" or "Flutter" we mean.
  const about = {
    "@type": "Thing",
    name: tech.title,
    ...(tech.entity?.length ? { sameAs: tech.entity } : {})
  };

  const schema = graph(
    webPageSchema({ path, title: tech.seoTitle, description: tech.description, about }),
    serviceSchema({
      path,
      name: `${tech.title} development`,
      description: tech.summary,
      serviceType: tech.keywords?.[0],
      keywords: tech.keywords
    }),
    faqSchema(tech.faqs),
    breadcrumbSchema(crumbs)
  );

  return (
    <EntryPage
      crumbs={crumbs}
      label={`Technologies · ${tech.title}`}
      h1={tech.h1}
      lead={tech.lead}
      summary={tech.summary}
      html={tech.html}
      schema={schema}
      actions={
        <>
          <a className="button" href="/contact">
            Start a {tech.title} project
          </a>
          <a className="button button--quiet" href="/hire-developers">
            Hire {tech.title} developers
          </a>
        </>
      }
      aside={
        <>
          {tech.useFor?.length ? (
            <div className="aside-box">
              <p className="aside-box__label">What we build with {tech.title}</p>
              <ul>
                {tech.useFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {services.length ? (
            <div className="aside-box">
              <p className="aside-box__label">Related services</p>
              <ul className="plain">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={`/services/${s.slug}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
              <a className="button" href="/contact">
                Get a scope and a price
              </a>
            </div>
          ) : null}
        </>
      }
      after={
        <>
          <EntryCards
            entries={related}
            label="related-technologies"
            heading="Often used alongside"
          />
          <EntryCards
            entries={posts}
            label="related-posts"
            heading="Guides on this topic"
            describe={(p) => p.description}
          />
        </>
      }
    />
  );
}

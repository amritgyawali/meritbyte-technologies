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
  return getCollection("services").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getEntry("services", slug);
  if (!service) return {};
  return pageMetadata({
    generatedImage: true,
    title: service.seoTitle,
    description: service.description,
    path: `/services/${slug}`,
    keywords: service.keywords
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getEntry("services", slug);
  if (!service) notFound();

  const path = `/services/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path }
  ];
  const related = pick("services", service.related);
  const posts = pick("blog", service.posts);
  const countries = getCollection("locations").filter((l) => l.type === "country");
  const techPages = new Map(getCollection("technologies").map((t) => [t.title.toLowerCase(), t.slug]));

  const schema = graph(
    webPageSchema({ path, title: service.seoTitle, description: service.description }),
    serviceSchema({
      path,
      name: service.title,
      description: service.summary,
      serviceType: service.keywords?.[0],
      keywords: service.keywords
    }),
    faqSchema(service.faqs),
    breadcrumbSchema(crumbs)
  );

  return (
    <EntryPage
      crumbs={crumbs}
      label="Services"
      h1={service.h1}
      lead={service.lead}
      summary={service.summary}
      html={service.html}
      schema={schema}
      aside={
        <>
          {service.deliverables?.length ? (
            <div className="aside-box">
              <p className="aside-box__label">What you get</p>
              <ul>
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {service.technologies?.length ? (
            <div>
              <p className="aside-box__label">Technology</p>
              <ul className="chips">
                {service.technologies.map((t) =>
                  techPages.has(t.toLowerCase()) ? (
                    <li key={t} className="chips__link">
                      <a href={`/technologies/${techPages.get(t.toLowerCase())}`}>{t}</a>
                    </li>
                  ) : (
                    <li key={t}>{t}</li>
                  )
                )}
              </ul>
            </div>
          ) : null}
          <div className="aside-box">
            <p className="aside-box__label">Where we work</p>
            <ul className="plain">
              {countries.map((c) => (
                <li key={c.slug}>
                  <a href={`/website-developer/${c.slug}`}>{c.name}</a>
                </li>
              ))}
            </ul>
            <a className="button" href="/contact">
              Get a scope and a price
            </a>
          </div>
        </>
      }
      after={
        <>
          <EntryCards
            entries={related}
            label="related-services"
            heading="Often paired with"
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

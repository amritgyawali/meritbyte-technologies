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
  return getCollection("industries").map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getEntry("industries", slug);
  if (!industry) return {};
  return pageMetadata({
    generatedImage: true,
    title: industry.seoTitle,
    description: industry.description,
    path: `/industries/${slug}`,
    keywords: industry.keywords
  });
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getEntry("industries", slug);
  if (!industry) notFound();

  const path = `/industries/${slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.title, path }
  ];
  const services = pick("services", industry.services);
  const posts = pick("blog", industry.posts);
  const others = getCollection("industries").filter((i) => i.slug !== slug);

  const schema = graph(
    webPageSchema({ path, title: industry.seoTitle, description: industry.description }),
    serviceSchema({
      path,
      name: `Websites and software for ${industry.title.toLowerCase()}`,
      description: industry.summary,
      serviceType: industry.keywords?.[0],
      keywords: industry.keywords
    }),
    faqSchema(industry.faqs),
    breadcrumbSchema(crumbs)
  );

  return (
    <EntryPage
      crumbs={crumbs}
      label="Industries"
      h1={industry.h1}
      lead={industry.lead}
      summary={industry.summary}
      html={industry.html}
      schema={schema}
      aside={
        <>
          {services.length ? (
            <div className="aside-box">
              <p className="aside-box__label">Services we use here</p>
              <ul className="plain">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={`/services/${s.slug}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="aside-box">
            <p className="aside-box__label">Other industries</p>
            <ul className="plain">
              {others.map((i) => (
                <li key={i.slug}>
                  <a href={`/industries/${i.slug}`}>{i.title}</a>
                </li>
              ))}
            </ul>
            <a className="button" href="/contact">
              Talk about your project
            </a>
          </div>
        </>
      }
      after={
        <EntryCards
          entries={posts}
          label="industry-posts"
          heading="Further reading"
          describe={(p) => p.description}
        />
      }
    />
  );
}

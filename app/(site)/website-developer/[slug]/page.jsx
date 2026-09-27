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

// Country names as schema.org and search engines know them.
const OFFICIAL = {
  usa: "United States",
  uk: "United Kingdom",
  uae: "United Arab Emirates"
};

export function generateStaticParams() {
  return getCollection("locations").map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const place = getEntry("locations", slug);
  if (!place) return {};
  return pageMetadata({
    generatedImage: true,
    title: place.seoTitle,
    description: place.description,
    path: `/website-developer/${slug}`,
    keywords: place.keywords
  });
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const place = getEntry("locations", slug);
  if (!place) notFound();

  const path = `/website-developer/${slug}`;
  const all = getCollection("locations");
  const country = place.type === "city" ? getEntry("locations", place.country) : place;
  const cities = all.filter((l) => l.type === "city" && l.country === country?.slug);
  const countryName = country ? OFFICIAL[country.slug] || country.name : place.name;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/website-developer" },
    ...(place.type === "city" && country
      ? [{ name: country.name, path: `/website-developer/${country.slug}` }]
      : []),
    { name: place.name, path }
  ];

  const areaServed =
    place.type === "city"
      ? {
          "@type": "City",
          name: place.name,
          containedInPlace: { "@type": "Country", name: countryName }
        }
      : { "@type": "Country", name: countryName };

  const schema = graph(
    webPageSchema({
      path,
      title: place.seoTitle,
      description: place.description,
      about: areaServed
    }),
    serviceSchema({
      path,
      name: `Website and software development in ${place.name}`,
      description: place.summary,
      serviceType: "Web development",
      areaServed,
      keywords: place.keywords
    }),
    faqSchema(place.faqs),
    breadcrumbSchema(crumbs)
  );

  const services = pick("services", place.services);
  const posts = pick("blog", place.posts);
  const nearby =
    place.type === "city"
      ? cities.filter((c) => c.slug !== place.slug)
      : cities;

  return (
    <EntryPage
      crumbs={crumbs}
      label={place.type === "city" ? `Website developer · ${country?.name || ""}` : "Website developer"}
      h1={place.h1}
      lead={place.lead}
      summary={place.summary}
      html={place.html}
      schema={schema}
      aside={
        <>
          {services.length ? (
            <div className="aside-box">
              <p className="aside-box__label">Services in {place.name}</p>
              <ul className="plain">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={`/services/${s.slug}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {place.type === "city" && country ? (
            <div className="aside-box">
              <p className="aside-box__label">Also in {country.name}</p>
              <ul className="plain">
                <li>
                  <a href={`/website-developer/${country.slug}`}>
                    Website developer in {country.name}
                  </a>
                </li>
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <a href={`/website-developer/${c.slug}`}>{c.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : nearby.length ? (
            <div className="aside-box">
              <p className="aside-box__label">Cities in {place.name}</p>
              <ul className="plain">
                {nearby.map((c) => (
                  <li key={c.slug}>
                    <a href={`/website-developer/${c.slug}`}>Website developer in {c.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="aside-box">
            <p className="aside-box__label">Start here</p>
            <p className="aside-box__text">
              Send a few lines about the project. A person replies within one business day.
            </p>
            <a className="button" href="/contact">
              Get a scope and a price
            </a>
          </div>
        </>
      }
      after={
        <EntryCards
          entries={posts}
          label="location-posts"
          heading={`Guides for businesses in ${place.name}`}
          describe={(p) => p.description}
        />
      }
      cta={{
        heading: `Looking for a website developer in ${place.name}?`,
        text: "Tell us what you have now, what you want instead and when you need it. You get back a scope, a timeline and a fixed price for the first milestone."
      }}
    />
  );
}

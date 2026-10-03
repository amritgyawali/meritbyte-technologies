// Every indexable URL on the site, with a date, for the sitemap, llms.txt and
// anything else that needs the full list.

import { BLOG_CATEGORIES, getCollection, entryPath } from "./content.mjs";

// Date of the last meaningful change to the hand-written pages. Bump it when
// those pages change.
export const SITE_UPDATED = "2026-10-03";

export const STATIC_PAGES = [
  { path: "/", name: "Home", priority: 1 },
  { path: "/services", name: "Services", priority: 0.9 },
  { path: "/technologies", name: "Technologies", priority: 0.8 },
  { path: "/hire-developers", name: "Hire dedicated developers", priority: 0.8 },
  { path: "/website-developer", name: "Locations", priority: 0.9 },
  { path: "/industries", name: "Industries", priority: 0.7 },
  { path: "/pricing", name: "Pricing", priority: 0.8 },
  { path: "/process", name: "How we work", priority: 0.6 },
  { path: "/about", name: "About Meritbyte Technologies", priority: 0.7 },
  { path: "/faq", name: "FAQ", priority: 0.7 },
  { path: "/contact", name: "Contact", priority: 0.8 },
  { path: "/blog", name: "Blog", priority: 0.8 },
  { path: "/resources", name: "Resources", priority: 0.6 },
  { path: "/glossary", name: "Glossary", priority: 0.6 },
  { path: "/careers", name: "Careers", priority: 0.4 },
  { path: "/free-website", name: "Free website design", priority: 0.6 },
  { path: "/subscribe", name: "Newsletter", priority: 0.3 },
  { path: "/privacy", name: "Privacy notice", priority: 0.2 },
  { path: "/sitemap", name: "Site map", priority: 0.2 }
];

export function allRoutes() {
  const content = ["services", "technologies", "locations", "industries", "blog"].flatMap((collection) =>
    getCollection(collection).map((entry) => ({
      path: entryPath(entry),
      name: entry.title || entry.name,
      lastModified: entry.updated || entry.date || SITE_UPDATED,
      priority:
        collection === "locations"
          ? entry.type === "country"
            ? 0.9
            : 0.8
          : collection === "services" || collection === "technologies"
            ? 0.8
            : collection === "industries"
              ? 0.6
              : 0.7
    }))
  );
  const categories = Object.keys(BLOG_CATEGORIES).map((slug) => ({
    path: `/blog/category/${slug}`,
    name: BLOG_CATEGORIES[slug].name,
    lastModified: SITE_UPDATED,
    priority: 0.5
  }));
  return [
    ...STATIC_PAGES.map((p) => ({ ...p, lastModified: SITE_UPDATED })),
    ...content,
    ...categories
  ];
}

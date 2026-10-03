import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { BLOG_CATEGORIES, getCollection } from "../../../lib/content.mjs";
import { STATIC_PAGES } from "../../../lib/routes.mjs";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "../../../lib/seo.mjs";

const PATH = "/sitemap";
const TITLE = "Site Map: Every Page on Meritbyte Technologies";
const DESCRIPTION =
  "Every page on the Meritbyte Technologies website in one place: services, technologies, industries, locations, guides by topic and company pages.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default function SitemapPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Site map", path: PATH }
  ];
  const locations = getCollection("locations");
  const posts = getCollection("blog");

  const sections = [
    {
      name: "Company",
      links: STATIC_PAGES.filter((p) => p.path !== PATH).map((p) => ({ href: p.path, label: p.name }))
    },
    {
      name: "Services",
      links: getCollection("services").map((s) => ({ href: `/services/${s.slug}`, label: s.title }))
    },
    {
      name: "Technologies",
      links: getCollection("technologies").map((t) => ({
        href: `/technologies/${t.slug}`,
        label: `${t.title} development`
      }))
    },
    {
      name: "Industries",
      links: getCollection("industries").map((i) => ({ href: `/industries/${i.slug}`, label: i.title }))
    },
    {
      name: "Website developer by country",
      links: locations
        .filter((l) => l.type === "country")
        .map((l) => ({ href: `/website-developer/${l.slug}`, label: l.name }))
    },
    {
      name: "Website developer by city",
      links: locations
        .filter((l) => l.type === "city")
        .map((l) => ({ href: `/website-developer/${l.slug}`, label: l.name }))
    },
    ...Object.entries(BLOG_CATEGORIES).map(([slug, cat]) => ({
      name: `Guides: ${cat.name}`,
      href: `/blog/category/${slug}`,
      links: posts.filter((p) => p.category === slug).map((p) => ({ href: `/blog/${p.slug}`, label: p.title }))
    }))
  ];

  const schema = graph(
    webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <main id="main">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>
        <section className="page-hero page-hero--compact">
          <div className="container">
            <p className="label">Site map</p>
            <h1>Every page on this site.</h1>
            <p className="page-hero__lead">
              Grouped by section. Search engines can use the{" "}
              <a className="textlink" href="/sitemap.xml">
                XML sitemap
              </a>
              , and AI assistants the{" "}
              <a className="textlink" href="/llms.txt">
                llms.txt
              </a>{" "}
              summary.
            </p>
          </div>
        </section>

        <section className="article">
          <div className="container sitemap">
            {sections.map((section) => (
              <section key={section.name} className="sitemap__group">
                <h2>
                  {section.href ? <a href={section.href}>{section.name}</a> : section.name}
                </h2>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

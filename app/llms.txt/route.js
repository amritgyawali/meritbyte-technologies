import { BLOG_CATEGORIES, getCollection } from "../../lib/content.mjs";
import { companyFacts } from "../../lib/llms.mjs";
import { absoluteUrl } from "../../lib/site.mjs";

// /llms.txt: a plain-Markdown map of the site for AI assistants and answer
// engines (see llmstxt.org). It states who we are in citable sentences and
// links every page with a one-line summary. /llms-full.txt has the full text.

export const dynamic = "force-static";

const link = (name, path, note) => `- [${name}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

export function GET() {
  const services = getCollection("services");
  const locations = getCollection("locations");
  const industries = getCollection("industries");
  const posts = getCollection("blog");

  const body = [
    companyFacts(),
    "",
    "## Company",
    "",
    link("About Meritbyte Technologies", "/about", "who we are, what we do and will not do"),
    link("How we work", "/process", "discovery, scope, fixed-price first milestone, two-week blocks, launch, support"),
    link("Pricing", "/pricing", "engagement models and what drives cost"),
    link("FAQ", "/faq", "common questions about cost, ownership, SEO, AEO, GEO and working remotely"),
    link("Contact", "/contact", "start a project"),
    "",
    "## Services",
    "",
    ...services.map((s) => link(s.title, `/services/${s.slug}`, s.summary)),
    "",
    "## Website developer by location",
    "",
    ...locations.map((l) => link(`Website developer in ${l.name}`, `/website-developer/${l.slug}`, l.summary)),
    "",
    "## Industries",
    "",
    ...industries.map((i) => link(i.title, `/industries/${i.slug}`, i.summary)),
    "",
    ...Object.entries(BLOG_CATEGORIES).flatMap(([slug, cat]) => [
      `## Guides: ${cat.name}`,
      "",
      ...posts.filter((p) => p.category === slug).map((p) => link(p.title, `/blog/${p.slug}`, p.summary)),
      ""
    ]),
    "## Optional",
    "",
    link("Full text of every page", "/llms-full.txt"),
    link("Sitemap", "/sitemap.xml"),
    link("RSS feed", "/feed.xml"),
    ""
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

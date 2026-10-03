import fs from "node:fs";
import path from "node:path";
import HomePageClient from "./home-page-client";
import { HOME_FAQS, faqHtml, mobileMenuHtml, navHtml, reachHtml } from "./home-sections.mjs";
import {
  ORG_ID,
  faqSchema,
  graph,
  organizationSchema,
  pageMetadata,
  webPageSchema,
  websiteSchema
} from "../../lib/seo.mjs";
import { absoluteUrl } from "../../lib/site.mjs";

export const dynamic = "force-static";

const TITLE = "Meritbyte Technologies | IT Company in Nepal: Web, AI, SEO";
const DESCRIPTION =
  "Meritbyte Technologies is a Nepal-based IT company building websites, apps, custom software and AI tools, with SEO, marketing and cloud, for clients worldwide.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  keywords: [
    "meritbyte technologies",
    "it company in nepal",
    "web development company in nepal",
    "software company in nepal",
    "website developer nepal",
    "seo company nepal",
    "ai development company"
  ]
});

// Replaces everything between two HTML comment markers.
function between(html, name, replacement) {
  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  if (!re.test(html)) throw new Error(`Home page markup is missing the ${name} markers.`);
  return html.replace(re, replacement);
}

function getHomeMarkup() {
  const sourcePath = path.join(process.cwd(), "Meritbyte Homepage.dc.html");
  const source = fs.readFileSync(sourcePath, "utf8");
  const match = source.match(/<x-dc[^>]*>([\s\S]*?)<\/x-dc>/i);

  if (!match) {
    throw new Error("Could not find the exported x-dc page markup.");
  }

  let html = match[1]
    .replace(/<helmet>[\s\S]*?<\/helmet>/i, "")
    .replace(
      /<x-import\b[^>]*component-from-global-scope=["']nexus-scene["'][^>]*>\s*<\/x-import>/i,
      '<nexus-scene accent="#55E0FF" accent2="#8F7BFF" motion="immersive" style="position:fixed;inset:0;z-index:1;pointer-events:none"></nexus-scene>'
    )
    .replace(/<sc-if\b[^>]*>/gi, "")
    .replace(/<\/sc-if>/gi, "");

  html = between(html, "nav", navHtml());
  html = between(html, "menu", mobileMenuHtml());
  html = html.replace("<!-- home:reach -->", reachHtml()).replace("<!-- home:faq -->", faqHtml());
  return html;
}

function homeSchema() {
  const url = absoluteUrl("/");
  return graph(
    organizationSchema(),
    websiteSchema(),
    {
      ...webPageSchema({ path: "/", title: TITLE, description: DESCRIPTION, about: { "@id": ORG_ID } }),
      mainEntity: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/og.png"), width: 1200, height: 630 },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".nx-faq__answer"] }
    },
    { ...faqSchema(HOME_FAQS), "@id": `${url}#faq` }
  );
}

export default function Page() {
  const json = JSON.stringify(homeSchema()).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <HomePageClient markup={getHomeMarkup()} />
    </>
  );
}

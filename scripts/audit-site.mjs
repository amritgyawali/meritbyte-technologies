#!/usr/bin/env node
// Crawls a running copy of the site from its sitemap and checks the things
// search engines and answer engines care about on every page:
//
//   status 200, one <h1>, a title (<= 65 chars) and description (50-170),
//   a canonical URL that matches the page, JSON-LD that parses, no duplicate
//   titles or descriptions, and internal links that resolve.
//
//   npm run build && npx next start -p 3100 &
//   node scripts/audit-site.mjs http://localhost:3100
//
// Sitemap URLs use the production origin; they are fetched from the given
// base instead.

const base = (process.argv[2] || "http://localhost:3000").replace(/\/+$/, "");
const problems = [];
const warn = [];
const seen = { title: new Map(), description: new Map() };

const text = async (url) => {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, body: await res.text() };
};

const sitemap = await text(`${base}/sitemap.xml`);
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const origin = new URL(urls[0]).origin;
const toLocal = (u) => base + new URL(u).pathname;

const attr = (html, re) => (html.match(re) || [])[1];
const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const linkStatus = new Map();
let checked = 0;

for (const url of urls) {
  const path = new URL(url).pathname;
  const { status, body } = await text(toLocal(url));
  checked += 1;
  const fail = (m) => problems.push(`${path}: ${m}`);
  if (status !== 200) {
    fail(`status ${status}`);
    continue;
  }

  const title = decode(attr(body, /<title>([^<]*)<\/title>/));
  const description = decode(attr(body, /<meta name="description" content="([^"]*)"/));
  const canonical = attr(body, /<link rel="canonical" href="([^"]*)"/);
  const h1s = (body.match(/<h1[\s>]/g) || []).length;

  if (!title) fail("no <title>");
  else if (title.length > 65) fail(`title is ${title.length} chars`);
  if (!description) fail("no meta description");
  else if (description.length < 50 || description.length > 170) warn.push(`${path}: description is ${description.length} chars`);
  if (path !== "/" && !canonical) fail("no canonical");
  if (canonical && canonical !== url && !(path === "/" && canonical === origin)) fail(`canonical ${canonical} != ${url}`);
  if (h1s !== 1) fail(`${h1s} <h1> elements`);
  if (path !== "/" && !/<html lang="en"/.test(body)) fail("missing lang attribute");

  for (const [key, value] of Object.entries({ title, description })) {
    if (!value) continue;
    if (seen[key].has(value)) fail(`duplicate ${key} with ${seen[key].get(value)}`);
    else seen[key].set(value, path);
  }

  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (path !== "/" && !blocks.length) fail("no JSON-LD");
  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      const nodes = data["@graph"] || [data];
      for (const node of nodes) {
        if (!node["@type"]) fail("JSON-LD node without @type");
        if (node["@type"] === "FAQPage" && !node.mainEntity?.length) fail("empty FAQPage");
        if (node["@type"] === "BreadcrumbList" && node.itemListElement?.some((i) => !i.item)) fail("breadcrumb without item");
      }
    } catch (err) {
      fail(`JSON-LD does not parse: ${err.message}`);
    }
  }

  for (const [, href] of body.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    if (!linkStatus.has(clean)) {
      const res = await fetch(base + clean, { redirect: "manual" });
      linkStatus.set(clean, res.status);
    }
    const s = linkStatus.get(clean);
    if (s !== 200) fail(`link to ${href} returns ${s}`);
  }
}

for (const extra of ["/robots.txt", "/llms.txt", "/llms-full.txt", "/feed.xml", "/favicon.ico", "/og.png", "/logo.png"]) {
  const res = await fetch(base + extra);
  if (res.status !== 200) problems.push(`${extra}: status ${res.status}`);
}

warn.forEach((w) => console.log(`warn:  ${w}`));
problems.forEach((p) => console.log(`error: ${p}`));
console.log(`\n${checked} pages, ${linkStatus.size} distinct internal links, ${problems.length} error(s), ${warn.length} warning(s)`);
process.exit(problems.length ? 1 : 0);

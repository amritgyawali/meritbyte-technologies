import { BLOG_CATEGORIES, getCollection } from "../../lib/content.mjs";
import { SITE, absoluteUrl } from "../../lib/site.mjs";

// RSS 2.0 feed of the blog.

export const dynamic = "force-static";

const xml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rfc822 = (iso) => new Date(`${iso}T06:00:00Z`).toUTCString();

export function GET() {
  const posts = getCollection("blog");
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return [
        "    <item>",
        `      <title>${xml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <category>${xml(BLOG_CATEGORIES[p.category]?.name || p.category)}</category>`,
        `      <description>${xml(p.summary || p.description)}</description>`,
        "    </item>"
      ].join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(SITE.name)} blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Guides on websites, software, SEO, AEO, GEO and AI for businesses in Nepal and worldwide.</description>
    <language>en</language>
    <lastBuildDate>${posts[0] ? rfc822(posts[0].updated || posts[0].date) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}

// Loads the Markdown content in /content: blog posts, service pages, location
// pages, industry pages and technology pages. Each file is front matter (one `key: value` per
// line, arrays as JSON) followed by a Markdown body. See content/README.md.
//
// Everything is read at build time; the pages that use it are static.

import fs from "node:fs";
import path from "node:path";

import { renderMarkdown } from "./markdown.mjs";

export const COLLECTIONS = ["blog", "services", "locations", "industries", "technologies"];

export const BLOG_CATEGORIES = {
  nepal: {
    name: "Nepal business",
    description:
      "Websites, payments, SEO and marketing for businesses operating in Nepal: prices, gateways, domains and what works locally."
  },
  "costs-and-hiring": {
    name: "Costs and hiring",
    description:
      "What websites, apps and software cost in Nepal, the USA, Australia, Canada and the UK, and how to hire a developer or agency without regret."
  },
  "web-development": {
    name: "Web development",
    description:
      "Platforms, performance, redesigns, maintenance and security: practical decisions for business websites and web apps."
  },
  "seo-and-marketing": {
    name: "SEO and marketing",
    description:
      "SEO, answer engine optimization (AEO), generative engine optimization (GEO), local search, ads and email for growing businesses."
  },
  "software-and-ai": {
    name: "Software and AI",
    description:
      "Custom software, mobile apps, AI chatbots, RAG, MVPs and cloud platforms, explained for the people paying for them."
  }
};

const ROOT = path.join(process.cwd(), "content");

export function parseFrontmatter(source, file = "content") {
  const text = String(source).replace(/\r\n?/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: text };
  const data = {};
  match[1].split("\n").forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    const colon = line.indexOf(":");
    if (colon < 1) {
      throw new Error(`${file}: front matter line ${index + 2} has no "key:"`);
    }
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (/^[[{]/.test(value) || /^".*"$/.test(value)) {
      try {
        value = JSON.parse(value);
      } catch (err) {
        throw new Error(`${file}: front matter "${key}" is not valid JSON (${err.message})`);
      }
    }
    data[key] = value;
  });
  return { data, body: text.slice(match[0].length) };
}

function readingMinutes(words) {
  return Math.max(1, Math.round(words / 230));
}

export function loadFile(filePath, collection) {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(source, path.relative(process.cwd(), filePath));
  const rendered = renderMarkdown(body);
  const slug = path.basename(filePath, ".md");
  return {
    ...data,
    slug,
    collection,
    body,
    html: rendered.html,
    headings: rendered.headings,
    faqs: rendered.faqs,
    words: rendered.words,
    minutes: readingMinutes(rendered.words)
  };
}

const cache = new Map();

export function getCollection(collection) {
  if (cache.has(collection)) return cache.get(collection);
  const dir = path.join(ROOT, collection);
  const items = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((name) => name.endsWith(".md"))
        .sort()
        .map((name) => loadFile(path.join(dir, name), collection))
    : [];
  if (collection === "blog") {
    items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || (a.order ?? 999) - (b.order ?? 999));
  } else {
    items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.slug.localeCompare(b.slug));
  }
  cache.set(collection, items);
  return items;
}

export function getEntry(collection, slug) {
  return getCollection(collection).find((item) => item.slug === slug) || null;
}

// Looks up a list of slugs, skipping any that do not exist, in the given order.
export function pick(collection, slugs = []) {
  return (Array.isArray(slugs) ? slugs : [])
    .map((slug) => getEntry(collection, slug))
    .filter(Boolean);
}

export const PATHS = {
  blog: (slug) => `/blog/${slug}`,
  services: (slug) => `/services/${slug}`,
  locations: (slug) => `/website-developer/${slug}`,
  industries: (slug) => `/industries/${slug}`,
  technologies: (slug) => `/technologies/${slug}`
};

export const entryPath = (entry) => PATHS[entry.collection](entry.slug);

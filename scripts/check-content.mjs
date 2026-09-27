#!/usr/bin/env node
// Checks the Markdown content against content/README.md: required front
// matter, title and description lengths, word counts, FAQ sections, working
// internal links, supported Markdown only, and phrases we do not publish.
//
//   node scripts/check-content.mjs                  # everything
//   node scripts/check-content.mjs content/blog/x.md  # some files
//   node scripts/check-content.mjs --strict          # links must point at pages that exist now
//
// Exits 1 if any error is found. Warnings are printed but do not fail.

import fs from "node:fs";
import path from "node:path";

import { BLOG_CATEGORIES, COLLECTIONS, PATHS, loadFile } from "../lib/content.mjs";
import { PLANNED_PATHS, STATIC_ROUTES } from "./content-plan.mjs";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const only = args.filter((a) => !a.startsWith("--")).map((a) => path.resolve(a));

const RULES = {
  blog: {
    required: ["title", "seoTitle", "description", "date", "category", "keywords", "summary", "takeaways", "related", "services", "order"],
    minWords: 1100,
    minFaqs: 3,
    minH2: 4,
    minInternalLinks: 3
  },
  services: {
    required: ["title", "seoTitle", "description", "h1", "lead", "summary", "keywords", "deliverables", "related", "posts", "order"],
    minWords: 750,
    minFaqs: 4,
    minH2: 4,
    minInternalLinks: 3
  },
  locations: {
    required: ["name", "type", "seoTitle", "description", "h1", "lead", "summary", "keywords", "services", "posts", "order"],
    minWords: 900,
    minFaqs: 4,
    minH2: 4,
    minInternalLinks: 3
  },
  industries: {
    required: ["title", "seoTitle", "description", "h1", "lead", "summary", "keywords", "services", "posts", "order"],
    minWords: 650,
    minFaqs: 3,
    minH2: 4,
    minInternalLinks: 3
  }
};

// Filler that makes copy read as generated, and claims we cannot back up.
const BANNED = [
  [/in today'?s (digital|fast|modern|competitive)/i, "stock opener"],
  [/\bdelve\b/i, "'delve'"],
  [/game[- ]changer/i, "'game-changer'"],
  [/unlock (the|your)/i, "'unlock the/your'"],
  [/elevate your/i, "'elevate your'"],
  [/look no further/i, "'look no further'"],
  [/ever[- ]evolving/i, "'ever-evolving'"],
  [/\btapestry\b/i, "'tapestry'"],
  [/navigat(e|ing) the (complex|world|landscape)/i, "'navigate the ...'"],
  [/in conclusion/i, "'in conclusion'"],
  [/award[- ]winning/i, "unbacked award claim"],
  [/\b\d+\+?\s*(years|yrs) of experience/i, "unbacked years-of-experience claim"],
  [/\b\d[\d,]*\+\s*(happy )?(clients|projects|customers|websites)/i, "unbacked client/project count"],
  [/trusted by/i, "unbacked 'trusted by' claim"],
  [/(#|no\.?\s?|number )1 (web|website|it|seo|software|digital)/i, "unbacked #1 claim"],
  [/guarantee(d)? (#?1|first|top|page one|ranking)/i, "ranking guarantee"],
  [/\bclient testimonial|\bcase study:/i, "invented testimonial or case study"]
];

const WARN = [
  [/cutting[- ]edge/i, "'cutting-edge'"],
  [/\bseamless(ly)?\b/i, "'seamless'"],
  [/\brobust\b/i, "'robust'"],
  [/world[- ]class/i, "'world-class'"],
  [/state[- ]of[- ]the[- ]art/i, "'state-of-the-art'"],
  [/\bleverag(e|ing)\b/i, "'leverage'"],
  [/\bempower/i, "'empower'"],
  [/\brevolutioni[sz]e/i, "'revolutionize'"]
];

function listFiles() {
  if (only.length) return only;
  return COLLECTIONS.flatMap((collection) => {
    const dir = path.join(process.cwd(), "content", collection);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => path.join(dir, f));
  });
}

function existingPaths() {
  const set = new Set(STATIC_ROUTES);
  for (const collection of COLLECTIONS) {
    const dir = path.join(process.cwd(), "content", collection);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".md")) set.add(PATHS[collection](path.basename(f, ".md")));
    }
  }
  for (const slug of Object.keys(BLOG_CATEGORIES)) set.add(`/blog/category/${slug}`);
  return set;
}

const valid = strict ? existingPaths() : new Set([...existingPaths(), ...PLANNED_PATHS]);
const slugsOf = (collection) =>
  new Set(
    [...valid]
      .filter((p) => p.startsWith(PATHS[collection]("")))
      .map((p) => p.slice(PATHS[collection]("").length))
  );

let errors = 0;
let warnings = 0;
const seen = { seoTitle: new Map(), description: new Map(), h1: new Map() };

for (const file of listFiles()) {
  const rel = path.relative(process.cwd(), file);
  const collection = rel.split(path.sep)[1];
  const rule = RULES[collection];
  const problems = [];
  const notes = [];
  const err = (m) => problems.push(m);
  const warn = (m) => notes.push(m);

  if (!rule) {
    console.log(`? ${rel}: not in a known collection`);
    continue;
  }

  let entry;
  try {
    entry = loadFile(file, collection);
  } catch (e) {
    console.log(`✗ ${rel}\n    ${e.message}`);
    errors += 1;
    continue;
  }

  for (const key of rule.required) {
    const value = entry[key];
    if (value === undefined || value === "" || (Array.isArray(value) && !value.length)) {
      err(`missing front matter "${key}"`);
    }
  }

  const len = (s) => String(s || "").length;
  if (len(entry.seoTitle) > 65) err(`seoTitle is ${len(entry.seoTitle)} chars (max 65, aim 50-60)`);
  else if (len(entry.seoTitle) > 60) warn(`seoTitle is ${len(entry.seoTitle)} chars (aim 50-60)`);
  if (entry.seoTitle && len(entry.seoTitle) < 30) warn(`seoTitle is only ${len(entry.seoTitle)} chars`);
  if (len(entry.description) < 120 || len(entry.description) > 165) {
    err(`description is ${len(entry.description)} chars (need 120-165)`);
  }
  const summaryWords = String(entry.summary || "").split(/\s+/).filter(Boolean).length;
  if (summaryWords && (summaryWords < 30 || summaryWords > 85)) {
    err(`summary is ${summaryWords} words (need 30-85; aim 40-60)`);
  }
  if (entry.keywords && (!Array.isArray(entry.keywords) || entry.keywords.length < 3)) {
    err("keywords must be a JSON array with at least 3 entries");
  }

  if (collection === "blog") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date || "")) err("date must be YYYY-MM-DD");
    if (!BLOG_CATEGORIES[entry.category]) err(`unknown category "${entry.category}"`);
    if (!Array.isArray(entry.takeaways) || entry.takeaways.length < 3 || entry.takeaways.length > 6) {
      err("takeaways must be a JSON array of 3-6 strings");
    }
    const blogSlugs = slugsOf("blog");
    for (const s of entry.related || []) if (!blogSlugs.has(s)) err(`related post "${s}" does not exist`);
    if (entry.related?.includes(entry.slug)) err("related lists the post itself");
  }
  if (collection === "locations") {
    if (!["country", "city"].includes(entry.type)) err('type must be "country" or "city"');
    if (entry.type === "city" && !slugsOf("locations").has(entry.country || "")) {
      err(`city needs "country" set to a country location slug`);
    }
  }
  if (["services", "locations", "industries", "blog"].includes(collection)) {
    const serviceSlugs = slugsOf("services");
    const list = collection === "services" ? entry.related : entry.services;
    for (const s of list || []) if (!serviceSlugs.has(s)) err(`service "${s}" does not exist`);
    const blogSlugs = slugsOf("blog");
    for (const s of entry.posts || []) if (!blogSlugs.has(s)) err(`post "${s}" does not exist`);
  }

  // Body checks.
  const body = entry.body;
  if (/^#\s/m.test(body)) err("body has an H1 (# ...); the page title is the H1");
  if (/^#{4,}\s/m.test(body)) err("body uses H4 or deeper; use ## and ### only");
  if (/!\[/.test(body)) err("images are not supported in content");
  if (/<[a-z/][^>]*>/i.test(body.replace(/`[^`]*`/g, ""))) err("raw HTML is not allowed");
  if (/^\s{2,}[-*\d]/m.test(body)) err("nested or indented lists are not supported");
  if (entry.words < rule.minWords) err(`body is ${entry.words} words (min ${rule.minWords})`);
  const h2 = entry.headings.filter((h) => h.level === 2).length;
  if (h2 < rule.minH2) err(`only ${h2} H2 sections (min ${rule.minH2})`);
  if (!/^## Frequently asked questions$/m.test(body)) err('no "## Frequently asked questions" section');
  if (entry.faqs.length < rule.minFaqs) err(`only ${entry.faqs.length} FAQs (min ${rule.minFaqs})`);
  for (const faq of entry.faqs) {
    if (!faq.answerText) err(`FAQ "${faq.question}" has no answer`);
    if (!faq.question.endsWith("?")) warn(`FAQ "${faq.question}" does not end with "?"`);
  }

  const links = [...body.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]);
  let internal = 0;
  for (const href of links) {
    if (/^https:\/\//.test(href)) continue;
    if (/^http:\/\//.test(href)) {
      err(`insecure link ${href}`);
      continue;
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    const clean = href.split("#")[0].replace(/\/$/, "") || "/";
    if (!href.startsWith("/")) err(`relative link "${href}" must start with /`);
    else if (!valid.has(clean)) err(`broken internal link ${href}`);
    else if (clean === PATHS[collection](entry.slug)) warn(`links to itself: ${href}`);
    else internal += 1;
  }
  if (internal < rule.minInternalLinks) err(`only ${internal} internal links (min ${rule.minInternalLinks})`);

  const text = [entry.seoTitle, entry.description, entry.summary, entry.lead, body].join("\n");
  for (const [re, label] of BANNED) if (re.test(text)) err(`contains ${label}: "${text.match(re)[0]}"`);
  for (const [re, label] of WARN) if (re.test(text)) warn(`uses ${label}`);

  for (const key of Object.keys(seen)) {
    const value = String(entry[key] || "").toLowerCase();
    if (!value) continue;
    if (seen[key].has(value)) err(`${key} duplicates ${seen[key].get(value)}`);
    else seen[key].set(value, rel);
  }

  if (problems.length) {
    errors += problems.length;
    console.log(`✗ ${rel} (${entry.words} words)`);
    problems.forEach((p) => console.log(`    error: ${p}`));
  } else {
    console.log(`✓ ${rel} (${entry.words} words, ${entry.faqs.length} FAQs, ${internal} internal links)`);
  }
  warnings += notes.length;
  notes.forEach((n) => console.log(`    warn:  ${n}`));
}

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);

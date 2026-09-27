# Content guide

Everything under `content/` is Markdown with front matter. The site turns each
file into a static page:

| Folder | URL | Page |
| --- | --- | --- |
| `content/blog/<slug>.md` | `/blog/<slug>` | Blog post |
| `content/services/<slug>.md` | `/services/<slug>` | Service page |
| `content/locations/<slug>.md` | `/website-developer/<slug>` | Country or city page |
| `content/industries/<slug>.md` | `/industries/<slug>` | Industry page |

The planned pages, and the search terms each one targets, are in
`scripts/content-plan.mjs` (the keyword map). One primary query per page, so
our own pages never compete with each other.

Check your work before committing:

```bash
node scripts/check-content.mjs                 # all files
node scripts/check-content.mjs content/blog/website-cost-in-nepal.md
node scripts/check-content.mjs --strict        # every link must point at a page that exists
```

## Who we are (the only facts you may state about Meritbyte)

- Meritbyte Technologies is an IT company **based in Nepal**. Do not name a
  city, street or office anywhere; we have not published one.
- We work with businesses in Nepal and, remotely, with clients in the USA,
  Australia, Canada, the UK, New Zealand, the UAE, Singapore and elsewhere. We
  have **no offices outside Nepal**. City pages say we serve that city
  remotely; never imply a local office, local staff or in-person visits abroad.
- Six practices: software development, AI applications, web development,
  digital marketing, SEO, cloud and DevOps. Supporting services: QA and
  testing, project management, cybersecurity, UI/UX design, data and BI,
  managed IT. We also build mobile apps and e-commerce stores.
- Stack we can name: TypeScript, JavaScript, Python, Go, .NET, React,
  Next.js, Node.js, WordPress, Shopify, WooCommerce, Flutter, React Native,
  PostgreSQL, AWS, Azure, Google Cloud, Terraform, Docker, Kubernetes.
- How we work (use these, they are real commitments on the site):
  - A free scoping conversation; you get back a scope, a timeline and a
    number. No paid discovery phase standing between a client and that answer.
  - **Fixed price on the first milestone.** After that, two-week blocks with a
    demo at the end of each; the client can stop at the end of any block.
  - Engagement models: Project (fixed first milestone), Retainer (set days
    each month), Embedded (our engineers in your standups).
  - One project manager and a written update every week. A staging URL the
    client can open any time.
  - Code, repositories, domains, hosting, ad accounts and credentials are in
    the **client's name**. Documentation at handover. Nothing breaks if a
    client moves to another firm.
  - We do not buy links. Rankings are reported next to leads and revenue.
  - A person replies to enquiries within one business day.
  - Free website design idea for small businesses: `/free-website`.
- Contact: hello@meritbyte.com. Use `/contact` for links.

### Never write

- Client names, testimonials, reviews, star ratings, case studies, awards,
  team size, founding year, "years of experience", project counts or any
  other number about Meritbyte that is not listed above.
- Guarantees of rankings or results ("guaranteed #1 on Google"). Google
  itself warns against SEO firms that promise this. Say what we do instead.
- "Best", "#1", "top-rated" as a claim about Meritbyte. You may use the
  search phrase ("best website developer in Nepal") as the topic: explain
  what the best one looks like and how we work against that standard.
- Statistics you cannot source. If you are not certain a number is real and
  current, leave it out. Never invent a study, survey or quote.
- Prices presented as Meritbyte's price list. Market ranges are fine when
  they are clearly labelled as typical ranges that vary, with the reasons
  they vary.

Well-known, checkable facts are welcome and make pages more useful: Core Web
Vitals thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th
percentile), WCAG 2.2 level AA, the names and years of laws (Privacy Act 1988,
PIPEDA, CASL, UK GDPR, Nepal's Individual Privacy Act 2075), time-zone
offsets (Nepal is UTC+5:45 with no daylight saving), payment gateways that
exist in a market. Link to official sources only with URLs you are sure of
(for example `https://web.dev/articles/vitals`,
`https://developers.google.com/search/docs`, `https://www.w3.org/TR/WCAG22/`).

## Voice

Plain, specific and a little dry, like the rest of the site: "Most of this
work is replacement work: a spreadsheet that quietly became a business
process." Write for the owner or manager who pays the invoice.

- Lead with the answer, then the reasoning. No throat-clearing intros.
- Concrete over abstract: name the tool, the law, the number, the trade-off.
- Say when something is not worth doing, or when we are not the right fit.
- Short paragraphs (2-4 sentences). Sentence case headings.
- British or American spelling is fine; be consistent within a page. Use
  American spelling on US pages, British on UK/Australia/NZ pages.
- Avoid: "in today's digital world", "delve", "unlock", "elevate",
  "seamless", "robust", "cutting-edge", "leverage", "game-changer",
  "look no further", "in conclusion". The checker flags them.

## Writing for search, answer engines and AI assistants (SEO, AEO, GEO)

1. **Primary keyword** from the plan goes in `seoTitle`, the H1/title, the
   first 100 words, one H2 and the description, naturally. Secondary terms
   appear where they fit; never stuff.
2. **Answer first.** `summary` is a 40-60 word, self-contained answer to the
   page's main question. It is shown in an answer box at the top of the page
   and is what answer engines and AI assistants are most likely to quote. It
   must make sense with no surrounding context and name Meritbyte only when
   the question is about us.
3. **Question headings.** Where natural, H2s are the questions people type or
   ask ("How much does a website cost in Nepal?"), each followed by a direct
   1-2 sentence answer, then detail.
4. **Structure that can be lifted.** Use numbered steps for processes, tables
   for comparisons and price ranges, short definition sentences ("X is ...")
   for concepts. One idea per paragraph.
5. **Entity clarity.** Refer to "Meritbyte Technologies" by full name at
   least once, and say plainly what it is and where it is based ("a
   Nepal-based web and software development company").
6. **FAQ section** at the end: exactly `## Frequently asked questions`, then
   each question as `### Question?` with a 40-80 word answer below it. These
   become FAQPage structured data.
7. **Internal links**: at least 3 links to other pages on the site, using
   descriptive anchor text ("our [web development services](/services/web-development)"),
   never "click here". Link to the relevant service, a location page and one
   or two related posts. Use only paths from the keyword map.
8. **Freshness**: say "in 2026" where timing matters. Keep facts current.

## Markdown you can use

- `## Heading` and `### Subheading` only. No `#` (the page adds the H1), no `####`.
- Paragraphs, `- ` bullet lists, `1. ` numbered lists. No nested lists.
- Pipe tables with a header row and a `| --- |` rule.
- `> ` quote, for a single key point.
- `**bold**`, `*italic*`, `` `code` ``, `[text](/path)` and `[text](https://...)`.
- No images, no raw HTML, no footnotes.

## Front matter

One `key: value` per line. Arrays and quoted strings are JSON (double quotes).
Plain strings need no quotes; keep each value on one line.

### Blog post

```yaml
---
title: How Much Does a Website Cost in Nepal in 2026?
seoTitle: Website Cost in Nepal (2026): Prices and What You Get
description: What a website costs in Nepal in 2026, from a simple business site to e-commerce, with typical NPR ranges, what drives the price and what to ask.
date: 2026-09-27
category: nepal
order: 1
keywords: ["website cost in nepal", "website price in nepal", "website design price in nepal"]
summary: 40-60 words. The direct answer to the title question.
takeaways: ["Three to five one-sentence takeaways.", "...", "..."]
related: ["seo-in-nepal", "best-website-developer-in-nepal-checklist", "esewa-khalti-fonepay-integration"]
services: ["web-development", "website-design"]
---
```

- `seoTitle` 50-60 characters, primary keyword near the start. The brand is
  not added automatically; add " | Meritbyte" only if it fits in 60.
- `description` 140-160 characters (120-165 accepted), a real sentence with
  the primary keyword and a reason to click.
- `category`: `nepal`, `costs-and-hiring`, `web-development`,
  `seo-and-marketing` or `software-and-ai` (the plan says which).
- `related`: 3 blog slugs. `services`: 1-3 service slugs.
- Body: 1,300-1,900 words, at least 5 H2 sections, ending with the FAQ
  section (3-5 questions). Open with 2-3 sentences that answer the title
  directly; no heading before them.

### Service page

```yaml
---
title: Web development
seoTitle: Web Development Company | Websites and Web Apps | Meritbyte
description: ...
h1: Web development services for sites and apps that have to work
lead: One or two sentences under the H1.
summary: 40-60 words, "What does Meritbyte's web development service include?"
keywords: ["web development company", "web development services", "custom web development"]
deliverables: ["4-8 short items: what the client receives"]
technologies: ["Next.js", "React", "Node.js", "WordPress"]
related: ["website-design", "ecommerce-development", "seo-services"]
posts: ["nextjs-vs-wordpress", "core-web-vitals-explained", "website-cost-in-nepal"]
order: 1
---
```

Body: 900-1,400 words, at least 5 H2 sections (what it is and who it is for,
what is included, how the work runs, technology choices, pricing approach
without Meritbyte numbers, how to choose a provider), then the FAQ section
(4-6 questions).

### Location page (country or city)

```yaml
---
name: Nepal
type: country
seoTitle: Best Website Developer in Nepal | Meritbyte Technologies
description: ...
h1: Website developer in Nepal
lead: ...
summary: 40-60 words answering "Who is a good website developer in Nepal / what should you look for?"
keywords: ["best website developer in nepal", "web development company in nepal", "website design in nepal"]
services: ["web-development", "ecommerce-development", "seo-services"]
posts: ["website-cost-in-nepal", "esewa-khalti-fonepay-integration", "seo-in-nepal"]
order: 1
---
```

City pages add `country: nepal` (the country page's slug). Countries use
`order` 1-8, cities 10 and up.

Body: 1,100-1,700 words, at least 6 H2 sections, all specific to the place:
what the best developer for that market does (the checklist), local laws and
compliance, payments and currency, time-zone overlap with Nepal (exact
offsets, including daylight saving), local search and marketing habits,
industries we build for there, how an engagement runs remotely, pricing
approach. Then the FAQ section (4-6 questions). Two location pages must not
share paragraphs; if a sentence would fit on any city page, cut it.

### Industry page

```yaml
---
title: Hotels and restaurants
seoTitle: Hotel and Restaurant Website Design | Meritbyte Technologies
description: ...
h1: Websites for hotels and restaurants that take bookings directly
lead: ...
summary: 40-60 words.
keywords: ["hotel website design", "restaurant website development", "hotel booking engine"]
services: ["website-design", "web-development", "seo-services"]
posts: ["hotel-website-direct-bookings-nepal", "local-seo-google-business-profile"]
order: 1
---
```

Body: 800-1,200 words, at least 5 H2 sections, then the FAQ section (3-5
questions).

---
title: Technical SEO Audit Checklist for 2026
seoTitle: Technical SEO Audit Checklist for 2026, in Priority Order
description: A technical SEO audit checklist for 2026: crawl errors, indexing issues, canonicals, redirects, Core Web Vitals and JavaScript, in the order to fix them.
date: 2026-09-27
category: seo-and-marketing
order: 37
keywords: ["technical seo audit checklist", "seo audit", "crawl errors", "indexing issues"]
summary: A technical SEO audit checks whether search engines can crawl, render and index the pages that matter, and whether anything slows or confuses them. Work in this order: access and status codes, indexing and canonicals, sitemaps and internal links, redirects, Core Web Vitals and mobile, JavaScript rendering, then structured data and on-page elements. Free tools cover most small sites.
takeaways: ["Start with problems that remove pages from Google: robots.txt blocks, stray noindex tags, server errors and broken key URLs.", "Search Console's Page indexing report and URL Inspection tool explain most indexing issues, if you read the status names carefully.", "Canonicals, sitemaps, redirects and internal links should all point at the same preferred URLs.", "Core Web Vitals thresholds are LCP 2.5 s, INP 200 ms and CLS 0.1 at the 75th percentile of real visits.", "Ignore tool scores and crawl budget on small sites; fix what Google actually documents."]
related: ["core-web-vitals-explained", "website-redesign-without-losing-seo", "schema-markup-for-small-business"]
services: ["seo-services", "web-development"]
---

A technical SEO audit answers one question: can search engines crawl, render and index the pages that earn you money, and is anything getting in their way? This technical SEO audit checklist runs in the order problems do damage, starting with the ones that remove pages from Google entirely and ending with refinements. On a small business site, a careful person can work through it in a day with free tools.

## What tools do you need for an SEO audit?

Most small and mid-size sites need nothing paid.

| Tool | Cost | What it is for |
| --- | --- | --- |
| Google Search Console | Free | Page indexing report, URL Inspection, Core Web Vitals, sitemaps, crawl stats, manual actions |
| Bing Webmaster Tools | Free | Bing's index, which also feeds Copilot; site scan; IndexNow |
| Screaming Frog SEO Spider | Free up to 500 URLs, then a paid license | A full crawl: status codes, titles, canonicals, redirects, hreflang |
| PageSpeed Insights | Free | Real-user field data plus a Lighthouse lab test |
| Rich Results Test and Schema Markup Validator | Free | Structured data checks |
| Server access logs | Usually free from your host | What crawlers actually request, and what they get back |

Sitebulb, Semrush Site Audit and Ahrefs Webmaster Tools (free for sites you verify) are good alternatives to the crawler.

## 1. Can search engines reach the site?

Crawl errors at this level can take a whole site out of search, so check them first.

- **robots.txt** at `/robots.txt` returns a 200 and does not block important sections, or the CSS and JavaScript files pages need. A leftover `Disallow: /` from a staging site is a classic launch-day mistake.
- **Staging and test sites** are behind a password, not merely hidden, so they do not get indexed as duplicates.
- **Status codes**: pages you want in search return 200; deleted pages return 404 or 410; error pages do not return 200 (Google calls those soft 404s).
- **Server errors and timeouts**: check the Crawl stats report under Settings in Search Console for 5xx responses and slow response times.
- **Firewalls and CDNs** are not blocking Googlebot or Bingbot. Verify real crawler traffic by reverse DNS lookup or against the IP ranges Google publishes, not by user agent alone.
- **Crawl budget** is not a small-site problem. Google's own guidance aims it at very large sites, around a million pages, or sites of 10,000 pages or more that change daily.

## 2. Are the right pages indexed?

Open Indexing, then Pages, in Search Console. Most indexing issues are explained by the status Google gives each URL.

| Status | What it usually means | What to do |
| --- | --- | --- |
| Crawled - currently not indexed | Google read the page and chose not to index it, often because it is thin or duplicates another page | Improve it, merge it or remove it; resubmitting alone rarely helps |
| Discovered - currently not indexed | Google knows the URL but has not crawled it yet | Link to it from relevant pages, check server speed, include it in the sitemap |
| Duplicate without user-selected canonical | Duplicates exist and none is marked as preferred | Add a canonical tag to the preferred version |
| Duplicate, Google chose different canonical than user | Google disagrees with your canonical | Make internal links, sitemap and redirects point at your preferred URL |
| Alternate page with proper canonical tag | Working as intended | Nothing |
| Excluded by 'noindex' tag | The page asks not to be indexed | Confirm that is deliberate |
| Blocked by robots.txt | Crawling is disallowed | To remove a page from Google, allow crawling and use noindex instead |
| Soft 404 | The page looks empty or like an error but returns 200 | Return a real 404, or add real content |
| Page with redirect | The URL redirects elsewhere | Fine if intended; remove it from the sitemap |

For individual pages, the URL Inspection tool shows whether the URL is on Google, which canonical Google selected, and the rendered HTML Googlebot saw.

## 3. Do canonicals, sitemaps and internal links agree?

Every signal should point at the same preferred URL. Mixed signals are a common reason for "Google chose different canonical".

- **One version of the site**: HTTPS, with or without www, and a consistent trailing-slash rule. Every other variant 301-redirects to it.
- **Canonical tags** on indexable pages point to themselves, and never to a URL that redirects, returns 404 or is noindexed.
- **XML sitemaps** list only canonical, indexable URLs that return 200. Each file can hold up to 50,000 URLs or 50 MB uncompressed. Submit it in Search Console and reference it in robots.txt. Keep `lastmod` accurate; Google uses it when it proves reliable and ignores the priority and changefreq fields.
- **Parameter URLs** from filters, sorting and tracking do not create thousands of crawlable duplicates. Search Console's URL Parameters tool was retired in 2022, so control this with canonicals, robots rules and cleaner links.
- **Orphan pages**, which appear in the sitemap or analytics but receive no internal links, get linked from relevant pages.
- **Click depth**: as a rule of thumb, pages that matter for revenue sit within three clicks of the home page.

## 4. Redirects and broken links

- Use 301 redirects for permanent moves and 302 for genuinely temporary ones.
- Remove chains (A to B to C) and loops; point each old URL straight at its final destination and update internal links to match.
- Fix broken internal links, and redirect old URLs that other sites still link to. The Links report in Search Console and free backlink tools show which retired URLs still have links.
- After any redesign or platform move, crawl the old URL list and confirm every one lands somewhere sensible. Our [website redesign checklist](/blog/website-redesign-without-losing-seo) covers the full redirect plan.

## 5. Page experience: speed, mobile and HTTPS

- **Core Web Vitals** in Search Console, from real Chrome users: Largest Contentful Paint 2.5 seconds or less, Interaction to Next Paint 200 milliseconds or less (INP replaced First Input Delay in March 2024) and Cumulative Layout Shift 0.1 or less, each at the 75th percentile. Our guide to [Core Web Vitals](/blog/core-web-vitals-explained) explains how to fix each one.
- **Mobile parity**: Google now crawls almost every site with its smartphone crawler, after finishing the move to mobile-first indexing in 2024. Content, links and structured data on the mobile version must match desktop.
- **HTTPS** everywhere, with a valid certificate, no mixed-content warnings and HTTP redirecting to HTTPS.
- **Intrusive pop-ups** that cover the content on mobile are worth removing for users regardless of search.

## 6. JavaScript rendering

Google renders JavaScript, but later and with limits, and many other crawlers do not render it at all.

- Compare the page source with the rendered HTML in URL Inspection. Titles, main content, links and canonical tags should be in the initial HTML where possible.
- Links must be real `<a href>` elements with URLs, not click handlers on buttons or divs.
- Content that loads only after a click, a tab change or endless scrolling may never be seen, because crawlers do not interact with the page.
- For content-heavy sites built with React or Vue, server-side rendering or static generation (Next.js, Nuxt or Astro, for example) removes most of these risks.

## 7. On-page technical elements

- Unique, descriptive title tags and meta descriptions; a clear H1 on every page.
- Images with meaningful alt text, explicit width and height, and modern formats such as WebP or AVIF.
- Structured data that validates in the Rich Results Test and matches the visible content; see our guide to [schema markup for small businesses](/blog/schema-markup-for-small-business).
- Correct `hreflang` annotations if you run separate country or language versions.
- A helpful 404 page that actually returns a 404 status.
- The Manual actions and Security issues reports in Search Console both show "No issues detected".

## How do you prioritize what the audit finds?

Rank fixes by how much traffic or revenue is at risk, not by how many warnings a tool shows.

| Priority | Examples | Why |
| --- | --- | --- |
| Fix today | Site-wide noindex, robots.txt blocking the site, 5xx errors, key pages returning 404, broken HTTPS | Pages are leaving Google or cannot be reached |
| Fix this month | Wrong canonicals, redirect chains after a migration, sitemaps full of redirected URLs, orphaned service pages, poor mobile LCP | Signals are diluted and crawling is wasted |
| Schedule | Missing alt text, overlong titles, minor layout shift, schema warnings that are not errors | Incremental gains |
| Deprioritize | Crawl budget on small sites, tool "health scores", word-count targets, text-to-HTML ratios | Not things Google documents as mattering |

## How often should you work through a technical SEO audit checklist?

Run a full audit before and after any redesign, migration or platform change, and at least once a year otherwise. In between, a monthly 20-minute look at Search Console (page indexing, Core Web Vitals, manual actions, security issues and crawl stats) catches most problems before they cost traffic.

## How Meritbyte Technologies runs technical audits

Meritbyte Technologies is a Nepal-based web and software development company, so an audit from us ends in a prioritized fix list rather than a tool export, and because we also build sites through our [web development](/services/web-development) practice, we can usually make the fixes ourselves on a staging URL you can check before anything goes live.

Technical audits are the starting point of our [SEO services](/services/seo-services). Search Console and analytics stay in your name, with us added as users, and progress is reported next to leads and revenue in a weekly written update. We work with businesses in Nepal and remotely with clients in places such as [London](/website-developer/london).

## Frequently asked questions

### What is the difference between a technical SEO audit and an SEO audit?

A technical SEO audit covers how search engines access and process the site: crawling, indexing, redirects, speed, rendering and structured data. A full SEO audit adds content quality, keyword targeting, links and local presence. Technical problems come first because they can stop good content from being indexed at all.

### How long does a technical SEO audit take?

For a small business site of up to a few hundred pages, a thorough audit with free tools usually takes one to two days, including a written fix list. Large e-commerce or multi-country sites take longer, because faceted navigation, parameters and hreflang need careful analysis and log files are worth reviewing. Fixing the findings is a separate job.

### Why is my page "crawled - currently not indexed"?

Google fetched the page and decided not to add it to the index, most often because it looks thin, too similar to another page or less useful than alternatives. Improve the page substantially, merge it with a stronger page, or link to it more prominently from relevant content. Repeatedly requesting indexing without changing the page rarely works.

### Do I need paid tools for a technical SEO audit?

Not for most small sites. Google Search Console, Bing Webmaster Tools, PageSpeed Insights and the free version of Screaming Frog, which crawls up to 500 URLs, cover the essentials. Paid crawlers and suites save time on larger sites, schedule recurring crawls and add backlink data, but the checks themselves are the same.

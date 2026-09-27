---
title: Website Redesign Checklist: How to Relaunch Without Losing Rankings
seoTitle: Website Redesign Checklist: Relaunch Without Losing SEO
description: A website redesign checklist for keeping your rankings: SEO inventory, a 301 redirect plan, staging checks, launch-day steps and what to monitor for six weeks.
date: 2026-09-27
category: web-development
order: 26
keywords: ["website redesign checklist", "redesign without losing seo", "website migration seo", "301 redirect plan"]
summary: To redesign a website without losing rankings, inventory every URL that earns traffic or links, map each one to its closest new page with a single 301 redirect, keep the content that ranked, check the staging site for crawl and indexing problems, then monitor Search Console for several weeks after launch and fix 404s quickly.
takeaways: ["Most redesign ranking losses come from missing redirects, cut content or a site left blocked from crawling.", "Map every valuable old URL to its closest new equivalent with a single 301 redirect.", "Never redirect everything to the homepage; Google can treat that as a soft 404.", "Test the redirect map against staging before launch day, not after.", "Keep redirects for at least a year, and ideally for good."]
related: ["technical-seo-audit-checklist", "core-web-vitals-explained", "nextjs-vs-wordpress"]
services: ["seo-services", "web-development", "website-design"]
---

A redesign keeps its rankings when every old URL that earns traffic or links either stays the same or 301-redirects to its closest new page, the content that ranked survives, and nothing blocks search engines on launch day. Sites that lose traffic after a relaunch nearly always skipped one of those three.

This website redesign checklist puts the work in order: inventory before design starts, a redirect plan during the build, staging checks, launch day, and the six weeks after.

## Why do websites lose rankings after a redesign?

Rankings drop when Google can no longer find, reach or recognize the pages it was ranking. The design itself is rarely the cause; the plumbing around it is.

The usual culprits:

- Old URLs changed with no redirects, so links and bookmarks hit 404 pages.
- Every old URL redirected to the homepage, which Google may treat as a soft 404.
- Pages that ranked were cut, merged into thin summaries or rewritten without their key content.
- The staging site's `noindex` tag or a `Disallow: /` line in robots.txt went live with the new site.
- Titles, meta descriptions, headings and structured data were lost in the rebuild.
- Navigation changed so that important pages are now buried several clicks deep.
- The new site is slower, or relies on JavaScript to render content that used to be in the HTML.

## Step 1: take an SEO inventory before design starts

You cannot protect what you have not listed. Build the inventory while the old site is still live and untouched.

1. **Crawl the current site** with a tool such as Screaming Frog SEO Spider (free up to 500 URLs) or Sitebulb. Export every URL with its status code, title, meta description, H1 and canonical tag.
2. **Export Search Console performance data** for the past 16 months, by page, with clicks and impressions.
3. **Export landing pages from GA4** with sessions and conversions, so you know which pages make money, not just traffic.
4. **List pages with backlinks** from the Search Console Links report, plus Ahrefs, Semrush or Moz if you have them.
5. **Save the current XML sitemaps and robots.txt.**
6. **Record rankings** for the 20 to 50 queries that matter most, and note current Core Web Vitals for key templates.

Flag every URL with clicks, conversions or external links as "must redirect". Everything else can be judged case by case.

## Step 2: build the 301 redirect plan

A 301 redirect plan is a spreadsheet that maps every old URL worth keeping to exactly one new URL. A 301 tells search engines the move is permanent, so they transfer the old page's signals to the new one.

| Old URL | New URL | Code | Reason |
| --- | --- | --- | --- |
| /services/web-design.html | /services/website-design | 301 | Same page, new structure |
| /blog/2019/seo-tips | /blog/seo-basics | 301 | Merged into an updated guide |
| /team/john | /about | 301 | Individual bio pages removed |
| /summer-offer-2021 | none | 410 | Expired offer, no links or traffic |

Rules that prevent most problems:

- Redirect page to page, to the closest equivalent content, not to the homepage.
- One hop only. Update older redirects so they point straight at the final URL rather than creating chains.
- Let genuinely dead pages with no traffic or links return 404 or 410; that is allowed.
- Include protocol and host variants: `http` to `https`, and `www` to non-`www` or the reverse.
- Keep a consistent trailing-slash rule so you do not create duplicate URLs.

Where redirects live depends on the stack: server configuration in Nginx or Apache, rules at a CDN such as Cloudflare, the `redirects` setting in a Next.js config, or a plugin such as Redirection on WordPress. The mechanism matters less than testing it.

## Step 3: the pre-launch website redesign checklist

Staging is where you catch problems while they are still free to fix. Check it against the inventory, not against memory.

- Staging is password-protected, not just `noindex`, so it never gets indexed.
- Titles, meta descriptions and H1s from ranking pages have been carried over or deliberately improved.
- High-traffic pages keep their core content, not a shortened version.
- Internal links point directly at new URLs, not at old URLs that redirect.
- Canonical tags reference the new, absolute production URLs.
- Structured data passes Google's Rich Results Test.
- An XML sitemap is generated containing only new, indexable URLs.
- GA4, Tag Manager, ad conversion tags and form submissions all work.
- The 404 page is helpful and returns a real 404 status.
- The redirect map passes when you run the full old-URL list against staging.

## Step 4: the launch-day checklist

Launch early in the week, early in the day, with the people who built it available. A Friday-evening launch leaves problems live all weekend.

1. Remove staging protection and any `noindex` tags.
2. Open robots.txt on the live domain and confirm it does not block the site.
3. Deploy redirects, then crawl the old URL list: every row should 301 once and land on a 200 page.
4. Submit the new XML sitemap in Search Console.
5. If the domain changed, verify both domains in Search Console and use the Change of Address tool.
6. Update the website URL on your Google Business Profile, social profiles, ad final URLs and email signatures.
7. Ask the sites that send you the most valuable links to update them to the new URLs.

## Step 5: what to monitor in the first six weeks

Some movement in rankings for a few weeks after launch is normal while Google recrawls and processes redirects. A steady decline after that points to something broken.

Check weekly:

- **Search Console Pages report** for new "Not found (404)" and "Excluded by noindex" entries.
- **Search Console Performance**, comparing clicks for key pages against the same period before launch.
- **GA4 organic landing pages**, especially the pages that produced conversions.
- **Server logs or crawl stats** for old URLs Googlebot still requests that are not in the redirect map.

Avoid further structural changes during this window. If you change URLs again mid-recovery, you will not know which change caused what.

## Website migration SEO when the platform or domain changes too

A redesign that also changes platform or domain is a migration, and the risk rises with each change made at once.

Changing platform, from Wix to WordPress or WordPress to Next.js for example, usually changes URL patterns; Shopify, for instance, forces product pages under `/products/`. Check that the new platform outputs content in the HTML rather than only after JavaScript runs. Changing domain means keeping the old domain registered and redirecting for years, not months. Where you can, change one thing at a time. Our [Next.js vs WordPress comparison](/blog/nextjs-vs-wordpress) covers the platform side of that decision.

## How Meritbyte runs a redesign

Meritbyte Technologies is a Nepal-based web and software development company, and on redesigns the redirect map is a deliverable in its own right, reviewed with you before launch. The inventory happens in the first milestone, which is fixed-price, and you can follow the build on a staging URL throughout.

After launch, we report search visibility next to leads and revenue, because a redesign that holds its rankings but loses enquiries has still failed. For the build, see our [website design](/services/website-design) and [SEO services](/services/seo-services). For a deeper crawl of the live site afterwards, use our [technical SEO audit checklist](/blog/technical-seo-audit-checklist). We also work remotely with [businesses in Canada](/website-developer/canada) and elsewhere on relaunches like this.

## Frequently asked questions

### How long does it take for rankings to recover after a redesign?

When redirects and content are handled properly, most sites see only small fluctuations that settle within a few weeks, as Google recrawls old URLs and processes the redirects. Larger sites can take longer. If traffic is still falling after six to eight weeks, look for missing redirects, pages blocked from indexing or ranking content that was removed.

### Should I use 301 or 302 redirects when redesigning?

Use 301 redirects for pages that have moved permanently, which covers almost every URL change in a redesign. Google treats 301 and 308 as permanent and 302 and 307 as temporary. Use a 302 only for genuinely temporary situations, such as a page briefly pointing elsewhere during maintenance, and switch it back when the situation ends.

### Can I change my URLs during a redesign?

Yes, as long as every old URL with traffic, conversions or backlinks redirects to its closest new equivalent. Cleaner URLs can be worth it, but each change adds risk and work. If the current URLs are reasonable, keeping them is the safest option. If they are messy, change them once, properly, rather than again next year.

### Do I need to keep redirects forever?

Google recommends keeping redirects for as long as possible, and at least a year. In practice, keep them indefinitely: old links on other websites, in emails and in bookmarks keep sending visitors for years. Redirect rules cost almost nothing to maintain. If you change domain, keep the old domain registered and redirecting for the same reason.

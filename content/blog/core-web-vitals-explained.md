---
title: Core Web Vitals Explained for Business Owners: LCP, INP and CLS
seoTitle: Core Web Vitals Explained: LCP, INP and CLS for Owners
description: Core Web Vitals in plain English: what LCP, INP and CLS measure, the 2026 thresholds, how they affect SEO, and the fixes to ask your developer for first.
date: 2026-09-27
category: web-development
order: 25
keywords: ["core web vitals", "what is lcp inp cls", "improve page speed", "core web vitals seo"]
summary: Core Web Vitals are three Google metrics for real-user experience: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability). A page passes when, at the 75th percentile of real visits, LCP is 2.5 seconds or less, INP is 200 milliseconds or less and CLS is 0.1 or less.
takeaways: ["Good means LCP of 2.5 s or less, INP of 200 ms or less and CLS of 0.1 or less.", "Google judges the 75th percentile of real visits, separately for mobile and desktop.", "INP replaced First Input Delay as a Core Web Vital in March 2024.", "Core Web Vitals are a ranking signal, but relevance and content quality matter more.", "Check the hero image and third-party scripts first; they are frequent culprits."]
related: ["technical-seo-audit-checklist", "nextjs-vs-wordpress", "website-redesign-without-losing-seo"]
services: ["web-development", "seo-services"]
---

Core Web Vitals are three measurements Google uses to judge how a page feels to real visitors: Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness and Cumulative Layout Shift (CLS) for visual stability. A page passes when LCP is 2.5 seconds or less, INP is 200 milliseconds or less and CLS is 0.1 or less, measured at the 75th percentile of real page loads.

That last part matters. Google is not grading one test on your office Wi-Fi; it is grading what most of your actual visitors experienced on their own phones and connections over the past four weeks.

## What are the three Core Web Vitals?

Each metric answers one question a visitor would ask. Google publishes the thresholds on [web.dev](https://web.dev/articles/vitals).

| Metric | The visitor's question | Good | Needs improvement | Poor |
| --- | --- | --- | --- | --- |
| Largest Contentful Paint (LCP) | Has the main content loaded? | 2.5 s or less | Over 2.5 s up to 4 s | Over 4 s |
| Interaction to Next Paint (INP) | Does the page react when I tap? | 200 ms or less | Over 200 ms up to 500 ms | Over 500 ms |
| Cumulative Layout Shift (CLS) | Does the page stay still? | 0.1 or less | Over 0.1 up to 0.25 | Over 0.25 |

### Largest Contentful Paint

LCP is the time until the largest image or text block in the viewport is rendered. On most business sites that is the hero image, a product photo or the main headline. A slow LCP feels like a blank or half-built page.

### Interaction to Next Paint

INP measures how long the page takes to show a visual response after a click, tap or key press, across the whole visit, and reports one of the slowest. It replaced First Input Delay (FID) as a Core Web Vital in March 2024, because FID only measured the delay before the first interaction was handled, and most sites passed it easily.

### Cumulative Layout Shift

CLS scores how much visible content jumps around unexpectedly while the page is open. The classic example: you go to tap a button, an ad or cookie banner loads above it, and you tap something else. Shifts that happen right after the visitor's own tap or click are not counted.

## What does "at the 75th percentile" mean?

It means at least three out of four page visits must meet the threshold for the page to pass that metric. Google assesses mobile and desktop separately, so a site can pass on desktop and fail on mobile, which is common.

The data comes from the Chrome User Experience Report (CrUX): anonymized measurements from real Chrome users, aggregated over a rolling 28-day window. Low-traffic pages often have no CrUX data of their own, in which case Google may group them with similar pages or you will see "not enough data".

## Do Core Web Vitals affect SEO?

Yes, but modestly. Core Web Vitals are part of the page experience signals Google's ranking systems use, and Google's [Search documentation](https://developers.google.com/search/docs) is clear that relevance and helpful content come first. A fast page with thin content will not outrank a slower page that answers the question far better.

Treat Core Web Vitals SEO gains as a tie-breaker between similar pages, not a shortcut to page one. The stronger business case is what visitors do: a page that loads and responds quickly is easier to read, browse and buy from, especially on mid-range phones and mobile data.

## How do you check your Core Web Vitals?

Use field data to find out whether you pass, and lab data to find out why. The two often disagree, and that is expected.

- **PageSpeed Insights** shows both: CrUX field data at the top, and a Lighthouse lab test below.
- **Google Search Console**, under Core Web Vitals, groups your URLs into good, needs improvement and poor, for mobile and desktop.
- **Chrome DevTools** shows live LCP, INP and CLS in the Performance panel as you use the page.
- **Lighthouse** runs a lab test. It cannot measure INP because there is no real user interacting, so it reports Total Blocking Time as a proxy.
- **Real-user monitoring**, using Google's open-source `web-vitals` JavaScript library or a monitoring tool, gives you field data for pages CrUX does not cover.

## How to improve LCP

Most LCP problems come from the hero image, a slow server or files that block rendering.

- Find the LCP element on mobile first; it is often different from desktop.
- Serve the hero image at the right size in a modern format such as AVIF or WebP.
- Never lazy-load the LCP image, and give it `fetchpriority="high"`.
- Cut server response time with page caching and a CDN; slow hosting shows up as a long Time to First Byte.
- Remove or defer CSS and JavaScript that block the first render.
- Replace hero carousels with a single image; sliders often delay the largest paint.

## How to improve INP

INP failures are usually too much JavaScript competing for the browser's main thread when the visitor taps.

- List every third-party script: chat widgets, heatmaps, A/B testing tools, tag manager containers, social embeds. Remove what nobody uses and delay the rest until after load.
- Break long tasks, anything over 50 ms on the main thread, into smaller pieces so the browser can respond between them.
- Show immediate visual feedback on tap, such as a pressed state or spinner, before running heavy work.
- In React and Next.js sites, reduce the amount of JavaScript sent to the browser and the cost of hydration.
- Keep the page's DOM a reasonable size; very large menus and filter panels slow every interaction.

## How to improve CLS

CLS is usually the cheapest metric to fix, because the causes are visible once you know where to look.

- Give every image and video `width` and `height` attributes, or a CSS `aspect-ratio`.
- Reserve space for ads, embeds and cookie banners before they load.
- Load web fonts with fallback metrics that match (`size-adjust` in `@font-face`) so text does not reflow when the font arrives.
- Never insert banners or notices above content that is already visible.
- Animate with `transform` and `opacity`, not properties that change layout.

## What should you ask your developer first?

These questions separate a real performance plan from a one-off score chase:

1. What is our LCP element on mobile, and how long does it take to load for real visitors?
2. Which third-party scripts load on every page, who asked for each one, and what does each cost in INP?
3. Are we collecting field data for our key templates, or only running lab tests?
4. What is our performance budget for page weight and JavaScript, and what happens when a new feature breaks it?
5. After a fix, how will we confirm it in the 28-day field data, not only in Lighthouse?

If a fix means removing a marketing script that someone likes, that is a business decision, and the trade-off should be put to whoever owns the budget.

## How Meritbyte handles Core Web Vitals

Meritbyte Technologies is a Nepal-based web and software development company, and on our builds we check Core Web Vitals on the staging URL before launch rather than after complaints. Targets go into the scope, so "fast" has a number attached. On existing sites, we start by reading the field data, then fix the templates that carry the most traffic.

For platform choices that make performance easier, see [Next.js vs WordPress](/blog/nextjs-vs-wordpress). Our [web development services](/services/web-development) cover the build side, [technical SEO](/services/seo-services) covers the search side, and a full [technical SEO audit checklist](/blog/technical-seo-audit-checklist) puts Core Web Vitals in context. We also work remotely with [businesses in the UK](/website-developer/uk), where the same thresholds apply.

## Frequently asked questions

### What is a good Core Web Vitals score?

A page passes when, at the 75th percentile of real visits, Largest Contentful Paint is 2.5 seconds or less, Interaction to Next Paint is 200 milliseconds or less and Cumulative Layout Shift is 0.1 or less. There is no single combined score. The Lighthouse performance score out of 100 is a separate lab measure and is not the same as passing Core Web Vitals.

### Why does PageSpeed Insights show different results from Search Console?

PageSpeed Insights tests one URL and shows its field data plus a fresh lab test. Search Console groups many similar URLs together and reports on the group using 28 days of field data. Lab results also vary with device simulation and network conditions. Use field data to decide whether you pass, and lab tests to diagnose why a page is slow.

### What happened to First Input Delay (FID)?

Interaction to Next Paint (INP) replaced First Input Delay as a Core Web Vital in March 2024. FID only measured the delay before the browser started handling the first interaction on a page, so most sites passed it. INP looks at the full response time of interactions throughout a visit, which reflects how sluggish a page actually feels.

### How long after a fix do Core Web Vitals improve in Google's data?

Field data in the Chrome User Experience Report covers a rolling 28-day window, so a fix shows up gradually and is fully reflected after about four weeks. In Search Console, clicking "Validate fix" starts a monitoring period of roughly the same length. Lab tools such as Lighthouse show the change immediately, which is useful for confirming the fix works.

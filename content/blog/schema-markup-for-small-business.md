---
title: Schema Markup for Small Business Websites: What to Add First
seoTitle: Schema Markup for Small Business: What to Add First
description: Schema markup for small business websites in priority order: LocalBusiness, Organization, WebSite, breadcrumbs and products, with JSON-LD tips and tests.
date: 2026-09-27
category: seo-and-marketing
order: 38
keywords: ["schema markup for small business", "local business schema", "structured data seo", "json-ld examples"]
summary: Schema markup for a small business should start with LocalBusiness, or Organization if customers never visit you, on the home or contact page, then WebSite for the site name and BreadcrumbList across the site, all in JSON-LD. Add Article for blog posts, Product for items sold online and Event for events. Every value must match what visitors can see.
takeaways: ["Start with LocalBusiness or Organization, then WebSite and BreadcrumbList; add Article, Product or Event only where they fit.", "Use JSON-LD, the format Google recommends, and generate it from the same data the page displays.", "Structured data makes pages eligible for rich results and clarifies facts; it is not a general ranking boost.", "FAQ, HowTo, sitelinks search box and self-serving review stars no longer produce visible results for most businesses.", "Test with the Rich Results Test and Schema Markup Validator, then watch Search Console's enhancement reports."]
related: ["local-seo-google-business-profile", "answer-engine-optimization-aeo", "technical-seo-audit-checklist"]
services: ["seo-services", "web-development", "wordpress-development"]
---

Most small businesses need only four or five types of schema markup, and the first is LocalBusiness, or Organization if you have no premises customers visit or call. Add it in JSON-LD on the home or contact page, then WebSite and BreadcrumbList, then Article, Product or Event depending on what the site publishes. Several types that were popular a few years ago no longer produce anything visible in Google, so there is no need to chase them.

## What is schema markup, and what does it actually do?

Schema markup, also called structured data, is code that describes a page's content using a shared vocabulary, schema.org, which Google, Bing and other systems understand. Google recommends the JSON-LD format: a script block in the page that sits separately from the visible HTML, so it is easy to add and maintain.

It does three useful things:

- **Makes pages eligible for rich results**, such as product prices and review stars on product pages, event dates and breadcrumb paths.
- **States facts unambiguously**: your business name, address, phone number, opening hours, logo and official profiles.
- **Connects entities**, telling search engines that the business on the contact page, the publisher of the blog and the brand on Facebook are the same organization.

It is not a ranking shortcut. Google has said structured data is not a general ranking boost; it helps Google understand and display pages, and eligibility for a rich result never guarantees one.

## Which schema markup for small business sites comes first?

Work down this list and stop where it no longer applies to your site.

| Priority | Schema type | Where it goes | What it does |
| --- | --- | --- | --- |
| 1 | LocalBusiness (most specific subtype) or Organization | Home page or contact page | Name, address, phone, hours, logo, official profiles |
| 2 | WebSite | Home page | Helps Google show your preferred site name in results |
| 3 | BreadcrumbList | Every page below the home page | Describes where the page sits; can replace the raw URL path in desktop results |
| 4 | Article or BlogPosting | Guides, news and blog posts | Headline, author, publish and update dates |
| 5 | Product with Offer | Product pages in an online store | Price, availability, shipping and returns, product review stars |
| 6 | Event | Pages for classes, tours, performances or open days | Dates, location and ticket details |
| 7 | FAQPage | Pages with a genuine, visible FAQ section | Describes the questions and answers; no rich result for most sites |

Service pages have no dedicated Google rich result. A `Service` type is valid schema.org and harmless, but it is not a priority.

## What goes into local business schema?

Use the most specific subtype schema.org offers for your trade, such as Dentist, Plumber, Restaurant, AutoRepair, LegalService or TravelAgency, rather than the generic LocalBusiness.

| Property | Example value | Notes |
| --- | --- | --- |
| `@type` | Dentist | The most specific subtype that fits |
| `@id` | https://example.com/#business | A stable identifier other markup can refer to |
| `name` | Harbour Family Dental | Exactly as on your signage and Google Business Profile |
| `url` | https://example.com/ | Your canonical home page |
| `telephone` | +64 4 XXX XXXX | International format, the number customers call |
| `address` | A PostalAddress with street, locality, region, postcode and country | Must match your Business Profile exactly |
| `geo` | Latitude and longitude | Google asks for at least five decimal places |
| `openingHoursSpecification` | Days with opening and closing times | Keep it in step with your profile, including holiday changes |
| `image` and `logo` | Full URLs to real images | Photos of the premises, and a logo file |
| `priceRange` | "$$" or "NZ$80 to NZ$250" | Optional; Google asks for under 100 characters |
| `sameAs` | Links to Facebook, LinkedIn, Instagram and review profiles | Only profiles you control |

If you run a service-area business and hide your street address on Google Business Profile, keep the markup consistent: publish the locality, region and country rather than the street, and list the places you serve with `areaServed`.

## JSON-LD example: how should the markup be structured?

A typical home-page script has this shape, from top to bottom:

1. `"@context": "https://schema.org"` declares the vocabulary.
2. A `"@graph"` array holds several connected items in one script.
3. The first item is the business, with `"@type": "Dentist"`, an `"@id"` ending in `#business` and the properties from the table above.
4. The second item is `"@type": "WebSite"`, with the site name, URL and `"publisher": {"@id": "https://example.com/#business"}`, which points back to the business instead of repeating it.
5. Blog posts later add an Article whose `publisher` uses the same `@id`, so every page describes the same entity.

The `@id` pattern is the part most small-business sites miss. It turns a scattering of separate snippets into one consistent description of who you are, which also helps AI assistants that rely on search indexes; our guide to [answer engine optimization](/blog/answer-engine-optimization-aeo) covers that side.

## Where does the markup go on each platform?

- **WordPress**: Yoast SEO and Rank Math both output a connected graph of Organization, WebSite, WebPage, Article and BreadcrumbList once you fill in the business details in their settings. For full LocalBusiness markup, use Yoast's Local SEO add-on or Rank Math's local SEO settings. Check that your theme or page builder is not adding a second, conflicting copy.
- **Shopify**: most themes output Product markup already. Review apps and SEO apps sometimes add another copy, and two conflicting Product blocks confuse more than they help.
- **Custom sites (Next.js and similar)**: generate the JSON-LD on the server from the same CMS fields that render the page, so the markup can never drift away from what visitors see.
- **Google Tag Manager**: Google can read JSON-LD injected by JavaScript, but markup that lives in a tag container is easy to forget and hard to keep in sync. Put it in the page template if you can.

## How do you test schema markup?

1. Run the page through Google's [Rich Results Test](https://search.google.com/test/rich-results) to see which rich results it is eligible for and any errors that block them.
2. Check general schema.org validity with the [Schema Markup Validator](https://validator.schema.org/), which also covers types Google does not use for rich results.
3. After Google recrawls the site, watch the enhancement reports in Search Console, which show errors and warnings across all pages of each type.
4. Compare the markup with the page itself. Marking up content visitors cannot see, or reviews that do not exist, breaks Google's structured data guidelines and can lead to a manual action.

## Which schema is no longer worth the effort?

- **HowTo**: Google stopped showing HowTo rich results in 2023.
- **FAQPage**: since August 2023, FAQ rich results appear only for well-known, authoritative government and health websites. Keep the markup if the FAQ is genuinely on the page; do not add FAQs just to get it.
- **Sitelinks search box**: the WebSite search action markup stopped producing a search box in results in November 2024.
- **Review stars for your own business**: since 2019, Google does not show "self-serving" review stars for LocalBusiness and Organization markup about the site's own business, even when the reviews are genuine.
- **Retired rich result types**: in 2025 Google announced it was phasing out several more of its less-used rich result types, so check Google's current search gallery in its [Search documentation](https://developers.google.com/search/docs) before investing in anything unusual.

## How Meritbyte Technologies adds structured data

Meritbyte Technologies is a Nepal-based web and software development company. On sites we build through our [web development](/services/web-development) and [WordPress development](/services/wordpress-development) services, structured data is generated from the same content editors maintain, tested before launch and rechecked after Google recrawls.

On existing sites, adding and fixing schema is part of our [SEO services](/services/seo-services), usually alongside a Google Business Profile review, because the two should describe the business identically; our guide to [local SEO and Google Business Profile](/blog/local-seo-google-business-profile) explains why. We work with businesses in Nepal and remotely with clients in markets such as [New Zealand](/website-developer/new-zealand).

## Frequently asked questions

### Does schema markup improve rankings?

Not directly. Google has said structured data is not a general ranking boost. It makes pages eligible for rich results, which can make a listing more visible and useful, and it helps search engines understand who you are and what a page contains. Those effects can improve clicks and accuracy, but markup will not lift a weak page.

### Is JSON-LD better than Microdata?

For most sites, yes. Google supports JSON-LD, Microdata and RDFa, but recommends JSON-LD because it sits in one script block instead of being woven through the HTML. That makes it easier to add, review and keep in step with page changes, especially when it is generated automatically from your CMS or templates.

### Can I add review stars to my own business in search results?

Not through markup on your own site. Since 2019, Google does not show review stars for LocalBusiness or Organization markup describing the site's own business. Product pages in an online store can still show product review stars, and your Google Business Profile shows your Google reviews. Focus on collecting genuine reviews there.

### Do I need a developer to add schema markup?

Not always. WordPress plugins such as Yoast SEO and Rank Math handle the basics once you enter your business details, and Shopify themes usually include Product markup. You need a developer for custom sites, for connecting entities with `@id`, for removing duplicate markup from plugins and themes, and for generating markup from CMS data.

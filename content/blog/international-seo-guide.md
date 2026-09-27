---
title: International SEO: Ranking in the US, UK, Australia and Canada From One Website
seoTitle: International SEO: Rank in the US, UK, Australia and Canada
description: International SEO for English-speaking markets: hreflang, ccTLD vs subfolder vs subdomain, and the currency, spelling and tax details each version needs.
date: 2026-09-27
category: seo-and-marketing
order: 39
keywords: ["international seo", "hreflang guide", "multi country seo", "ccTLD vs subfolder"]
summary: International SEO for the US, UK, Australia and Canada usually works best from one domain with a subfolder per country, such as /en-gb/ and /en-au/, connected with hreflang annotations. Each version needs real localization: currency, tax display, spelling, vocabulary, phone numbers and legal pages. If nothing differs between countries, one global English site is often enough.
takeaways: ["Create country versions only when something real differs: price, tax, availability, law or vocabulary.", "Subfolders on one domain are the cheapest structure that works for most businesses; ccTLDs are stronger locally but cost more to build up.", "hreflang must be reciprocal, self-referencing and use valid codes such as en-gb, never en-uk.", "Localize currency, tax display, spelling, units, dates and legal pages, not just the flag.", "Do not auto-redirect by IP address; Googlebot crawls mainly from the US and would miss other versions."]
related: ["technical-seo-audit-checklist", "nepali-english-bilingual-website", "local-seo-google-business-profile"]
services: ["seo-services", "web-development"]
---

International SEO for English-speaking markets comes down to three decisions: whether each country needs its own version at all, how those versions are structured (country domains, subfolders or subdomains), and how you tell search engines which version belongs to which audience, which is the job of hreflang. For most businesses selling into the US, UK, Australia and Canada, one .com with a subfolder per country, correct hreflang and genuinely localized content is the cheapest multi-country SEO setup that works.

## Do you need separate country versions at all?

Often not. If you sell the same service at the same price in US dollars everywhere, as many software and consulting businesses do, one global English site can rank in all four countries on the strength of its content and links.

Create country versions when something material differs:

- Prices, currency or the way tax is shown
- Products or services available in one country but not another
- Shipping, delivery times or returns
- Regulation, licensing or legal wording
- Contact numbers, office hours or support arrangements
- The words customers search with, such as "attorney" versus "solicitor"

Each version is a commitment. Every page multiplied by every country has to be written, reviewed and kept up to date. Three well-maintained versions beat eight neglected ones.

## ccTLD vs subfolder vs subdomain: which structure should you use?

Subfolders suit most businesses; country-code domains suit those with a real local operation and the budget to build each domain separately.

| Structure | Example | Strengths | Weaknesses |
| --- | --- | --- | --- |
| Country-code domains (ccTLDs) | example.co.uk, example.com.au, example.ca | The clearest local signal; familiar to local buyers | Each domain builds authority separately; registration rules (.com.au needs an Australian presence, .ca follows Canadian presence requirements, .us needs a US connection); more hosting and admin |
| Subfolders on one domain | example.com/en-gb/ | Shares the domain's authority; one site to host and secure; easiest to maintain | Weaker local signal than a ccTLD; depends on hreflang and local content |
| Subdomains | uk.example.com | Can be hosted or managed separately | No stronger country signal than a subfolder; more setup in analytics and Search Console |
| URL parameters | example.com/?country=uk | None worth having | Google recommends against them for country versions |

Search Console's International Targeting report, including its country targeting setting, was retired in 2022. A subfolder on a .com can no longer be pinned to a country there, so hreflang and local signals do that work. Generic-looking country domains such as .io and .co are treated by Google as generic, not as signals for the British Indian Ocean Territory or Colombia.

## How does hreflang work?

hreflang tells Google which URL to show to people in which language and region. It does not raise rankings; it swaps in the right version where a page already ranks. A typical annotation in the page head looks like `<link rel="alternate" hreflang="en-gb" href="https://example.com/en-gb/pricing/">`.

The rules that most implementations get wrong:

1. **Valid codes only.** The language is an ISO 639-1 code (`en`, `fr`) and the optional region an ISO 3166-1 alpha-2 code (`us`, `gb`, `au`, `ca`). The UK is `gb`, so `en-uk` is invalid and ignored. A region alone, such as `gb`, is not valid either.
2. **Every version lists every version, including itself.** A page for the UK lists the US, Australian, Canadian and UK URLs.
3. **Return links are required.** If the US page points to the UK page, the UK page must point back, or Google may ignore the pair.
4. **Add `x-default`** for visitors who match none of your versions, usually a global page or a country selector.
5. **Point only at canonical, indexable URLs** that return 200. Each country version's canonical tag points to itself, never to the US version.
6. **Pick one method**: tags in the HTML head, HTTP headers (useful for PDFs) or the XML sitemap. On larger sites, sitemaps are easiest to generate and audit.

Search Console no longer reports hreflang errors, so check them with a crawler such as Screaming Frog or Sitebulb; our [technical SEO audit checklist](/blog/technical-seo-audit-checklist) covers the rest of the crawl. Bing has historically pointed site owners to the `content-language` meta tag and the HTML `lang` attribute as language signals; both cost nothing to add alongside hreflang.

## What differs between the US, UK, Australia and Canada?

| Market | hreflang | Currency | Spelling | How consumer prices are shown |
| --- | --- | --- | --- | --- |
| United States | en-us | USD | American: color, optimize, center | Usually before sales tax, which varies by state |
| United Kingdom | en-gb | GBP | British: colour, optimise, centre | Including VAT |
| Australia | en-au | AUD | Australian, close to British: colour, optimise | Including GST |
| Canada | en-ca | CAD | Canadian: colour and centre, but often -ize | Usually before GST, HST or provincial sales tax |
| Quebec | fr-ca | CAD | French | Usually before tax |
| Everyone else | x-default | Your default | Your default | Your default |

Quebec deserves its own note: its Charter of the French Language generally requires French for commercial content aimed at Quebec customers, so a Canadian version in English only is incomplete for that province.

## What does localization mean beyond hreflang?

A country version that only swaps the currency symbol is a duplicate with a flag on it, and Google may treat it as one. Real localization covers:

- **Keyword research per market.** Search terms differ: holiday and vacation, flat and apartment, postcode and zip code, mobile and cell phone, solicitor and attorney. Do not assume the US keyword list works in the UK.
- **Spelling and vocabulary** consistent with the market throughout, including navigation, buttons and forms.
- **Dates and units.** The US writes 03/04/2026 for March 4; the UK and Australia read it as 3 April. Write dates out in full. Use imperial units for the US and metric elsewhere.
- **Phone numbers and addresses** in local formats, with a local number if you have one.
- **Legal pages for each market**: US state privacy laws such as California's CCPA and CPRA, UK GDPR and PECR cookie rules, Australia's Privacy Act 1988, and PIPEDA and Quebec's Law 25 in Canada.
- **Payment options.** Cards and PayPal travel well, but buy-now-pay-later brands differ, such as Afterpay in Australia and Clearpay in the UK.
- **Proof that means something locally**: reviews from customers in that country, accreditations local buyers recognize and delivery times stated in their terms.

## Should you redirect visitors by country?

No, not automatically. Googlebot crawls mainly from US IP addresses, so redirecting by location can stop Google from ever seeing your UK or Australian pages. It also frustrates travelers and expatriates who want a different version. Google's guidance recommends against automatic redirects based on perceived language or location.

Instead, show a dismissible banner ("Looks like you are in Australia. View prices in AUD?") and remember the visitor's choice. Every version stays reachable by a normal link.

## How do you build visibility in each country?

- **Local links and mentions** pointing at the matching country folder: industry associations, local press, partners and directories in that market.
- **Google Business Profile only where you have a real address or genuinely serve customers in person.** A profile in a country where you have no presence breaks Google's rules; our guide to [local SEO and Google Business Profile](/blog/local-seo-google-business-profile) explains eligibility.
- **A Search Console property for each subfolder** (a URL-prefix property such as example.com/en-au/) so each market's performance can be reported on its own.
- **Country-level reporting in GA4**, comparing organic sessions and conversions by country against each version's goals.

## International SEO mistakes to avoid

- Canonical tags on the UK and Australian pages pointing to the US page, which tells Google to drop them.
- hreflang pointing to redirected, noindexed or 404 URLs.
- Machine-translated or lightly edited copies of the same pages.
- Geo-IP firewall rules that block crawlers from some country folders.
- Launching country versions and then leaving them to go stale while the home market gets every update.

## How Meritbyte Technologies approaches international SEO

Meritbyte Technologies is a Nepal-based web and software development company. We have no offices abroad; we work remotely with clients in the [USA](/website-developer/usa), the [UK](/website-developer/uk), [Australia](/website-developer/australia) and [Canada](/website-developer/canada), and each of those pages sets out the local laws, payments and time-zone overlap involved.

International work combines our [SEO services](/services/seo-services) and [web development](/services/web-development): choosing the structure, generating hreflang from the CMS so it cannot drift, and localizing content with writers who know each market's vocabulary. Domains and Search Console properties stay in your name, and progress is reported by country next to leads and revenue.

## Frequently asked questions

### Does hreflang improve rankings?

No. hreflang does not make a page rank higher; it tells Google which equivalent page to show to people in each language or region. Its value is showing the UK page to UK searchers, with pounds and British spelling, instead of the US page. The rankings themselves still come from content, links and relevance.

### Is a .com enough to rank in the UK and Australia?

Yes, many .com sites rank well in both. A .com with country subfolders, correct hreflang, localized content and some local links can compete in each market. Country-code domains such as .co.uk and .com.au send a clearer local signal, but each has to build its own authority, so they suit businesses with a genuine local operation.

### Can I use the same English content for the US and UK?

You can, and with hreflang Google will show the right URL, but near-identical pages may be grouped as duplicates, and they miss what differs: spelling, vocabulary, currency, tax display and legal details. If only prices differ, localize those and keep the rest shared. If buyers search differently, localize the content too.

### Should I use a subdomain or subfolder for another country?

For most businesses, a subfolder. It shares the main domain's authority, keeps hosting and security in one place and is simpler to maintain. A subdomain gives no stronger country signal and adds setup work. Choose a country-code domain instead of either if you have a real local business there and can support a separate site.

---
title: Generative Engine Optimization (GEO): Getting Your Brand Into ChatGPT, Gemini and Perplexity
seoTitle: Generative Engine Optimization (GEO): What Works in 2026
description: Generative engine optimization in practice: how ChatGPT, Gemini and Perplexity pick sources, AI crawler access, llms.txt, entity consistency and measurement.
date: 2026-09-27
category: seo-and-marketing
order: 35
keywords: ["generative engine optimization", "what is geo seo", "rank in chatgpt", "llms.txt"]
summary: Generative engine optimization (GEO) is the work of making AI assistants such as ChatGPT, Gemini, Perplexity and Copilot mention and cite your business accurately. It rests on letting AI search crawlers read your site, describing the business identically everywhere, earning coverage on reputable third-party sites and measuring AI referrals. No provider publishes ranking factors, so distrust anyone who promises placements.
takeaways: ["AI assistants answer from training data and from live web searches; practical GEO mostly targets the live-search route.", "Check robots.txt and your CDN so AI search crawlers such as OAI-SearchBot, PerplexityBot and Claude-SearchBot can reach you, and decide separately about training crawlers.", "llms.txt is a proposed convention, not a confirmed signal; add one if it is cheap, but do not expect it to change answers.", "Consistent name, address, phone and sameAs profiles, plus genuine third-party coverage, shape what assistants say.", "Track AI referrals with a GA4 channel group, a fixed monthly prompt list and a 'how did you hear about us' option."]
related: ["answer-engine-optimization-aeo", "schema-markup-for-small-business", "content-marketing-for-it-companies"]
services: ["seo-services", "digital-marketing"]
---

Generative engine optimization (GEO) means improving how often, and how accurately, AI assistants such as ChatGPT, Gemini, Perplexity, Copilot and Claude mention your business when people ask them for recommendations or facts. You cannot buy or submit your way into those answers. What works is unglamorous: let AI search crawlers read your site, describe your business the same way everywhere, earn mentions on sources those systems draw on, and measure what arrives.

Where [answer engine optimization](/blog/answer-engine-optimization-aeo) is about how a single page is written so an answer can be lifted from it, GEO is about the business as an entity: what the models already know about you, and which sources they can find when asked.

## What is GEO in SEO terms?

The name comes from a 2023 academic paper, "GEO: Generative Engine Optimization", which tested how content changes affected visibility in AI-generated answers on a research benchmark. It is a useful starting point, not a list of confirmed ranking factors for any commercial assistant.

In practice, GEO is ordinary SEO, digital PR and reputation management, measured against a new kind of result: a paragraph written by a model, with or without a link to you. People often ask how to rank in ChatGPT; there is no fixed ranking to climb, only a set of sources the assistant finds and trusts enough to use.

## How do AI assistants decide what to say about a business?

They draw on two sources, and only one of them responds quickly to your work.

1. **Training data.** Everything a model learned before its knowledge cutoff, from public web pages and other data. It changes only when a new model is trained, and you influence it only by being described widely and consistently on the public web over time.
2. **Live retrieval.** When an assistant searches the web while answering, it runs one or more searches, reads a handful of pages and writes an answer with citations. ChatGPT search, Perplexity, Gemini, Copilot and Claude's web search all work this way. This route responds within weeks, and it is where most practical GEO effort pays off.

Retrieval makes classic search visibility matter more, not less. Gemini and Google's AI Overviews draw on Google's index; Copilot draws on Bing's. Many businesses have never verified their site in Bing Webmaster Tools. Doing so, and submitting a sitemap there, is a small job with a direct line to one assistant.

## Can AI crawlers read your site?

Check before anything else. An assistant cannot cite a page its crawler was blocked from reading, and many sites block AI crawlers without anyone deciding to.

| Company | Robots.txt user agent | What it is for |
| --- | --- | --- |
| OpenAI | GPTBot | Collecting content that may be used to train models |
| OpenAI | OAI-SearchBot | Finding pages to show and cite in ChatGPT search |
| OpenAI | ChatGPT-User | Fetching a page when a ChatGPT user's request needs it |
| Anthropic | ClaudeBot | Collecting content that may be used to train models |
| Anthropic | Claude-SearchBot, Claude-User | Search results in Claude, and fetches on a user's request |
| Perplexity | PerplexityBot | Indexing pages for Perplexity's answers |
| Perplexity | Perplexity-User | Fetching a page during a user's session |
| Google | Google-Extended | Not a separate crawler: a token that controls use of content for Gemini training and grounding. It does not affect Google Search or AI Overviews |
| Apple | Applebot-Extended | A token controlling use of content for training Apple's models; Applebot still crawls for Siri and Spotlight |
| Common Crawl | CCBot | A public web archive that many AI developers have used for training |

The useful distinction is **training versus search**. Blocking training crawlers such as GPTBot, ClaudeBot or CCBot while allowing search crawlers such as OAI-SearchBot, Claude-SearchBot and PerplexityBot is a legitimate, common choice. A business that wants to be recommended should at least allow the search crawlers.

Robots.txt is only one gate. Content delivery networks and security plugins can block AI bots at the firewall; Cloudflare, for example, offers a setting to block AI crawlers and in 2025 began blocking them by default on newly added sites. Check your CDN's bot settings and your server logs for these user agents and the status codes they receive.

Rendering matters too. Several AI crawlers have been observed fetching raw HTML without running JavaScript, so content that appears only after client-side rendering may be invisible to them. Server-render or statically generate the pages you want cited.

## What is llms.txt, and should you add one?

llms.txt is a proposed convention, published in September 2024 by Jeremy Howard of Answer.AI: a Markdown file at `/llms.txt` that summarizes what a site is and links to its most useful pages, sometimes with a fuller companion file, `/llms-full.txt`.

It is not a standard that search engines have adopted. No major AI search provider has confirmed that it uses llms.txt when deciding what to cite, and Google representatives have said publicly that Google Search does not use it. It is most useful on developer documentation, where people and coding tools sometimes point an assistant at the file directly.

Our view: if your platform can generate one in minutes, fine. Do not pay for it as a GEO service, and do not expect it to change answers on its own. Crawler access and good pages matter far more.

## How do you make your business a clear, consistent entity?

Assistants assemble what they say about you from many sources. When those sources disagree, the answer gets vague or wrong.

- **Use one name, address and phone number everywhere**: website footer, Google Business Profile, Bing Places, Apple Business Connect, LinkedIn, Facebook and the directories in your industry.
- **Write one plain description sentence** and reuse it across profiles: "Summit Physio is a sports physiotherapy clinic in Christchurch offering injury assessment, rehabilitation and same-week appointments."
- **Add Organization or LocalBusiness structured data** with `sameAs` links to your official profiles, so the connections are explicit. Our guide to [schema markup for small businesses](/blog/schema-markup-for-small-business) shows which properties to fill in.
- **Keep an About page that states facts**: what you do, where, for whom, who runs the business and how to contact it.
- **Correct stale information**: old addresses, closed branches, previous business names and outdated prices on third-party sites all feed into answers.
- **Treat Wikipedia and Wikidata with care.** Only notable organizations belong there, and Wikipedia requires paid editors to disclose that they are paid. Promotional entries get deleted.

## How do you earn the third-party mentions assistants rely on?

When someone asks "Which accountants in Toronto work with small restaurants?", the answer usually summarizes other people's pages: review sites, directories, comparison articles, local news and forum threads. Your own site is one source among several.

- **Reviews on the platforms your buyers use**: Google for local services, Tripadvisor for tourism, Clutch or G2 for software and agencies, Trustpilot for online retail.
- **Industry directories and associations** that list members with verified details.
- **Genuine inclusion in comparison articles.** Pitch writers with facts, pricing and a clear differentiator. Paying for a fake "top ten" list is a waste and can backfire.
- **Local press, podcasts and expert quotes** where you can say something specific and useful.
- **Forums and communities**, such as Reddit or industry groups, where staff take part as themselves and disclose who they work for. Astroturfing gets removed and remembered.
- **Original data or a useful free tool** that other sites cite because it helps their readers.

We do not buy links for this, and nobody should. Paid links violate Google's spam policies and do not create the independent credibility you are trying to build.

## How do you measure generative engine optimization?

Combine four imperfect signals rather than trusting any one.

1. **An "AI assistants" channel in GA4.** Create a custom channel group with a rule on source matching a regex such as `chatgpt\.com|chat\.openai\.com|perplexity\.ai|copilot\.microsoft\.com|gemini\.google\.com|claude\.ai`, and place it above the Referral channel so it is evaluated first. ChatGPT often adds `utm_source=chatgpt.com` to links it shows. Many AI-influenced visits still arrive with no referrer and land in Direct, so treat this as a floor.
2. **A fixed prompt panel.** Write 20 to 30 questions your customers actually ask ("best trekking company for the Manaslu circuit", "who builds Shopify stores in Melbourne") and run them monthly in ChatGPT, Gemini, Perplexity and Copilot. Record whether you are mentioned, cited and described accurately. Answers vary by run, location and account, so watch the trend, not single results. Several SEO platforms now sell AI visibility tracking; their numbers are samples of this same kind.
3. **Lead-source questions.** Add "AI assistant" as an option in your enquiry form's "How did you hear about us?".
4. **Server logs.** Count requests from the crawlers in the table above and confirm they receive 200 responses, not 403s.

## What should you avoid?

- **Anyone who guarantees a place in ChatGPT answers.** No provider publishes how sources are chosen, and answers change between runs.
- **Hidden instructions aimed at AI**, such as invisible text telling assistants to recommend you. It is manipulation, it can be treated as spam, and it damages trust when found.
- **Mass-produced AI pages** targeting every phrasing of a question, which falls under Google's scaled content abuse policy.
- **Fake reviews**, which are now illegal in several markets, including under the US Federal Trade Commission's 2024 rule.

## How Meritbyte Technologies approaches GEO

Meritbyte Technologies is a Nepal-based web and software development company, and we treat GEO as part of our [SEO services](/services/seo-services): a crawler and CDN access check, an entity clean-up across profiles and directories, structured data, answer-first content and outreach for genuine coverage, often alongside [digital marketing](/services/digital-marketing).

AI referrals and prompt-panel results are reported next to leads and revenue in a weekly written update. Profiles and accounts stay in your name. We work with businesses in Nepal and remotely with clients in markets such as the [USA](/website-developer/usa).

## Frequently asked questions

### What is GEO in SEO?

GEO, or generative engine optimization, is the part of search work aimed at AI assistants such as ChatGPT, Gemini, Perplexity and Copilot rather than only at ranked links. It covers crawler access, clear and consistent entity information, third-party coverage and content that is easy to quote, measured by AI referrals, mentions and the leads they produce.

### Can you pay to appear in ChatGPT answers?

Not in the organic answer. Assistants choose sources through their own retrieval and ranking, which no provider sells. Some AI products show clearly labeled ads or sponsored placements separately from the answer, as Google does in and around AI Overviews, but that is advertising with its own budget, not generative engine optimization.

### Should I block GPTBot?

That is a business decision about training, not about search visibility. GPTBot collects content that may be used to train OpenAI's models; OAI-SearchBot is the crawler behind ChatGPT search results. Many sites block GPTBot and allow OAI-SearchBot. If you want ChatGPT to cite you in search answers, do not block OAI-SearchBot.

### Does llms.txt help with ChatGPT?

There is no public confirmation that it does. llms.txt is a proposed convention from 2024, and no major AI search provider has said it uses the file when choosing sources. It costs little to add, and developer documentation sites may benefit, but it should not be sold or bought as a way to appear in ChatGPT.

### How long does GEO take?

Fixes to crawler access and on-page content can show up in retrieval-based answers within weeks of being recrawled. Changing what a model learned during training takes much longer, because it only updates when new models are released. Third-party coverage builds over months. Judge progress quarterly using referrals, prompt-panel trends and leads.

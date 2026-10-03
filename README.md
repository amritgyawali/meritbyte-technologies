# Meritbyte Technologies

Marketing site for Meritbyte Technologies. Next.js App Router, no UI framework,
plain CSS.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to .next
```

## Layout

The app has two route groups, each with its own root layout and stylesheet, so
the two designs never share CSS:

- `app/(home)/` — the home page (`/`). `page.jsx` reads the markup from
  `Meritbyte Homepage.dc.html` at build time and fills in the parts marked
  with HTML comments from `home-sections.mjs`: the navigation
  (`<!-- nav:start -->`, `<!-- menu:start -->`), the "where we work" section
  (`<!-- home:reach -->`) and the FAQ (`<!-- home:faq -->`, also the page's
  FAQPage schema). `home-page-client.jsx` handles the theme toggle, scroll
  reveal and loads the WebGL scene from `public/nexus.js`. Styles in
  `app/(home)/globals.css`.
- `app/(site)/` — every other page: services, technologies, locations,
  industries, blog, about, pricing, process, FAQ, contact, careers, privacy,
  `/hire-developers`, `/glossary`, `/resources`, `/sitemap` (the HTML site
  map), `/free-website` (and its confirm page), `/subscribe` and
  `/unsubscribe`. The layout adds the header, footer and site-wide structured
  data. Styles in `app/(site)/globals.css`; `theme-toggle.jsx` is the toggle
  for these pages.
- `lib/navigation.mjs` — the primary navigation, used by both the site
  header and the home page. Every top-level item is a real page; on wide
  screens with a mouse, hovering shows a dropdown of its child pages. Add a
  page to the menu here.
- `app/subscribe-popup.jsx` — the subscribe popup, mounted by both layouts.
  Its home-page styles are in `app/(home)/subscribe.css`, scoped to
  `.subscribe`.

Both groups store the theme under the same `meritbyte-theme` key.

## Free website sign-up (`/free-website`)

A double opt-in form for small businesses asking for a free website design.

1. The form posts to `app/api/signup/route.js`, which emails a confirmation
   link through Resend. Nothing is stored yet: the form data rides inside a
   signed token (`lib/signup.js`), valid for 7 days.
2. The link opens `/free-website/confirm`, which shows a **Confirm** button.
   Confirmation is a POST so mail scanners that pre-open links cannot confirm
   on someone's behalf.
3. On confirm, `app/api/signup/confirm/route.js` adds the contact to a Brevo
   list with the consent record as attributes (text agreed to, version, submit
   and confirm time and IP) and emails the owner the same record.

Environment variables are listed in `.env.example`. Run
`BREVO_API_KEY=... node scripts/brevo-setup.mjs` once to create the Brevo list
and attributes; it prints the `BREVO_LIST_ID` to set.

## Content pages and the blog

Services, location pages, industry pages and blog posts are Markdown files in
`content/`, turned into static pages at build time:

| Folder | URL |
| --- | --- |
| `content/services/` | `/services/<slug>` |
| `content/locations/` | `/website-developer/<slug>` (countries and cities) |
| `content/industries/` | `/industries/<slug>` |
| `content/technologies/` | `/technologies/<slug>` |
| `content/blog/` | `/blog/<slug>`, grouped under `/blog/category/<category>` |

Glossary terms live in `lib/glossary.mjs`; they render on `/glossary` as
DefinedTerm structured data and are included in `/llms-full.txt`.

`content/README.md` is the writing guide (facts we may state, voice, the
front matter format and the SEO/AEO/GEO rules). `scripts/content-plan.mjs` is
the keyword map: which search each page targets. To add a post, write the
file, then run `npm run check:content`.

Business facts (address, phone, social profiles for `sameAs`) live in
`lib/site.mjs`; adding profiles there strengthens the Organization schema.

## SEO, AEO and GEO

- Every page gets a unique title, description, canonical URL, Open Graph and
  Twitter card through `pageMetadata()` in `lib/seo.mjs`.
- Structured data (JSON-LD): Organization (with an OfferCatalog of every
  service) and WebSite on every page including the home page, plus Service,
  BlogPosting, FAQPage, BreadcrumbList, CollectionPage, HowTo, ContactPage,
  AboutPage and DefinedTermSet where they apply, all linked to one
  Organization node. Technology pages tie each technology to its official
  site and Wikipedia entry (`sameAs`) so engines know which "React" we mean.
- Content pages open with a short, quotable answer and end with FAQs, which
  answer engines and AI assistants lift directly.
- `/sitemap.xml`, `/robots.txt` (search and AI crawlers allowed),
  `/llms.txt` and `/llms-full.txt` (site summary and full text for AI
  assistants) and `/feed.xml` (RSS) are generated from the same content.
- `npm run build && npm start`, then `npm run audit` crawls the sitemap and
  checks titles, descriptions, canonicals, one H1 per page, JSON-LD and
  internal links, on every page including the home page.
- IndexNow: after each deploy, `npm run indexnow` tells Bing, Yandex and the
  other IndexNow engines that every page changed (or pass paths:
  `npm run indexnow -- /blog/new-post`). Bing's index also feeds Copilot and
  ChatGPT search. The key file is `public/<key>.txt`; the key is in
  `scripts/indexnow.mjs`.

After deploying: verify the domain in Google Search Console and Bing
Webmaster Tools (set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`),
submit `https://meritbyte.com/sitemap.xml`, run `npm run indexnow`, and
create a Google Business Profile with the same name, phone and website as
`lib/site.mjs`.

What moves rankings and AI citations most from here is off-site, and no code
change can do it: real profiles on LinkedIn, Clutch, GoodFirms, GitHub and
similar (add each URL to `sameAs` in `lib/site.mjs`), genuine client reviews
on the Google Business Profile, and other sites linking to or mentioning
Meritbyte Technologies by name. Assistants such as ChatGPT, Claude, Gemini
and Perplexity describe a company mostly from what other sources say about
it.

## Contact form (`/contact`)

Posts to `app/api/contact/route.js`, which emails the enquiry to
`OWNER_EMAIL` through Resend with the visitor as Reply-To. Nothing is stored.

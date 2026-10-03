// Glossary terms: short, self-contained definitions of the words used across
// the site. Rendered on /glossary as DefinedTerm structured data and included
// in /llms-full.txt. Each definition must stand on its own when quoted, and
// `href` points at the page that goes deeper.

export const GLOSSARY = [
  {
    term: "301 redirect",
    definition:
      "A 301 redirect is a permanent redirect from one URL to another. It tells browsers and search engines that a page has moved for good, so visitors land on the new address and most of the old page's ranking signals pass to it. Every URL with traffic or links needs one when a site is rebuilt.",
    href: "/blog/website-redesign-without-losing-seo"
  },
  {
    term: "Accessibility (WCAG)",
    definition:
      "Web accessibility means people with disabilities can use a site, including with screen readers, keyboards or magnification. Most laws and contracts point to WCAG, the Web Content Accessibility Guidelines; WCAG 2.2 level AA is the usual target, covering contrast, keyboard use, focus order, labels and error messages.",
    href: "/services/ui-ux-design"
  },
  {
    term: "AI Overviews",
    definition:
      "AI Overviews are AI-generated summaries that Google shows above some search results, with links to the web pages they draw on. Pages that answer a question clearly and early, supported by lists, tables and FAQs, are more likely to be cited in them.",
    href: "/blog/generative-engine-optimization-geo"
  },
  {
    term: "Answer engine optimization (AEO)",
    definition:
      "Answer engine optimization (AEO) is the practice of structuring content so search features and voice assistants can lift a direct answer from it, such as featured snippets, People Also Ask boxes and spoken answers. It relies on question-style headings, short self-contained answers and structured data.",
    href: "/blog/answer-engine-optimization-aeo"
  },
  {
    term: "API",
    definition:
      "An API (application programming interface) is a defined way for one piece of software to request data or actions from another. Websites use APIs to take payments, sync orders to accounting systems, send email and feed mobile apps from the same back end.",
    href: "/technologies/nodejs"
  },
  {
    term: "Backlink",
    definition:
      "A backlink is a link from another website to yours. Search engines treat relevant links from reputable sites as evidence that a page is trustworthy and useful. Bought or manipulative links break Google's spam policies and can get a site demoted.",
    href: "/services/seo-services"
  },
  {
    term: "Business intelligence (BI)",
    definition:
      "Business intelligence (BI) is the practice of bringing a company's data into one place and turning it into dashboards and reports that people use to make decisions. Typical tools include Power BI, Looker Studio and Metabase, fed by pipelines from sales, finance and operations systems.",
    href: "/services/data-analytics"
  },
  {
    term: "Canonical URL",
    definition:
      "A canonical URL is the preferred address of a page when the same content is reachable at several URLs, for example with and without tracking parameters. It is declared with a rel=canonical link tag, telling search engines which version to index and rank.",
    href: "/blog/technical-seo-audit-checklist"
  },
  {
    term: "CDN (content delivery network)",
    definition:
      "A content delivery network (CDN) is a set of servers around the world that keep copies of a site's files close to visitors, so pages load faster wherever people are. CDNs such as Cloudflare and Amazon CloudFront also absorb traffic spikes and some attacks.",
    href: "/services/cloud-devops"
  },
  {
    term: "CI/CD",
    definition:
      "CI/CD stands for continuous integration and continuous delivery (or deployment). Every code change is automatically built and tested, then released through a repeatable pipeline, so releases become small, frequent and reversible instead of large and risky.",
    href: "/services/cloud-devops"
  },
  {
    term: "CMS (content management system)",
    definition:
      "A content management system (CMS) is software that lets people without coding skills create and edit website content through an admin screen. WordPress is the most widely used; others include Sanity, Contentful, Strapi and the built-in editors of hosted platforms such as Shopify.",
    href: "/services/wordpress-development"
  },
  {
    term: "Conversion rate",
    definition:
      "Conversion rate is the share of visitors who complete a goal, such as an enquiry, booking, sign-up or purchase, calculated as conversions divided by visitors. Improving it usually means clearer offers, fewer form fields, faster pages and stronger trust signals.",
    href: "/blog/landing-page-conversion-checklist"
  },
  {
    term: "Core Web Vitals",
    definition:
      "Core Web Vitals are Google's three measures of real-user page experience: Largest Contentful Paint for loading (good at 2.5 seconds or less), Interaction to Next Paint for responsiveness (200 milliseconds or less) and Cumulative Layout Shift for visual stability (0.1 or less), assessed at the 75th percentile of visits.",
    href: "/blog/core-web-vitals-explained"
  },
  {
    term: "Cross-platform app",
    definition:
      "A cross-platform app is a mobile app built from one shared codebase that runs on both iOS and Android. Flutter and React Native are the most common frameworks for it. It usually costs less than building two separate native apps, with small platform-specific parts where needed.",
    href: "/technologies/flutter"
  },
  {
    term: "DevOps",
    definition:
      "DevOps is a way of working in which the people who build software also automate how it is tested, released and run. In practice it means CI/CD pipelines, infrastructure as code, monitoring and alerting, so changes reach production quickly and problems are found early.",
    href: "/services/cloud-devops"
  },
  {
    term: "Domain name",
    definition:
      "A domain name is a website's human-readable address, such as example.com. It is rented, usually yearly, from a registrar and points to the servers that host the site and email. It should be registered in the business's own name, never a developer's.",
    href: "/blog/com-np-domain-registration"
  },
  {
    term: "E-E-A-T",
    definition:
      "E-E-A-T stands for experience, expertise, authoritativeness and trustworthiness, the qualities Google's search quality rater guidelines describe for helpful, reliable content. It is not a single ranking factor, but pages that show first-hand experience, clear authorship and accurate facts tend to do better.",
    href: "/services/seo-services"
  },
  {
    term: "Generative engine optimization (GEO)",
    definition:
      "Generative engine optimization (GEO) is the practice of making a brand and its content more likely to be found, cited and described accurately by AI assistants such as ChatGPT, Claude, Gemini, Perplexity and Copilot. It combines clear, factual pages, consistent business information across the web, structured data and mentions on sources those assistants trust.",
    href: "/blog/generative-engine-optimization-geo"
  },
  {
    term: "Google Business Profile",
    definition:
      "A Google Business Profile is the free listing that shows a business's name, location, hours, reviews and photos in Google Maps and local search results. For businesses serving a local area, a complete and active profile is one of the strongest local SEO factors.",
    href: "/blog/local-seo-google-business-profile"
  },
  {
    term: "Headless CMS",
    definition:
      "A headless CMS stores and manages content but does not control how it is displayed. Content is delivered through an API to a separately built front end, such as a Next.js website or a mobile app, so one source of content can serve several channels.",
    href: "/blog/headless-cms-guide"
  },
  {
    term: "Hreflang",
    definition:
      "Hreflang is an HTML attribute that tells search engines which language and country a page is meant for, and which pages are translations of each other. It helps the right version, such as English for the UK or Nepali for Nepal, appear in each market's results.",
    href: "/blog/international-seo-guide"
  },
  {
    term: "IndexNow",
    definition:
      "IndexNow is an open protocol that lets a website notify participating search engines, including Bing and Yandex, as soon as a page is added, updated or deleted, instead of waiting for them to recrawl it. Faster discovery in Bing also helps assistants that rely on Bing's index.",
    href: "/services/seo-services"
  },
  {
    term: "Infrastructure as code (IaC)",
    definition:
      "Infrastructure as code (IaC) means defining servers, networks, databases and permissions in version-controlled files, using tools such as Terraform or AWS CloudFormation, instead of setting them up by hand. Environments become reproducible, reviewable and quick to rebuild after a failure.",
    href: "/technologies/aws"
  },
  {
    term: "Large language model (LLM)",
    definition:
      "A large language model (LLM) is an AI model trained on large amounts of text to understand and generate language. LLMs power assistants such as ChatGPT, Claude and Gemini. In business software they are used for drafting, summarising, classifying and answering questions over a company's own documents.",
    href: "/services/ai-development"
  },
  {
    term: "llms.txt",
    definition:
      "llms.txt is a proposed standard for a Markdown file at a website's root (/llms.txt) that summarises the site and links its key pages for large language models. Not every AI assistant reads it yet, but it is cheap to publish and gives them a clean, citable overview of the business.",
    href: "/blog/generative-engine-optimization-geo"
  },
  {
    term: "Local SEO",
    definition:
      "Local SEO is the work of making a business appear in searches with local intent, such as 'web developer near me' or 'dentist in Pokhara', and in Google Maps results. It relies on a complete Google Business Profile, consistent name, address and phone details, reviews and location-specific pages.",
    href: "/blog/local-seo-google-business-profile"
  },
  {
    term: "MVP (minimum viable product)",
    definition:
      "A minimum viable product (MVP) is the smallest version of a product that real users can use and that tests the riskiest assumption about it, such as whether people will pay. It is built to learn quickly and cheaply, not as a cut-down copy of the final product.",
    href: "/blog/mvp-development-guide"
  },
  {
    term: "Payment gateway",
    definition:
      "A payment gateway is the service that securely takes a customer's payment on a website or app and passes it to the bank or wallet provider. Examples include Stripe and PayPal internationally, and eSewa, Khalti and Fonepay in Nepal.",
    href: "/blog/esewa-khalti-fonepay-integration"
  },
  {
    term: "Penetration testing",
    definition:
      "Penetration testing is an authorised, simulated attack on a website, app or network to find security weaknesses before criminals do. Testers report each finding with its severity and a recommended fix, and a retest confirms the fixes worked.",
    href: "/services/cybersecurity"
  },
  {
    term: "Progressive web app (PWA)",
    definition:
      "A progressive web app (PWA) is a website that can be installed on a phone's home screen, work offline and, on supported devices, send notifications, without going through an app store. It suits content and simple tools; apps needing deep device features are usually built native or cross-platform.",
    href: "/blog/pwa-vs-native-app"
  },
  {
    term: "Responsive design",
    definition:
      "Responsive design means building a website so its layout adapts to any screen, from a small phone to a wide desktop monitor, from one set of pages. Google indexes the mobile version of sites first, so the phone layout is the one that counts most.",
    href: "/services/website-design"
  },
  {
    term: "Retrieval-augmented generation (RAG)",
    definition:
      "Retrieval-augmented generation (RAG) is a technique in which an AI system first searches a trusted set of documents for relevant passages, then uses a large language model to answer from them. It grounds answers in a company's own content and lets the system cite its sources.",
    href: "/blog/rag-explained-for-business"
  },
  {
    term: "Schema markup (structured data)",
    definition:
      "Schema markup, or structured data, is code, usually JSON-LD, that describes a page's content to machines using the Schema.org vocabulary: an organisation, a product, an article, an FAQ. It can make pages eligible for rich results and helps search engines and AI assistants understand entities and facts.",
    href: "/blog/schema-markup-for-small-business"
  },
  {
    term: "Search engine optimization (SEO)",
    definition:
      "Search engine optimization (SEO) is the work of making a website more likely to appear, and be clicked, in unpaid search results. It covers technical health such as speed, crawling and indexing; content that matches what people search for; and authority from links and mentions on other sites.",
    href: "/services/seo-services"
  },
  {
    term: "Server-side rendering (SSR)",
    definition:
      "Server-side rendering (SSR) means a page's HTML is built on the server and sent to the browser complete, rather than assembled in the browser by JavaScript. It speeds up first display and lets search engines and AI crawlers read the full content on the first request.",
    href: "/technologies/nextjs"
  },
  {
    term: "SSL/TLS certificate",
    definition:
      "An SSL/TLS certificate lets a website use HTTPS, encrypting traffic between the visitor's browser and the server and proving the site is the one it claims to be. Browsers warn visitors about sites without one, and free certificates are available from Let's Encrypt.",
    href: "/blog/website-security-checklist"
  },
  {
    term: "Staging site",
    definition:
      "A staging site is a private copy of a website or app where changes are built and tested before they go live. Clients can review work there at any time, and nothing reaches real customers until it has been checked on staging.",
    href: "/process"
  },
  {
    term: "Technical SEO",
    definition:
      "Technical SEO is the part of SEO that makes sure search engines can crawl, render, index and understand a website. It covers site speed, mobile usability, XML sitemaps, robots.txt, canonical tags, redirects, structured data and fixing broken links and errors.",
    href: "/blog/technical-seo-audit-checklist"
  },
  {
    term: "UX and UI design",
    definition:
      "UX (user experience) design shapes how a product works: the steps, flows and information people need to finish a task. UI (user interface) design shapes how it looks: layout, type, colour and components. Good teams research and test both with real users before building.",
    href: "/services/ui-ux-design"
  },
  {
    term: "Web application",
    definition:
      "A web application is software that runs in a browser and lets people do things rather than just read: log in, book, buy, upload or manage records. A website mostly publishes information. Many sites combine both, such as a marketing site with a customer portal.",
    href: "/blog/website-vs-web-application"
  },
  {
    term: "White-label development",
    definition:
      "White-label development is when one company builds websites or software that another company sells under its own brand. Agencies use it to take on more work or add skills such as app development without hiring, while staying the client's only point of contact.",
    href: "/blog/white-label-web-development"
  },
  {
    term: "XML sitemap",
    definition:
      "An XML sitemap is a file listing the URLs a website wants search engines to crawl, often with the date each was last changed. It helps new and updated pages get discovered faster, and is submitted through Google Search Console and Bing Webmaster Tools.",
    href: "/blog/technical-seo-audit-checklist"
  }
];

export const termId = (term) =>
  term
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// First character for the A-Z index; digits group under "#".
export const termLetter = (term) => (/^[0-9]/.test(term) ? "#" : term[0].toUpperCase());

import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, FaqList } from "../_components/blocks";
import { breadcrumbSchema, faqSchema, graph, pageMetadata, webPageSchema } from "../../../lib/seo.mjs";

const TITLE = "FAQ: Websites, Apps, SEO and Working With Meritbyte";
const DESCRIPTION =
  "Answers about Meritbyte Technologies: where we are, what websites and apps cost, timelines, ownership, SEO, AEO and GEO, payments, and working with clients abroad.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
  keywords: [
    "website developer faq",
    "best website developer in nepal",
    "how much does a website cost",
    "hire website developer from nepal"
  ]
});

const GROUPS = [
  {
    name: "About Meritbyte",
    faqs: [
      {
        question: "What is Meritbyte Technologies?",
        answerText:
          "Meritbyte Technologies is a Nepal-based IT company that designs and builds websites, web apps, online stores, mobile apps, custom software and AI tools, and runs the SEO, digital marketing, cloud and security work around them. It works with businesses in Nepal and, remotely, with clients in the USA, Australia, Canada, the UK and elsewhere.",
        more: { href: "/about", label: "About Meritbyte" }
      },
      {
        question: "Who is the best website developer in Nepal?",
        answerText:
          "There is no single best developer for every business, but the best ones share the same habits: they show live work you can test on a phone, give a written scope and a fixed price before starting, register the domain, hosting and code in your name, build fast mobile-first sites, and handle payments like eSewa and Khalti properly. Meritbyte Technologies works this way: a free written scope, a fixed-price first milestone and everything in the client's name.",
        more: { href: "/blog/best-website-developer-in-nepal-checklist", label: "The 15-point checklist" }
      },
      {
        question: "Should a business in Australia, the USA, Canada or the UK hire a website developer from Nepal?",
        answerText:
          "It can be a very good choice if the developer works in writing, overlaps with your hours and builds to your country's rules. Costs are lower than local agency rates, Nepal's UTC+5:45 time zone overlaps with Australian afternoons and UK mornings, and North American clients get progress overnight. The trade-off is no in-person meetings.",
        more: { href: "/website-developer", label: "Locations and time-zone overlap" }
      },
      {
        question: "Which countries do you work in?",
        answerText:
          "Nepal, the United States, Australia, Canada, the United Kingdom, New Zealand, the UAE and Singapore most often, and anywhere else English works as a project language. Each location page covers local laws, payments and search habits."
      }
    ]
  },
  {
    name: "Cost, time and ownership",
    faqs: [
      {
        question: "How much does a website cost?",
        answerText:
          "It depends on the market and on features far more than page count. A simple business site, a store with payments and a custom web app sit in very different ranges. Our cost guides give typical ranges for Nepal, the USA, Australia, Canada and the UK, and a firm price for your project is free.",
        more: { href: "/pricing", label: "How pricing works" }
      },
      {
        question: "How long does it take to build a website?",
        answerText:
          "A focused business website usually takes a few weeks; an online store or a site with booking or member features takes longer; custom web apps are planned milestone by milestone. The biggest cause of delay is usually content, so we plan for it from the first week.",
        more: { href: "/blog/how-long-to-build-a-website", label: "Realistic timelines by project type" }
      },
      {
        question: "Do I own the website, the code and the accounts?",
        answerText:
          "Yes. The domain, hosting, repositories, analytics and ad accounts are set up in your name from the start, and you get documentation at handover. If you later move the work in-house or to another firm, nothing breaks."
      },
      {
        question: "Do you offer maintenance and support after launch?",
        answerText:
          "Yes: monitoring, updates, backups, security patches and small improvements under a support agreement with response times written into it, usually as a monthly retainer.",
        more: { href: "/services/managed-it-services", label: "Managed IT and maintenance" }
      }
    ]
  },
  {
    name: "Websites and technology",
    faqs: [
      {
        question: "Will you use WordPress, Shopify or a custom build?",
        answerText:
          "Whichever fits who will edit the site after launch and what it has to do. WordPress suits content-heavy sites edited by non-developers, Shopify suits most online stores, and a custom Next.js build suits sites with custom features or strict performance needs. We explain the trade-off before you choose.",
        more: { href: "/blog/nextjs-vs-wordpress", label: "Next.js vs WordPress" }
      },
      {
        question: "Can you redesign my website without losing my Google rankings?",
        answerText:
          "Yes, if the migration is planned: every old URL mapped to a new one with 301 redirects, titles and content that rank kept or improved, structured data carried over, and Search Console watched closely for several weeks after launch.",
        more: { href: "/blog/website-redesign-without-losing-seo", label: "Redesign checklist" }
      },
      {
        question: "Can you add eSewa, Khalti, Fonepay or Stripe payments?",
        answerText:
          "Yes. For Nepal we integrate eSewa, Khalti, Fonepay and bank gateways through your own merchant accounts; for international clients, Stripe, PayPal and regional gateways through yours. Payments always land in your account, never ours.",
        more: { href: "/blog/esewa-khalti-fonepay-integration", label: "Payment gateways in Nepal" }
      }
    ]
  },
  {
    name: "SEO, AEO and GEO",
    faqs: [
      {
        question: "Can you guarantee first place on Google?",
        answerText:
          "No, and you should be wary of anyone who does. Google itself warns against SEO providers that guarantee rankings. What we can promise is the work: a technically sound site, content aimed at searches with buying intent, local SEO, structured data, and honest reporting of leads next to rankings.",
        more: { href: "/services/seo-services", label: "SEO services" }
      },
      {
        question: "What are AEO and GEO?",
        answerText:
          "Answer engine optimization (AEO) makes your content easy for Google's AI features, voice assistants and answer boxes to quote. Generative engine optimization (GEO) helps AI assistants such as ChatGPT, Gemini and Perplexity understand, trust and cite your brand. Both build on good SEO: clear answers, structured data and a consistent identity across the web.",
        more: { href: "/blog/answer-engine-optimization-aeo", label: "AEO explained" }
      },
      {
        question: "How long does SEO take to show results?",
        answerText:
          "Technical fixes can show within weeks, but meaningful gains in competitive searches usually take several months of steady work. Local searches in less competitive areas move faster. We report progress monthly against leads and revenue, not only rankings."
      }
    ]
  },
  {
    name: "Working together",
    faqs: [
      {
        question: "Which time zone do you work in?",
        answerText:
          "Nepal Time, UTC+5:45, with no daylight saving. That overlaps with Australian afternoons, Singapore and Gulf working days and UK mornings, and with North American early mornings or evenings.",
        more: { href: "/website-developer", label: "Overlap table by country" }
      },
      {
        question: "How do we communicate during a project?",
        answerText:
          "A written update every week, a demo at the end of every two-week block, a staging URL you can open any time, and a shared channel for quick questions. Calls are scheduled inside the overlap window. Decisions are confirmed in writing so nothing depends on memory."
      },
      {
        question: "How do I start?",
        answerText:
          "Send a few lines through the contact page or email hello@meritbyte.com: what you have now, what you want instead, when you need it and, if you can, a budget range. A person replies within one business day.",
        more: { href: "/contact", label: "Contact us" }
      }
    ]
  }
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" }
  ];
  const schema = graph(
    webPageSchema({ path: "/faq", title: TITLE, description: DESCRIPTION }),
    faqSchema(all),
    breadcrumbSchema(crumbs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <main id="main">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>
        <section className="page-hero">
          <div className="container page-hero__grid">
            <div>
              <p className="label">FAQ</p>
              <h1>Questions people ask before they hire us.</h1>
              <p className="page-hero__lead">
                Straight answers about who we are, what things cost, who owns what, and how we
                work with clients in Nepal and abroad.
              </p>
            </div>
            <Answer label="In short">
              Meritbyte Technologies is a Nepal-based IT company building websites, apps, software
              and AI tools with SEO, marketing and cloud support. Projects start with a free
              written scope and a fixed-price first milestone, and everything is registered in the
              client&apos;s name.
            </Answer>
          </div>
        </section>
        {GROUPS.map((group) => (
          <section className="listing" key={group.name}>
            <div className="container">
              <FaqList faqs={group.faqs} heading={group.name} />
            </div>
          </section>
        ))}
      </main>
      <CtaBand />
    </>
  );
}

import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, FaqList } from "../_components/blocks";
import { ORG_ID, breadcrumbSchema, faqSchema, graph, pageMetadata } from "../../../lib/seo.mjs";
import { absoluteUrl } from "../../../lib/site.mjs";

const TITLE = "About Meritbyte Technologies | IT Company Based in Nepal";
const DESCRIPTION =
  "Meritbyte Technologies is a Nepal-based IT company: engineers, designers and marketers who build websites, software and AI tools for businesses in Nepal and abroad.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
  keywords: [
    "meritbyte technologies",
    "it company in nepal",
    "software company in nepal",
    "web development company nepal"
  ]
});

const FAQS = [
  {
    question: "What is Meritbyte Technologies?",
    answerText:
      "Meritbyte Technologies is a Nepal-based IT company. It designs and builds websites, web apps, online stores, mobile apps, custom software and AI tools, and runs the SEO, digital marketing, cloud hosting and security work around them, for businesses in Nepal and clients in the USA, Australia, Canada, the UK and elsewhere."
  },
  {
    question: "Is Meritbyte a freelancer or an agency?",
    answerText:
      "A company with a team of engineers, designers and marketers, but without the account-manager layer of a large agency. The person in your kickoff call is one of the people doing the work, and they stay on the project until it ships."
  },
  {
    question: "What will Meritbyte not do?",
    answerText:
      "We do not buy links, promise first place on Google, keep your code or accounts in our name, or lock you into a year-long contract before any work is done. If a project is not a good fit, or we cannot start when you need us to, we say so at the start."
  }
];

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ];
  const schema = graph(
    {
      "@type": "AboutPage",
      "@id": `${absoluteUrl("/about")}#webpage`,
      url: absoluteUrl("/about"),
      name: TITLE,
      description: DESCRIPTION,
      mainEntity: { "@id": ORG_ID }
    },
    faqSchema(FAQS),
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
              <p className="label">About</p>
              <h1>We build the system, then we keep it running.</h1>
              <p className="page-hero__lead">
                Meritbyte Technologies is an IT company based in Nepal. We write the software,
                run the infrastructure under it, and do the search and campaign work that brings
                people to it: six practices, one contract, one person you can call.
              </p>
            </div>
            <Answer label="In short">
              Meritbyte Technologies is a Nepal-based IT company of engineers, designers and
              marketers. It builds websites, web and mobile apps, custom software and AI tools,
              and handles SEO, marketing, cloud and security, for businesses in Nepal and clients
              in the USA, Australia, Canada, the UK and beyond.
            </Answer>
          </div>
        </section>

        <section className="article">
          <div className="container">
            <div className="text-page">
              <h2>Who you will actually be working with</h2>
              <p>
                We are a small team of engineers, designers and marketers. There is no account
                layer between you and the work: the person in the kickoff call is the one writing
                the code or the copy, and they stay on the project until it ships.
              </p>
              <p>
                We take on a limited number of projects at a time, so occasionally the honest
                answer is <strong>no</strong>, or <strong>not until next month</strong>. When
                that is the case we say so at the start, rather than taking a deposit and putting
                you in a queue.
              </p>

              <h2>What we do</h2>
              <p>
                Most clients hire us for one thing and end up using three, because the pieces
                depend on each other. A website needs hosting, tracking and search work; an app
                needs an API, a pipeline and someone watching it at three in the morning.
              </p>
              <ul>
                <li>
                  <a href="/services/software-development">Software development</a>: platforms,
                  internal tools, APIs and integrations.
                </li>
                <li>
                  <a href="/services/ai-development">AI applications</a>: assistants, search and
                  automation over your own data, with an evaluation harness before the demo.
                </li>
                <li>
                  <a href="/services/web-development">Web development</a> and{" "}
                  <a href="/services/website-design">website design</a>: sites and web apps that
                  load fast on a mid-range phone.
                </li>
                <li>
                  <a href="/services/digital-marketing">Digital marketing</a>: campaigns judged on
                  pipeline, not impressions.
                </li>
                <li>
                  <a href="/services/seo-services">SEO</a>: fix the site first, then write for the
                  queries with buying intent, and get cited in AI answers.
                </li>
                <li>
                  <a href="/services/cloud-devops">Cloud and DevOps</a>: deployments that are
                  boring on purpose.
                </li>
              </ul>
              <p>
                Around those sit <a href="/services/qa-testing">QA and testing</a>,{" "}
                <a href="/services/cybersecurity">cybersecurity</a>,{" "}
                <a href="/services/ui-ux-design">UI/UX design</a>,{" "}
                <a href="/services/data-analytics">data and BI</a>,{" "}
                <a href="/services/mobile-app-development">mobile apps</a>,{" "}
                <a href="/services/ecommerce-development">e-commerce</a> and{" "}
                <a href="/services/managed-it-services">managed IT</a>.
              </p>

              <h2>Where we work</h2>
              <p>
                The team is in Nepal. We work with businesses across Nepal, and remotely with
                clients in the <a href="/website-developer/usa">USA</a>,{" "}
                <a href="/website-developer/australia">Australia</a>,{" "}
                <a href="/website-developer/canada">Canada</a>, the{" "}
                <a href="/website-developer/uk">UK</a>,{" "}
                <a href="/website-developer/new-zealand">New Zealand</a>, the{" "}
                <a href="/website-developer/uae">UAE</a> and{" "}
                <a href="/website-developer/singapore">Singapore</a>. Nepal is UTC+5:45, which
                gives a same-day overlap with Australia, Asia, the Gulf and the UK, and means work
                moves overnight for clients in North America.
              </p>

              <h2>How we work</h2>
              <ol>
                <li>
                  <strong>A free first answer.</strong> Tell us what you need and you get back a
                  scope, a timeline and a number. No paid discovery phase stands in the way.
                </li>
                <li>
                  <strong>Fixed price on the first milestone.</strong> After that we plan in
                  two-week blocks with a demo at the end of each, and you can stop at the end of
                  any of them.
                </li>
                <li>
                  <strong>Visible progress.</strong> One project manager, a written update every
                  week and a staging URL you can open whenever you want.
                </li>
                <li>
                  <strong>Yours from day one.</strong> Code, domains, hosting and ad accounts in
                  your name, with documentation at handover. If you move the work in-house or to
                  another firm, nothing breaks.
                </li>
              </ol>
              <p>
                The details are on <a href="/process">how we work</a> and{" "}
                <a href="/pricing">pricing</a>.
              </p>

              <h2>What we will not do</h2>
              <ul>
                <li>Buy links, or promise a first-place ranking. Nobody can honestly promise that.</li>
                <li>Hold your code, domain or accounts hostage in our name.</li>
                <li>Sign you into a twelve-month contract before anyone has written a line of code.</li>
                <li>Add AI to something a rules engine or a good search box does for a tenth of the cost.</li>
              </ul>
            </div>
            <div className="text-page" style={{ marginTop: 56 }}>
              <FaqList faqs={FAQS} />
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}

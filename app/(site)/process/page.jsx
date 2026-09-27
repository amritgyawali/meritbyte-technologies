import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, FaqList } from "../_components/blocks";
import {
  ORG_ID,
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema
} from "../../../lib/seo.mjs";
import { absoluteUrl } from "../../../lib/site.mjs";

const TITLE = "How We Work: Web and Software Development Process | Meritbyte";
const DESCRIPTION =
  "How a Meritbyte Technologies project runs: discovery, a written scope with a fixed-price first milestone, two-week build blocks with demos, launch and ongoing support.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/process",
  keywords: [
    "software development process",
    "web development process",
    "fixed price first milestone",
    "agile two week sprints"
  ]
});

const STEPS = [
  {
    name: "Discovery",
    time: "A few days to two weeks",
    body: "We read the existing code or site, talk to the people who use it, and write down what is actually true rather than what the last vendor documented. For a new build, this is a conversation about the business, the customers and what a good result looks like in numbers.",
    youGet: "Notes you can keep, and the questions that decide the price."
  },
  {
    name: "Scope",
    time: "Usually within a week of discovery",
    body: "Architecture, milestones, price and the assumptions behind all three, in writing. The first milestone has a fixed price. The document is yours to keep whether or not you hire us.",
    youGet: "A written scope, a timeline and a fixed price for milestone one."
  },
  {
    name: "Build",
    time: "Two-week blocks",
    body: "Work is planned in two-week blocks. Each ends with a demo of working software, not slides. A staging URL is live from the first week so you can see where things stand whenever you want, and a written update arrives every week.",
    youGet: "A demo every two weeks, a weekly written update, and the option to stop at the end of any block."
  },
  {
    name: "Launch",
    time: "Planned, not rushed",
    body: "Launch runs from a checklist: redirects mapped, analytics and consent in place, backups and monitoring on, forms tested end to end, accessibility and Core Web Vitals checked on real phones. We launch early in the week, never on a Friday afternoon.",
    youGet: "A live product, documentation and every credential in your name."
  },
  {
    name: "Run",
    time: "As long as it is useful",
    body: "Monitoring, patching, backups and improvements under a support agreement with response times written into it. SEO and marketing retainers report leads and revenue next to rankings and clicks.",
    youGet: "A system that keeps working, and a team that already knows it."
  }
];

const PRINCIPLES = [
  ["Fixed first milestone", "You know the cost of the first real deliverable before anything starts."],
  ["Two-week blocks", "Short enough to change direction, long enough to finish something."],
  ["Written weekly update", "What was done, what is next, what is blocked, in plain language."],
  ["Staging URL from week one", "No black boxes. Open it whenever you like."],
  ["Everything in your name", "Repositories, domains, hosting, ad accounts, analytics."],
  ["Documentation at handover", "So your own team, or another firm, can take over."]
];

const FAQS = [
  {
    question: "What is a fixed-price first milestone?",
    answerText:
      "It is the first meaningful piece of the project, for example a working home page and booking flow, with an agreed price that does not change if it takes us longer. It lets you judge our work on something real before committing to the rest, and it forces both sides to agree on what done means."
  },
  {
    question: "Why two-week blocks instead of one fixed price for everything?",
    answerText:
      "Because the plan changes once people see working software, and a single fixed price for a large project either hides a big risk margin or ends in arguments about change requests. Two-week blocks keep the cost visible, let you reprioritise, and let you stop at the end of any block."
  },
  {
    question: "How much of my time will the project need?",
    answerText:
      "Most in discovery and scope: a few hours of conversation and access to whatever exists today. During the build, around an hour every two weeks for the demo, plus quick answers to questions in writing. One named person on your side who can make decisions keeps things moving."
  },
  {
    question: "How do you work with clients in other time zones?",
    answerText:
      "Mostly in writing, with a scheduled call inside the overlap window. Nepal is UTC+5:45, so Australian and Asian clients get a same-day overlap, UK clients get their morning, and North American clients get their early morning while work continues during their night."
  }
];

export default function ProcessPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "How we work", path: "/process" }
  ];
  const schema = graph(
    webPageSchema({ path: "/process", title: TITLE, description: DESCRIPTION }),
    {
      "@type": "HowTo",
      "@id": `${absoluteUrl("/process")}#howto`,
      name: "How a Meritbyte Technologies project runs",
      description: DESCRIPTION,
      provider: { "@id": ORG_ID },
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.body,
        url: `${absoluteUrl("/process")}#step-${i + 1}`
      }))
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
              <p className="label">How we work</p>
              <h1>Fixed price on the first milestone. Then two-week blocks.</h1>
              <p className="page-hero__lead">
                Nobody does their best work inside a twelve-month contract signed before anyone
                has written a line of code. So we price the first real deliverable, show you
                working software every two weeks, and let you stop at the end of any block.
              </p>
            </div>
            <Answer label="In short">
              A Meritbyte Technologies project runs in five steps: discovery, a written scope
              with a fixed price for the first milestone, a build in two-week blocks that each end
              with a demo, a checklist-driven launch, and ongoing support. Code and accounts are in
              the client&apos;s name throughout.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="approach__grid">
              {STEPS.map((step, i) => (
                <div className="step" key={step.name} id={`step-${i + 1}`}>
                  <p className="step__index">
                    {String(i + 1).padStart(2, "0")} · {step.time}
                  </p>
                  <h2 className="step__title">{step.name}</h2>
                  <p>{step.body}</p>
                  <p className="step__get">
                    <strong>You get:</strong> {step.youGet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Six things that are true on every project</h2>
            </div>
            <div className="support-grid">
              {PRINCIPLES.map(([name, body]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Three ways to engage</h2>
              <p>
                See <a className="textlink" href="/pricing">pricing</a> for how each one is
                charged.
              </p>
            </div>
            <div className="engagements">
              <div className="engagement">
                <h3>Project</h3>
                <p>A defined outcome with a fixed price on the first milestone.</p>
              </div>
              <div className="engagement">
                <h3>Retainer</h3>
                <p>A set number of days each month for ongoing work and support.</p>
              </div>
              <div className="engagement">
                <h3>Embedded</h3>
                <p>Our engineers in your standups, reporting to your own leads.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <FaqList faqs={FAQS} />
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}

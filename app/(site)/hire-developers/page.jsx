import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer, CtaBand, EntryCards, FaqList } from "../_components/blocks";
import { getCollection, pick } from "../../../lib/content.mjs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  serviceSchema,
  webPageSchema
} from "../../../lib/seo.mjs";
import { NEPAL_TIME, OVERLAP } from "../../../lib/timezones.mjs";

const PATH = "/hire-developers";
const TITLE = "Hire Dedicated Developers in Nepal | Meritbyte";
const DESCRIPTION =
  "Hire dedicated developers from Meritbyte Technologies in Nepal: React, Next.js, Node.js, Python, Flutter and DevOps engineers who work inside your team and tools.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "hire dedicated developers",
    "dedicated development team",
    "hire developers in nepal",
    "offshore development team",
    "staff augmentation"
  ]
});

const ROLES = [
  {
    name: "Front-end developers",
    text: "React and Next.js interfaces, design systems and accessibility work.",
    links: [
      ["React", "/technologies/react"],
      ["Next.js", "/technologies/nextjs"]
    ]
  },
  {
    name: "Back-end developers",
    text: "APIs, integrations, background jobs and data models.",
    links: [
      ["Node.js", "/technologies/nodejs"],
      ["Python", "/technologies/python"]
    ]
  },
  {
    name: "Mobile developers",
    text: "iOS and Android apps from one codebase, through to store release.",
    links: [
      ["Flutter", "/technologies/flutter"],
      ["React Native", "/technologies/react-native"]
    ]
  },
  {
    name: "Cloud and DevOps engineers",
    text: "Infrastructure as code, CI/CD pipelines, monitoring and cost control.",
    links: [
      ["AWS", "/technologies/aws"],
      ["Cloud and DevOps", "/services/cloud-devops"]
    ]
  },
  {
    name: "WordPress and Shopify developers",
    text: "Custom themes, plugins and apps, speed and security work.",
    links: [
      ["WordPress", "/services/wordpress-development"],
      ["Shopify", "/technologies/shopify"]
    ]
  },
  {
    name: "QA engineers and designers",
    text: "Automated testing, and UX and interface design in Figma.",
    links: [
      ["QA and testing", "/services/qa-testing"],
      ["UI/UX design", "/services/ui-ux-design"]
    ]
  }
];

const COMPARE = [
  ["Freelancer", "You do", "Hourly or fixed", "Depends on one person's availability", "Small, well-defined tasks"],
  ["Agency project", "The agency", "Per milestone or project", "The agency's team, until handover", "A defined product with a clear outcome"],
  ["Dedicated developers", "You, day to day", "Per engineer, per month", "The same engineers, backed by a company", "Ongoing work inside your own roadmap"],
  ["In-house hire", "You", "Salary, benefits, equipment", "Yours, once hired and trained", "Core, long-term roles you can recruit for"]
];

const QUESTIONS = [
  "Will the same engineers stay on our work, and what happens if one leaves?",
  "Whose name are the repositories, cloud accounts and credentials in?",
  "Which hours will the engineers overlap with our team, and who covers holidays?",
  "Who do we talk to if the arrangement is not working, other than the engineer?",
  "How is the monthly price set, and what is not included in it?",
  "Can we see code the engineers have written, or do a short paid trial task?"
];

const FAQS = [
  {
    question: "What does it mean to hire dedicated developers?",
    answerText:
      "Hiring dedicated developers means a company provides engineers who work only on your product, inside your tools and processes, for an agreed monthly price. You direct the work day to day; the provider handles employment, equipment and continuity. It sits between hiring freelancers and running a fixed-scope agency project."
  },
  {
    question: "How does Meritbyte's Embedded model work?",
    answerText:
      "Our engineers join your standups, work in your repositories and project tools, and report to your own leads. Pricing is per engineer, per month. Code, repositories and accounts stay in your organisation's name. Tell us the role, stack and hours you need, and a person replies within one business day."
  },
  {
    question: "Why hire developers from Nepal?",
    answerText:
      "Nepal has a growing pool of English-speaking software engineers, and its UTC+5:45 time zone gives a same-day overlap with Australia, Asia, the Gulf and the UK, plus overnight progress for North America. Rates are typically lower than in those markets, though cost should never be the only reason."
  },
  {
    question: "Is it better to hire dedicated developers or outsource a whole project?",
    answerText:
      "Outsource a whole project when the outcome is clear and you want one company accountable for delivering it. Hire dedicated developers when you already have a product owner or tech lead, an ongoing roadmap, and want more capacity under your own direction. Meritbyte offers both."
  },
  {
    question: "Who owns the code written by dedicated developers?",
    answerText:
      "You should, from the first commit. With Meritbyte, engineers commit to repositories in your organisation and work in accounts you control. Whoever you hire, check this in writing before work starts, because code held in a provider's accounts is hard to recover later."
  }
];

export default function HireDevelopersPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Hire developers", path: PATH }
  ];
  const technologies = getCollection("technologies");
  const posts = pick("blog", [
    "how-to-hire-a-remote-web-developer",
    "outsource-software-development-to-nepal",
    "offshore-vs-nearshore-vs-onshore-development",
    "working-across-time-zones-offshore-team"
  ]);

  const schema = graph(
    webPageSchema({ path: PATH, title: TITLE, description: DESCRIPTION }),
    serviceSchema({
      path: PATH,
      name: "Dedicated developers (Embedded model)",
      description:
        "Engineers from Meritbyte Technologies who work only on the client's product, inside the client's tools and standups, priced per engineer per month, with code and accounts in the client's name.",
      serviceType: "Dedicated development team",
      keywords: ["hire dedicated developers", "dedicated development team", "staff augmentation"]
    }),
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
              <p className="label">Hire developers</p>
              <h1>Hire dedicated developers who work inside your team.</h1>
              <p className="page-hero__lead">
                Our engineers join your standups, commit to your repositories and report to your
                leads. You get the capacity of a bigger team without recruiting for it, and the
                code is yours from the first commit.
              </p>
              <div className="page-hero__actions">
                <a className="button" href="/contact">
                  Tell us the role you need
                </a>
                <a className="button button--quiet" href="/pricing">
                  How pricing works
                </a>
              </div>
            </div>
            <Answer label="In short">
              Meritbyte Technologies, a Nepal-based software company, provides dedicated
              developers under its Embedded model: React, Next.js, Node.js, Python, Flutter, React
              Native, DevOps and QA engineers who work only on your product, in your tools, priced
              per engineer per month, with code and accounts in your name.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Which developers can you hire?</h2>
              <p>Engineers and designers for the stack most products are built on.</p>
            </div>
            <div className="support-grid">
              {ROLES.map((role) => (
                <div key={role.name}>
                  <h3>{role.name}</h3>
                  <p>{role.text}</p>
                  <p className="role-links">
                    {role.links.map(([label, href], i) => (
                      <span key={href}>
                        {i ? " · " : ""}
                        <a className="textlink" href={href}>
                          {label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="article">
          <div className="container">
            <div className="text-page">
              <h2>How hiring dedicated developers works with us</h2>
              <ol>
                <li>
                  <strong>Tell us the role.</strong> The stack, the seniority, the hours you need
                  covered and when you want to start. A person replies within one business day,
                  including when the honest answer is that we do not have the right engineer free.
                </li>
                <li>
                  <strong>Agree the arrangement.</strong> Engineers, hours of overlap, how they
                  report to you, and a price per engineer, per month, in writing.
                </li>
                <li>
                  <strong>Set up access in your name.</strong> Your repositories, your project
                  tools, your cloud accounts. Nothing important lives in ours.
                </li>
                <li>
                  <strong>Work as one team.</strong> Our engineers join your standups and planning,
                  follow your code review rules and report to your leads, with a written update
                  every week.
                </li>
              </ol>

              <h2>Dedicated developers, freelancers, agencies or in-house?</h2>
              <p>
                Each model fits a different situation. Dedicated developers make sense when you
                already have someone setting priorities and need more hands on an ongoing roadmap.
                If you need a whole product delivered against a scope, a{" "}
                <a href="/services/software-development">fixed-scope project</a> is usually
                better.
              </p>
            </div>
            <div className="table-wrap" style={{ marginTop: 24 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    <th scope="col">Who manages the work</th>
                    <th scope="col">How it is priced</th>
                    <th scope="col">Continuity</th>
                    <th scope="col">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-page" style={{ marginTop: 48 }}>
              <h2>Six questions to ask any provider of dedicated developers</h2>
              <p>
                Ask these of us and of anyone else you are considering. Vague answers to the first
                two are reason enough to walk away.
              </p>
              <ol>
                {QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
              <p>
                Our guide to <a href="/blog/how-to-hire-a-remote-web-developer">hiring a remote
                web developer</a> covers the interview and trial-task side, and{" "}
                <a href="/blog/outsource-software-development-to-nepal">outsourcing software
                development to Nepal</a> covers contracts, payments and what to expect.
              </p>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Working hours overlap with Nepal</h2>
              <p>{NEPAL_TIME}. Daylight saving changes the gap in some markets; Nepal never moves.</p>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Market</th>
                    <th scope="col">Time zone</th>
                    <th scope="col">Difference</th>
                    <th scope="col">Overlap</th>
                  </tr>
                </thead>
                <tbody>
                  {OVERLAP.map((row) => (
                    <tr key={row.market}>
                      <td>{row.market}</td>
                      <td>{row.zone}</td>
                      <td>{row.offset}</td>
                      <td>{row.overlap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <EntryCards
              entries={technologies}
              label="hire-by-technology"
              heading="Hire developers by technology"
              describe={(t) => t.lead}
            />
            <EntryCards
              entries={posts}
              label="hiring-guides"
              heading="Guides on hiring and offshore teams"
              describe={(p) => p.description}
            />
            <FaqList faqs={FAQS} />
          </div>
        </section>
      </main>
      <CtaBand
        heading="Need more hands on your roadmap?"
        text="Tell us the stack, the seniority and the hours you need covered. A person replies within one business day with who is available and when, or an honest no."
      />
    </>
  );
}

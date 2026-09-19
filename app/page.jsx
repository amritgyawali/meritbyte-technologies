import ThemeToggle from "./theme-toggle";

const EMAIL = "hello@meritbyte.com";

const practices = [
  {
    id: "software",
    name: "Software development",
    summary:
      "Custom platforms, internal tools, and the APIs that hold them together.",
    body: "Most of this work is replacement work: a spreadsheet that quietly became a business process, an ERP module nobody is allowed to touch, a monolith that takes an hour to deploy. We write in TypeScript, Python, Go and .NET, and we hand over documentation your own developers can work from.",
    meta: "Platform engineering · REST and GraphQL APIs · Systems integration · Legacy migration"
  },
  {
    id: "ai",
    name: "AI applications",
    summary: "Assistants, search and automation built on your own data.",
    body: "Retrieval over internal documents, extraction from PDFs and scans, classification and forecasting against your own history. We build the evaluation harness before the demo, because a model that is right eighty percent of the time is a support ticket generator. We will also tell you when a rules engine does the same job for a tenth of the cost.",
    meta: "LLM applications · Retrieval systems · Document processing · Evaluation and monitoring"
  },
  {
    id: "web",
    name: "Web development",
    summary: "Sites and web apps that load fast on a mid-range phone.",
    body: "Next.js, WordPress or Shopify, chosen mostly by who has to edit the thing after we leave. Accessibility and Core Web Vitals are part of the build rather than a cleanup phase, and we test on real devices before launch, not just a throttled desktop tab.",
    meta: "Marketing sites · Web applications · E-commerce · Accessibility and performance"
  },
  {
    id: "marketing",
    name: "Digital marketing",
    summary: "Campaigns judged on pipeline, not impressions.",
    body: "Paid search and social, email and lifecycle, and enough tracking to show which of them paid for itself. Ad accounts are opened in your name and stay with you if you stop working with us. Reporting goes to a dashboard you can open yourself, at any hour, without asking us for a PDF.",
    meta: "Paid media · Lifecycle and CRM · Creative · Attribution"
  },
  {
    id: "seo",
    name: "Search",
    summary: "Fix the site first. Then write.",
    body: "Crawl and index problems, site structure and page speed come before a single new article. After that, content built around queries with buying intent behind them. Rankings are reported next to revenue, and we do not buy links.",
    meta: "Technical SEO · Content strategy · Digital PR · Local search"
  },
  {
    id: "cloud",
    name: "Cloud and DevOps",
    summary: "Deployments that are boring on purpose.",
    body: "AWS, Azure and GCP, with Terraform for anything that would otherwise be clicked through a console. Pipelines that finish in under ten minutes, alerts that mean something at three in the morning, and a runbook your team can follow without calling us.",
    meta: "Cloud architecture · CI/CD · Kubernetes · Monitoring and on-call"
  }
];

const support = [
  {
    name: "QA and testing",
    body: "Automated suites, regression runs before every release, and load tests shaped like your actual traffic."
  },
  {
    name: "Project management",
    body: "One project manager, a written update every week, and a backlog you can read without a meeting."
  },
  {
    name: "Cybersecurity",
    body: "Code and infrastructure review, penetration testing, hardening, and an incident plan written before you need it."
  },
  {
    name: "UI and UX design",
    body: "Research, wireframes and prototypes, tested with people who resemble the ones who will use it."
  },
  {
    name: "Data and business intelligence",
    body: "Warehouses, pipelines and dashboards aimed at the questions leadership actually asks."
  },
  {
    name: "Managed IT",
    body: "Devices, accounts, licences and a helpdesk your staff can reach on the first try."
  }
];

const steps = [
  {
    index: "01",
    name: "Discovery",
    body: "A week, sometimes two. We read the code, talk to the people using it, and write down what is actually true rather than what the last vendor documented."
  },
  {
    index: "02",
    name: "Scope",
    body: "Architecture, milestones, price and the assumptions behind all three. The document is yours to keep whether or not you hire us."
  },
  {
    index: "03",
    name: "Build",
    body: "Two-week blocks, a demo at the end of each one, and a staging URL you can open whenever you want to see where it stands."
  },
  {
    index: "04",
    name: "Run",
    body: "Monitoring, patching and a support agreement with response times written into it. Most clients stay on this part for years."
  }
];

const engagements = [
  {
    name: "Project",
    body: "A defined outcome with a fixed price on the first milestone."
  },
  {
    name: "Retainer",
    body: "A set number of days each month for ongoing work and support."
  },
  {
    name: "Embedded",
    body: "Our engineers in your standups, reporting to your own leads."
  }
];

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead">
        <div className="container masthead__inner">
          <a className="wordmark" href="#top">
            <span className="wordmark__name">Meritbyte</span>
            <span className="wordmark__suffix">Technologies</span>
          </a>
          <nav className="masthead__nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#approach">How we work</a>
            <a href="#about">About</a>
          </nav>
          <div className="masthead__actions">
            <ThemeToggle />
            <a className="button" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero__grid">
            <div>
              <p className="label">IT services and software engineering</p>
              <h1>We build the system, then we keep it running.</h1>
              <p className="hero__lead">
                Meritbyte writes the software, runs the infrastructure
                underneath it, and does the search and campaign work that brings
                people to it. Six practices, one contract, one person you can
                call.
              </p>
              <div className="hero__actions">
                <a className="button" href="#contact">
                  Start a conversation
                </a>
                <a className="button button--quiet" href="#services">
                  See what we do
                </a>
              </div>
            </div>

            <aside className="note">
              <h2>Most work starts one of two ways</h2>
              <p>
                Either there is a system that works but will not survive the
                next thousand users, or there is a plan and nobody to build it.
              </p>
              <p>
                Tell us which one you have. You get back a scope, a timeline and
                a number, and there is no paid discovery phase standing between
                you and that answer.
              </p>
              <p className="note__sign">The Meritbyte team</p>
            </aside>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section__head">
              <p className="label">Services</p>
              <h2>Six practices.</h2>
              <p>
                Most clients hire us for one of them and end up using three. The
                practices share a codebase, a project manager and a single
                invoice, so nothing gets lost in the handover between them.
              </p>
            </div>

            {practices.map((practice, i) => (
              <article
                className="practice"
                id={`practice-${practice.id}`}
                key={practice.id}
              >
                <p className="practice__index">{String(i + 1).padStart(2, "0")}</p>
                <div className="practice__head">
                  <h3>{practice.name}</h3>
                  <p className="practice__summary">{practice.summary}</p>
                </div>
                <div className="practice__detail">
                  <p className="practice__body">{practice.body}</p>
                  <p className="practice__meta">{practice.meta}</p>
                </div>
              </article>
            ))}

            <div className="support-grid">
              {support.map((item) => (
                <div key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="approach">
          <div className="container">
            <div className="section__head">
              <p className="label">How we work</p>
              <h2>Fixed price on the first milestone.</h2>
              <p>
                After that we plan in two-week blocks, and you can stop at the
                end of any of them. Nobody does their best work inside a
                twelve-month contract signed before anyone has written a line of
                code.
              </p>
            </div>

            <div className="approach__grid">
              {steps.map((step) => (
                <div className="step" key={step.index}>
                  <p className="step__index">{step.index}</p>
                  <h3>{step.name}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>

            <div className="engagements">
              {engagements.map((item) => (
                <div className="engagement" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about__grid">
            <div className="about__head">
              <p className="label">About</p>
              <h2>Who you will actually be working with</h2>
            </div>
            <div className="about__body">
              <p>
                We are a small team of engineers, designers and marketers. There
                is no account layer between you and the work: the person in the
                kickoff call is the one writing the code, and they stay on the
                project until it ships.
              </p>
              <p>
                We take on a limited number of projects at a time, so
                occasionally the honest answer is <strong>no</strong>, or{" "}
                <strong>not until March</strong>. When that is the case we say
                so at the start, rather than taking a deposit and putting you in
                a queue.
              </p>
              <p>
                Everything we build is handed over with documentation, repository
                access and credentials in your own name. If you decide to take it
                in-house or move to another firm, you can, and nothing breaks
                when you do.
              </p>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact__grid">
            <div>
              <p className="label">Contact</p>
              <h2>Tell us what you are building.</h2>
              <p>
                Write a few lines about what you have now, what you want
                instead, and when you need it. If there is a budget range,
                include it. It changes the shape of what we propose more than
                anything else you can tell us.
              </p>
              <a className="contact__email" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
            <dl className="contact__aside">
              <dt>Response</dt>
              <dd>A person replies within one business day.</dd>
              <dt>Confidentiality</dt>
              <dd>Say the word and we will sign yours, or send ours.</dd>
              <dt>Existing clients</dt>
              <dd>
                Use your project channel or the support address in your
                agreement.
              </dd>
            </dl>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <a className="wordmark" href="#top">
                <span className="wordmark__name">Meritbyte</span>
                <span className="wordmark__suffix">Technologies</span>
              </a>
              <p className="footer__blurb">
                Software, cloud and marketing for companies that need all three
                from the same team.
              </p>
            </div>

            <div className="footer__col">
              <h3>Practices</h3>
              <ul>
                {practices.map((practice) => (
                  <li key={practice.id}>
                    <a href={`#practice-${practice.id}`}>{practice.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h3>Also</h3>
              <ul>
                {support.map((item) => (
                  <li key={item.name}>
                    <a href="#services">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#approach">How we work</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__base">
            <p>© 2026 Meritbyte Technologies</p>
            <p>Built and maintained in-house.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

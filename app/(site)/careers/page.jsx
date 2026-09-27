import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { Answer } from "../_components/blocks";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "../../../lib/seo.mjs";
import { SITE } from "../../../lib/site.mjs";

const TITLE = "Careers at Meritbyte Technologies | IT Jobs in Nepal";
const DESCRIPTION =
  "Work on real products for clients in Nepal, Australia, the USA, Canada and the UK. How Meritbyte Technologies hires engineers, designers and marketers in Nepal.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/careers",
  keywords: ["it jobs in nepal", "software developer jobs nepal", "web developer jobs nepal", "meritbyte careers"]
});

const LOOK_FOR = [
  ["Engineers", "Web (React, Next.js, Node.js), mobile (Flutter, React Native), backend (Python, Go, .NET), and cloud (AWS, Terraform, Docker)."],
  ["Designers", "Product and UI designers who test with real people and care about accessibility and performance as much as looks."],
  ["Marketers", "SEO, content and paid media people who report leads and revenue, not just traffic and impressions."],
  ["QA", "Testers who automate the boring parts and still think like a curious user."]
];

export default function CareersPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" }
  ];
  const schema = graph(
    webPageSchema({ path: "/careers", title: TITLE, description: DESCRIPTION }),
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
              <p className="label">Careers</p>
              <h1>Build real things for real clients, from Nepal.</h1>
              <p className="page-hero__lead">
                We build websites, apps, software and AI tools for businesses in Nepal and for
                clients abroad. The person in the kickoff call is the person doing the work, so
                everyone here talks to clients and owns what they ship.
              </p>
            </div>
            <Answer label="In short">
              Meritbyte Technologies hires engineers, designers, marketers and testers in Nepal.
              When a role is open it is listed on this page. We also read every speculative
              application sent to {SITE.email} with the subject line &ldquo;Careers&rdquo;.
            </Answer>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <div className="listing__head">
              <h2>Who we look for</h2>
              <p>Skills matter; so does writing clearly, because a lot of our work is written.</p>
            </div>
            <div className="support-grid">
              {LOOK_FOR.map(([name, body]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container text-page">
            <h2>How to apply</h2>
            <ol>
              <li>
                Email <a href={`mailto:${SITE.email}?subject=Careers`}>{SITE.email}</a> with the
                subject line &ldquo;Careers&rdquo; and the kind of work you do.
              </li>
              <li>
                Send something you built, designed or wrote: a live link, a repository, a case
                you can talk through. It tells us more than a CV.
              </li>
              <li>
                Tell us in a few lines what you want to get better at in the next year.
              </li>
            </ol>
            <h2>Open roles</h2>
            <p>
              Open roles are listed here when we have them. If nothing is listed, speculative
              applications are still welcome.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

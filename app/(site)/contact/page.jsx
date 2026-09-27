import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { FaqList } from "../_components/blocks";
import FormStatus from "./form-status";
import { getCollection } from "../../../lib/content.mjs";
import { ORG_ID, breadcrumbSchema, faqSchema, graph, pageMetadata } from "../../../lib/seo.mjs";
import { SITE, absoluteUrl } from "../../../lib/site.mjs";

const TITLE = "Contact Meritbyte Technologies | Start a Project";
const DESCRIPTION =
  "Tell Meritbyte Technologies what you are building. A person replies within one business day with questions, a scope and a fixed price for the first milestone.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
  keywords: ["contact meritbyte", "hire web developer", "website quote", "start a project"]
});

const COUNTRIES = ["Nepal", "USA", "Australia", "Canada", "UK", "New Zealand", "UAE", "Singapore"];

const FAQS = [
  {
    question: "What should I include in my first message?",
    answerText:
      "What you have now, what you want instead, and when you need it. If you have a budget range, include it: it changes the shape of what we propose more than anything else. Links to your current site, examples you like and any documents help, but a few plain lines are enough to start."
  },
  {
    question: "How quickly will you reply?",
    answerText:
      "A person replies within one business day, Nepal time. The reply is either questions, a proposal for a short call, or an honest answer that we are not the right fit, with a suggestion of who might be."
  },
  {
    question: "Will you sign an NDA?",
    answerText:
      "Yes. Say the word and we will sign yours, or send ours, before you share anything confidential."
  }
];

export default function ContactPage() {
  const services = getCollection("services");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" }
  ];
  const schema = graph(
    {
      "@type": "ContactPage",
      "@id": `${absoluteUrl("/contact")}#webpage`,
      url: absoluteUrl("/contact"),
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": ORG_ID }
    },
    faqSchema(FAQS),
    breadcrumbSchema(crumbs)
  );
  const tel = SITE.phone ? SITE.phone.replace(/[^+\d]/g, "") : "";

  return (
    <>
      <JsonLd data={schema} />
      <main id="main">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>
        <section className="page-hero" id="enquiry">
          <div className="container contact__grid">
            <div>
              <p className="label">Contact</p>
              <h1 className="signup__title">Tell us what you are building.</h1>
              <p className="signup__lead">
                Write a few lines about what you have now, what you want instead and when you
                need it. You get back questions or a scope, a timeline and a fixed price for the
                first milestone. There is no paid discovery phase between you and that answer.
              </p>
              <dl className="contact__aside contact__aside--flat">
                <dt>Email</dt>
                <dd>
                  <a className="textlink" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </dd>
                {SITE.phone ? (
                  <>
                    <dt>Phone and WhatsApp</dt>
                    <dd>
                      <a className="textlink" href={`tel:${tel}`}>
                        {SITE.phone}
                      </a>
                      {SITE.whatsapp ? (
                        <>
                          {" · "}
                          <a
                            className="textlink"
                            href={`https://wa.me/${SITE.whatsapp}`}
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </>
                      ) : null}
                    </dd>
                  </>
                ) : null}
                <dt>Response</dt>
                <dd>A person replies within one business day (Nepal time, UTC+5:45).</dd>
                <dt>Where we are</dt>
                <dd>Nepal. We work with clients across Nepal and, remotely, worldwide.</dd>
                <dt>Small business, no website yet?</dt>
                <dd>
                  <a className="textlink" href="/free-website">
                    Get a free website design idea
                  </a>
                </dd>
              </dl>
            </div>

            <div className="signup__panel">
              <form className="signup__form contact-form" method="post" action="/api/contact">
                <h2>Start a project</h2>
                <FormStatus />
                <label>
                  Your name
                  <input name="name" autoComplete="name" required maxLength={80} />
                </label>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required maxLength={254} />
                </label>
                <label>
                  <span>
                    Company <span className="signup__optional">(optional)</span>
                  </span>
                  <input name="company" autoComplete="organization" maxLength={120} />
                </label>
                <label>
                  <span>
                    Country <span className="signup__optional">(optional)</span>
                  </span>
                  <input name="country" list="countries" autoComplete="country-name" maxLength={60} />
                  <datalist id="countries">
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </label>
                <label>
                  What do you need?
                  <select name="service" defaultValue="">
                    <option value="">Not sure yet</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>
                    Budget range <span className="signup__optional">(optional)</span>
                  </span>
                  <input name="budget" maxLength={60} placeholder="For example NPR 2,00,000 or USD 8,000" />
                </label>
                <label>
                  About the project
                  <textarea name="message" required maxLength={5000} />
                </label>

                {/* Hidden from people; bots fill it in. */}
                <label className="signup__trap" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                <button className="button" type="submit">
                  Send
                </button>
                <p className="signup__fine">
                  We use these details only to reply to you. See our{" "}
                  <a className="textlink" href="/privacy">
                    privacy notice
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="listing">
          <div className="container">
            <FaqList faqs={FAQS} heading="Before you write" />
          </div>
        </section>
      </main>
    </>
  );
}

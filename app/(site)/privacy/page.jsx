import Breadcrumbs from "../_components/breadcrumbs";
import JsonLd from "../_components/json-ld";
import { breadcrumbSchema, graph, pageMetadata, webPageSchema } from "../../../lib/seo.mjs";
import { SITE } from "../../../lib/site.mjs";

const TITLE = "Privacy Notice | Meritbyte Technologies";
const DESCRIPTION =
  "What personal data meritbyte.com collects through its contact form, free design sign-up and newsletter, why, which providers handle it, and how to have it removed.";
const UPDATED = "27 September 2026";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/privacy" });

export default function PrivacyPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" }
  ];
  const schema = graph(
    webPageSchema({ path: "/privacy", title: TITLE, description: DESCRIPTION }),
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
          <div className="container">
            <p className="label">Privacy</p>
            <h1>Privacy notice</h1>
            <p className="page-hero__lead">
              What this website collects, why, who handles it for us, and how to have it removed.
              Last updated {UPDATED}.
            </p>
          </div>
        </section>
        <section className="article">
          <div className="container text-page">
            <h2>Who we are</h2>
            <p>
              This website is run by Meritbyte Technologies, an IT company based in Nepal. For
              anything in this notice, write to{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <h2>What we collect and why</h2>
            <h3>Contact form</h3>
            <p>
              When you send the form on the <a href="/contact">contact page</a>, we receive your
              name, email address, and whatever else you choose to give us (company, country,
              service, budget and your message), along with the IP address the request came
              from. It is delivered to us as an email so we can reply. We use it only to answer
              you and, if you hire us, to run the project.
            </p>
            <h3>Free website design sign-up</h3>
            <p>
              The <a href="/free-website">free website design</a> form asks for your name,
              business name, email address and, optionally, phone number and city. We first email
              you a confirmation link; nothing is kept until you confirm. When you confirm, we
              keep your details with a record of your consent (the wording you agreed to, and when
              and from which IP address you submitted and confirmed) so we can send your design
              and occasional emails about websites and apps.
            </p>
            <h3>Newsletter</h3>
            <p>
              The subscribe form asks for your business name and email address. We store them
              with a record of your consent (the wording, the time, your IP address and browser
              user agent) and use them to send occasional emails. Every email has an unsubscribe
              link, and unsubscribing stops all emails.
            </p>
            <h3>Stored in your browser</h3>
            <p>
              The site saves two small values in your browser&apos;s local storage: your light or
              dark theme choice, and whether you have closed or used the subscribe window, so it
              does not keep asking. They never leave your device. This site does not use
              advertising cookies.
            </p>

            <h2>Who handles it for us</h2>
            <ul>
              <li>
                <strong>Vercel</strong> hosts the website. Like any web host, it processes IP
                addresses and request logs to serve and protect the site.
              </li>
              <li>
                <strong>Resend</strong> delivers our emails: form messages to us, and confirmation
                emails to you.
              </li>
              <li>
                <strong>Brevo</strong> holds the list of confirmed free design sign-ups.
              </li>
              <li>
                <strong>Supabase</strong> holds the newsletter list.
              </li>
              <li>
                The home page loads its fonts from <strong>Google Fonts</strong> and a 3D
                graphics library from the <strong>jsDelivr</strong> content network, which see
                your IP address when your browser fetches those files.
              </li>
            </ul>
            <p>These providers may process data outside Nepal. We never sell or share your details for anyone else&apos;s marketing.</p>

            <h2>How long we keep it</h2>
            <p>
              Enquiries are kept as long as needed to answer them and, for clients, as part of
              the project and accounting records. Newsletter and sign-up details are kept until
              you unsubscribe or ask us to delete them; we keep the record that you unsubscribed
              so we do not email you again.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You can ask to see, correct or delete the personal data we hold about you, or
              withdraw consent to emails at any time, by writing to{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or using the unsubscribe link in
              any email. Depending on where you live, for example under Nepal&apos;s Individual
              Privacy Act 2075, the UK GDPR, the EU GDPR, Australia&apos;s Privacy Act 1988 or
              Canada&apos;s PIPEDA, you may have further rights, including complaining to your
              local data protection authority.
            </p>

            <h2>Changes</h2>
            <p>
              If we change how we handle personal data, we will update this page and the date at
              the top.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

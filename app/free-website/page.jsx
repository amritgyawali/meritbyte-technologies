import { CONSENT_TEXT } from "../../lib/signup";
import SiteBar from "./site-bar";

export const metadata = {
  title: "Free website design for your business | Meritbyte Technologies",
  description:
    "Tell us about your business and we will send you a free design idea for its website. No payment, no obligation."
};

const ERRORS = {
  email: "That email address does not look right. Please check it and try again.",
  missing: "Please fill in your name and your business name.",
  consent: "Please tick the box so we are allowed to email you the design.",
  send: "We could not send the confirmation email just now. Please try again in a few minutes, or write to ceo@meritbyte.com.",
  link: "That confirmation link is invalid or older than 7 days. Please fill in the form again."
};

const included = [
  "A home page design made for your business, with your name, services and photos",
  "A page layout that works on a phone, where most of your customers will see it",
  "Ideas for online booking, ordering or WhatsApp enquiries",
  "A clear price if you decide to go ahead, and no pressure if you do not"
];

export default async function FreeWebsitePage({ searchParams }) {
  const params = (await searchParams) || {};
  const sent = params.sent === "1";
  const confirmed = params.confirmed === "1";
  const error = ERRORS[params.error] || "";

  return (
    <>
      <SiteBar />
      <main id="main" className="section signup">
        <div className="container signup__grid">
          <div>
            <p className="label">Free offer for local businesses</p>
            <h1 className="signup__title">A free website design for your business.</h1>
            <p className="signup__lead">
              Tell us a little about your business. We will design how its website could look
              and email the idea to you. It costs nothing and you are not committing to
              anything.
            </p>
            <ul className="signup__list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="signup__panel">
            {confirmed ? (
              <div className="signup__state" role="status">
                <h2>You are confirmed.</h2>
                <p>
                  Thank you. We will send your free design idea to your email, usually within
                  one business day.
                </p>
                <p>
                  <a className="textlink" href="/">
                    Back to the home page
                  </a>
                </p>
              </div>
            ) : sent ? (
              <div className="signup__state" role="status">
                <h2>Check your email.</h2>
                <p>
                  We sent you a message with a confirmation link. Open it and press
                  <strong> Confirm</strong> so we know the address is yours.
                </p>
                <p>If it is not in your inbox within a few minutes, look in Spam or Promotions.</p>
              </div>
            ) : (
              <form className="signup__form" method="post" action="/api/signup">
                <h2>Get your free design</h2>
                {error ? (
                  <p className="signup__error" role="alert">
                    {error}
                  </p>
                ) : null}

                <label>
                  Your name
                  <input name="name" autoComplete="name" required maxLength={80} />
                </label>
                <label>
                  Business name
                  <input name="business" autoComplete="organization" required maxLength={120} />
                </label>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required maxLength={254} />
                </label>
                <label>
                  Phone or WhatsApp <span className="signup__optional">(optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
                </label>
                <label>
                  City <span className="signup__optional">(optional)</span>
                  <input name="city" autoComplete="address-level2" maxLength={60} />
                </label>

                {/* Hidden from people; bots fill it in. */}
                <label className="signup__trap" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                <label className="signup__consent">
                  <input type="checkbox" name="consent" value="yes" required />
                  <span>{CONSENT_TEXT}</span>
                </label>

                <button className="button" type="submit">
                  Send me the free design
                </button>
                <p className="signup__fine">
                  We use these details only to send your design and our emails about websites and
                  apps. We never sell or share them. Every email has an unsubscribe link, or write
                  to ceo@meritbyte.com and we will remove you.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

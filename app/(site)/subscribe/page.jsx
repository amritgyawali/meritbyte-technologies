import SiteBar from "../free-website/site-bar";

export const metadata = {
  title: "Subscribe | Meritbyte Technologies",
  description:
    "Subscribe your business to occasional emails from Meritbyte Technologies with practical ideas for websites and apps."
};

const topics = [
  "Simple ways to get more customers from Google and social media",
  "What a website or booking app would cost for a business like yours",
  "Examples of sites we have built for local businesses",
  "One email now and then, never a flood, and an unsubscribe link in each one"
];

// The popup (mounted in the root layout) opens by itself on this page.
// The button reopens it for anyone who closed it.
export default function SubscribePage() {
  return (
    <>
      <SiteBar />
      <main id="main" className="section signup">
        <div className="container signup__grid">
          <div>
            <p className="label">Newsletter for businesses</p>
            <h1 className="signup__title">Website and app ideas for your business.</h1>
            <p className="signup__lead">
              Leave your business name and email and we will write to you now and then with
              ideas that help a business get found and booked online.
            </p>
            <ul className="signup__list">
              {topics.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="signup__panel signup__state">
            <h2>Subscribe in one step</h2>
            <p>Business name, email, one tick box. That is all we ask for.</p>
            <button type="button" className="button" data-open-subscribe>
              Subscribe
            </button>
            <p className="signup__fine">
              We never sell or share your email. Every email has an unsubscribe link.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

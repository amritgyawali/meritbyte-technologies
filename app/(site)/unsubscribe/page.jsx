import SiteBar from "../free-website/site-bar";

export const metadata = {
  title: "Unsubscribe | Meritbyte Technologies",
  robots: { index: false }
};

const ERRORS = {
  link: "This unsubscribe link is not valid. Reply to any of our emails with the word remove and we will take you off the list.",
  server: "We could not update your subscription just now. Please press the button again in a minute."
};

// Unsubscribing takes a button press (a POST to /api/unsubscribe), so mail
// scanners that open every link in an email cannot unsubscribe anyone.
export default async function UnsubscribePage({ searchParams }) {
  const params = (await searchParams) || {};
  const token = typeof params.t === "string" ? params.t : "";
  const done = params.done === "1";
  const error = ERRORS[params.error] || "";

  return (
    <>
      <SiteBar />
      <main id="main" className="section signup">
        <div className="container signup__narrow">
          <div className="signup__panel signup__state">
            {done ? (
              <>
                <h1 className="subscribe__pagetitle">You are unsubscribed.</h1>
                <p>We will not send you any more emails. Sorry to see you go.</p>
                <p>
                  <a className="textlink" href="/">
                    Back to the home page
                  </a>
                </p>
              </>
            ) : (
              <>
                <h1 className="subscribe__pagetitle">Unsubscribe</h1>
                {error ? (
                  <p className="signup__error" role="alert">
                    {error}
                  </p>
                ) : null}
                {token ? (
                  <form method="post" action="/api/unsubscribe" className="signup__state">
                    <input type="hidden" name="t" value={token} />
                    <p>Press the button to stop all emails from Meritbyte Technologies.</p>
                    <button type="submit" className="button">
                      Unsubscribe me
                    </button>
                  </form>
                ) : (
                  <p>
                    Use the unsubscribe link at the bottom of any email we sent you, or reply to
                    it with the word remove.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

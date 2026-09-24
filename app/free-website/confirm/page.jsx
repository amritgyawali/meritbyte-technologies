import { readToken } from "../../../lib/signup";
import SiteBar from "../site-bar";

export const metadata = {
  title: "Confirm your free website design | Meritbyte Technologies",
  robots: { index: false }
};

export default async function ConfirmPage({ searchParams }) {
  const params = (await searchParams) || {};
  const token = typeof params.t === "string" ? params.t : "";
  let payload = null;
  try {
    payload = readToken(token);
  } catch {
    payload = null;
  }

  return (
    <>
      <SiteBar />
      <main id="main" className="section signup">
        <div className="container signup__narrow">
          {payload ? (
            <form className="signup__form" method="post" action="/api/signup/confirm">
              <p className="label">One last step</p>
              <h1 className="signup__title">Confirm your free website design</h1>
              <p className="signup__lead">
                Press Confirm and we will send the design idea for{" "}
                <strong>{payload.business}</strong> to <strong>{payload.email}</strong>.
              </p>
              <input type="hidden" name="t" value={token} />
              <button className="button" type="submit">
                Confirm
              </button>
            </form>
          ) : (
            <div className="signup__state">
              <h1 className="signup__title">This link has expired.</h1>
              <p className="signup__lead">
                Confirmation links work for 7 days. Please fill in the form again.
              </p>
              <p>
                <a className="button" href="/free-website">
                  Go to the form
                </a>
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

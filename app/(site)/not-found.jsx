export const metadata = {
  title: "Page not found | Meritbyte Technologies",
  robots: { index: false }
};

export default function NotFound() {
  return (
    <main id="main" className="section signup">
      <div className="container signup__narrow">
        <p className="label">404</p>
        <h1 className="signup__title">That page is not here.</h1>
        <p className="signup__lead">
          It may have moved, or the link may be mistyped. These are good places to continue:
        </p>
        <ul className="signup__list">
          <li>
            <a className="textlink" href="/services">
              Services
            </a>
          </li>
          <li>
            <a className="textlink" href="/website-developer">
              Locations we work in
            </a>
          </li>
          <li>
            <a className="textlink" href="/blog">
              Blog
            </a>
          </li>
          <li>
            <a className="textlink" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}

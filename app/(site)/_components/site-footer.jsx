import { getCollection } from "../../../lib/content.mjs";
import { SITE } from "../../../lib/site.mjs";

const COMPANY = [
  { href: "/about", label: "About Meritbyte" },
  { href: "/process", label: "How we work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/free-website", label: "Free website design" },
  { href: "/subscribe", label: "Newsletter" },
  { href: "/privacy", label: "Privacy" }
];

export default function SiteFooter() {
  const services = getCollection("services");
  const countries = getCollection("locations").filter((l) => l.type === "country");
  const industries = getCollection("industries");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid footer__grid--wide">
          <div>
            <a className="wordmark" href="/">
              <span className="wordmark__name">Meritbyte</span>
              <span className="wordmark__suffix">Technologies</span>
            </a>
            <p className="footer__blurb">
              A Nepal-based IT company building websites, software, apps and AI tools, and doing
              the SEO, marketing and cloud work around them, for businesses in Nepal and abroad.
            </p>
            <p className="footer__contact">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              {SITE.phone ? (
                <>
                  <br />
                  <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
                </>
              ) : null}
            </p>
          </div>

          <div className="footer__col">
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>Website developer in</h2>
            <ul>
              {countries.map((l) => (
                <li key={l.slug}>
                  <a href={`/website-developer/${l.slug}`}>{l.name}</a>
                </li>
              ))}
              <li>
                <a href="/website-developer">All locations</a>
              </li>
            </ul>
            <h2 className="footer__subhead">Industries</h2>
            <ul>
              {industries.map((i) => (
                <li key={i.slug}>
                  <a href={`/industries/${i.slug}`}>{i.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2>Company</h2>
            <ul>
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <p>© {new Date().getFullYear()} Meritbyte Technologies. Based in Nepal, working worldwide.</p>
          <p>
            <a href="/feed.xml">RSS</a> · <a href="/sitemap.xml">Sitemap</a> ·{" "}
            <a href="/llms.txt">llms.txt</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

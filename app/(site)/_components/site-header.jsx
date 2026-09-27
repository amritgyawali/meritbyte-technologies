import ThemeToggle from "../theme-toggle";

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/website-developer", label: "Locations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

// The menu is a <details> element, so it opens and closes without JavaScript.
export default function SiteHeader() {
  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <a className="wordmark" href="/" aria-label="Meritbyte Technologies, home">
          <span className="wordmark__name">Meritbyte</span>
          <span className="wordmark__suffix">Technologies</span>
        </a>
        <nav className="masthead__nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="masthead__actions">
          <ThemeToggle />
          <a className="button masthead__cta" href="/contact">
            Start a project
          </a>
          <details className="menu">
            <summary className="menu__toggle">
              <span className="menu__open">Menu</span>
              <span className="menu__close">Close</span>
            </summary>
            <nav className="menu__panel" aria-label="Mobile">
              {NAV.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              <a href="/contact">Contact</a>
              <a className="button" href="/contact">
                Start a project
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

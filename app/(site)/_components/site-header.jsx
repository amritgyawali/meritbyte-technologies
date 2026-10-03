import ThemeToggle from "../theme-toggle";
import { MOBILE_EXTRAS, primaryNav } from "../../../lib/navigation.mjs";

// Top-level items are links to real pages. On wide screens with a mouse,
// hovering one shows its dropdown; keyboard and touch users go to the hub page,
// which lists the same links. The phone menu is a <details> element, so it
// opens and closes without JavaScript.
export default function SiteHeader() {
  const nav = primaryNav();
  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <a className="wordmark" href="/" aria-label="Meritbyte Technologies, home">
          <span className="wordmark__name">Meritbyte</span>
          <span className="wordmark__suffix">Technologies</span>
        </a>
        <nav className="masthead__nav" aria-label="Primary">
          <ul className="nav">
            {nav.map((item) => (
              <li key={item.href} className={`nav__item${item.children ? " nav__item--menu" : ""}`}>
                <a className="nav__link" href={item.href}>
                  {item.label}
                </a>
                {item.children ? (
                  <div className="nav__drop">
                    <div className="nav__panel">
                      <ul className={`nav__list${item.children.length > 8 ? " nav__list--cols" : ""}`}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a href={child.href}>{child.label}</a>
                          </li>
                        ))}
                      </ul>
                      {item.footer ? (
                        <a className="nav__footer" href={item.footer.href}>
                          {item.footer.label} <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
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
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              {MOBILE_EXTRAS.map((item) => (
                <a key={item.href} className="menu__extra" href={item.href}>
                  {item.label}
                </a>
              ))}
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

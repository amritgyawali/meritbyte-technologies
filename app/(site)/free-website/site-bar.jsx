import ThemeToggle from "../theme-toggle";

export default function SiteBar() {
  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <a className="wordmark" href="/">
          <span className="wordmark__name">Meritbyte</span>
          <span className="wordmark__suffix">Technologies</span>
        </a>
        <nav className="masthead__nav" aria-label="Primary">
          <a href="/#practices">Practices</a>
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <a href="/#contact">Contact</a>
          <a href="/subscribe">Subscribe</a>
        </nav>
        <div className="masthead__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

const STORAGE_KEY = "meritbyte-theme";

export default function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing blocks storage; the page still switches for this visit.
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="theme-toggle__to-dark">Dark</span>
      <span className="theme-toggle__to-light">Light</span>
    </button>
  );
}

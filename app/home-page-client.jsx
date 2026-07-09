"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "meritbyte-theme";
const THEME_COLORS = {
  dark: {
    accent: "#55E0FF",
    accent2: "#8F7BFF"
  },
  light: {
    accent: "#0085A8",
    accent2: "#5A43C7"
  }
};

function loadScript(src, id) {
  if (id === "three-r128" && window.THREE) return Promise.resolve();
  if (id === "nexus-scene-script" && customElements.get("nexus-scene")) {
    return Promise.resolve();
  }

  const existing = document.getElementById(id);
  if (existing?.dataset.loaded === "true") return Promise.resolve();

  return new Promise((resolve, reject) => {
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function resolveTheme(mode) {
  return mode === "light" ? "light" : "dark";
}

function getSavedTheme() {
  try {
    return resolveTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return "dark";
  }
}

function setAccentVars(accent) {
  const h = accent.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const rgba = (alpha) => `rgba(${r},${g},${b},${alpha})`;
  const st = document.documentElement.style;

  st.setProperty("--ac", accent);
  st.setProperty("--ac25", rgba(0.25));
  st.setProperty("--ac12", rgba(0.12));
  st.setProperty("--ac45", rgba(0.45));
}

function applyTheme(mode) {
  const theme = resolveTheme(mode);
  const colors = THEME_COLORS[theme];
  const st = document.documentElement.style;

  document.documentElement.dataset.theme = theme;
  st.colorScheme = theme;
  st.setProperty("--ac2", colors.accent2);
  setAccentVars(colors.accent);

  const scene = document.querySelector("nexus-scene");
  if (scene) {
    scene.setAttribute("accent", colors.accent);
    scene.setAttribute("accent2", colors.accent2);
  }
}

function updateThemeToggle(mode) {
  const theme = resolveTheme(mode);
  const button = document.getElementById("nx-theme-toggle");
  if (!button) return;

  const isLight = theme === "light";
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";
  button.setAttribute("aria-pressed", String(isLight));
  button.setAttribute("aria-label", label);
  button.title = label;
}

function setTheme(mode, { persist = true } = {}) {
  const theme = resolveTheme(mode);

  applyTheme(theme);
  updateThemeToggle(theme);

  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme still works for the current page if storage is unavailable.
    }
  }

  return theme;
}

export default function HomePageClient({ markup }) {
  useEffect(() => {
    let disposed = false;
    let revealFrame = 0;
    let observer = null;
    let currentTheme = setTheme(getSavedTheme(), { persist: false });

    const onScroll = () => {
      const nav = document.getElementById("nx-nav");
      if (!nav) return;

      const deep = window.scrollY > 40;
      nav.style.background = deep ? "var(--nav-bg-deep)" : "var(--nav-bg)";
      nav.style.borderBottomColor = deep
        ? "var(--nav-border-deep)"
        : "var(--nav-border)";
    };

    const onThemeToggle = () => {
      currentTheme = setTheme(currentTheme === "light" ? "dark" : "light");
      onScroll();
    };

    const themeButton = document.getElementById("nx-theme-toggle");
    themeButton?.addEventListener("click", onThemeToggle);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    revealFrame = requestAnimationFrame(() => {
      if (disposed) return;

      const els = Array.from(document.querySelectorAll("[data-reveal]"));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.14 }
      );

      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) return;

        el.style.transition =
          "opacity .85s cubic-bezier(.2,.6,.2,1), transform .85s cubic-bezier(.2,.6,.2,1)";
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        observer.observe(el);
      });
    });

    loadScript(
      "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
      "three-r128"
    )
      .then(() => {
        if (!disposed) return loadScript("/nexus.js", "nexus-scene-script");
        return null;
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(revealFrame);
      observer?.disconnect();
      themeButton?.removeEventListener("click", onThemeToggle);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: markup }} />;
}

"use client";

import { useEffect } from "react";

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

function applyTheme(accent = "#55E0FF") {
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

export default function HomePageClient({ markup }) {
  useEffect(() => {
    let disposed = false;
    let revealFrame = 0;
    let observer = null;

    applyTheme();

    const onScroll = () => {
      const nav = document.getElementById("nx-nav");
      if (!nav) return;

      const deep = window.scrollY > 40;
      nav.style.background = deep ? "rgba(4,6,12,.8)" : "rgba(4,6,12,.42)";
      nav.style.borderBottomColor = deep
        ? "rgba(255,255,255,.12)"
        : "rgba(255,255,255,.07)";
    };

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
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: markup }} />;
}

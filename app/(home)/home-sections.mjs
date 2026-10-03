// Markup the home page adds to "Meritbyte Homepage.dc.html" at build time:
// the navigation (from lib/navigation.mjs, so it matches every other page),
// the "where we work" section and the FAQ. The FAQ text here is also the
// FAQPage structured data, so what visitors read and what search engines
// read cannot drift apart.

import { getCollection } from "../../lib/content.mjs";
import { MOBILE_EXTRAS, primaryNav } from "../../lib/navigation.mjs";

export const HOME_FAQS = [
  {
    question: "What is Meritbyte Technologies?",
    answerText:
      "Meritbyte Technologies is an IT company based in Nepal. It designs and builds websites, web apps, online stores, mobile apps, custom software and AI tools, and runs the SEO, digital marketing, cloud hosting and security work around them, for businesses in Nepal and clients in the USA, Australia, Canada, the UK and elsewhere.",
    more: { href: "/about", label: "About Meritbyte" }
  },
  {
    question: "What services does Meritbyte offer?",
    answerText:
      "Six practices: software development, AI applications, web development, digital marketing, SEO (including answer engine and generative engine optimization) and cloud and DevOps. Around them sit website design, e-commerce, WordPress, mobile apps, UI/UX design, QA and testing, cybersecurity, data and BI, and managed IT.",
    more: { href: "/services", label: "All services" }
  },
  {
    question: "Does Meritbyte work with businesses outside Nepal?",
    answerText:
      "Yes. The team works from Nepal and serves clients remotely in the USA, Australia, Canada, the UK, New Zealand, the UAE, Singapore and beyond; there are no offices abroad. Nepal is UTC+5:45, which gives a same-day overlap with Australia, Asia, the Gulf and the UK, and overnight progress for North America.",
    more: { href: "/website-developer", label: "Where we work" }
  },
  {
    question: "How much does a website or software project cost?",
    answerText:
      "It depends on templates, features, integrations and content, so there is no fixed price list. After a free scoping conversation you get a written scope, a timeline and a fixed price for the first milestone. After that, work runs in two-week blocks with a demo at the end of each, and you can stop after any block.",
    more: { href: "/pricing", label: "How pricing works" }
  },
  {
    question: "Who owns the code, domain and accounts?",
    answerText:
      "You do. Repositories, domains, hosting, analytics and ad accounts are set up in your name from the start, with documentation at handover. If you later move the work in-house or to another firm, nothing breaks.",
    more: { href: "/process", label: "How we work" }
  },
  {
    question: "Can Meritbyte guarantee first place on Google or in ChatGPT?",
    answerText:
      "No, and nobody can honestly promise that; Google itself warns against firms that do. What we do instead: fix technical SEO, write pages that answer real questions, add structured data, keep your business facts consistent across the web so AI assistants describe you correctly, and report rankings next to leads and revenue.",
    more: { href: "/services/seo-services", label: "SEO, AEO and GEO services" }
  }
];

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Desktop navigation: each top-level link is a real page; items with children
// get a hover dropdown (see .nx-drop in globals.css).
export function navHtml() {
  const items = primaryNav()
    .map((item) => {
      const link = `<a class="nx-nav__link" href="${esc(item.href)}">${esc(item.label)}</a>`;
      if (!item.children) return `<li class="nx-nav__item">${link}</li>`;
      const cols = item.children.length > 8 ? " nx-drop__list--cols" : "";
      const children = item.children
        .map((c) => `<li><a href="${esc(c.href)}">${esc(c.label)}</a></li>`)
        .join("");
      const footer = item.footer
        ? `<a class="nx-drop__footer" href="${esc(item.footer.href)}">${esc(item.footer.label)} <span aria-hidden="true">→</span></a>`
        : "";
      return `<li class="nx-nav__item nx-nav__item--menu">${link}<div class="nx-drop"><div class="nx-drop__panel"><ul class="nx-drop__list${cols}">${children}</ul>${footer}</div></div></li>`;
    })
    .join("");
  return `<ul class="nx-nav__list">${items}</ul>`;
}

// Phone menu: a <details> element, so it works before any script loads.
export function mobileMenuHtml() {
  const links = [...primaryNav(), ...MOBILE_EXTRAS]
    .map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`)
    .join("");
  return `<details class="nx-menu"><summary class="nx-menu__toggle"><span class="nx-menu__open">Menu</span><span class="nx-menu__close">Close</span></summary><nav class="nx-menu__panel" aria-label="Mobile">${links}<a class="nx-menu__cta" href="/contact">Start a project</a></nav></details>`;
}

const chips = (links) =>
  `<ul class="nx-chips">${links
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
    .join("")}</ul>`;

export function reachHtml() {
  const locations = getCollection("locations");
  const countries = locations
    .filter((l) => l.type === "country")
    .map((l) => ({ href: `/website-developer/${l.slug}`, label: l.name }));
  const cities = locations
    .filter((l) => l.type === "city")
    .map((l) => ({ href: `/website-developer/${l.slug}`, label: l.name }));
  const industries = getCollection("industries").map((i) => ({ href: `/industries/${i.slug}`, label: i.title }));
  const technologies = getCollection("technologies").map((t) => ({
    href: `/technologies/${t.slug}`,
    label: t.title
  }));

  return `<section id="reach" class="nx-section" data-screen-label="Reach">
    <div data-reveal="" class="nx-section__head">
      <p class="nx-eyebrow">WHERE WE WORK</p>
      <h2 class="nx-h2">Built in Nepal. Working worldwide.</h2>
      <p class="nx-lead">Meritbyte Technologies works with businesses across Nepal and, remotely, with clients in the USA, Australia, Canada, the UK, New Zealand, the UAE and Singapore. Same team, same process, wherever you are.</p>
    </div>
    <div class="nx-reach">
      <div data-reveal="" class="nx-reach__col"><h3><a href="/website-developer">Countries</a></h3>${chips(countries)}</div>
      <div data-reveal="" class="nx-reach__col"><h3><a href="/website-developer">Cities</a></h3>${chips(cities)}</div>
      <div data-reveal="" class="nx-reach__col"><h3><a href="/industries">Industries</a></h3>${chips(industries)}</div>
      <div data-reveal="" class="nx-reach__col"><h3><a href="/technologies">Technologies</a></h3>${chips(technologies)}</div>
    </div>
  </section>`;
}

export function faqHtml() {
  const items = HOME_FAQS.map(
    (faq) => `<div data-reveal="" class="nx-faq__item">
        <h3>${esc(faq.question)}</h3>
        <p class="nx-faq__answer">${esc(faq.answerText)}</p>
        <p class="nx-faq__more"><a href="${esc(faq.more.href)}">${esc(faq.more.label)} <span aria-hidden="true">→</span></a></p>
      </div>`
  ).join("");
  return `<section id="faq" class="nx-section" data-screen-label="FAQ">
    <div data-reveal="" class="nx-section__head">
      <p class="nx-eyebrow">QUESTIONS</p>
      <h2 class="nx-h2">Straight answers.</h2>
      <p class="nx-lead">The questions we hear most, answered the way we would on a call. More on the <a href="/faq">FAQ page</a>.</p>
    </div>
    <div class="nx-faq">${items}</div>
  </section>`;
}

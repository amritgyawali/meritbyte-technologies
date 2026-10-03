// The primary navigation, shared by the site header and the home page so both
// menus always list the same pages. Every top-level item is a real page (its
// hub); `children` fill the hover dropdown on wide screens. On phones the menu
// shows the top-level pages, and each hub page lists its children.

import { getCollection } from "./content.mjs";

export function primaryNav() {
  const services = getCollection("services").map((s) => ({ href: `/services/${s.slug}`, label: s.title }));
  const technologies = getCollection("technologies").map((t) => ({
    href: `/technologies/${t.slug}`,
    label: t.title
  }));
  const industries = getCollection("industries").map((i) => ({ href: `/industries/${i.slug}`, label: i.title }));
  const countries = getCollection("locations")
    .filter((l) => l.type === "country")
    .map((l) => ({ href: `/website-developer/${l.slug}`, label: l.name }));

  return [
    {
      href: "/services",
      label: "Services",
      children: services,
      footer: { href: "/hire-developers", label: "Hire dedicated developers" }
    },
    {
      href: "/technologies",
      label: "Technologies",
      children: technologies,
      footer: { href: "/technologies", label: "Our full stack" }
    },
    {
      href: "/industries",
      label: "Industries",
      children: industries,
      footer: { href: "/industries", label: "All industries" }
    },
    {
      href: "/website-developer",
      label: "Locations",
      children: countries,
      footer: { href: "/website-developer", label: "All countries and cities" }
    },
    { href: "/pricing", label: "Pricing" },
    {
      href: "/resources",
      label: "Resources",
      children: [
        { href: "/blog", label: "Blog" },
        { href: "/glossary", label: "Glossary" },
        { href: "/faq", label: "FAQ" },
        { href: "/free-website", label: "Free website design" },
        { href: "/subscribe", label: "Newsletter" }
      ]
    },
    {
      href: "/about",
      label: "About",
      children: [
        { href: "/about", label: "About Meritbyte" },
        { href: "/process", label: "How we work" },
        { href: "/hire-developers", label: "Hire developers" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" }
      ]
    }
  ];
}

// Extra links shown only in the phone menu, under the top-level pages.
export const MOBILE_EXTRAS = [
  { href: "/hire-developers", label: "Hire developers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

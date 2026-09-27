// Business facts used by every page, the structured data and the sitemap.
// Change them here and they change everywhere. Empty values are left out of
// the pages and the schema rather than printed blank.

export const SITE = {
  name: "Meritbyte Technologies",
  shortName: "Meritbyte",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://meritbyte.com").replace(/\/+$/, ""),
  email: "hello@meritbyte.com",
  // International format, used for tel: links and schema.
  phone: "+977-9715555771",
  whatsapp: "9779715555771",
  country: "Nepal",
  countryCode: "NP",
  locale: "en",
  // Profiles on other sites (LinkedIn, Facebook, GitHub, Clutch...). Adding
  // them here puts them in the Organization schema as sameAs links, which
  // helps search engines and AI assistants tie the brand together.
  sameAs: [],
  tagline: "Web, software, AI and search engineering from Nepal",
  description:
    "Meritbyte Technologies is a Nepal-based IT company that designs and builds websites, " +
    "web apps, mobile apps, custom software and AI tools, and handles the SEO, marketing " +
    "and cloud work around them for businesses in Nepal, the USA, Australia, Canada, the UK " +
    "and beyond."
};

// "/" maps to the bare origin, so the home page has one canonical form.
export const absoluteUrl = (path = "/") =>
  path === "/" || path === "" ? SITE.url : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

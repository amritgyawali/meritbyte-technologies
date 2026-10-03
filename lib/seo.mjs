// Page metadata and schema.org structured data (JSON-LD).
//
// Every page builds its <head> with pageMetadata() so titles, descriptions,
// canonical URLs, Open Graph and Twitter cards stay consistent. The schema
// builders describe the same facts to search engines and AI assistants; all of
// them point back at one Organization node (ORG_ID) so the brand is a single
// entity everywhere.

import { getCollection } from "./content.mjs";
import { SITE, absoluteUrl } from "./site.mjs";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const OG_IMAGE = "/og.png";

// Countries named in the Service schema's areaServed.
export const AREAS_SERVED = [
  "Nepal",
  "United States",
  "Australia",
  "Canada",
  "United Kingdom",
  "New Zealand",
  "United Arab Emirates",
  "Singapore"
];

// The metadata both root layouts share: the home page and every other page.
export function baseMetadata() {
  const verification = {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {})
  };
  return {
    metadataBase: new URL(SITE.url),
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "technology",
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: {
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE.name }]
    },
    twitter: { card: "summary_large_image" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" }
      ],
      apple: "/apple-touch-icon.png"
    },
    alternates: {
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE.name} blog` }] }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    },
    ...(Object.keys(verification).length ? { verification } : {})
  };
}

export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  image,
  // True when the route has its own opengraph-image file: Next adds og:image,
  // and Twitter falls back to it.
  generatedImage = false,
  noindex = false
}) {
  const url = absoluteUrl(path);
  const images = generatedImage ? undefined : [{ url: image || OG_IMAGE, width: 1200, height: 630, alt: title }];
  return {
    title: { absolute: title },
    description,
    ...(Array.isArray(keywords) && keywords.length ? { keywords } : {}),
    // Pages replace the layout's alternates, so the feed link is repeated here.
    alternates: {
      canonical: url,
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE.name} blog` }] }
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_US",
      ...(images ? { images } : {}),
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            section,
            authors: [absoluteUrl("/about")]
          }
        : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {})
    },
    // Only set when needed: a page-level robots value replaces the layout's.
    ...(noindex ? { robots: { index: false, follow: true } } : {})
  };
}

export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 512,
      height: 512
    },
    image: absoluteUrl(OG_IMAGE),
    description: SITE.description,
    slogan: SITE.tagline,
    email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    address: { "@type": "PostalAddress", addressCountry: SITE.countryCode },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "Country", name })),
    knowsAbout: [
      "Web development",
      "Website design",
      "E-commerce development",
      "Custom software development",
      "Mobile app development",
      "Artificial intelligence applications",
      "Search engine optimization",
      "Answer engine optimization",
      "Generative engine optimization",
      "Digital marketing",
      "Cloud computing",
      "DevOps",
      "Cybersecurity",
      "UI/UX design"
    ],
    knowsLanguage: ["en", "ne"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT services",
      itemListElement: getCollection("services").map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: absoluteUrl(`/services/${service.slug}`)
        }
      }))
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        ...(SITE.phone ? { telephone: SITE.phone } : {}),
        availableLanguage: ["English", "Nepali"],
        areaServed: AREAS_SERVED
      }
    ],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {})
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID }
  };
}

// items: [{ name, path }], home first.
export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function webPageSchema({ path, title, description, type = "WebPage", about }) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    ...(about ? { about } : {}),
    publisher: { "@id": ORG_ID }
  };
}

export function faqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answerText }
    }))
  };
}

export function serviceSchema({ path, name, description, serviceType, areaServed, keywords }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType: serviceType || name,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: areaServed || AREAS_SERVED.map((country) => ({ "@type": "Country", name: country })),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {})
  };
}

export function articleSchema(post, path) {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#article`,
    headline: post.title,
    description: post.description,
    abstract: post.summary,
    url: absoluteUrl(path),
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: "en",
    wordCount: post.words,
    timeRequired: `PT${post.minutes}M`,
    articleSection: post.categoryName,
    keywords: (post.keywords || []).join(", "),
    image: absoluteUrl(OG_IMAGE),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE.url}/blog#blog` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".answer", ".takeaways"]
    }
  };
}

export function itemListSchema(items) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name
    }))
  };
}

// Wraps nodes in one @graph document, dropping empty ones.
export function graph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter(Boolean)
  };
}

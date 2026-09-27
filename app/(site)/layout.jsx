import { Libre_Franklin, Source_Serif_4 } from "next/font/google";

import "./globals.css";
import SubscribePopup from "../subscribe-popup";
import JsonLd from "./_components/json-ld";
import SiteFooter from "./_components/site-footer";
import SiteHeader from "./_components/site-header";
import { OG_IMAGE, graph, organizationSchema, websiteSchema } from "../../lib/seo.mjs";
import { SITE } from "../../lib/site.mjs";

// Self-hosted by next/font: no request to Google at page load, and fallback
// metrics are adjusted so text does not jump when the font arrives.
const sans = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans"
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-serif"
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: "Meritbyte Technologies | Software, cloud and marketing",
  description:
    "Meritbyte builds custom software, runs the infrastructure under it, and handles the search and campaign work around it. Fixed-price first milestone, then two-week blocks.",
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
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Meritbyte Technologies blog" }] }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(process.env.GOOGLE_SITE_VERIFICATION
            ? { google: process.env.GOOGLE_SITE_VERIFICATION }
            : {}),
          ...(process.env.BING_SITE_VERIFICATION
            ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
            : {})
        }
      }
    : {})
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#15130f" }
  ]
};

const themeBoot = `
try {
  var saved = localStorage.getItem("meritbyte-theme");
  var mode = saved === "dark" || saved === "light"
    ? saved
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = mode;
} catch (e) {
  document.documentElement.dataset.theme = "light";
}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SubscribePopup />
      </body>
    </html>
  );
}

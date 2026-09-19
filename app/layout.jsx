import "./globals.css";

export const metadata = {
  title: "Meritbyte Technologies | Software, cloud and marketing",
  description:
    "Meritbyte builds custom software, runs the infrastructure under it, and handles the search and campaign work around it. Fixed-price first milestone, then two-week blocks."
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

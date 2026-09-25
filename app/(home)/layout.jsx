import "./globals.css";
import "./subscribe.css";
import SubscribePopup from "../subscribe-popup";

export const metadata = {
  title: "Meritbyte | Full-Cycle IT Engineering",
  description:
    "Software, AI, web, marketing, search, and cloud engineering from Meritbyte."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("meritbyte-theme");var m=t==="light"?"light":"dark";document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m;}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark";}'
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <SubscribePopup />
      </body>
    </html>
  );
}

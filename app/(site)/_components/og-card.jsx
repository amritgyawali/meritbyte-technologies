// Social share card (1200x630) with the page's own title, rendered at build
// time by next/og. Used by the opengraph-image files of the content routes.
// Fonts are Source Serif 4 and Libre Franklin (SIL Open Font License).

import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const font = (file) => fs.readFileSync(path.join(process.cwd(), "assets/fonts", file));

const MARK =
  "data:image/svg+xml;base64," +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#04060C"/><rect x="19" y="19" width="26" height="26" rx="5" fill="none" stroke="#55E0FF" stroke-width="3.5" transform="rotate(45 32 32)"/><circle cx="32" cy="32" r="5" fill="#55E0FF"/></svg>'
  ).toString("base64");

export function ogCard({ eyebrow, title, footer = "meritbyte.com" }) {
  const size = title.length > 90 ? 50 : title.length > 60 ? 58 : 66;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf9f5",
          color: "#1c1b18",
          padding: "60px 72px 56px",
          borderBottom: "14px solid #8a3a1e",
          fontFamily: "Franklin"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={MARK} width={52} height={52} alt="" />
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 32 }}>Meritbyte</div>
          <div style={{ display: "flex", fontSize: 15, letterSpacing: 2.5, color: "#75716a" }}>
            TECHNOLOGIES
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 2.5,
              color: "#8a3a1e",
              textTransform: "uppercase"
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Serif",
              fontSize: size,
              lineHeight: 1.1,
              letterSpacing: -0.5,
              maxWidth: 1000
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#4a4740"
          }}
        >
          <div style={{ display: "flex" }}>Web · Software · AI · SEO · Cloud</div>
          <div style={{ display: "flex", color: "#8a3a1e" }}>{footer}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Serif", data: font("SourceSerif4-Semibold.ttf"), weight: 600, style: "normal" },
        { name: "Franklin", data: font("LibreFranklin-Medium.ttf"), weight: 500, style: "normal" }
      ]
    }
  );
}

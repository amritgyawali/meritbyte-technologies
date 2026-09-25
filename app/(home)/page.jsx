import fs from "node:fs";
import path from "node:path";
import HomePageClient from "./home-page-client";

export const dynamic = "force-static";

function getHomeMarkup() {
  const sourcePath = path.join(process.cwd(), "Meritbyte Homepage.dc.html");
  const source = fs.readFileSync(sourcePath, "utf8");
  const match = source.match(/<x-dc[^>]*>([\s\S]*?)<\/x-dc>/i);

  if (!match) {
    throw new Error("Could not find the exported x-dc page markup.");
  }

  return match[1]
    .replace(/<helmet>[\s\S]*?<\/helmet>/i, "")
    .replace(
      /<x-import\b[^>]*component-from-global-scope=["']nexus-scene["'][^>]*>\s*<\/x-import>/i,
      '<nexus-scene accent="#55E0FF" accent2="#8F7BFF" motion="immersive" style="position:fixed;inset:0;z-index:1;pointer-events:none"></nexus-scene>'
    )
    .replace(/<sc-if\b[^>]*>/gi, "")
    .replace(/<\/sc-if>/gi, "");
}

export default function Page() {
  return <HomePageClient markup={getHomeMarkup()} />;
}

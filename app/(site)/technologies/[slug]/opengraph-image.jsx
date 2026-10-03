import { OG_SIZE, OG_TYPE, ogCard } from "../../_components/og-card";
import { getCollection, getEntry } from "../../../../lib/content.mjs";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Technologies, Meritbyte Technologies";

export function generateStaticParams() {
  return getCollection("technologies").map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const tech = getEntry("technologies", slug);
  return ogCard({
    eyebrow: `Technologies · ${tech?.title || ""}`,
    title: tech?.h1 || "Technologies"
  });
}

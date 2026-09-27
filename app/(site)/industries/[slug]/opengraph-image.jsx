import { OG_SIZE, OG_TYPE, ogCard } from "../../_components/og-card";
import { getCollection, getEntry } from "../../../../lib/content.mjs";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Industries, Meritbyte Technologies";

export function generateStaticParams() {
  return getCollection("industries").map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const industry = getEntry("industries", slug);
  return ogCard({
    eyebrow: `Industries · ${industry?.title || ""}`,
    title: industry?.h1 || "Industries"
  });
}

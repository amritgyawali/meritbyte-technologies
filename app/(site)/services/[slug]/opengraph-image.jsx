import { OG_SIZE, OG_TYPE, ogCard } from "../../_components/og-card";
import { getCollection, getEntry } from "../../../../lib/content.mjs";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Services, Meritbyte Technologies";

export function generateStaticParams() {
  return getCollection("services").map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const service = getEntry("services", slug);
  return ogCard({
    eyebrow: `Services · ${service?.title || ""}`,
    title: service?.h1 || "Services"
  });
}

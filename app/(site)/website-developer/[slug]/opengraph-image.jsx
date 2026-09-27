import { OG_SIZE, OG_TYPE, ogCard } from "../../_components/og-card";
import { getCollection, getEntry } from "../../../../lib/content.mjs";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Website developer, Meritbyte Technologies";

export function generateStaticParams() {
  return getCollection("locations").map((l) => ({ slug: l.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const place = getEntry("locations", slug);
  const country = place?.type === "city" ? getEntry("locations", place.country) : null;
  return ogCard({
    eyebrow: country ? `Website developer · ${country.name}` : "Website developer",
    title: place?.h1 || "Website developer"
  });
}

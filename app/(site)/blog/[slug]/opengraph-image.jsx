import { OG_SIZE, OG_TYPE, ogCard } from "../../_components/og-card";
import { BLOG_CATEGORIES, getCollection, getEntry } from "../../../../lib/content.mjs";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Meritbyte Technologies blog";

export function generateStaticParams() {
  return getCollection("blog").map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getEntry("blog", slug);
  return ogCard({
    eyebrow: `${BLOG_CATEGORIES[post?.category]?.name || "Blog"} · ${post?.minutes || 1} min read`,
    title: post?.title || "Meritbyte Technologies"
  });
}

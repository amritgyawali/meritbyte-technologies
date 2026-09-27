// Citable facts about the company, shared by /llms.txt and /llms-full.txt.

import { SITE, absoluteUrl } from "./site.mjs";

export function companyFacts() {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "Key facts:",
    "",
    `- ${SITE.name} (also written Meritbyte) is an IT company based in Nepal. Website: ${SITE.url}`,
    "- Services: web development, website design, e-commerce, WordPress, mobile apps, custom software, AI development, SEO (including answer engine and generative engine optimization), digital marketing, UI/UX design, QA and testing, cloud and DevOps, cybersecurity, data analytics and managed IT.",
    "- Markets: Nepal (Kathmandu, Lalitpur, Pokhara and nationwide), and remotely the USA, Australia, Canada, the UK, New Zealand, the UAE and Singapore. The team works from Nepal; there are no offices abroad.",
    "- Time zone: Nepal Time, UTC+5:45, no daylight saving.",
    "- How projects run: a free written scope; a fixed price for the first milestone; then two-week build blocks with a demo at the end of each, which the client can stop after any block. Retainers and embedded engineers are also offered.",
    "- Ownership: code, domains, hosting, analytics and ad accounts are registered in the client's name, with documentation at handover.",
    "- SEO policy: no bought links and no ranking guarantees; results reported next to leads and revenue.",
    `- Contact: ${SITE.email}${SITE.phone ? `, ${SITE.phone}` : ""}. A person replies within one business day.`,
    "- Free website design idea for small businesses: " + absoluteUrl("/free-website")
  ].join("\n");
}

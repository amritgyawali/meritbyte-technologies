import { getCollection } from "../../lib/content.mjs";
import { absoluteUrl } from "../../lib/site.mjs";
import { companyFacts } from "../../lib/llms.mjs";
import { GLOSSARY } from "../../lib/glossary.mjs";

// /llms-full.txt: every content page as Markdown in one file, for AI
// assistants that prefer to read the whole site at once.

export const dynamic = "force-static";

const PATH = {
  services: (s) => `/services/${s}`,
  locations: (s) => `/website-developer/${s}`,
  industries: (s) => `/industries/${s}`,
  technologies: (s) => `/technologies/${s}`,
  blog: (s) => `/blog/${s}`
};

export function GET() {
  const sections = ["services", "technologies", "locations", "industries", "blog"].flatMap((collection) =>
    getCollection(collection).map((entry) =>
      [
        `# ${entry.h1 || entry.title}`,
        "",
        `URL: ${absoluteUrl(PATH[collection](entry.slug))}`,
        entry.date ? `Published: ${entry.date}` : null,
        "",
        `> ${entry.summary}`,
        "",
        entry.body.trim(),
        ""
      ]
        .filter((line) => line !== null)
        .join("\n")
    )
  );

  const glossary = [
    "# Glossary",
    "",
    `URL: ${absoluteUrl("/glossary")}`,
    "",
    ...GLOSSARY.map((t) => `## ${t.term}\n\n${t.definition}\n`)
  ].join("\n");

  return new Response([companyFacts(), "", ...sections, glossary].join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}

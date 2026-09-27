import { SITE } from "../lib/site.mjs";

// Search engines and AI assistants are all welcome: being crawled by the AI
// crawlers is how the site gets cited in ChatGPT, Claude, Perplexity, Gemini
// and Copilot answers. Only the API and one-off form pages are kept out.
const DISALLOW = ["/api/", "/free-website/confirm", "/unsubscribe"];

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "CCBot",
  "meta-externalagent"
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW }
    ],
    sitemap: `${SITE.url}/sitemap.xml`
  };
}

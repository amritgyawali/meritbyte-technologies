#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others) that
// every page on the live site is new or updated, so they recrawl it soon
// instead of whenever they next get round to it. Bing's index also feeds the
// web answers in Microsoft Copilot and ChatGPT search.
//
// Run after a deploy, once the site is live at SITE.url:
//
//   npm run indexnow                 # every URL in the sitemap
//   npm run indexnow -- /blog/x /    # only these paths
//
// The key is public by design: the engines fetch /<key>.txt from the site to
// confirm the request came from its owner. To rotate it, rename the file in
// public/ and change KEY below.

import { allRoutes } from "../lib/routes.mjs";
import { SITE, absoluteUrl } from "../lib/site.mjs";

const KEY = "53e8bde8270bccb5800055ea5defed5d";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const only = process.argv.slice(2).filter((a) => a.startsWith("/"));
const urls = (only.length ? only : allRoutes().map((r) => r.path)).map((p) => absoluteUrl(p));

const keyLocation = absoluteUrl(`/${KEY}.txt`);
const check = await fetch(keyLocation).catch(() => null);
if (!check?.ok || (await check.text()).trim() !== KEY) {
  console.error(`The key file is not live at ${keyLocation}. Deploy first, then run this again.`);
  process.exit(1);
}

// The protocol accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const urlList = urls.slice(i, i + 10000);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE.url).host, key: KEY, keyLocation, urlList })
  });
  // 200 and 202 both mean accepted.
  console.log(`${res.status} ${res.statusText}: ${urlList.length} URL(s) submitted`);
  if (res.status >= 300) process.exit(1);
}

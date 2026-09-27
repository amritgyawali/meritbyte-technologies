import { allRoutes } from "../lib/routes.mjs";
import { absoluteUrl } from "../lib/site.mjs";

export default function sitemap() {
  return allRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    priority: route.priority
  }));
}

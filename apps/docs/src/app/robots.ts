import { type MetadataRoute } from "next";

import { BASE_URL, IS_PRODUCTION_ENV } from "@/constants/env.js";

export default function robots(): MetadataRoute.Robots {
  // I don't want them to crawl this preview website
  const key = IS_PRODUCTION_ENV ? "allow" : "disallow";
  return {
    rules: [
      { userAgent: "*", [key]: "/" },
      {
        userAgent: "Algolia Crawler",
        allow: "/",
        // there's no reason to crawl the typedoc since it's a separate search
        disallow: "/typedoc",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

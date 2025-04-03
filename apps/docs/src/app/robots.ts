import { type MetadataRoute } from "next";

import { BASE_URL } from "@/constants/env.js";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // I don't want them to crawl this preview website
        disallow: "/",
        // allow: "/",
      },
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

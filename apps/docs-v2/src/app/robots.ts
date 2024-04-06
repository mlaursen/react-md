import { BASE_URL } from "@/constants/env.js";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // I don't want them to crawl this preview website
      disallow: "/",
      // allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

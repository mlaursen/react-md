import { type MetadataRoute } from "next";

import { BASE_URL } from "@/constants/env.js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
  ];
}

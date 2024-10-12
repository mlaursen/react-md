import { BASE_URL } from "@/constants/env.js";
import { type MetadataRoute } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
  ];
}

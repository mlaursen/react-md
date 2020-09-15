import { join, sep } from "path";

import { documentationRoot, src } from "../constants";
import { getPackages, glob } from "../utils";

interface GetRoutesOptions {
  guides: readonly string[];
  changelogs: readonly string[];
  blogs: readonly string[];
}

const replaceIds = (pathname: string, values: readonly string[]): string[] =>
  values.map((value) => pathname.replace("[id]", value.replace(/\..+$/, "")));

export async function getRoutes({
  guides,
  changelogs,
  blogs,
}: GetRoutesOptions): Promise<string[]> {
  const pagesFolder = join(documentationRoot, src, "pages");
  const paths = await glob("**/*.+(ts|tsx)", {
    cwd: pagesFolder,
    ignore: ["api/**/*", "index.ts", "_*"],
  });

  const apiablePackages = getPackages("typescript");
  const demoablePackages = apiablePackages.filter((name) => name !== "layout");
  const sassdocablePackages = getPackages("scss");
  const packages = getPackages();

  const routes = paths
    .flatMap((filePath) => {
      const pathname = `/${filePath
        .replace(new RegExp(sep, "g"), "/")
        .replace(/\..+$/, "")
        .replace("blog/index", "blog")
        .replace(/.+\/index$/, "")}`;

      switch (pathname) {
        case "/":
        case "/404":
        case "/sandbox":
          // don't care about the index and sandbox routes for this
          return "";
        case "/guides/[id]":
          return replaceIds(pathname, guides);
        case "/blog/[id]":
          return replaceIds(pathname, blogs);
        case "/packages/[id]/api":
          return replaceIds(pathname, apiablePackages);
        case "/packages/[id]/demos":
          return replaceIds(pathname, demoablePackages);
        case "/packages/[id]/sassdoc":
          return replaceIds(pathname, sassdocablePackages);
        case "/packages/[id]/installation":
          return replaceIds(pathname, packages);
        case "/packages/[id]/changelog":
          return replaceIds(pathname, changelogs);
        default:
          return pathname;
      }
    })
    .filter(Boolean)
    .sort();

  return Array.from(new Set(routes));
}

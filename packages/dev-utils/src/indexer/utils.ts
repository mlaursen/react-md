import { readFileSync } from "fs-extra";
import { join, sep } from "path";

import { documentationRoot, packagesRoot, src } from "../constants";
import copyFileWithWarning from "../utils/copyFileWithBanner";
import getPackages from "../utils/getPackages";
import glob from "../utils/glob";
import { toTitle } from "../utils/titles";

export async function copySharedToDocs(): Promise<void> {
  const devUtilsSrc = join(packagesRoot, "dev-utils", src);
  const indexerTypes = join(devUtilsSrc, "indexer", "types.ts");
  const docTypesPath = join(
    documentationRoot,
    src,
    "constants",
    "meta",
    "types.ts"
  );
  const titleUtils = join(devUtilsSrc, "utils", "titles.ts");
  const docToTitle = join(documentationRoot, src, "utils", "toTitle.ts");

  await Promise.all([
    copyFileWithWarning(indexerTypes, docTypesPath, "typescript"),
    copyFileWithWarning(titleUtils, docToTitle, "typescript"),
  ]);
}

const replaceIds = (pathname: string, values: string[]): string[] =>
  values.map((value) => pathname.replace("[id]", value.replace(/\..+$/, "")));

export async function getRoutes(): Promise<string[]> {
  const pagesFolder = join(documentationRoot, src, "pages");
  const paths = await glob("**/*.+(ts|tsx)", {
    cwd: pagesFolder,
    ignore: ["api/**/*", "index.ts", "_*"],
  });

  const guidesFolder = join(documentationRoot, src, "guides");
  const guides = await glob("*.md", {
    cwd: guidesFolder,
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
        .replace(/.+\/index$/, "")}`;

      switch (pathname) {
        case "/":
        case "/sandbox":
          // don't care about the index and sandbox routes for this
          return "";
        case "/guides/[id]":
          return replaceIds(pathname, guides);
        case "/packages/[id]/api":
          return replaceIds(pathname, apiablePackages);
        case "/packages/[id]/demos":
          return replaceIds(pathname, demoablePackages);
        case "/packages/[id]/sassdoc":
          return replaceIds(pathname, sassdocablePackages);
        case "/packages/[id]/installation":
          return replaceIds(pathname, packages);
        default:
          return pathname;
      }
    })
    .filter(Boolean)
    .sort();

  return Array.from(new Set(routes));
}

export function getMarkdownForRoute(route: string): string | null {
  let path = "";
  if (route.startsWith("/guides")) {
    path = `${route.substring(1)}.md`.replace(/\//g, sep);
  } else if (route.startsWith("/about")) {
    path = join("components", "About", "README.md");
  } else if (/(overriding-defaults|creating-dynamic-themes)$/.test(route)) {
    const name = toTitle(route.substring(route.lastIndexOf("/") + 1), "");
    path = join("components", "ColorsAndTheming", `${name}.md`);
  } else if (route.endsWith("/installation")) {
    const [, , name] = route.split("/");
    path = join("readmes", `${name}.md`);
  }

  if (!path) {
    return null;
  }

  return readFileSync(join(documentationRoot, src, path), "utf8");
}

export function getTitleForRoute(route: string): string {
  const [name, pkgName] = route.split("/").reverse();
  const title = toTitle(name)
    .replace("V1", "v1")
    .replace("Api", "API")
    .replace("Sassdoc", "SassDoc");

  if (
    /SassDoc|API|Demos/.test(title) ||
    (title === "Installation" && route.startsWith("/packages"))
  ) {
    return `${toTitle(pkgName, "")} ${title}`;
  }

  return title;
}

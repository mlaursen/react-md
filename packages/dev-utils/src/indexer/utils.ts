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

const replaceIds = (pathname: string, values: readonly string[]): string[] =>
  values.map((value) => pathname.replace("[id]", value.replace(/\..+$/, "")));

interface GetRoutesOptions {
  guides: readonly string[];
  changelogs: readonly string[];
}

export async function getRoutes({
  guides,
  changelogs,
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
        .replace(/.+\/index$/, "")}`;

      switch (pathname) {
        case "/":
        case "/404":
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

function pluralize(s: string): string {
  if (s.endsWith("s")) {
    return s;
  }

  return `${s}s`;
}

export function getMarkdownForRoute(route: string): string | null {
  const simpleReadmeMatch = route.match(/^\/(guides)\//);
  const packageMarkdownMatch = route.match(/\/(installation|changelog)$/);

  let path = "";
  if (simpleReadmeMatch) {
    const [, name] = simpleReadmeMatch;
    path = `${route.substring(1)}.md`
      .replace(name, pluralize(name))
      .replace(/\//g, sep);
  } else if (route.startsWith("/about")) {
    path = join("components", "About", "README.md");
  } else if (/(overriding-defaults|creating-dynamic-themes)$/.test(route)) {
    const name = toTitle(route.substring(route.lastIndexOf("/") + 1), "");
    path = join("components", "ColorsAndTheming", `${name}.md`);
  } else if (packageMarkdownMatch) {
    const [, type] = packageMarkdownMatch;
    const [, , packageName] = route.split("/");
    const folder = type === "installation" ? "readmes" : pluralize(type);

    path = join(folder, `${packageName}.md`);
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
    /SassDoc|API|Demos|Changelog/.test(title) ||
    (title === "Installation" && route.startsWith("/packages"))
  ) {
    return `${toTitle(pkgName, "")} ${title}`;
  }

  return title;
}

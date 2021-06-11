import { readFileSync } from "fs-extra";
import log from "loglevel";
import { join, sep } from "path";

import { documentationRoot, src } from "../constants";
import { toId, toTitle } from "../utils";
import { parseDemoRenderer } from "./parseDemoIndex";
import { parseMarkdown } from "./parseMarkdown";
import { parseSassDocAnchors } from "./parseSassDocAnchors";
import {
  DemoMetadata,
  IndexedResult,
  MetadataType,
  RouteMetadata,
  TOCAnchor,
  TOCRecord,
} from "./types";

function pluralize(s: string): string {
  if (s.endsWith("s")) {
    return s;
  }

  return `${s}s`;
}

function getMarkdownForRoute(route: string): string | null {
  const simpleReadmeMatch = route.match(/^\/(blog|guides)\//);
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

function getTitleForRoute(route: string): string {
  const [name, pkgName] = route.split("/").reverse();
  const title = toTitle(name)
    .replace("Cdn", "CDN")
    .replace("V1", "v1")
    .replace("Api", "API")
    .replace("Sassdoc", "SassDoc");

  if (/Demos$/.test(title) && route.includes("form")) {
    return title;
  }

  if (
    /SassDoc|API|Demos|Changelog/.test(title) ||
    (title === "Installation" && route.startsWith("/packages"))
  ) {
    return `${toTitle(pkgName, "")} ${title}`;
  }

  return title;
}

export async function generate(
  routes: readonly string[]
): Promise<IndexedResult> {
  const tocs: TOCRecord = {};
  const metadata: RouteMetadata[] = [];

  routes.forEach((route) => {
    const title = getTitleForRoute(route);
    const markdown = getMarkdownForRoute(route);

    let type: MetadataType;
    let summary = "";
    let demos: readonly DemoMetadata[] = [];
    let anchors: readonly TOCAnchor[] = [];
    if (markdown) {
      if (route.endsWith("/changelog")) {
        type = "changelog";
      } else if (route.startsWith("/blog")) {
        type = "blog";
      } else {
        type = "guide";
      }

      ({ summary, anchors } = parseMarkdown(markdown));
    } else if (title === "Color Palette") {
      type = "theme";
      summary =
        "Learn more about the material design color palette and all the default colors provided.";
    } else if (title === "Theme Builder") {
      type = "theme";
      summary =
        "Create a custom theme for your app and this documentation site using the live preview. The theme builder supports changing the theme colors using the material design color palette as well as warning when there are contrast ratio problems.";
    } else if (/(\/|-)demos$/.test(route)) {
      type = "demos";
      ({ anchors, summary, demos } = parseDemoRenderer(route));
    } else if (/\/(api|sassdoc)$/.test(route)) {
      const [routeType, pkgName] = route.split("/").reverse();
      switch (routeType) {
        case "api":
          type = "api";
          summary = `The component API for the @react-md/${pkgName} package.`;
          break;
        case "sassdoc":
          type = "sassdoc";
          summary = `Documentation for all the SCSS variables, functions, and mixins for the @react-md/${pkgName} package.`;
          anchors = parseSassDocAnchors(pkgName);
          break;
        default:
          throw new Error("This should never happen.");
      }
    } else if (route === "/blog") {
      type = "blog";
      summary = "The latest news about react-md";
    } else {
      throw new Error(`Unhandled route type: "${route}"`);
    }

    if (!summary) {
      log.error(`${route} does not have a summary!`);
      log.error();
    }

    if (anchors.length) {
      tocs[route] = anchors;
    }

    let pageUrl = route;
    if (route.startsWith("/guides")) {
      pageUrl = "/guides/[id]";
    } else if (route.startsWith("/blog/")) {
      pageUrl = "/blog/[id]";
    } else if (route.startsWith("/packages") && !route.endsWith("demos")) {
      const [suffix] = route.split("/").reverse();
      pageUrl = `/packages/[id]/${suffix}`;
    }

    metadata.push({
      title,
      summary,
      type,
      pageUrl,
      pathname: route,
    });
    if (demos.length) {
      const [, pkgName] = route.split("/").reverse();
      demos.forEach(({ title, summary }) => {
        // demo pages aren't dynamic routes
        const pathname = `${route}#${toId(title)}-title`;
        metadata.push({
          title: `${toTitle(pkgName, "")} Demo - ${title}`,
          summary,
          type: "demo",
          pageUrl: pathname,
          pathname,
        });
      });
    }
  });

  return { tocs, metadata };
}

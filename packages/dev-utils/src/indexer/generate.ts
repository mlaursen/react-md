import { readFileSync } from "fs-extra";
import { sync as globSync } from "glob";
import log from "loglevel";
import { join } from "path";

import { documentationRoot } from "../constants";
import { toId, toTitle } from "../utils/titles";
import parseDemoIndex from "./parseDemoIndex";
import parseMarkdown from "./parseMarkdown";
import parseSassDocAnchors from "./parseSassDocAnchors";
import {
  DemoMetadata,
  IndexedResult,
  MetadataType,
  RouteMetadata,
  TOCAnchor,
  TOCRecord,
} from "./types";
import { getMarkdownForRoute, getTitleForRoute } from "./utils";

export default async function generate(
  routes: readonly string[]
): Promise<IndexedResult> {
  const tocs: TOCRecord = {};
  const metadata: RouteMetadata[] = [];

  routes.forEach((route) => {
    if (route.endsWith("/changelog")) {
      return;
    }

    const title = getTitleForRoute(route);
    const markdown = getMarkdownForRoute(route);

    let type: MetadataType;
    let summary = "";
    let demos: readonly DemoMetadata[] = [];
    let anchors: readonly TOCAnchor[] = [];
    if (markdown) {
      type = "guide";
      ({ summary, anchors } = parseMarkdown(markdown));
    } else if (title === "Color Palette") {
      type = "theme";
      summary =
        "Learn more about the material design color palette and all the default colors provided.";
    } else if (title === "Theme Builder") {
      type = "theme";
      summary =
        "Create a custom theme for your app and this documentation site using the live preview. The theme builder supports changing the theme colors using the material design color palette as well as warning when there are contrast ratio problems.";
    } else if (route.endsWith("/demos")) {
      type = "demos";
      ({ anchors, summary, demos } = parseDemoIndex(route));
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

  const changelogs = globSync("src/changelogs/**/*.md", {
    cwd: documentationRoot,
  });

  changelogs.forEach((changelogPath) => {
    const packageName = changelogPath.replace(/.*\/((\w+)(-\w+)*).*/, "$1");
    const changelog = readFileSync(
      join(documentationRoot, changelogPath),
      "utf8"
    );
    const { summary, anchors } = parseMarkdown(changelog);

    const pageUrl = "/packages/[id]/changelog";
    const pathname = `/packages/${packageName}/changelog`;
    if (!summary) {
      log.error(`${pathname} does not have a summary!`);
      log.error();
    }

    metadata.push({
      title: `${toTitle(packageName, "")} Changelog`,
      summary,
      type: "changelog",
      pageUrl,
      pathname,
    });
    tocs[pathname] = anchors;
  });

  return { tocs, metadata };
}

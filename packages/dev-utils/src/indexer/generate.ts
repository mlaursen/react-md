import log from "loglevel";
import parseDemoIndex from "./parseDemoIndex";
import parseMarkdown from "./parseMarkdown";
import {
  TOCAnchor,
  DemoMetadata,
  MetadataType,
  TOCRecord,
  RouteMetadata,
  IndexedResult,
} from "./types";
import { getMarkdownForRoute, getTitleForRoute } from "./utils";
import { toTitle, toId } from "../utils/titles";
import parseSassDocAnchors from "./parseSassDocAnchors";

export default async function generate(
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

  return { tocs, metadata };
}

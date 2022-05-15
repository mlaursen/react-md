import { upperFirst } from "lodash";

/**
 * A simple utility that converts some string into a page/section title. This
 * really just capitalizes each word in the string after it has been split by
 * hyphens or capital letters.
 *
 * @param s - The string to convert to a title.
 * @param joinWith - A string that should be used to join all the parts together
 * to create a title.
 * @param capitals - Boolean if the string should be split on capital letters
 * instead of hyphens.
 * @returns A title-ized string.
 */
export function toTitle(s: string, joinWith = " ", capitals = false): string {
  if (/autocomplete/i.test(s)) {
    return "AutoComplete";
  }

  if (/^api$/i.test(s)) {
    return "API";
  }

  if (/sassdoc/i.test(s)) {
    return "SassDoc";
  }

  if (s === "[id]") {
    // TODO: Fix to use query params instead
    return "Layout";
  }

  return s
    .split(capitals ? /(?=[A-Z])/ : "-")
    .map((part) => {
      if (/^((v\d+)|(to))$/.test(part)) {
        return part;
      }

      if (/^api$/i.test(part)) {
        return "API";
      }

      if (/^cdn$/i.test(part)) {
        return "CDN";
      }

      return upperFirst(part);
    })
    .join(joinWith);
}

/**
 * Converts a pathname into a breadcrumb type of title to display in the
 * documentation site.
 *
 * @param pathname - The current pathname to create a title for
 * @param statusCode - An optional status code to check against for custom error
 * cases.
 * @returns a string to display in the documentation site's breadcrumbs.
 */
export function toBreadcrumbPageTitle(
  pathname: string,
  statusCode?: number
): string {
  let title = "";
  if (statusCode) {
    switch (statusCode) {
      case 404:
        title = "Not Found";
        break;
      default:
        title = "Server error";
    }
  } else if (/v\d+-to-v\d+$/.test(pathname)) {
    const [migration] = pathname.split("/").reverse();
    title = `Migration Guides - ${migration.replace(/-/g, " ")}`;
  } else {
    const parts = pathname.split("/").filter((p) => !!p && !/packages/.test(p));
    title = parts.map((p) => toTitle(p)).join(" - ");
  }

  return `react-md${title ? ` - ${title}` : ""}`;
}

/**
 * This is a utility function that will create a unique id for a title string.
 * The title string should normally be somewhere betwen 5-20 characters.
 *
 * This is generally used to create ids for links within the documentation page
 * for headers to generate quick links and table of contents.
 *
 * @param title - The title to create an id for.
 * @returns an id based on the title
 */
export function toId(title: string): string {
  return title
    .replace(/\/|\\|\[|]|-/g, "")
    .replace(/SCSS/g, "scss ")
    .replace(/CSS/g, "css ")
    .replace(/API/g, "api")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s|(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

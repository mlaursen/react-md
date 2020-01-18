export function upperFirst(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function toTitle(
  s: string,
  joinWith: string = " ",
  capitals: boolean = false
): string {
  if (/autocomplete/i.test(s)) {
    return "AutoComplete";
  }

  if (s === "[id]") {
    // TODO: Fix to use query params instead
    return "Layout";
  }

  return s
    .split(capitals ? /(?=[A-Z])/ : "-")
    .map(upperFirst)
    .join(joinWith);
}

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
  } else {
    const parts = pathname.split("/").filter(p => !!p && !/packages/.test(p));
    title = parts.map(p => toTitle(p)).join(" - ");
  }

  return `react-md@v2${title ? ` - ${title}` : ""}`;
}

export function toGtagTitle(pathname: string, statusCode?: number): string {
  let title = "";
  if (statusCode) {
    switch (statusCode) {
      case 404:
        title = "Not Found";
        break;
      default:
        title = "Server error";
    }
  } else {
    const parts = pathname.split("/").filter(p => !!p && !/packages/.test(p));
    const [last] = parts.reverse();
    title = toTitle(last);
  }

  return title || "homepage";
}

/**
 * This is a utility function that will create a unique id for
 * a "name" string. The name string should be somewhere betwen
 * 5-20 characters.
 */
export function toId(name: string): string {
  return name
    .replace(/\/|\\|\[|]|-/g, "")
    .replace(/\s+/g, " ")
    .split(/\s|(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

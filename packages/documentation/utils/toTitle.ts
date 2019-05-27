export function upperFirst(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function toTitle(
  s: string,
  joinWith: string = " ",
  capitals: boolean = false
) {
  return s
    .split(capitals ? /(?=[A-Z])/ : "-")
    .map(upperFirst)
    .join(joinWith);
}

export function toBreadcrumbPageTitle(pathname: string, statusCode?: number) {
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

  return `react-md${title ? ` - ${title}` : ""}`;
}

/**
 * This is a utility function that will create a unique id for
 * a "name" string. The name string should be somewhere betwen
 * 5-20 characters.
 */
export function toId(name: string) {
  return name
    .replace(/\/|\\|\[|]/g, "")
    .split(/\s|(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

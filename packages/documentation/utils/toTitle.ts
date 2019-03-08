export function upperFirst(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function toTitle(s: string) {
  return s
    .split("-")
    .map(upperFirst)
    .join(" ");
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
    title = parts.map(toTitle).join(" - ");
  }

  return `react-md${title ? ` - ${title}` : ""}`;
}

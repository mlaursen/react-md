import { parse } from "url";

const behavior = process.env.NODE_ENV === "development" ? "auto" : "smooth";

export function smoothScroll(
  top: number,
  element: HTMLElement | Window = window
): void {
  element.scroll({ top, behavior });
}

export function getScrollPosition(pathname: string): number {
  const { hash } = parse(pathname);
  if (!hash) {
    return 0;
  }

  const element = document.getElementById(hash.substring(1));
  const header = document.getElementById("layout-header");
  if (!element || !header) {
    return 0;
  }

  return element.offsetTop - header.offsetHeight;
}

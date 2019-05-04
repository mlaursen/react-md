import { parse } from "url";

export function smoothScroll(
  top: number,
  element: HTMLElement | Window = window
) {
  element.scroll({ top, behavior: "smooth" });
}

export function getScrollPosition(pathname: string) {
  const { hash } = parse(pathname);
  if (!hash) {
    return 0;
  }

  const element = document.getElementById(hash.substring(1));
  const header = document.getElementById("main-app-bar");
  if (!element || !header) {
    return 0;
  }

  return element.offsetTop - header.offsetHeight;
}

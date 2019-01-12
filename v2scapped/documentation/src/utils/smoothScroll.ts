import { polyfill } from "smoothscroll-polyfill";

polyfill();

export default function smoothScroll(top: number, element: HTMLElement | Window = window) {
  element.scroll({ top, behavior: "smooth" });
}

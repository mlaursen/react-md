import { TAB_FOCUSABLE } from "./constants";

/**
 * A simple util that will find all the tab focusable elements within a container element.
 * The container should normally be a specific HTMLElement, but it can also be the entire
 * document if you want to find **all** focusable elements within your page.
 *
 * @param container The container element/document to find focusable elements within.
 * @return A list of HTMLElements that are focusable within the container.
 */
export default function getFocusableElements(
  container: HTMLElement | Document
) {
  return Array.from(container.querySelectorAll<HTMLElement>(TAB_FOCUSABLE));
}

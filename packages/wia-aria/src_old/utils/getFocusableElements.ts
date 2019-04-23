import { PROGRAMATICALLY_FOCUSABLE } from "../constants";

/**
 * A very simple util that will get a list of all the programatically
 * focusable elements within a container element. This is really just
 * useful since it will convert the NodeList to a list.
 *
 * @param container The container element to find focusable elements for.
 * @return a list of focusable elements
 */
export default function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(PROGRAMATICALLY_FOCUSABLE)
  );
}

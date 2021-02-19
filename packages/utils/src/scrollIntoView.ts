import { findSizingContainer } from "./positioning/findSizingContainer";

/**
 * Attempts to scroll an element into view within another container element if
 * needed.  If either the container or element are `null`, nothing will happen.
 *
 * @param container - The container element that should be scrolled if the child
 * element is not within view.
 * @param element - The element that should be visible within the container
 * element's scroll area.
 */
export function scrollIntoView(
  container: HTMLElement | null,
  element: HTMLElement | null
): void {
  element = findSizingContainer(element);
  if (!container || !element) {
    return;
  }

  let { offsetTop } = element;
  if (element.offsetParent !== container) {
    offsetTop -= container.offsetTop;
  }

  const elementBottom = offsetTop + element.offsetHeight;
  const containerBottom = container.offsetHeight + container.scrollTop;
  if (elementBottom > containerBottom) {
    container.scrollTop = elementBottom - container.offsetHeight;
  } else if (offsetTop < container.scrollTop) {
    container.scrollTop = offsetTop;
  }
}

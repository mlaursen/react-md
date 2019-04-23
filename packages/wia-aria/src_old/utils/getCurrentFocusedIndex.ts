import { ACTIVE_DESCENDANT } from "../constants";

/**
 * A util function that will attempt to find the current focused index within
 * a container element. This should normally just be used on keydown events
 * when the focus is managed via `aria-activedescendant` instead of physical
 * page focus, but it does work for both.
 *
 * If the container element has the `aria-activedescendant` attribute set, the
 * index will determined based on whichever focusable element has the same id.
 * Otherwise the index of the target element within the focusable elements will
 * be used.
 *
 * If no matches are found, -1 will be returned
 *
 * @param container The container element to check for the `aria-activedescendant`
 * attribute.
 * @param focusableElements A list of focusable elements to search through
 * @param target The current keyboard target
 * @return the index for the current focused element in the focusable element slist
 * or -1.
 */
export default function getCurrentFocusedIndex(
  container: HTMLElement,
  focusableElements: HTMLElement[],
  target: HTMLElement
) {
  const id = container.getAttribute(ACTIVE_DESCENDANT);
  if (id) {
    return focusableElements.findIndex(el => el.id === id);
  }

  return focusableElements.findIndex(el => el === target);
}

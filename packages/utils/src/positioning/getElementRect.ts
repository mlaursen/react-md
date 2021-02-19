import { Coords } from "./types";

function applyCoords(coord: number | undefined): string {
  return typeof coord === "number" ? `${coord}px` : "";
}

/**
 * This util is used to get the "true" `element.getBoundingClientRect()` that
 * ensures that transitions using tarnsforms don't mess up the sizing so that
 * position calculations are easier to do.
 *
 * @param element - The element to get a rect for.
 * @param coords - An optional object of coordinates to apply to the positioning
 * styles. This should be used when the coords might resize the element since it
 * needs to try to fit within the viewport.
 * @returns either a DOMRect or ClientRect for the element
 * @internal
 */
export function getElementRect(
  element: HTMLElement,
  coords: Coords = {}
): DOMRect | ClientRect {
  const cloned = element.cloneNode(true) as HTMLElement;
  // remove the id so there won't be two elements with the same id on the page
  cloned.removeAttribute("id");

  // remove the role just in case the role would alert screen readers once added
  // to the dom
  cloned.removeAttribute("role");

  // ensure the cloned node won't shift the page or be visible
  cloned.style.position = "fixed";
  cloned.style.visibility = "hidden";

  // reset positionion to get a "pure" calculation. otherwise this will mess up
  // the height and width if the element is able to line wrap.
  cloned.style.left = applyCoords(coords.left);
  cloned.style.top = applyCoords(coords.top);
  cloned.style.right = applyCoords(coords.right);
  cloned.style.bottom = applyCoords(coords.bottom);

  // reset transforms so that custom animations don't mess with the sizing
  cloned.style.webkitTransform = "none";
  cloned.style.transform = "none";

  const parent = element.parentElement || document.body;
  parent.appendChild(cloned);

  const rect = cloned.getBoundingClientRect();
  parent.removeChild(cloned);

  return rect;
}

/**
 * This util is used to get the "true" `element.getBoundingClientRect()` that
 * ensures that transitions using tarnsforms don't mess up the sizing so that
 * position calculations are easier to do.
 */
export default function getElementRect(
  element: HTMLElement | null,
  currentLeft: number,
  currentTop: number
) {
  if (!element) {
    return {
      height: 0,
      width: 0,
      left: currentLeft,
      top: currentTop,
    };
  }

  const cloned = element.cloneNode(true) as HTMLElement;
  // remove the id so there won't be two elements with the same id on the page
  cloned.removeAttribute("id");

  // remove the role just in case the role would alert screen readers once added
  // to the dom
  cloned.removeAttribute("role");

  // ensure the cloned node won't shift the page or be visible
  cloned.style.position = "fixed";
  cloned.style.visibility = "hidden";

  cloned.style.left = `${currentLeft}px`;
  cloned.style.top = `${currentTop}px`;
  // reset the right and bottom to get "base" position again
  cloned.style.right = "";
  cloned.style.bottom = "";

  // reset transforms so that custom animations don't mess with the sizing
  cloned.style.webkitTransform = "none";
  cloned.style.transform = "none";

  const parent = element.parentElement || document.body;
  parent.appendChild(cloned);

  const { height, width, left, top } = cloned.getBoundingClientRect();
  parent.removeChild(cloned);

  return {
    height,
    width,
    left,
    top,
  };
}

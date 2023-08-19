import type { PositionAnchor } from "./types.js";

/** @internal */
export interface XCoordConfig {
  xMargin: number;
  elWidth: number;
  initialX?: number;
  containerRect: DOMRect;
}

/** @internal */
export interface YCoordConfig {
  yMargin: number;
  elHeight: number;
  initialY?: number;
  containerRect: DOMRect;
}

type Left = number;
type Top = number;

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) left of the container element. So the right bounds of the fixed
 * element will be equal to the left bounds of the container element (before the
 * xMargin is applied).
 *
 * @internal
 */
export function getLeftCoord({
  xMargin,
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left) - elWidth - xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-left of the container element. So the left bounds of both the container
 * and fixed elements will overlap (before the xMargin is applied)
 *
 * @internal
 */
export function getInnerLeftCoord({
  xMargin,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left) + xMargin;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * center of the container element. So the center point of the fixed element
 * should be the center point of the container element.
 *
 * Note: Unlike all the other horizontal positioning logic, the center position
 * does not use the xMargin.
 *
 * @internal
 */
export function getCenterXCoord({
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  const containerCenter = containerRect.width / 2;
  const elementCenter = elWidth / 2;
  return (initialX ?? containerRect.left + containerCenter) - elementCenter;
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-right of the container element. So the right bounds for both the
 * container and fixed elements will overlap (before the xMargin is applied).
 *
 * @internal
 */
export function getInnerRightCoord({
  xMargin,
  elWidth,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (
    (initialX ?? containerRect.left + containerRect.width) - elWidth - xMargin
  );
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) right of the container element. So the left bounds of the fixed
 * element will overlap with the right bounds of the container element (before
 * the xMargin is applied).
 *
 * @internal
 */
export function getRightCoord({
  xMargin,
  initialX,
  containerRect,
}: XCoordConfig): Left {
  return (initialX ?? containerRect.left + containerRect.width) + xMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed above the
 * container element. So the bottom bounds of the fixed element will overlap
 * with the top bounds of the container element (before the yMargin is applied).
 *
 * @internal
 */
export function getAboveCoord({
  yMargin,
  initialY,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top) - elHeight - yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed to the top
 * of the container element. So the top bounds for both the container and fixed
 * elements will overlap (before the yMargin is applied).
 *
 * @internal
 */
export function getTopCoord({
  yMargin,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top) + yMargin;
}

/**
 * Creates the `top` style value for an element that should be fixed vertically
 * centered relative to the container element. So the vertical center point for
 * the fixed element should overlap the vertical center point of the container
 * element.
 *
 * Note: Unlike all the other vertical positioning logic, the center position
 * does not use the yMargin.
 *
 * @internal
 */
export function getCenterYCoord({
  yMargin,
  elHeight,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  const containerCenter = containerRect.height / 2;
  const elementCenter = elHeight / 2;
  return (
    (initialY ?? containerRect.top + containerCenter + yMargin) - elementCenter
  );
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the top bounds of the fixed element
 * should overlap the bottom bounds of the container element (before the yMargin
 * is applied).
 *
 * @internal
 */
export function getBottomCoord({
  yMargin,
  initialY,
  elHeight,
  containerRect,
}: YCoordConfig): Top {
  return (
    (initialY ?? containerRect.top + containerRect.height) - elHeight - yMargin
  );
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the bottom bounds of both the container
 * and fixed elements should overlap (before the yMargin is applied).
 *
 * @internal
 */
export function getBelowCoord({
  yMargin,
  initialY,
  containerRect,
}: YCoordConfig): Top {
  return (initialY ?? containerRect.top + containerRect.height) + yMargin;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface TransformOriginOptions extends PositionAnchor {
  transformOriginY?: number;
}

/**
 * This is a simple util that'll generate a css `transform-origin` string so
 * that the fixed element can animate from the correct point based on the
 * provided anchor.
 *
 * @param options - The anchor that should be used to create the transform origin
 * for.
 * @returns the transform origin string
 * @internal
 */
export function getTransformOrigin(options: TransformOriginOptions): string {
  const { transformOriginY: yPosition } = options;

  let x = "0";
  switch (options.x) {
    case "right":
    case "inner-left":
      x = "0";
      break;
    case "center":
      x = "50%";
      break;
    case "left":
    case "inner-right":
      x = "100%";
      break;
    default:
      x = "0";
  }

  let y = "0";
  if (typeof yPosition === "number") {
    y = `${yPosition}px`;
  } else {
    switch (options.y) {
      case "above":
      case "bottom":
        y = "100%";
        break;
      case "center":
        y = "50%";
        break;
      case "below":
      case "top":
        y = "0";
        break;
      default:
        y = "0";
    }
  }

  return `${x} ${y}`;
}

/**
 * Attempts to find a sizing container based on the provided HTMLElement. By
 * default, the sizing element will just be the provided element unless:
 * - the item has a known role within react-md that can target known classes
 * - the item has a `data-sizing-selector` attribute that is a valid query
 *   selector for the nested item.
 *
 * NOTE: The `data-sizing-selector` will be run from the current element instead
 * of the `document`.
 *
 * @param el - The element to find a sizing container for.
 * @returns the sizing container relative to the provided element, or `null` if
 * none could be found.
 * @throws This error will be thrown if using the `data-query-selector` and the
 * query selector does not return an element on the page.
 * @internal
 */
export function findSizingContainer(
  el: HTMLElement | null
): HTMLElement | null {
  if (!el) {
    return null;
  }

  if (/(tree|list)item/.test(el.getAttribute("role") || "")) {
    const content = el.querySelector(
      ".rmd-tree-item__content, .rmd-item-text"
    ) as HTMLElement;
    if (content) {
      return content;
    }
  } else if (el.getAttribute("type") === "file") {
    const label = document.querySelector<HTMLLabelElement>(`[for="${el.id}"]`);
    if (label) {
      return label;
    }
  }

  const data = el.getAttribute("data-sizing-selector");
  if (data) {
    const content = el.querySelector(data) as HTMLElement;
    if (content) {
      return content;
    }

    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        "Unable to find a child element using the `data-sizing-selector`"
      );
    }
  }

  return el;
}

/**
 * This util is used to get the "true" `element.getBoundingClientRect()` that
 * ensures that transitions using transforms don't mess up the sizing so that
 * position calculations are easier to do.
 *
 * @param element - The element to get a rect for.
 * @returns either a DOMRect for the element
 * @internal
 */
export function getElementRect(element: HTMLElement): DOMRect {
  const cloned = element.cloneNode(true) as HTMLElement;
  // remove the id so there won't be two elements with the same id on the page
  cloned.removeAttribute("id");

  // remove the role just in case the role would alert screen readers once added
  // to the dom
  cloned.removeAttribute("role");

  // ensure the cloned node won't shift the page or be visible
  cloned.style.position = "fixed";
  cloned.style.visibility = "hidden";

  // reset positioning to get a "pure" calculation. otherwise this will mess up
  // the height and width if the element is able to line wrap.
  cloned.style.left = "";
  cloned.style.top = "";
  cloned.style.right = "";
  cloned.style.bottom = "";

  // reset transforms so that custom animations don't mess with the sizing
  cloned.style.transform = "none";

  const parent = element.parentElement || document.body;
  parent.appendChild(cloned);

  const rect = cloned.getBoundingClientRect();
  parent.removeChild(cloned);

  return rect;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
interface IsWithinViewportOptions {
  fixedElement: HTMLElement;
  fixedToElement: HTMLElement;
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function isWithinViewport(options: IsWithinViewportOptions): boolean {
  const { fixedElement, fixedToElement } = options;
  const fixedElementRect = fixedElement.getBoundingClientRect();
  const fixedToElementRect = fixedToElement.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const top = Math.min(fixedElementRect.top, fixedToElementRect.top);
  const right = Math.max(fixedElementRect.right, fixedToElementRect.right);
  const bottom = Math.max(fixedElementRect.bottom, fixedToElementRect.bottom);
  const left = Math.min(fixedElementRect.left, fixedToElementRect.left);

  return bottom >= 0 && top <= vh && right >= 0 && left <= vw;
}

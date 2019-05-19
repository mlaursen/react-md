import findSizingContainer from "./findSizingContainer";
import getElementRect, { Coords } from "./getElementRect";
import getViewportSize from "./getViewportSize";

/**
 * Above:
 * - the container top is in-line with the bottom of the element.
 * Below:
 * - the container bottom is in-line with the top of the element
 * Center:
 * - the container center is in-line with the top of the element
 * Top:
 * - the container top is in-line with the top of the element
 * Bottom:
 * - the container bottom is in-line with the bottom of the element
 */
export type VerticalPosition = "above" | "below" | "center" | "top" | "bottom";

/**
 * Left:
 * - the container left is in-line with the right of the element
 * Right:
 * - the container right is in-line with the left of the element
 * Center:
 * - the container's horizontal center point will be aligned with the
 *   element's horizontal center point
 * Inner Left:
 * - the container's left is in-line with the left of the element
 * Inner Right:
 * - the container's right is in-line with the right of the element
 */
export type HorizontalPosition =
  | "left"
  | "right"
  | "center"
  | "inner-left"
  | "inner-right";

/**
 * A "simple" version of all the positioning options. These are generally used
 * across all of react-md as it'll use the "center" version of the opposite type
 * when creating a fixed position.
 */
export type SimplePosition = "above" | "below" | "left" | "right";

export interface FixedPositionOptions {
  /**
   * The container element that the `element` should be fixed to.
   */
  container: HTMLElement | null;

  /**
   * The element that is fixed to a `container` element.
   */
  element: HTMLElement | null;

  /**
   * The horizontal position that the `element` should be fixed to the `container`.
   */
  x?: HorizontalPosition;

  /**
   * The veritcal position that the `element` should be fixed to the `container`.
   */
  y?: VerticalPosition;

  /**
   * The viewwidth margin to apply so that the element doesn't need to be directly
   * on the screen edge.
   */
  vwMargin?: number;

  /**
   * The viewwidth margin to apply so that the element doesn't need to be directly
   * on the screen edge.
   */
  vhMargin?: number;

  /**
   * The container width margin to apply so that the element doesn't need to be directly
   * on the container's edge.
   */
  xMargin?: number;

  /**
   * The container height margin to apply so that the element doesn't need to be directly
   * on the container's edge
   */
  yMargin?: number;

  /**
   * Boolean if the auto-swapping behavior should be disabled. It's normally recommended
   * to not disable this since it'll allow elements to appear off screen.
   */
  disableSwapping?: boolean;
}

export interface FixedPositionResult {
  actualX: HorizontalPosition;
  actualY: VerticalPosition;
  style?: Coords;
}

function createStyleWithoutElement(
  containerRect: ClientRect | DOMRect,
  x: HorizontalPosition,
  y: VerticalPosition
) {
  const {
    height,
    width,
    left: containerLeft,
    top: containerTop,
  } = containerRect;

  let left = containerLeft;
  let top = containerTop;
  if (x === "right" || x === "inner-right") {
    left = left + width;
  } else if (x === "center") {
    left = left + width / 2;
  }

  if (y === "below" || y === "bottom") {
    top = top + height;
  } else if (y === "center") {
    top = top + height / 2;
  }

  return {
    actualX: x,
    actualY: y,
    style: {
      left,
      top,
    },
  };
}

/**
 * One of the most complicated functions in this project that will attempt to position
 * an element relative to another container element while still being visible within
 * the viewport. Below is the logical flow for attempting to fix the element to the container:
 *
 * No Container:
 * If there is no container element, return an the provided x and y positions and no styles since
 * there's nothing we can use to calculate the position.
 *
 * No Element:
 * If the container was provided but the element to position does not exist, return an style object
 * containing the `left` and `top` values for the container and apply as many of the positioning
 * options as possible so that the styles are "as close as possible" before the fixed element
 * is added to the dom. This will also return the provided x and y positions since nothing
 * could be swapped around yet.
 *
 * Container and Element:
 * If both the container and fixed element were provided, apply all the positioning options
 * to the `left` and `top` values of the container based on the sizes of both elements.
 *
 * Now that the `left` and `top` values were applied, check to see if the element is fully
 * visible within the viewport with the provided positioning options. If it is fully visible,
 * do nothing else. If it isn't... follow the next flow:
 *
 * First, check the horizontal sizes and make sure that the element is still within the viewport
 * with the provided viewwidth margin. If it isn't, first try to swap only to a `right` style
 * instead of left to see if that fixes it, otherwise keep both the `left` and `right` styles.
 */
export default function getFixedPosition({
  container,
  element,
  x = "center",
  y = "below",
  vwMargin = 16,
  vhMargin = 16,
  xMargin = 0,
  yMargin = 0,
  disableSwapping = false,
}: FixedPositionOptions): FixedPositionResult {
  container = findSizingContainer(container);
  if (!container) {
    return {
      actualX: x,
      actualY: y,
    };
  }

  const containerRect = container.getBoundingClientRect();
  const initialResult = createStyleWithoutElement(containerRect, x, y);
  if (!element) {
    return initialResult;
  }

  const vh = getViewportSize("height");
  const vw = getViewportSize("width");
  const maxHeight = vh - vhMargin * 2;
  const maxWidth = vw - vwMargin * 2;
  const { height: containerHeight, width: containerWidth } = containerRect;

  let actualX = x;
  let actualY = y;

  let { height, width } = getElementRect(element);

  let left: number | undefined = containerRect.left;
  let top: number | undefined = containerRect.top;
  let right: number | undefined;
  let bottom: number | undefined;

  if (width > maxWidth) {
    left = vwMargin;
    right = vwMargin;
    ({ height, width } = getElementRect(element, { left, right }));
  } else {
    switch (x) {
      case "left":
        left = containerRect.left - width - xMargin;
        if (!disableSwapping && left < vwMargin) {
          actualX = "right";
          left = Math.min(
            containerRect.left + containerWidth + xMargin,
            vw - vwMargin
          );
        }
        break;
      case "inner-left":
        // don't need to do anything since this is the container left
        break;
      case "center":
        left = Math.max(vwMargin, left + containerWidth / 2 - width / 2);
        if (left + width > vw - vwMargin) {
          left = undefined;
          right = vwMargin;
        }

        break;
      case "right":
        left = left + containerWidth + xMargin;
        if (!disableSwapping && left + width > vw - vwMargin) {
          actualX = "left";
          left = Math.max(vwMargin, containerRect.left - width - xMargin);
        }
        break;
      case "inner-right":
        left = Math.max(vwMargin, left + containerWidth - width);
        break;
    }
  }

  if (height > maxHeight) {
    top = vhMargin;
    bottom = vhMargin;
  } else {
    switch (y) {
      case "above":
        top = Math.max(vhMargin, top - height - yMargin);
        break;
      case "top":
        // don't need to do anything since this is the container top
        break;
      case "center":
        top = Math.max(vhMargin, top + containerHeight / 2 - height / 2);
        break;
      case "below":
        top = top + containerHeight + yMargin;
        if (!disableSwapping && top + height > vh - vhMargin) {
          actualY = "above";
          top = Math.max(vhMargin, containerRect.top - height - yMargin);
        }
        break;
      case "bottom":
        top = top + containerHeight - height;
        break;
    }
  }

  return {
    actualX,
    actualY,
    style: {
      left,
      top,
      right,
      bottom,
    },
  };
}

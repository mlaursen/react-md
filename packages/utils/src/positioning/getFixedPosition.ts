import getElementRect from "./getElementRect";
import findSizingContainer from "./findSizingContainer";
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
  cwMargin?: number;

  /**
   * The container height margin to apply so that the element doesn't need to be directly
   * on the container's edge
   */
  chMargin?: number;

  /**
   * The horizontal position that the `element` should be fixed to the `container`.
   */
  xPosition?: HorizontalPosition;

  /**
   * The veritcal position that the `element` should be fixed to the `container`.
   */
  yPosition?: VerticalPosition;
}

function fixInitialX(
  containerWidth: number,
  elementWidth: number,
  position: HorizontalPosition,
  left: number,
  margin: number
) {
  switch (position) {
    case "left":
      return left - elementWidth - margin;
    case "inner-left":
      return left + margin;
    case "right":
      return left + containerWidth + margin;
    case "inner-right":
      return left + containerWidth - elementWidth - margin;
    case "center":
      // no margin application here
      return left + containerWidth * 0.5 - elementWidth * 0.5;
    default:
      return left;
  }
}

function fixInitialY(
  containerHeight: number,
  elementHeight: number,
  position: VerticalPosition,
  top: number,
  margin: number
) {
  switch (position) {
    case "below":
      return top + containerHeight + margin;
    case "bottom":
      return top + containerHeight - elementHeight - margin;
    case "above":
      return top - elementHeight - margin;
    case "top":
      return top + margin;
    case "center":
      // no margin application here
      return top + containerHeight * 0.5 - elementHeight * 0.5;
    default:
      return top;
  }
}

function getXPosition(
  _contanerWidth: number,
  elementWidth: number,
  viewportMargin: number,
  _containerMargin: number,
  currentLeft: number,
  position: HorizontalPosition
) {
  let actualX = position;
  let left: number | undefined = currentLeft;
  let right: number | undefined;
  const vw = getViewportSize("width");
  if (vw - viewportMargin * 2 < elementWidth) {
    // if it's too big for the viewport, just make it span the entire viewport width
    // with the margin
    left = viewportMargin;
    right = viewportMargin;
  } else if (currentLeft < viewportMargin) {
    left = viewportMargin;
  } else if (currentLeft + elementWidth > vw - viewportMargin) {
    actualX = position === "left" ? "right" : "left";
    left = undefined;
    right = viewportMargin;
  }

  return {
    actualX,
    left,
    right,
  };
}

function getYPosition(
  elementHeight: number,
  viewportMargin: number,
  containerMargin: number,
  currentTop: number,
  initialTop: number,
  position: VerticalPosition
) {
  let actualY = position;
  let top: number | undefined = currentTop;
  let bottom: number | undefined;
  const vh = getViewportSize("height");
  if (vh - viewportMargin * 2 < elementHeight) {
    top = viewportMargin;
    bottom = viewportMargin;
  } else if (currentTop < viewportMargin) {
    top = viewportMargin;
  } else if (currentTop + elementHeight > vh - viewportMargin) {
    actualY = position === "below" ? "above" : "below";
    top = initialTop - (containerMargin + elementHeight);
  }

  return { top, bottom, actualY };
}

export interface FixedPositionResult {
  actualX: HorizontalPosition;
  actualY: VerticalPosition;
  style?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
}

/**
 * NOTE: I simplified this for the first release and only have very basic top/bottom positioning
 * logic built in.. This is pretty tough.
 *
 * One of the most complicated functions in this project that will attempt to position
 * an element relative to another container element while still being visible within
 * the viewport. Below is the logical flow for attempting to fix the element to the container:
 *
 * No Container:
 * If there is no container element, return an empty object since nothing can be calculated
 * without the container element.
 *
 * No Element:
 * If the container was provided but the element to position does not exist, return an object
 * containing the `left` and `top` values for the container and apply as many of the positioning
 * options as possible so that the styles are "as close as possible" before the fixed element
 * is added to the dom.
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
  yPosition = "below",
  xPosition = "center",
  vwMargin = 16,
  vhMargin = 16,
  cwMargin = 0,
  chMargin = 0,
}: FixedPositionOptions): FixedPositionResult {
  container = findSizingContainer(container);
  let actualX = xPosition;
  let actualY = yPosition;
  if (!container) {
    return {
      actualX,
      actualY,
    };
  }

  const {
    height: containerHeight,
    width: containerWidth,
    left: containerLeft,
    top: containerTop,
  } = container.getBoundingClientRect();

  const initialX = containerLeft;
  const initialY = containerTop;
  let { height: elementHeight, width: elementWidth } = getElementRect(
    element,
    Math.max(initialX, vwMargin),
    Math.max(initialY, vhMargin)
  );
  const fixedX = fixInitialX(
    containerWidth,
    elementWidth,
    xPosition,
    initialX,
    cwMargin
  );
  const fixedY = fixInitialY(
    containerHeight,
    elementHeight,
    yPosition,
    initialY,
    cwMargin
  );

  ({ height: elementHeight, width: elementWidth } = getElementRect(
    element,
    Math.max(fixedX, vwMargin),
    Math.max(fixedY, vhMargin)
  ));

  let top: number | undefined;
  let left: number | undefined;
  let right: number | undefined;
  let bottom: number | undefined;
  ({ left, right, actualX } = getXPosition(
    containerWidth,
    elementWidth,
    vwMargin,
    cwMargin,
    fixedX,
    xPosition
  ));
  ({ top, bottom, actualY } = getYPosition(
    elementHeight,
    vhMargin,
    chMargin,
    fixedY,
    containerTop,
    yPosition
  ));

  return {
    actualX,
    actualY,
    style: {
      left,
      right,
      top,
      bottom,
    },
  };
}

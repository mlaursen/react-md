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
 * An object containing the x and y positions to anchor a fixed element to
 * another container element.
 */
export interface PositionAnchor {
  x: HorizontalPosition;
  y: VerticalPosition;
}

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
   * The configuration to anchor the fixed element to the container element.
   */
  anchor?: Partial<PositionAnchor>;

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

  /**
   * Boolean if the style object should include the `transformOrigin` value based on the x and y
   * positions.
   */
  transformOrigin?: boolean;
}

export interface FixedPositionResult {
  actualX: HorizontalPosition;
  actualY: VerticalPosition;
  style?: Coords & {
    position: string;
    transformOrigin?: string;
  };
}

function createStyleWithoutElement(
  containerRect: ClientRect | DOMRect,
  anchor: PositionAnchor,
  transformOrigin: boolean
) {
  const { x, y } = anchor;
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
      position: "fixed",
      transformOrigin: transformOrigin ? getTransformOrigin(anchor) : undefined,
    },
  };
}

function getTransformOrigin(anchor: PositionAnchor) {
  let x = "0";
  switch (anchor.x) {
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
  }

  let y = "0";
  switch (anchor.y) {
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
  }

  return `${x} ${y}`;
}

interface AdjustPositionOptions {
  containerLeft: number;
  containerTop: number;
  containerWidth: number;
  containerHeight: number;
  elementWidth: number;
  elementHeight: number;
  xMargin: number;
  yMargin: number;
  vw: number;
  vh: number;
  vwMargin: number;
  vhMargin: number;
  disableSwapping: boolean;
}

/**
 * Tries to fix the "left" horizontal positoining by ensuring it can be within the viewport
 * and tries swapping sides if possible. This is basically the inverse of `fixRightPosition`
 */
function fixLeftPosition({
  containerLeft,
  containerWidth,
  elementWidth,
  xMargin,
  vw,
  vwMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let left = containerLeft - elementWidth - xMargin;
  let actualX: HorizontalPosition = "left";
  if (left < vwMargin) {
    const nextLeft = containerLeft + containerWidth + xMargin;
    if (disableSwapping || nextLeft + elementWidth > vw - vwMargin) {
      left = vwMargin;
    } else {
      left = nextLeft;
      actualX = "right";
    }
  }

  return { left, actualX };
}

function fixRightPosition({
  containerLeft,
  containerWidth,
  elementWidth,
  xMargin,
  vw,
  vwMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let actualX: HorizontalPosition = "right";
  let left = containerLeft + containerWidth + xMargin;
  const screenRight = vw - vwMargin;
  if (left + elementWidth > screenRight) {
    const nextLeft = containerLeft - containerWidth - xMargin;
    if (disableSwapping || nextLeft < vwMargin) {
      left = screenRight - elementWidth;
    } else {
      actualX = "left";
      left = nextLeft;
    }
  }

  return { left, actualX };
}

function fixInnerLeftPosition({
  containerLeft,
  containerWidth,
  elementWidth,
  vw,
  xMargin,
  vwMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let left = containerLeft + xMargin;
  let actualX: HorizontalPosition = "inner-left";
  const screenRight = vw - vwMargin;
  if (left - elementWidth < vwMargin) {
    const nextLeft = containerLeft + containerWidth - elementWidth - xMargin;
    if (disableSwapping || nextLeft > screenRight) {
      left = vwMargin;
    } else {
      left = nextLeft;
      actualX = "right";
    }
  }

  return { actualX, left };
}

function fixInnerRightPosition({
  containerLeft,
  containerWidth,
  elementWidth,
  vw,
  xMargin,
  vwMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let left = containerLeft + containerWidth - elementWidth - xMargin;
  let actualX: HorizontalPosition = "inner-right";
  if (left < vwMargin) {
    if (disableSwapping || containerLeft + elementWidth > vw - vwMargin) {
      left = vwMargin;
    } else {
      left = containerLeft + xMargin;
      actualX = "left";
    }
  }

  return { actualX, left };
}

function fixHorizontalCenterPosition({
  containerLeft,
  containerWidth,
  elementWidth,
  vw,
  vwMargin,
}: AdjustPositionOptions) {
  let left = containerLeft + containerWidth / 2 - elementWidth / 2;
  const screenRight = vw - vwMargin;
  if (left + elementWidth > screenRight) {
    left = screenRight - elementWidth;
  }

  return left;
}

function fixAbovePosition({
  containerTop,
  containerHeight,
  elementHeight,
  yMargin,
  vh,
  vhMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let top = containerTop - elementHeight - yMargin;
  let actualY: VerticalPosition = "above";
  if (top < vhMargin) {
    const nextTop = containerTop + containerHeight + yMargin;
    if (disableSwapping || nextTop + elementHeight > vh - vhMargin) {
      top = vhMargin;
    } else {
      top = nextTop;
      actualY = "below";
    }
  }

  return { actualY, top };
}

function fixBelowPosition({
  containerTop,
  containerHeight,
  elementHeight,
  yMargin,
  vh,
  vhMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let top = containerTop + containerHeight + yMargin;
  let actualY: VerticalPosition = "below";
  const maxTop = vh - vhMargin;
  if (top + elementHeight > maxTop) {
    const nextTop = containerTop - elementHeight - yMargin;
    if (disableSwapping || nextTop < vhMargin) {
      top = vhMargin;
    } else {
      top = nextTop;
      actualY = "above";
    }
  }

  return { actualY, top };
}

function fixTopPosition({
  containerTop,
  containerHeight,
  elementHeight,
  vh,
  yMargin,
  vhMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let actualY: VerticalPosition = "top";
  let top = containerTop + yMargin;
  const screenBottom = vh - vhMargin;
  if (top + elementHeight > screenBottom) {
    const nextTop = containerTop + containerHeight - elementHeight - yMargin;
    if (disableSwapping || nextTop < vhMargin) {
      top = screenBottom - elementHeight;
    } else {
      actualY = "bottom";
      top = nextTop;
    }
  }

  return { actualY, top };
}

function fixBottomPosition({
  containerTop,
  containerHeight,
  elementHeight,
  vh,
  yMargin,
  vhMargin,
  disableSwapping,
}: AdjustPositionOptions) {
  let actualY: VerticalPosition = "bottom";
  let top = containerTop + containerHeight - elementHeight - yMargin;
  const screenBottom = vh - vhMargin;
  if (top + elementHeight > screenBottom) {
    if (disableSwapping || containerTop < vhMargin) {
      top = vhMargin;
    } else {
      actualY = "top";
      top = containerTop + yMargin;
    }
  }

  return { actualY, top };
}

function fixVerticalCenter({
  containerTop,
  containerHeight,
  elementHeight,
  vh,
  vhMargin,
}: AdjustPositionOptions) {
  const halvedHeight = elementHeight / 2;
  let top = containerTop + containerHeight / 2 - halvedHeight;
  const screenBottom = vh - vhMargin;
  if (top + halvedHeight > screenBottom) {
    top = screenBottom - halvedHeight;
  } else if (top - halvedHeight < vhMargin) {
    top = vhMargin;
  }

  return top;
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
  anchor: propAnchor = {},
  vwMargin = 16,
  vhMargin = 16,
  xMargin = 0,
  yMargin = 0,
  disableSwapping = false,
  transformOrigin = false,
}: FixedPositionOptions): FixedPositionResult {
  container = findSizingContainer(container);
  const anchor = {
    x: propAnchor.x || "center",
    y: propAnchor.y || "below",
  };
  if (!container) {
    return {
      actualX: anchor.x,
      actualY: anchor.y,
    };
  }

  const containerRect = container.getBoundingClientRect();
  const initialResult = createStyleWithoutElement(
    containerRect,
    anchor,
    transformOrigin
  );
  if (!element) {
    return initialResult;
  }

  const vh = getViewportSize("height");
  const vw = getViewportSize("width");
  const maxHeight = vh - vhMargin * 2;
  const maxWidth = vw - vwMargin * 2;
  const { height: containerHeight, width: containerWidth } = containerRect;

  let actualX = anchor.x;
  let actualY = anchor.y;

  const { height, width } = getElementRect(element);

  let left: number | undefined;
  let top: number | undefined;
  let right: number | undefined;
  let bottom: number | undefined;

  const adjustConfig = {
    containerLeft: containerRect.left,
    containerTop: containerRect.top,
    containerWidth,
    containerHeight,
    elementWidth: width,
    elementHeight: height,
    xMargin,
    yMargin,
    vw,
    vh,
    vwMargin,
    vhMargin,
    disableSwapping,
  };
  if (width > maxWidth) {
    left = vwMargin;
    right = vwMargin;
    actualX = "center";
  } else {
    switch (anchor.x) {
      case "left":
        ({ actualX, left } = fixLeftPosition(adjustConfig));
        break;
      case "right":
        ({ actualX, left } = fixRightPosition(adjustConfig));
        break;
      case "inner-left":
        ({ actualX, left } = fixInnerLeftPosition(adjustConfig));
        break;
      case "inner-right":
        ({ actualX, left } = fixInnerRightPosition(adjustConfig));
        break;
      case "center":
        left = fixHorizontalCenterPosition(adjustConfig);
        break;
    }
  }

  if (height > maxHeight) {
    top = vhMargin;
    bottom = vhMargin;
    actualY = "center";
  } else {
    switch (anchor.y) {
      case "above":
        ({ actualY, top } = fixAbovePosition(adjustConfig));
        break;
      case "below":
        ({ actualY, top } = fixBelowPosition(adjustConfig));
        break;
      case "top":
        ({ actualY, top } = fixTopPosition(adjustConfig));
        break;
      case "center":
        top = fixVerticalCenter(adjustConfig);
        break;
      case "bottom":
        ({ actualY, top } = fixBottomPosition(adjustConfig));
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
      position: "fixed",
      transformOrigin: transformOrigin
        ? getTransformOrigin({ x: actualX, y: actualY })
        : undefined,
    },
  };
}

import {
  getCenterXCoord,
  getInnerLeftCoord,
  getInnerRightCoord,
  getLeftCoord,
  getRightCoord,
  XCoordConfig,
} from "./getCoord";
import { FixedPositionOptions, HorizontalPosition } from "./types";

/**
 * @internal
 */
interface XPosition {
  left: number;
  right?: number;
  width?: number;
  minWidth?: number;
  actualX: HorizontalPosition;
}

/**
 * @internal
 */
export interface FixConfig extends XCoordConfig {
  vwMargin: number;
  screenRight: number;
  disableSwapping: boolean;
}

/**
 * @internal
 */
interface Options
  extends Required<
    Pick<
      FixedPositionOptions,
      "vwMargin" | "xMargin" | "width" | "disableSwapping"
    >
  > {
  x: HorizontalPosition;
  vw: number;
  elWidth: number;
  initialX?: number;
  containerRect: DOMRect | ClientRect;
}

/**
 * Attempts to position the fixed element so that it will appear to the left of
 * the container element but also within the viewport boundaries. When swapping
 * is enabled, it will attempt to swap to the right position if it can't fit
 * within the viewport to the left. If it can't fit in the viewport even after
 * being swapped to the right or swapping is disabled, it will be positioned to
 * the viewport left boundary.
 *
 * @internal
 */
export function createAnchoredLeft(config: FixConfig): XPosition {
  const { vwMargin, screenRight, elWidth, disableSwapping } = config;

  let left = getLeftCoord(config);
  let actualX: HorizontalPosition = "left";
  if (left >= vwMargin) {
    return { actualX, left };
  }

  const swappedLeft = getRightCoord(config);
  if (disableSwapping || swappedLeft + elWidth > screenRight) {
    left = vwMargin;
  } else {
    left = swappedLeft;
    actualX = "right";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear to the
 * inner-left of the container element but also within the viewport boundaries.
 * When swapping is enabled, it will attempt to swap to the right position if it
 * can't fit within the viewport to the left. If it can't fit in the viewport
 * even after being swapped to the right or swapping is disabled, it will be
 * positioned to the viewport left boundary.
 *
 * @internal
 */
export function createAnchoredInnerLeft(config: FixConfig): XPosition {
  const { vwMargin, screenRight, elWidth, disableSwapping } = config;

  let left = getInnerLeftCoord(config);
  let actualX: HorizontalPosition = "inner-left";
  if (left + elWidth <= screenRight) {
    return { actualX, left };
  }

  const swappedLeft = getInnerRightCoord(config);
  if (disableSwapping || swappedLeft < vwMargin) {
    left = vwMargin;
  } else {
    left = swappedLeft;
    actualX = "inner-right";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear at the center
 * of the container element but also within the viewport boundaries. If the
 * centered element can't fit within the viewport, it will use the vwMargin
 * value if it overflowed to the left, it'll position to the screen right
 * boundary.
 *
 * @internal
 */
export function createAnchoredCenter(config: FixConfig): XPosition {
  const { vwMargin, screenRight, elWidth } = config;
  let left = getCenterXCoord(config);
  if (left < vwMargin) {
    left = vwMargin;
  } else if (left + elWidth > screenRight || left < vwMargin) {
    left = screenRight - elWidth;
  }

  return { actualX: "center", left };
}

/**
 * Attempts to position the fixed element so that it will appear to the
 * inner-right of the container element but also within the viewport boundaries.
 * When swapping is enabled, it will attempt to swap to the inner-left position
 * if it can't fit within the viewport to the right. If it can't fit in the
 * viewport even after being swapped to the left or swapping is disabled, it
 * will be positioned to the viewport right boundary.
 *
 * @internal
 */
export function createAnchoredInnerRight(config: FixConfig): XPosition {
  const { screenRight, vwMargin, elWidth, disableSwapping } = config;

  let left = getInnerRightCoord(config);
  let actualX: HorizontalPosition = "inner-right";

  if (left >= vwMargin) {
    return { actualX, left };
  }

  const swappedLeft = getInnerLeftCoord(config);

  if (disableSwapping || swappedLeft + elWidth > screenRight) {
    left = screenRight - elWidth;
  } else {
    left = swappedLeft;
    actualX = "inner-left";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear to the right of
 * the container element but also within the viewport boundaries. When swapping
 * is enabled, it will attempt to swap to the left position if it can't fit
 * within the viewport to the right. If it can't fit in the viewport even after
 * being swapped to the left or swapping is disabled, it will be positioned to
 * the viewport right boundary.
 *
 * @internal
 */
export function createAnchoredRight(config: FixConfig): XPosition {
  const { screenRight, vwMargin, elWidth, disableSwapping } = config;

  let left = getRightCoord(config);
  let actualX: HorizontalPosition = "right";
  if (left + elWidth <= screenRight) {
    return { actualX, left };
  }

  const swappedLeft = getLeftCoord(config);
  if (disableSwapping || swappedLeft < vwMargin) {
    left = screenRight - elWidth;
  } else {
    left = swappedLeft;
    actualX = "left";
  }

  return { actualX, left };
}

interface EqualWidthOptions
  extends Pick<
    Options,
    | "x"
    | "vw"
    | "elWidth"
    | "xMargin"
    | "vwMargin"
    | "containerRect"
    | "initialX"
  > {
  isMinWidth: boolean;
}

/**
 * @internal
 */
export function createEqualWidth({
  x,
  vw,
  elWidth,
  xMargin,
  vwMargin,
  initialX,
  containerRect,
  isMinWidth,
}: EqualWidthOptions): XPosition {
  const left = initialX ?? containerRect.left + xMargin;

  let width: number | undefined = containerRect.width - xMargin * 2;
  let minWidth: number | undefined;
  let right: number | undefined;
  if (isMinWidth) {
    minWidth = width;
    width = undefined;
    if (left + elWidth > vw - vwMargin) {
      right = vwMargin;
    }
  }

  // going to assume that the container element is visible in the DOM and just
  // make the fixed element have the same left and right corners
  return {
    left,
    right,
    width,
    minWidth,
    actualX: x,
  };
}

/**
 * Creates the horizontal position for a fixed element with the provided
 * options.
 * @internal
 */
export function createHorizontalPosition({
  x,
  vw,
  vwMargin,
  xMargin,
  width,
  elWidth,
  initialX,
  containerRect,
  disableSwapping,
}: Options): XPosition {
  if (width === "min" || width === "equal") {
    return createEqualWidth({
      x,
      vw,
      vwMargin,
      xMargin,
      elWidth,
      initialX,
      containerRect,
      isMinWidth: width === "min",
    });
  }

  if (elWidth > vw - vwMargin * 2) {
    // if the element's width is greater than the viewport's width minus the
    // margin on both sides, just make the element span the entire viewport with
    // the margin
    return {
      left: vwMargin,
      right: vwMargin,
      actualX: x,
    };
  }

  const config: FixConfig = {
    vwMargin,
    xMargin,
    elWidth,
    initialX,
    screenRight: vw - vwMargin,
    containerRect,
    disableSwapping,
  };

  switch (x) {
    case "left":
      return createAnchoredLeft(config);
    case "inner-left":
      return createAnchoredInnerLeft(config);
    case "center":
      return createAnchoredCenter(config);
    case "inner-right":
      return createAnchoredInnerRight(config);
    case "right":
      return createAnchoredRight(config);
    default:
      throw new Error("This should never happen");
  }
}

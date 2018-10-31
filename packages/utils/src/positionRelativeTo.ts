import * as React from "react";

import findSizingContainer from "./findSizingContainer";
import findOverflowContainer from "./findOverflowContainer";

export type HorizontalPosition =
  | "left"
  | "inner left"
  | "center"
  | "right"
  | "inner right"
  | "auto";

export type VerticalPosition = "above" | "below" | "center" | "overlap" | "auto";

export interface IPositionOptions {
  /**
   * An optional horizontal position to use. This defaults to automagically determining the "best" location based on
   * the `fixedTo` element's position within the viewport and the `target` element's size.
   */
  horizontalPosition?: HorizontalPosition;

  /**
   * An optional vertical position to use. This defaults to automagically determining the "best" location based on
   * the `fixedTo` element's position within the viewport and the `target` element's size.
   */
  verticalPosition?: VerticalPosition;

  /**
   * This should be a number between 0 and 1 (inclusive). This will allow the target element
   * to overlap the `fixedTo` by a percentage of the `fixedTo`'s height.
   */
  heightOverlapMultiplier?: number;

  /**
   * This should be a number between 0 and 1 (inclusive). This will allow the target element
   * to overlap the `fixedTo` by a percentage of the `fixedTo`'s width.
   */
  widthOverlapMultiplier?: number;

  /**
   * This prop is to help position the target element within the viewport based on the relative element. When this
   * value is less than `1`, it will be used as a viewport multiplier. If it is greater than `1`, it will be `x` number
   * of pixels from the edge of the viewport.
   *
   * Multiplier Example:
   * ```js
   * const viewportThreshold = 0.03;
   * const isOutOfBoundsLeft = fixedTo.left < (viewportWidth * viewportThreshold);
   * const isOutOfBoundsBottom = fixedTo.top < (viewportHeight = (viewportHeight * viewportThreshold));
   * ```
   *
   * Pixel Example:
   * ```js
   * const viewportThreshold = 20;
   * const isOutOfBoundsLeft = fixedTo.left < viewportThreshold;
   * const isOutOfBoundsBottom = fixedTo.top < (viewportHeight - viewportThreshold);
   * ```
   */
  viewportThreshold?: number;

  /**
   * The amount of horizontal margin to use when positioning the target element within the viewport. This will
   * be applied to both the left and right of the page.
   */
  vwMargin?: number;

  /**
   * The amount of vertical margin to use when positioning the target element within the viewport. This will
   * be applied to both the top and bottom of the page.
   */
  vhMargin?: number;

  /**
   * The amount of spacing to put between the `fixedTo` element and the `target` element. This should be a string of a
   * number of pixels or a number in rem. This will update the styles to do a
   * `calc(${CALCULATED_POSITION}px - ${spacing})`.
   *
   * Examples:
   * - '20px'
   * - '0.825rem'
   */
  horizontalSpacing?: string;

  /**
   * The amount of spacing to put between the `fixedTo` element and the `target` element. This should be a string of a
   * number of pixels or a number in rem. This will update the styles to do a
   * `calc(${CALCULATED_POSITION}px - ${spacing})`.
   *
   * Examples:
   * - '20px'
   * - '0.825rem'
   */
  verticalSpacing?: string;

  /**
   * Boolean if the element has been portaled out of a scroll container. This will update the logic to not check for
   * parent overflow containers to adjust the positioning.
   */
  isPortalFixed?: boolean;
}

export interface IPositioningStyle {
  top: number | string;
  left: number | string;
  position: "fixed";
  transformOrigin: string;
  width?: number | string;

  // only used if the target element's height is bigger than the viewport height with margins
  bottom?: number;

  // only used if the target element's width is bigger than the viewport width with margins
  right?: number;
}

function determineBestHorizontalPosition(
  position: HorizontalPosition,
  left: number,
  vw: number,
  threshold: number
) {
  if (position !== "auto") {
    // if the position waas actually set to something other than auto, trust that they already have verified it
    // can fit in the viewport.
    return position;
  } else if (left < (threshold > 1 ? threshold : vw * threshold)) {
    return "inner right";
  }

  return "inner left";
}

function getFixedToDimensions(fixedTo: HTMLElement, isPortalFixed: boolean) {
  const fixedToRect = fixedTo.getBoundingClientRect();
  const { height: fixedToHeight, width: fixedToWidth } = fixedToRect;
  let { left: fixedToLeft, top: fixedToTop } = fixedToRect;
  if (!isPortalFixed) {
    const overflowContainer = findOverflowContainer(fixedTo);
    if (overflowContainer && overflowContainer !== fixedTo) {
      const rect = overflowContainer.getBoundingClientRect();
      fixedToLeft -= rect.left - overflowContainer.scrollLeft;
      fixedToTop -= rect.top - overflowContainer.scrollTop;
    }
  }

  return {
    fixedToLeft,
    fixedToTop,
    fixedToWidth,
    fixedToHeight,
  };
}

/**
 * Attempts to create the styles to position a `target` element related to another `fixedTo` element within the page.
 *
 * @param fixedTo - An HTML Element that is used to "fix" the target element to.
 * @param target - The target element to fix within the viewport related to the `fixedTo` element.
 * @param options - Any optional options to apply to help position the target element better.
 */
export default function positionRelativeTo(
  fixedTo: HTMLElement | null,
  target: HTMLElement | null,
  options: IPositionOptions = {}
): React.CSSProperties | undefined {
  fixedTo = findSizingContainer(fixedTo);
  if (!fixedTo) {
    return undefined;
  }

  const {
    horizontalPosition = "auto",
    verticalPosition = "auto",
    widthOverlapMultiplier = 0,
    viewportThreshold = 0.03,
    horizontalSpacing = null,
    verticalSpacing = null,
    vwMargin = 0,
    vhMargin = 0,
    isPortalFixed = false,
  } = options;
  let { heightOverlapMultiplier } = options;
  if (typeof heightOverlapMultiplier !== "number") {
    heightOverlapMultiplier = options.verticalPosition === "overlap" ? 1 : 0;
  }

  const de = document.documentElement || { clientHeight: 0, clientWidth: 0 };
  const vh = window.innerHeight || de.clientHeight;
  const vw = window.innerWidth || de.clientWidth;
  const { fixedToLeft, fixedToTop, fixedToHeight, fixedToWidth } = getFixedToDimensions(
    fixedTo,
    isPortalFixed
  );
  const overlapHeight = fixedToHeight * heightOverlapMultiplier;
  const overlapWidth = fixedToWidth * widthOverlapMultiplier;

  const top = fixedToTop + (fixedToHeight - overlapHeight);
  const left = Math.max(vwMargin, fixedToLeft + overlapWidth);

  // first pass at generating the styles. this makes it a bit "smoother" if animating a new element
  // into the DOM since you can get a close position for the first render and get it correct in the second.
  const style: IPositioningStyle = {
    top,
    left,
    position: "fixed",
    transformOrigin: "0 0",
  };

  if (!target) {
    // can't do any more positioning logic yet.
    return style;
  }

  let isTooTall = false;
  let isTooWide = false;
  let bestPosition = horizontalPosition;

  // using scrollHeight and scrollWIdth so transitions don't mess up the sizes
  const { scrollWidth: targetWidth, scrollHeight: targetHeight } = target;
  if (vw - vwMargin * 2 < targetWidth) {
    isTooWide = true;
    style.left = vwMargin;
    style.right = vwMargin;
  } else {
    bestPosition = determineBestHorizontalPosition(
      horizontalPosition,
      fixedToLeft,
      vw,
      viewportThreshold
    );
    switch (bestPosition) {
      case "left":
        style.left = fixedToLeft - targetWidth + overlapWidth;
        break;
      case "center":
        style.left = fixedToLeft + fixedToWidth / 2 - targetWidth / 2;
        break;
      case "inner right":
        style.left = fixedToLeft + fixedToWidth - targetWidth;
        break;
      case "right":
        style.left = fixedToLeft + fixedToWidth;
        break;
    }
  }

  if (targetHeight > vh - vhMargin * 2) {
    // The target element's height is larger than the viewport with margin, so just make it span the etnire
    // viewport height with the defined margin.
    isTooTall = true;
    style.top = vhMargin;
    style.bottom = vhMargin;

    // make target element animate from top-left of relative element so it looks decent when
    // the target element is somewhere near the center of the page.
    style.transformOrigin = `${left - targetHeight}px ${top - fixedToHeight}px`;
  } else if (verticalPosition === "center") {
    style.top = fixedToTop + fixedToHeight / 2 - targetHeight / 2;
  } else if (verticalPosition === "above") {
    style.top = fixedToTop - targetHeight;
  } else if (verticalPosition !== "below" && top + targetHeight > vh - vhMargin) {
    // The target element would be out of bounds at the bottom edge, so swap position to be above the element,
    // but it can overlap and restrict the top to be within the vh's defined margin.
    style.top = Math.max(vhMargin, fixedToTop + overlapHeight - targetHeight);
    style.transformOrigin = "0 100%";
  }

  if (horizontalSpacing && !isTooWide) {
    const sign =
      horizontalPosition === "left" ||
      horizontalPosition === "inner left"
        ? "-"
        : "+";
    style.left = `calc(${style.left}px ${sign} ${horizontalSpacing})`;
  }

  if (verticalSpacing && !isTooTall) {
    const sign = verticalPosition === "above" ? "-" : "+";
    style.top = `calc(${style.top}px ${sign} ${verticalSpacing})`;
  }

  return style;
}

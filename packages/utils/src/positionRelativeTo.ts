import * as React from "react";

export enum HorizontalPosition {
  /**
   * This will force the `target` element to be positioned so the right side will align with the left side
   * of the `fixedTo` element.
   */
  LEFT = "left",

  /**
   * This will force the `target` element to be positioned so the left side will align with the left side of
   * the `fixedTo` element.
   */
  INNER_LEFT = "inner left",

  /**
   * This will force the `target` element to be centered relative to the `fixedToElement`.
   */
  CENTER = "center",

  /**
   * This will force the `target` element to be positioned so the left side will align with the right side
   * of the `fixedTo` element.
   */
  RIGHT = "right",

  /**
   * This will force the `target` element to be positioned so the right side will align with the right side of
   * the `fixedTo` element.
   */
  INNER_RIGHT = "inner right",

  /**
   * This will automagically determine the "best" location to position the `target` element based on the `fixedTo`
   * element's location within the viewport. This will swap between the `HorizontalPosition.INNER_LEFT` and
   * `HorizontalPosition.INNER_RIGHT`.
   */
  AUTO = "auto",
}

export enum VerticalPosition {
  /**
   * This will force the `target` element to always be positioned above the `fixedTo` element **even if there is not
   * enough room within the viewport**. Since this is not one of the "auto-calculating" positions, the logic "trusts"
   * the developer really wants it to be positioned above.
   */
  TOP = "top",

  /**
   * This will force the `target` element to be centered vertically relative to the `fixedTo` element's height.
   */
  CENTER = "center",

  /**
   * This will force the `target` element to be positioned so its top edge will align with the top edge of the `fixedTo`
   * element.  This is really an alias to setting the `heightOverlapMultiplier` to `1` so you cannot set the
   * `heightOverlapMultiplier` if using this position as it will break all positioning logic.
   *
   * In addition, the "auto" top or bottom positioning logic will still be in effect when this is set. So if the
   * `target` element would not be able to be fully visible while centered and below, it will position itself so it is
   * centered and above. If there is still not enough room above the element, it will be fixed to the top of the page
   * using the `vhMargin`.
   */
  OVERLAP = "overlap",

  /**
   * This will force the `target` element to always be positioned below the `fixedTo` element **even if there is not
   * enough room within the viewport**. Since this is not one of the "auto-calculating" positions, the logic "trusts"
   * the developer really wants it to be positioned below.
   */
  BOTTOM = "bottom",

  /**
   * This will automagically determine the "best" location to position the `target` element based on the `fixedTo`
   * element's location within the viewport. This will swap between the `VerticalPosition.BOTTOM` and
   * `VerticalPosition.TOP` as needed. So if the `target` element would not be able to be fully visible while centered
   * and below, it will position itself so it is centered and above. If there is still not enough room above the
   * element, it will be fixed to the top of the page using the `vhMargin`.
   */
  AUTO = "auto",
}

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
   * This should be the element that you want to position or a `document.querySelector` string to attempt to
   * get the target element. This _should_ be provided each time to get better positioning logic.
   */
  target?: HTMLElement | string | null;

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

function determineBestHorizontalPosition(position: HorizontalPosition, left: number, vw: number, threshold: number) {
  if (position !== HorizontalPosition.AUTO) {
    // if the position waas actually set to something other than auto, trust that they already have verified it
    // can fit in the viewport.
    return position;
  } else if (left < (threshold > 1 ? threshold : vw * threshold)) {
    return HorizontalPosition.INNER_RIGHT;
  }

  return HorizontalPosition.INNER_LEFT;
}

export default function positionRelativeTo(
  fixedTo: HTMLElement | null,
  target: HTMLElement | null,
  options: IPositionOptions = {}
): React.CSSProperties | undefined {
  if (!fixedTo) {
    return undefined;
  }

  const {
    horizontalPosition = HorizontalPosition.AUTO,
    verticalPosition = VerticalPosition.AUTO,
    widthOverlapMultiplier = 0,
    viewportThreshold = 0.03,
    horizontalSpacing = null,
    verticalSpacing = null,
    vwMargin = 0,
    vhMargin = 0,
  } = options;
  let { heightOverlapMultiplier } = options;
  if (typeof heightOverlapMultiplier !== "number") {
    heightOverlapMultiplier = options.verticalPosition === VerticalPosition.OVERLAP ? 1 : 0;
  }

  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const fixedToRect = fixedTo.getBoundingClientRect();
  const { height: fixedToHeight, width: fixedToWidth, left: fixedToLeft, top: fixedToTop } = fixedToRect;
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
    bestPosition = determineBestHorizontalPosition(horizontalPosition, fixedToLeft, vw, viewportThreshold);
    switch (bestPosition) {
      case HorizontalPosition.LEFT:
        style.left = fixedToLeft - targetWidth + overlapWidth;
        break;
      case HorizontalPosition.CENTER:
        style.left = fixedToLeft + fixedToWidth / 2 - targetWidth / 2;
        break;
      case HorizontalPosition.INNER_RIGHT:
        style.left = fixedToLeft + fixedToWidth - targetWidth;
        break;
      case HorizontalPosition.RIGHT:
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
  } else if (verticalPosition === VerticalPosition.CENTER) {
    style.top = fixedToTop + fixedToHeight / 2 - targetHeight / 2;
  } else if (verticalPosition === VerticalPosition.TOP) {
    style.top = fixedToTop - targetHeight;
  } else if (verticalPosition !== VerticalPosition.BOTTOM && top + targetHeight > vh - vhMargin) {
    // The target element would be out of bounds at the bottom edge, so swap position to be above the element,
    // but it can overlap and restrict the top to be within the vh's defined margin.
    style.top = Math.max(vhMargin, fixedToRect.top + overlapHeight - targetHeight);
    style.transformOrigin = "0 100%";
  }

  if (horizontalSpacing && !isTooWide) {
    const sign =
      horizontalPosition === HorizontalPosition.LEFT || horizontalPosition === HorizontalPosition.INNER_LEFT
        ? "-"
        : "+";
    style.left = `calc(${style.left}px ${sign} ${horizontalSpacing})`;
  }

  if (verticalSpacing && !isTooTall) {
    const sign = verticalPosition === VerticalPosition.TOP ? "-" : "+";
    style.top = `calc(${style.top}px ${sign} ${verticalSpacing})`;
  }

  return style;
}

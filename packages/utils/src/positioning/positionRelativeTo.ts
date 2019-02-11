import { Maybe } from "../types.d";
import findSizingContainer from "./findSizingContainer";
import {
  HorizontalPosition,
  IPositionOptions,
  IPositioningStyle,
  VerticalPosition,
} from "./types.d";

function determineBestHorizontalPosition(
  position: HorizontalPosition,
  left: number,
  vw: number,
  threshold: number
) {
  if (position !== "auto") {
    // if the position waas actually set to something other than auto, trust that they already
    // have verified it can fit in the viewport.
    return position;
  } else if (left < (threshold > 1 ? threshold : vw * threshold)) {
    return "inner right";
  }

  return "inner left";
}

function getFixedToDimensions(fixedTo: HTMLElement) {
  const fixedToRect = fixedTo.getBoundingClientRect();
  const {
    height: fixedToHeight,
    width: fixedToWidth,
    left: fixedToLeft,
    top: fixedToTop,
  } = fixedToRect;

  return {
    fixedToLeft,
    fixedToTop,
    fixedToWidth,
    fixedToHeight,
  };
}

function getHorizontalOrigin(horizontalPosition: HorizontalPosition) {
  switch (horizontalPosition) {
    case "left":
    case "inner left":
      return "0";
    case "right":
    case "inner right":
      return "100%";
    default:
      return "0";
  }
}

function getVerticalOrigin(verticalPosition: VerticalPosition) {
  switch (verticalPosition) {
    case "above":
      return "100%";
    case "center":
      return "50%";
    default:
      console.log("verticalPosition:", verticalPosition);
      return "0";
  }
}

function createTransformOrigin(
  horizontalPosition: HorizontalPosition,
  verticalPosition: VerticalPosition
) {
  return `${getHorizontalOrigin(horizontalPosition)} ${getVerticalOrigin(
    verticalPosition
  )}`;
}

/**
 * Attempts to create the styles to position a `target` element related to another `fixedTo`
 * element within the page.
 *
 * @param fixedTo - An HTML Element that is used to "fix" the target element to.
 * @param target - The target element to fix within the viewport related to the `fixedTo` element.
 * @param options - Any optional options to apply to help position the target element better.
 */
export default function positionRelativeTo(
  fixedTo: Maybe<HTMLElement>,
  target: Maybe<HTMLElement>,
  options: IPositionOptions = {}
): IPositioningStyle | undefined {
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
  } = options;
  let { heightOverlapMultiplier } = options;
  if (typeof heightOverlapMultiplier !== "number") {
    heightOverlapMultiplier = options.verticalPosition === "overlap" ? 1 : 0;
  }
  const de = document.documentElement || { clientHeight: 0, clientWidth: 0 };
  const vh = window.innerHeight || de.clientHeight;
  const vw = window.innerWidth || de.clientWidth;
  const {
    fixedToLeft,
    fixedToTop,
    fixedToHeight,
    fixedToWidth,
  } = getFixedToDimensions(fixedTo);

  const overlapHeight = fixedToHeight * heightOverlapMultiplier;
  const overlapWidth = fixedToWidth * widthOverlapMultiplier;

  const top = fixedToTop + (fixedToHeight - overlapHeight);
  const left = Math.max(vwMargin, fixedToLeft + overlapWidth);

  // first pass at generating the styles. this makes it a bit "smoother" if animating a new element
  // into the DOM since you can get a close position for the first render and get it correct in the
  // second.
  const style: IPositioningStyle = {
    top,
    left,
    position: "fixed",
    transformOrigin: createTransformOrigin(
      horizontalPosition,
      verticalPosition
    ),
  };

  if (!target) {
    // can't do any more positioning logic yet.
    return style;
  }

  let isTooTall = false;
  let isTooWide = false;
  let bestHPosition = horizontalPosition;
  let bestVPosition = verticalPosition;

  // using scrollHeight and scrollWIdth so transitions don't mess up the sizes
  const { scrollWidth: targetWidth, scrollHeight: targetHeight } = target;
  if (vw - vwMargin * 2 < targetWidth) {
    isTooWide = true;
    style.left = vwMargin;
    style.right = vwMargin;
  } else {
    bestHPosition = determineBestHorizontalPosition(
      horizontalPosition,
      fixedToLeft,
      vw,
      viewportThreshold
    );
    switch (bestHPosition) {
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
    // The target element's height is larger than the viewport with margin, so just make it span
    // the etnire viewport height with the defined margin.
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
  } else if (top + targetHeight > vh - vhMargin) {
    bestVPosition = "above";
    // The target element would be out of bounds at the bottom edge, so swap position to be above
    // the element, but it can overlap and restrict the top to be within the vh's defined margin.
    style.top = Math.max(vhMargin, fixedToTop + overlapHeight - targetHeight);
  }

  if (horizontalSpacing && !isTooWide) {
    const sign =
      horizontalPosition === "left" || horizontalPosition === "inner left"
        ? "-"
        : "+";
    style.left = `calc(${style.left}px ${sign} ${horizontalSpacing})`;
  }

  if (verticalSpacing && !isTooTall) {
    const sign = verticalPosition === "above" ? "-" : "+";
    style.top = `calc(${style.top}px ${sign} ${verticalSpacing})`;
  }

  if (!isTooTall) {
    style.transformOrigin = createTransformOrigin(bestHPosition, bestVPosition);
  }

  return style;
}

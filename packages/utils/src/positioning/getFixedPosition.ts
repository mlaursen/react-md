import { createHorizontalPosition } from "./createHorizontalPosition";
import { createVerticalPosition } from "./createVerticalPosition";
import { findSizingContainer } from "./findSizingContainer";
import { getElementRect } from "./getElementRect";
import { getTransformOrigin } from "./getTransformOrigin";
import { getViewportSize } from "./getViewportSize";
import { FixedPosition, FixedPositionOptions } from "./types";

/**
 * One of the most complicated functions in this project that will attempt to
 * position an element relative to another container element while still being
 * visible within the viewport. Below is the logical flow for attempting to fix
 * the element to the container:
 *
 * No Container: If there is no container element, return the provided x and y
 * positions and no styles since there's nothing we can use to calculate the
 * position.
 *
 * No Element: If the container was provided but the element to position does
 * not exist, return an style object containing the `left` and `top` values for
 * the container and apply as many of the positioning options as possible so
 * that the styles are "as close as possible" before the fixed element is added
 * to the DOM. This will also return the provided x and y positions since
 * nothing could be swapped around yet.
 *
 * Container and Element: If both the container and fixed element were provided,
 * apply all the positioning options to the `left` and `top` values of the
 * container based on the sizes of both elements.
 *
 * Now that the `left` and `top` values were applied, check to see if the
 * element is fully visible within the viewport with the provided positioning
 * options. If it is fully visible, do nothing else. If it isn't... follow the
 * next flow:
 *
 * First, check the horizontal sizes and make sure that the element is still
 * within the viewport with the provided viewwidth margin. If it isn't, first
 * try to swap only to a `right` style instead of left to see if that fixes it,
 * otherwise keep both the `left` and `right` styles.
 */
export function getFixedPosition({
  container,
  element,
  anchor: propAnchor = {},
  initialX,
  initialY,
  vwMargin = 16,
  vhMargin = 16,
  xMargin = 0,
  yMargin = 0,
  width: widthType = "auto",
  preventOverlap = false,
  transformOrigin = false,
  disableSwapping = false,
  disableVHBounds = false,
}: FixedPositionOptions): FixedPosition {
  container = findSizingContainer(container);
  const anchor = {
    x: propAnchor.x || "center",
    y: propAnchor.y || "below",
  };

  if (process.env.NODE_ENV !== "production") {
    if (widthType !== "auto" && anchor.x !== "center") {
      throw new Error(
        'Unable to use a calculated width when the horizontal anchor is not `"center"`.'
      );
    }

    if (preventOverlap && anchor.y !== "above" && anchor.y !== "below") {
      throw new Error(
        'Unable to prevent overlap when the vertical anchor is not `"above"` or `"below"`'
      );
    }
  }

  if (!container || !element) {
    return {
      actualX: anchor.x,
      actualY: anchor.y,
    };
  }

  const containerRect = container.getBoundingClientRect();
  const vh = getViewportSize("height");
  const vw = getViewportSize("width");

  const { height, width: elWidth } = getElementRect(element);
  if (disableVHBounds) {
    const dialog = element.closest("[role='dialog']");
    if (!dialog) {
      initialY = (initialY ?? 0) + window.scrollY;
    }
  }

  const { left, right, width, minWidth, actualX } = createHorizontalPosition({
    x: anchor.x,
    vw,
    vwMargin,
    xMargin,
    width: widthType,
    elWidth,
    initialX,
    containerRect,
    disableSwapping,
  });
  const { top, bottom, actualY } = createVerticalPosition({
    y: anchor.y,
    vh,
    vhMargin,
    yMargin,
    initialY,
    elHeight: height,
    containerRect,
    disableSwapping,
    preventOverlap,
    disableVHBounds,
  });

  return {
    actualX,
    actualY,
    style: {
      left,
      top,
      right,
      bottom,
      width,
      minWidth,
      position: disableVHBounds ? "absolute" : "fixed",
      transformOrigin: transformOrigin
        ? getTransformOrigin({ x: actualX, y: actualY })
        : undefined,
    },
  };
}

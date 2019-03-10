import {
  getViewportBounds,
  getViewportSize,
  unitToNumber,
  Maybe,
  HorizontalPosition,
  VerticalPosition,
} from "@react-md/utils";
import { RenderConditionalPortalProps } from "@react-md/portal";

import {
  TooltipPosition,
  DeterminePositionConfig,
  TooltipSpacingConfig,
} from "./types.d";

export function getSpacing({
  spacing,
  denseSpacing,
  dense,
}: TooltipSpacingConfig) {
  return `${dense ? denseSpacing : spacing}`;
}

export function determineBestPosition(
  container: Maybe<HTMLElement>,
  config: DeterminePositionConfig
): TooltipPosition {
  const { id, position, vwMargin, vhMargin } = config;
  if (position !== "auto") {
    return position as TooltipPosition;
  } else if (!container) {
    return "below";
  }

  const rect = container.getBoundingClientRect();
  if (rect.top > getViewportBounds("height", vhMargin)) {
    return "above";
  }

  let { left, right } = rect;
  const tooltip = document.getElementById(id);
  if (tooltip) {
    const { offsetWidth } = tooltip;
    const spacing = unitToNumber(getSpacing(config));
    const vw = getViewportSize("width");
    if (
      left + offsetWidth + spacing > vw &&
      right - offsetWidth - spacing < 0
    ) {
      return "below";
    }

    const halvedWidth = (tooltip as HTMLSpanElement).offsetWidth / 2;
    left -= halvedWidth;
    right += halvedWidth;
  }

  if (left < getViewportBounds("width", vwMargin)) {
    return "right";
  } else if (right > getViewportBounds("width", vwMargin, false)) {
    return "left";
  }

  return "below";
}

export function validateContainerPosition(
  container: Maybe<HTMLElement>,
  config: RenderConditionalPortalProps
) {
  if (process.env.NODE_ENV === "production" || !container) {
    return;
  }
  const { portal, portalInto, portalIntoId } = config;
  if (portal || portalInto || portalIntoId) {
    // don't need to check for position relative when portaling since
    // it's fixed in the page anyways
    return;
  }

  // when in dev mode, make sure that the container element has a relative position
  // so that the tooltip will appear "fixed" to the container element. This will have]
  // to be updated when I implement tooltip portal support
  const { position } = window.getComputedStyle(container);
  if (position !== "relative") {
    console.error(
      "A tooltip's container must have `position: relative` as a style for a tooltip to " +
        `appear but its position is: \`${position}\`. An inline style has been applied, ` +
        "but your container must be updated before going into production as this " +
        "functionality will be removed"
    );
    console.error(new Error().stack);
    container.style.position = "relative";
  }
}

export function createPositionOptions(
  position: TooltipPosition,
  spacing: string
) {
  let horizontalSpacing: string = "";
  let verticalSpacing: string = "";
  let horizontalPosition: HorizontalPosition = "center";
  let verticalPosition: VerticalPosition = "center";
  switch (position) {
    case "left":
      horizontalPosition = position;
      horizontalSpacing = spacing;
      break;
    case "right":
      horizontalPosition = position;
      horizontalSpacing = spacing;
      break;
    default:
      verticalPosition = position;
      verticalSpacing = spacing;
  }

  return {
    horizontalPosition,
    horizontalSpacing,
    verticalPosition,
    verticalSpacing,
  };
}

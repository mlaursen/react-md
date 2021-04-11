import { useCallback, useState } from "react";
import { getViewportSize, SimplePosition } from "@react-md/utils";

import { DEFAULT_TOOLTIP_THRESHOLD } from "./constants";

/** @internal */
const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 2.8.0
 */
export interface TooltipPositionHookOptions {
  /**
   * An optional controlled position to use that will disable the functionality
   * to determine the "best" position to render the tooltip within the viewport.
   */
  position?: SimplePosition;

  /**
   * An optional position to use before the positioning calculation has
   * occurred. This is also used to determine if the position should be
   * horizontal vs vertical.
   *
   * Vertical - `"below"` or `"above"`
   * Horizontal - `"left"` or `"right"`
   *
   * @defaultValue `"below"`
   */
  defaultPosition?: SimplePosition;

  /**
   * This value should be between 0 and 1 and will be multiplied by either the
   * viewport height or viewport width to determine the best position to render
   * the tooltip based on available space within the viewport.
   *
   * You _probably_ won't ever really need to update this value.
   */
  threshold?: number;
}

/**
 * @internal
 * @remarks \@since 2.8.0
 */
export type UpdateTooltipPosition = (container: HTMLElement) => void;

/**
 * @internal
 * @remarks \@since 2.8.0
 */
export type TooltipPositionHookReturnValue = [
  SimplePosition,
  UpdateTooltipPosition
];

/**
 * A hook that's used to determine the "best" position to render the tooltip
 * within the viewport.
 *
 * @internal
 * @remarks \@since 2.8.0
 */
export function useTooltipPosition({
  position: determinedPosition,
  defaultPosition = "below",
  threshold = DEFAULT_TOOLTIP_THRESHOLD,
}: TooltipPositionHookOptions): TooltipPositionHookReturnValue {
  const [position, setPosition] = useState(defaultPosition);
  const updatePosition = useCallback<UpdateTooltipPosition>(
    (container) => {
      const { top, left } = container.getBoundingClientRect();
      const vh = getViewportSize("height");
      const vw = getViewportSize("width");
      let nextPosition = defaultPosition;
      if (defaultPosition === "above" && top < vh * threshold) {
        nextPosition = "below";
      } else if (defaultPosition === "below" && top > vh * threshold) {
        nextPosition = "above";
      } else if (defaultPosition === "left" && left < vw * threshold) {
        nextPosition = "right";
      } else if (defaultPosition === "right" && left > vw * threshold) {
        nextPosition = "left";
      }

      setPosition(nextPosition);
    },
    [defaultPosition, threshold]
  );

  if (typeof determinedPosition !== "undefined") {
    return [determinedPosition, noop];
  }

  return [position, updatePosition];
}

import { useCallback, useState } from "react";
import { getViewportSize, SimplePosition, useRefCache } from "@react-md/utils";

interface PositionOptions {
  position?: SimplePosition;
  defaultPosition: SimplePosition;
  threshold: number;
}

const NOOP = (): void => {};

interface PositionResult {
  position: SimplePosition;
  setEstimatedPosition: (container: HTMLElement) => void;
}

/**
 * A small hook that will set the tooltip position automatically based on the
 * container element's location within the viewport. However, if the `position`
 * option/prop was provided, that value will always be used instead.
 */
export default function usePosition({
  position: determinedPosition,
  defaultPosition,
  threshold,
}: PositionOptions): PositionResult {
  const [position, setPosition] = useState(defaultPosition);
  const prevPosition = useRefCache(position);

  /**
   * This will only be used when the `determinedPosition` is undefined. When the
   * container element starts the tooltip "visibility" mode, this will be called
   * so that we can best guess what the position of the tooltip should be based
   * on the current position of the container element within the viewport. If
   * this isn't done and the tooltip swaps position due to the positioning
   * logic, the animation will be reversed.
   */
  const setEstimatedPosition = useCallback(
    (container: HTMLElement) => {
      const { top, left } = container.getBoundingClientRect();

      let nextPosition = defaultPosition;
      const vh = getViewportSize("height");
      const vw = getViewportSize("width");
      switch (defaultPosition) {
        case "above":
          if (top < vh - vh * threshold) {
            nextPosition = "below";
          }
          break;
        case "below":
          if (top > vh * threshold) {
            nextPosition = "above";
          }
          break;
        case "left":
          if (left < vw - vw * threshold) {
            nextPosition = "right";
          }
          break;
        case "right":
          if (left > vw * threshold) {
            nextPosition = "left";
          }
          break;
        // no default
      }

      if (prevPosition.current !== nextPosition) {
        setPosition(nextPosition);
      }
    },
    // disabled since useRefCache for prevPosition
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultPosition, threshold]
  );

  if (typeof determinedPosition !== "undefined") {
    return {
      position: determinedPosition,
      setEstimatedPosition: NOOP,
    };
  }

  return {
    position,
    setEstimatedPosition,
  };
}

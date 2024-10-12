import {
  ABOVE_CENTER_ANCHOR,
  BELOW_CENTER_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
} from "../positioning/constants.js";
import type { PositionAnchor, SimplePosition } from "../positioning/types.js";

/** @internal */
export function getAnchor(position: SimplePosition): PositionAnchor {
  switch (position) {
    case "above":
      return ABOVE_CENTER_ANCHOR;
    case "below":
      return BELOW_CENTER_ANCHOR;
    case "left":
      return CENTER_LEFT_ANCHOR;
    case "right":
      return CENTER_RIGHT_ANCHOR;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Invalid tooltip position: "${position}"`);
  }
}

/** @internal */
export interface GetPositionOptions {
  container: HTMLElement;
  threshold: number;
  defaultPosition: SimplePosition;
}

/** @internal */
export function getPosition(options: GetPositionOptions): SimplePosition {
  const { container, defaultPosition, threshold } = options;

  const { top, left } = container.getBoundingClientRect();
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  let nextPosition = defaultPosition;
  if (defaultPosition === "above" && top < vh - vh * threshold) {
    nextPosition = "below";
  } else if (defaultPosition === "below" && top > vh * threshold) {
    nextPosition = "above";
  } else if (defaultPosition === "left" && left < vw - vw * threshold) {
    nextPosition = "right";
  } else if (defaultPosition === "right" && left > vw * threshold) {
    nextPosition = "left";
  }

  return nextPosition;
}

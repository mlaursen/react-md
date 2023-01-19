import type { PositionAnchor, SimplePosition } from "../positioning";
import {
  ABOVE_CENTER_ANCHOR,
  BELOW_CENTER_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
} from "../positioning";

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
      throw new Error(`Invalid position: ${position}`);
  }
}

import { PositionAnchor } from "./types";

/**
 * This is a simple util that'll generate a css `transform-origin` string so
 * that the fixed element can animate from the correct point based on the
 * provided anchor.
 *
 * @param anchor - The anchor that should be used to create the transform origin
 * for.
 * @returns the transform origin string
 * @internal
 */
export function getTransformOrigin(anchor: PositionAnchor): string {
  let x = "0";
  switch (anchor.x) {
    case "right":
    case "inner-left":
      x = "0";
      break;
    case "center":
      x = "50%";
      break;
    case "left":
    case "inner-right":
      x = "100%";
      break;
    default:
      x = "0";
  }

  let y = "0";
  switch (anchor.y) {
    case "above":
    case "bottom":
      y = "100%";
      break;
    case "center":
      y = "50%";
      break;
    case "below":
    case "top":
      y = "0";
      break;
    default:
      y = "0";
  }

  return `${x} ${y}`;
}

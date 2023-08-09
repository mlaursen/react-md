import type { FloatingActionButtonPosition } from "../button/FloatingActionButton";
import {
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "../positioning/constants";
import type { PositionAnchor } from "../positioning/types";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
interface DefaultAnchorOptions {
  anchor?: PositionAnchor;
  menubar: boolean;
  menuitem: boolean;
  floating?: FloatingActionButtonPosition;
  horizontal: boolean;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getDefaultAnchor = (
  options: DefaultAnchorOptions
): PositionAnchor => {
  const { anchor, menubar, menuitem, floating, horizontal } = options;
  if (anchor) {
    return anchor;
  }

  switch (floating) {
    case "bottom-left":
      return BOTTOM_INNER_LEFT_ANCHOR;
    case "bottom-right":
      return BOTTOM_INNER_RIGHT_ANCHOR;
    case "top-left":
      return TOP_INNER_LEFT_ANCHOR;
    case "top-right":
      return TOP_INNER_RIGHT_ANCHOR;
  }

  if (menubar) {
    return menuitem ? CENTER_RIGHT_ANCHOR : BELOW_INNER_LEFT_ANCHOR;
  }

  if (horizontal) {
    return BELOW_CENTER_ANCHOR;
  }

  if (menuitem) {
    return TOP_RIGHT_ANCHOR;
  }

  return TOP_INNER_RIGHT_ANCHOR;
};

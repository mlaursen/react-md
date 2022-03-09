import type { FABPosition } from "@react-md/button";
import type { PositionAnchor } from "@react-md/utils";
import {
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/utils";

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 5.0.0
 * @internal
 */
interface DefaultAnchorOptions {
  menubar: boolean;
  menuitem: boolean;
  floating: FABPosition;
  horizontal: boolean;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getDefaultAnchor = ({
  menubar,
  menuitem,
  floating,
  horizontal,
}: DefaultAnchorOptions): PositionAnchor => {
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

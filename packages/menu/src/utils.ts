import {
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  PositionAnchor,
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
  horizontal: boolean;
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const getDefaultAnchor = ({
  menubar,
  menuitem,
  horizontal,
}: DefaultAnchorOptions): PositionAnchor => {
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

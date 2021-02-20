import React, { forwardRef } from "react";
import {
  Divider,
  DividerElement,
  DividerProps,
  VerticalDivider,
  VerticalDividerProps,
} from "@react-md/divider";

import { useOrientation } from "./Orientation";

export interface MenuItemSeparatorProps
  extends DividerProps,
    Pick<VerticalDividerProps, "maxHeight"> {
  /**
   * The current orientation of the separator. This is required for a11y, but
   * will automatically be determined by the `Menu`'s orientation if omitted.
   */
  "aria-orientation"?: "horizontal" | "vertical";
}

export const MenuItemSeparator = forwardRef<
  DividerElement,
  MenuItemSeparatorProps
>(function MenuItemSeparator(
  { "aria-orientation": ariaOrientation, maxHeight, ...props },
  ref
) {
  const menuOrientation = useOrientation();
  if (
    ariaOrientation === "vertical" ||
    (!ariaOrientation && menuOrientation === "horizontal")
  ) {
    return (
      <VerticalDivider
        {...props}
        ref={ref}
        aria-orientation="vertical"
        maxHeight={maxHeight}
        role="separator"
      />
    );
  }

  return <Divider {...props} ref={ref} role="separator" />;
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    MenuItemSeparator.propTypes = {
      "aria-orientation": PropTypes.oneOf(["horizontal", "vertical"]),
      className: PropTypes.string,
      maxHeight: PropTypes.number,
    };
  } catch (e) {}
}

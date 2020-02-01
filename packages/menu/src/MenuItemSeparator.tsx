import React, { FC, forwardRef } from "react";
import {
  Divider,
  DividerElement,
  DividerProps,
  VerticalDivider,
  VerticalDividerProps,
} from "@react-md/divider";
import { WithForwardedRef } from "@react-md/utils";

import { useOrientation } from "./Orientation";

export interface MenuItemSeparatorProps
  extends DividerProps,
    Pick<VerticalDividerProps, "maxHeight"> {
  /**
   * The current orientation of the separator. This is required for a11y,
   * but will automatically be determined by the `Menu`'s orientation if
   * omitted.
   */
  "aria-orientation"?: "horizontal" | "vertical";
}

const MenuItemSeparator: FC<MenuItemSeparatorProps &
  WithForwardedRef<DividerElement>> = ({
  "aria-orientation": ariaOrientation,
  maxHeight,
  forwardedRef,
  ...props
}) => {
  const menuOrientation = useOrientation();
  if (
    ariaOrientation === "vertical" ||
    (!ariaOrientation && menuOrientation === "horizontal")
  ) {
    return (
      <VerticalDivider
        {...props}
        ref={forwardedRef}
        aria-orientation="vertical"
        maxHeight={maxHeight}
        role="separator"
      />
    );
  }

  return <Divider {...props} ref={forwardedRef} role="separator" />;
};

if (process.env.NODE_ENV !== "production") {
  MenuItemSeparator.displayName = "MenuItemSeparator";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    MenuItemSeparator.propTypes = {
      "aria-orientation": PropTypes.oneOf(["horizontal", "vertical"]),
      className: PropTypes.string,
      maxHeight: PropTypes.number,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  }
}

export default forwardRef<DividerElement, MenuItemSeparatorProps>(
  (props, ref) => <MenuItemSeparator {...props} forwardedRef={ref} />
);

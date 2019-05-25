import React, { FC } from "react";
import {
  Divider,
  DividerProps,
  VerticalDivider,
  VerticalDividerProps,
} from "@react-md/divider";

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

const MenuItemSeparator: FC<MenuItemSeparatorProps> = ({
  "aria-orientation": propOrientation,
  maxHeight,
  ...props
}) => {
  const menuOrientation = useOrientation();
  const orientation = propOrientation || menuOrientation;
  if (orientation === "horizontal") {
    return (
      <VerticalDivider
        {...props}
        aria-orientation="vertical"
        role="separator"
      />
    );
  }

  return (
    <Divider
      {...props}
      aria-orientation={orientation || menuOrientation}
      role="separator"
    />
  );
};

export default MenuItemSeparator;

import React, { forwardRef } from "react";

import {
  BaseMenuItemInputToggleProps,
  MenuItemInputToggle,
} from "./MenuItemInputToggle";

/** @remarks \@since 2.8.0 */
export type MenuItemSwitchProps = Omit<BaseMenuItemInputToggleProps, "icon">;

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a switch.
 *
 * @remarks \@since 2.8.0
 */
export const MenuItemSwitch = forwardRef<HTMLLIElement, MenuItemSwitchProps>(
  function MenuItemSwitch(props, ref) {
    return <MenuItemInputToggle {...props} ref={ref} type="switch" />;
  }
);

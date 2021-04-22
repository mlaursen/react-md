import React, { forwardRef } from "react";
import { useIcon } from "@react-md/icon";
import {
  BaseMenuItemInputToggleProps,
  MenuItemInputToggle,
} from "./MenuItemInputToggle";

/** @remarks \@since 2.8.0 */
export type MenuItemCheckboxProps = BaseMenuItemInputToggleProps;

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link IconProvider}.
 */
export const MenuItemCheckbox = forwardRef<
  HTMLLIElement,
  MenuItemCheckboxProps
>(function MenuItemCheckbox({ icon: propIcon, ...props }, ref) {
  const icon = useIcon("checkbox", propIcon);
  return (
    <MenuItemInputToggle {...props} ref={ref} icon={icon} type="checkbox" />
  );
});

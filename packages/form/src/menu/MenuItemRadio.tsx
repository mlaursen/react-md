import React, { forwardRef } from "react";
import { useIcon } from "@react-md/icon";
import {
  BaseMenuItemInputToggleProps,
  MenuItemInputToggle,
} from "./MenuItemInputToggle";

/** @remarks \@since 2.8.0 */
export type MenuItemRadioProps = BaseMenuItemInputToggleProps;

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a radio and pulling the radio icon from the
 * {@link IconProvider}.
 */
export const MenuItemRadio = forwardRef<HTMLLIElement, MenuItemRadioProps>(
  function MenuItemRadio({ icon: propIcon, ...props }, ref) {
    const icon = useIcon("radio", propIcon);
    return (
      <MenuItemInputToggle {...props} ref={ref} icon={icon} type="radio" />
    );
  }
);

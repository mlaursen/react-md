import { forwardRef } from "react";
import { IconRotator, useIcon } from "@react-md/icon";

import { useMenuBarContext } from "./MenuBarProvider";
import { useMenuBarWidgetFocusId } from "./MenuBarWidget";
import { MenuItem } from "./MenuItem";
import type { BaseMenuItemButtonProps } from "./types";

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuItemButtonProps extends BaseMenuItemButtonProps {
  /**
   * Boolean if the menu is currently visible which will rotate the dropdown
   * icon when the {@link BaseDropdownMenuItemProps.disableDropdownIcon} is not
   * `true`.
   */
  visible: boolean;
}

/**
 * This is just an internal component that handles rendering a submenu as a
 * menuitem for a `DropdownMenu` with a conditional dropdown icon.
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export const MenuItemButton = forwardRef<HTMLLIElement, MenuItemButtonProps>(
  function MenuItemButton(
    {
      id,
      children,
      rightAddon: propRightAddon,
      disableDropdownIcon = typeof propRightAddon !== "undefined",
      visible,
      tabIndex,
      iconRotatorProps,
      ...props
    },
    ref
  ) {
    const { root } = useMenuBarContext();
    const focusId = useMenuBarWidgetFocusId();
    const dropdownIcon = useIcon(root ? "dropdown" : "forward");

    let rightAddon = propRightAddon;
    if (!disableDropdownIcon) {
      rightAddon = (
        <IconRotator {...iconRotatorProps} rotated={visible}>
          {dropdownIcon}
        </IconRotator>
      );
    }

    return (
      <MenuItem
        {...props}
        id={id}
        ref={ref}
        rightAddon={rightAddon}
        tabIndex={tabIndex ?? (root && id === focusId ? 0 : -1)}
      >
        {children}
      </MenuItem>
    );
  }
);

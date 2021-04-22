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
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu } from "@react-md/menu";
 * import { MenuItemSwitch } from "@react-md/form";
 *
 * function Example(): ReactElement {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu
 *       id="dropdown-menu-id"
 *       items={[
 *         <MenuItemSwitch
 *           id="switch-1"
 *           checked={checked}
 *           onCheckedChange={(nextChecked) => setChecked(nextChecked)}
 *         >
 *           Switch
 *        </MenuItemSwitch>,
 *       ]}
 *     >
 *       Button
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.8.0
 */
export const MenuItemSwitch = forwardRef<HTMLLIElement, MenuItemSwitchProps>(
  function MenuItemSwitch(props, ref) {
    return <MenuItemInputToggle {...props} ref={ref} type="switch" />;
  }
);

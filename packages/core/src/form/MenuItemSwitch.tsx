"use client";
import { forwardRef } from "react";
import {
  MenuItemInputToggle,
  type MenuItemSwitchProps,
} from "./MenuItemInputToggle.js";

/**
 * **Client Component**
 *
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a switch.
 *
 * @example Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu, MenuItemSwitch } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu buttonChildren="Button">
 *       <MenuItemSwitch
 *         checked={checked}
 *         onCheckedChange={(nextChecked) => setChecked(nextChecked)}
 *       >
 *         Switch
 *      </MenuItemSwitch>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @since 2.8.0
 */
export const MenuItemSwitch = forwardRef<HTMLLIElement, MenuItemSwitchProps>(
  function MenuItemSwitch(props, ref) {
    return <MenuItemInputToggle {...props} ref={ref} type="switch" />;
  }
);

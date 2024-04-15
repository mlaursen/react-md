"use client";
import { forwardRef } from "react";
import {
  MenuItemInputToggle,
  type MenuItemCheckboxProps,
} from "./MenuItemInputToggle.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type ICON_CONFIG } from "../icon/iconConfig.js";

/**
 * **Client Component**
 *
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link ICON_CONFIG}.
 *
 * @example Simple Example
 * ```tsx
 * import { DropdownMenu, MenuItemCheckbox } from "@react-md/core";
 * import { ReactElement, useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu buttonChildren="Button">
 *       <MenuItemCheckbox
 *         checked={checked}
 *         onCheckedChange={(nextChecked) => setChecked(nextChecked)}
 *       >
 *         Checkbox
 *      </MenuItemCheckbox>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @since 2.8.0
 */
export const MenuItemCheckbox = forwardRef<
  HTMLLIElement,
  MenuItemCheckboxProps
>(function MenuItemCheckbox(props, ref) {
  return <MenuItemInputToggle {...props} ref={ref} type="checkbox" />;
});

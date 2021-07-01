import React, { forwardRef } from "react";
import { useIcon } from "@react-md/icon";

import { IndeterminateCheckboxProps } from "../toggle/Checkbox";
import {
  BaseMenuItemInputToggleProps,
  MenuItemInputToggle,
} from "./MenuItemInputToggle";

/** @remarks \@since 2.8.0 */
export interface MenuItemCheckboxProps
  extends BaseMenuItemInputToggleProps,
    IndeterminateCheckboxProps {}

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link IconProvider}.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu } from "@react-md/menu";
 * import { MenuItemCheckbox } from "@react-md/form";
 *
 * function Example(): ReactElement {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu
 *       id="dropdown-menu-id"
 *       items={[
 *         <MenuItemCheckbox
 *           id="checkbox-1"
 *           checked={checked}
 *           onCheckedChange={(nextChecked) => setChecked(nextChecked)}
 *         >
 *           Checkbox
 *        </MenuItemCheckbox>,
 *       ]}
 *     >
 *       Button
 *     </DropdownMenu>
 *   );
 * }
 * ```
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

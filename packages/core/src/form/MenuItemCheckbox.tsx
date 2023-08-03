"use client";
import { forwardRef } from "react";

import type { MenuItemCheckboxProps } from "./MenuItemInputToggle";
import { MenuItemInputToggle } from "./MenuItemInputToggle";

/**
 * **Client Component**
 *
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link IconProvider}.
 *
 * @example
 * Simple Example
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
 * @remarks \@since 2.8.0
 */
export const MenuItemCheckbox = forwardRef<
  HTMLLIElement,
  MenuItemCheckboxProps
>(function MenuItemCheckbox(props, ref) {
  return <MenuItemInputToggle {...props} ref={ref} type="checkbox" />;
});

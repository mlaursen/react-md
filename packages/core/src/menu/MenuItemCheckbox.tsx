"use client";

import { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type ICON_CONFIG } from "../icon/config.js";
import {
  type MenuItemCheckboxProps,
  MenuItemInputToggle,
} from "./MenuItemInputToggle.js";

/**
 * **Client Component**
 *
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link ICON_CONFIG}.
 *
 * @example Simple Example
 * ```tsx
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItemCheckbox } from "@react-md/core/menu/MenuItemCheckbox";
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
 * @see {@link https://next.react-md.dev/components/menu#menuitemcheckbox-example | DropdownMenu Demos}
 * @since 2.8.0
 */
export const MenuItemCheckbox = forwardRef<
  HTMLLIElement,
  MenuItemCheckboxProps
>(function MenuItemCheckbox(props, ref) {
  return <MenuItemInputToggle {...props} ref={ref} type="checkbox" />;
});

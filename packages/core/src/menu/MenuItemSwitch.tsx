"use client";

import { type ReactElement } from "react";

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
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItemSwitch } from "@react-md/core/menu/MenuItemSwitch";
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
 * @see {@link https://react-md.dev/components/menu#menuitemswitch-example | DropdownMenu Demos}
 * @since 2.8.0
 */
export function MenuItemSwitch(props: MenuItemSwitchProps): ReactElement {
  const { ref, ...remaining } = props;

  return <MenuItemInputToggle {...remaining} ref={ref} type="switch" />;
}

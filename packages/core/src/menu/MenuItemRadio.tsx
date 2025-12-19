"use client";

import { type ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type ICON_CONFIG } from "../icon/config.js";
import {
  MenuItemInputToggle,
  type MenuItemRadioProps,
} from "./MenuItemInputToggle.js";

/**
 * **Client Component**
 *
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a radio and pulling the radio icon from the
 * {@link ICON_CONFIG}.
 *
 * If a menu or menubar contains more than one group of menuitemradio elements,
 * or if the menu contains one group and other, unrelated menu items, authors
 * SHOULD nest each set of related menuitemradio elements in an element using
 * the group role, and authors SHOULD delimit the group from other menu items
 * with an element using the separator role.
 * @see {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio}
 *
 * @example Only Radio Items
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItemRadio } from "@react-md/core/menu/MenuItemRadio";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("value1");
 *
 *   return (
 *     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
 *       <MenuItemRadio
 *         id="radio-1"
 *         checked={value === "value1"}
 *         onCheckedChange={() => setValue("value1")}
 *       >
 *          Radio 1
 *       </MenuItemRadio>
 *       <MenuItemRadio
 *         id="radio-2"
 *         checked={value === "value2"}
 *         onCheckedChange={() => setValue("value2")}
 *       >
 *         Radio 2
 *       </MenuItemRadio>
 *       <MenuItemRadio
 *         id="radio-3"
 *         checked={value === "value3"}
 *         onCheckedChange={() => setValue("value3")}
 *       >
 *         Radio 3
 *       </MenuItemRadio>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @example With Other Items
 * ```tsx
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItemGroup } from "@react-md/core/menu/MenuItemGroup";
 * import { MenuItemRadio } from "@react-md/core/menu/MenuItemRadio";
 * import { MenuItemSeparator } from "@react-md/core/menu/MenuItemSeparator";
 * import { MenuItemSwitch } from "@react-md/core/menu/MenuItemSwitch";
 * import type { ReactElement } from "react";
 * import { useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("value1");
 *
 *   return (
 *     <DropdownMenu buttonChildren="Button">
 *       <MenuItemSwitch
 *         checked={checked}
 *         onCheckedChange={nextChecked => setChecked(nextChecked)}
 *       >
 *         Light mode
 *       </MenuItemSwitch>
 *       <MenuItemSeparator />
 *       <MenuItemGroup aria-label="My Group Label">
 *         <MenuItemRadio
 *           checked={value === "value1"}
 *           onCheckedChange={() => setValue("value1")}
 *         >
 *           Radio 1
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           checked={value === "value2"}
 *           onCheckedChange={() => setValue("value2")}
 *         >
 *           Radio 2
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           checked={value === "value3"}
 *           onCheckedChange={() => setValue("value3")}
 *         >
 *           Radio 3
 *         </MenuItemRadio>
 *       </MenuItemGroup>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/menu#menuitemradio-example | DropdownMenu Demos}
 * @since 2.8.0
 */
export function MenuItemRadio(props: MenuItemRadioProps): ReactElement {
  const { ref, ...remaining } = props;

  return <MenuItemInputToggle {...remaining} ref={ref} type="radio" />;
}

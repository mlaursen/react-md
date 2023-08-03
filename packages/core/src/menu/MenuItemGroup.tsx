"use client";
import { cnb } from "cnbuilder";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import type { ListElement, ListProps } from "../list";
import { List } from "../list";
import type { LabelRequiredForA11y } from "../types";
import { useMenuConfiguration } from "./MenuConfigurationProvider";

/** @remarks \@since 5.0.0 */
export type MenuItemGroupProps = LabelRequiredForA11y<
  Omit<ListProps, "role">
> & {
  children: ReactNode;
};

/**
 * **Client Component**
 *
 * If a menu or menubar contains more than one group of menuitemradio elements,
 * or if the menu contains one group and other, unrelated menu items, authors
 * SHOULD nest each set of related menuitemradio elements in an element using
 * the group role, and authors SHOULD delimit the group from other menu items
 * with an element using the separator role.
 *
 * @see {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio}
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import {
 *   DropdownMenu,
 *   MenuItemGroup,
 *   MenuItemRadio,
 *   MenuItemSeparator,
 *   MenuItemSwitch,
 * } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const [value, setValue] = useState("value1");
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
 *       <MenuItemSwitch
 *         id="switch-id"
 *         checked={checked}
 *         onCheckedChange={nextChecked => setChecked(nextChecked)}
 *       >
 *         Light mode
 *       </MenuItemSwitch>
 *       <MenuItemSeparator />
 *       <MenuItemGroup aria-label="My Group Label">
 *         <MenuItemRadio
 *           id="radio-1"
 *           checked={value === "value1"}
 *           onCheckedChange={() => setValue("value1")}
 *         >
 *           Radio 1
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           id="radio-2"
 *           checked={value === "value2"}
 *           onCheckedChange={() => setValue("value2")}
 *         >
 *           Radio 2
 *         </MenuItemRadio>
 *         <MenuItemRadio
 *           id="radio-3"
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
 * @remarks \@since 5.0.0
 */
export const MenuItemGroup = forwardRef<ListElement, MenuItemGroupProps>(
  function MenuItemGroup({ children, className, ...props }, ref) {
    const { horizontal } = useMenuConfiguration(props);
    return (
      <List
        {...props}
        ref={ref}
        role="group"
        className={cnb("rmd-menu-item-group", className)}
        horizontal={horizontal}
      >
        {children}
      </List>
    );
  }
);

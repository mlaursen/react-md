"use client";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { ListItemProps } from "../list/ListItem.js";
import { ListItem } from "../list/ListItem.js";
import { useKeyboardMovementContext } from "../movement/useKeyboardMovementProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";

/**
 * @remarks \@since 5.0.0
 */
export interface MenuItemProps extends Omit<ListItemProps, "role"> {
  /**
   * @defaultValue `"menuitem"`
   */
  role?: string;

  /**
   * @defaultValue `-1`
   */
  tabIndex?: number;
}

/**
 * **Client Component**
 *
 * This component is used as an "action" within a `Menu`/`DropdownMenu` that
 * implements some keyboard focus behavior. This component should generally have
 * an `onClick` event handler.
 *
 * @remarks \@since 5.0.0
 */
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const {
      id: propId,
      role = "menuitem",
      tabIndex: propTabIndex,
      children,
      className,
      ...remaining
    } = props;

    const id = useEnsuredId(propId, "menuitem");
    const { tabIndexBehavior, activeDescendantId } =
      useKeyboardMovementContext();
    const focused = id === activeDescendantId;
    let tabIndex = propTabIndex ?? -1;
    if (tabIndexBehavior === "roving" && focused) {
      tabIndex = 0;
    }

    return (
      <ListItem
        {...remaining}
        id={id}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={cnb(
          "rmd-menu-item",
          tabIndexBehavior === "virtual" && focused && "rmd-menu-item--focused",
          className
        )}
      >
        {children}
      </ListItem>
    );
  }
);

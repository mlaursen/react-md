import { forwardRef } from "react";
import cn from "classnames";
import { ListItem } from "@react-md/list";
import { useKeyboardFocusableElement } from "@react-md/utils";

import type { MenuItemProps } from "./types";

/**
 * This component is used as an "action" within a `Menu`/`DropdownMenu` that
 * implements some keyboard focus behavior. This component should generally have
 * an `onClick` event handler.
 *
 * @remarks \@since 5.0.0
 */
export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(
    { className, children, role = "menuitem", tabIndex = -1, ...props },
    nodeRef
  ) {
    const ref = useKeyboardFocusableElement(nodeRef);
    return (
      <ListItem
        {...props}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={cn("rmd-menu-item", className)}
      >
        {children}
      </ListItem>
    );
  }
);

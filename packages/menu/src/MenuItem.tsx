import React, { forwardRef } from "react";
import cn from "classnames";
import { ListItem, ListItemProps } from "@react-md/list";

export interface MenuItemProps extends ListItemProps {
  /**
   * An optional id for the menu item. This is generally recommended, but it can
   * be ignored.
   */
  id?: string;

  /**
   * The current role for the menu item. This will eventually be updated for
   * some of the other `menuitem*` widgets.
   */
  role?: "menuitem" | "button";

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: number;
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(
    { className, children, role = "menuitem", tabIndex = -1, ...props },
    ref
  ) {
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

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    MenuItem.propTypes = {
      id: PropTypes.string,
      className: PropTypes.string,
      role: PropTypes.string,
      tabIndex: PropTypes.number,
      children: PropTypes.node,
    };
  } catch (e) {}
}

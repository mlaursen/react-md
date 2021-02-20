import React, { forwardRef } from "react";
import cn from "classnames";
import {
  ListItemLink,
  ListItemLinkProps,
  ListItemLinkWithComponentProps,
} from "@react-md/list";

export interface MenuItemLinkProps extends ListItemLinkProps {
  /**
   * The current role for the menu item. This will eventually be updated for
   * some of the other `menuitem*` widgets.
   */
  role?: "menuitem";

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: number;
}

export type MenuItemLinkWithComponentProps = MenuItemLinkProps &
  ListItemLinkWithComponentProps;

export const MenuItemLink = forwardRef<
  HTMLAnchorElement,
  MenuItemLinkProps | MenuItemLinkWithComponentProps
>(function MenuItemLink(
  { className, children, role = "menuitem", tabIndex = -1, ...props },
  ref
) {
  return (
    <li role="none">
      <ListItemLink
        {...props}
        ref={ref}
        role={role}
        tabIndex={tabIndex}
        className={cn("rmd-menu-item", className)}
      >
        {children}
      </ListItemLink>
    </li>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    MenuItemLink.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
      role: PropTypes.oneOf(["menuitem"]),
      tabIndex: PropTypes.number,
    };
  } catch (e) {}
}

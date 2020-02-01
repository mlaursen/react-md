import React, { ElementType, forwardRef, ReactElement, Ref } from "react";
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

function MenuItemLink(
  {
    className,
    children,
    role = "menuitem",
    tabIndex = -1,
    ...props
  }: MenuItemLinkProps,
  ref?: Ref<HTMLAnchorElement | ElementType>
): ReactElement {
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
}

const ForwardedMenuItemLink = forwardRef<
  HTMLAnchorElement | ElementType,
  MenuItemLinkProps | MenuItemLinkWithComponentProps
>(MenuItemLink);

export default ForwardedMenuItemLink;

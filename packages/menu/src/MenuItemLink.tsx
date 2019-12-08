import React, { ElementType, FC, forwardRef } from "react";
import cn from "classnames";
import {
  ListItemLink,
  ListItemLinkProps,
  ListItemLinkWithComponentProps,
} from "@react-md/list";
import { WithForwardedRef } from "@react-md/utils";

export interface MenuItemLinkProps extends ListItemLinkProps {
  /**
   * The current role for the menu item. This will eventually be updated for some
   * of the other `menuitem*` widgets.
   */
  role?: "menuitem";

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: number;
}

export type MenuItemLinkWithComponentProps = MenuItemLinkProps &
  ListItemLinkWithComponentProps;

type WithRef = WithForwardedRef<HTMLAnchorElement | ElementType>;
type DefaultProps = Required<Pick<MenuItemLinkProps, "role" | "tabIndex">>;
type WithDefaultProps = MenuItemLinkProps & DefaultProps & WithRef;

const MenuItemLink: FC<MenuItemLinkProps & WithRef> = providedProps => {
  const {
    className,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <li role="none">
      <ListItemLink
        {...props}
        ref={forwardedRef}
        className={cn("rmd-menu-item", className)}
      >
        {children}
      </ListItemLink>
    </li>
  );
};

const defaultProps: DefaultProps = {
  role: "menuitem",
  tabIndex: -1,
};

MenuItemLink.defaultProps = defaultProps;

export default forwardRef<
  HTMLAnchorElement | ElementType,
  MenuItemLinkProps | MenuItemLinkWithComponentProps
>((props, ref) => <MenuItemLink {...props} forwardedRef={ref} />);

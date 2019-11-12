import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { ListItem, ListItemProps } from "@react-md/list";
import { WithForwardedRef } from "@react-md/utils";

export interface MenuItemProps extends ListItemProps {
  /**
   * An optional id for the menu item. This is generally recommended, but it can
   * be ignored.
   */
  id?: string;

  /**
   * The current role for the menu item. This will eventually be updated for some
   * of the other `menuitem*` widgets.
   */
  role?: "menuitem" | "button";

  /**
   * The tab index for the menu item. This should always stay at `-1`.
   */
  tabIndex?: number;
}

type WithRef = WithForwardedRef<HTMLLIElement>;
type DefaultProps = Required<Pick<MenuItemProps, "role" | "tabIndex">>;
type WithDefaultProps = MenuItemProps & DefaultProps & WithRef;

const MenuItem: FC<MenuItemProps & WithRef> = providedProps => {
  const {
    className,
    children,
    forwardedRef,
    ...props
  } = providedProps as WithDefaultProps;

  return (
    <ListItem
      {...props}
      ref={forwardedRef}
      className={cn("rmd-menu-item", className)}
    >
      {children}
    </ListItem>
  );
};

const defaultProps: DefaultProps = {
  role: "menuitem",
  tabIndex: -1,
};

MenuItem.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  MenuItem.displayName = "MenuItem";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    MenuItem.propTypes = {
      id: PropTypes.string,
      className: PropTypes.string,
      role: PropTypes.string,
      tabIndex: PropTypes.number,
    };
  }
}

export default forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => (
  <MenuItem {...props} forwardedRef={ref} />
));

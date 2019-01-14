import * as React from "react";
import { Omit, IWithForwardedRef } from "@react-md/utils";

import { IdRequired, RequireAtLeastOne } from "../types";

export type MenuItemRole = "menuitem" | "menuitemcheckbox" | "menuitemradio";

export interface IMenuItemDisabledProps {
  "aria-disabled"?: boolean | "true" | "false";
  disabled?: boolean;
}

export interface IBaseMenuItemProps extends IdRequired, IMenuItemDisabledProps {
  role?: MenuItemRole;
  children?: React.ReactNode;
}

export interface IMenuItemProps
  extends IBaseMenuItemProps,
    IWithForwardedRef<HTMLLIElement>,
    Omit<React.HTMLAttributes<HTMLLIElement>, "id" | "role"> {}

export interface IMenuItemDefaultProps {
  role: MenuItemRole;
}

const MenuItem: React.FunctionComponent<IMenuItemProps> = ({
  "aria-disabled": ariaDisabled,
  disabled,
  children,
  forwardedRef,
  ...props
}) => (
  <li {...props} ref={forwardedRef} aria-disabled={disabled || ariaDisabled}>
    {children}
  </li>
);

const defaultProps: IMenuItemDefaultProps = {
  role: "menuitem",
};

MenuItem.defaultProps = defaultProps;

export default React.forwardRef<HTMLLIElement, IMenuItemProps>((props, ref) => (
  <MenuItem {...props} forwardedRef={ref} />
));

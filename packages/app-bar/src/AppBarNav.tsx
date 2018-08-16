import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IAppBarNavProps extends IButtonProps {}

export interface IAppBarNavDefaultProps extends IButtonDefaultProps {}

export type AppBarNavWithDefaultProps = IAppBarNavProps & IAppBarNavDefaultProps;

/**
 * The `AppBarNav` component is a simple wrapper of the `Button` component used to add some additional
 * styles to position itself within the `AppBar` as well as changing the default props so that it
 * is `"icon"` by default instead of `"text"` and `"clear"` instead of `"primary"` for the theme.
 */
const AppBarNav: React.SFC<IAppBarNavProps> = ({ className, ...props }) => (
  <Button className={cn("rmd-app-bar__nav", className)} {...props} />
);

AppBarNav.defaultProps = {
  asDiv: false,
  disabled: false,
  theme: "clear",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
} as IAppBarNavDefaultProps;

export default AppBarNav;

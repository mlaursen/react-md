import * as React from "react";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IAppBarNavProps extends IButtonProps {}

export interface IAppBarNavDefaultProps extends IButtonDefaultProps {}

/**
 * The `AppBarNav` component is a simple wrapper of the `Button` component used to add some
 * additional styles to position itself within the `AppBar` as well as changing the default
 * props so that it is `"icon"` by default instead of `"text"` and `"clear"` instead of
 * `"primary"` for the theme.
 *
 * @props IAppBarNavProps
 */
const AppBarNav: React.FunctionComponent<IAppBarNavProps> = ({ className, ...props }) => (
  <Button className={cn("rmd-app-bar__nav", className)} {...props} />
);

const defaultProps: IAppBarNavDefaultProps = {
  asDiv: false,
  disabled: false,
  theme: "clear",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
};

AppBarNav.defaultProps = defaultProps;

export default AppBarNav;

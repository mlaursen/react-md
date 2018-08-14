import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IAppBarNavProps extends IButtonProps {}

export interface IAppBarNavDefaultProps extends IButtonDefaultProps {}

export type AppBarNavWithDefaultProps = IAppBarNavProps & IAppBarNavDefaultProps;

const AppBarNav: React.SFC<IAppBarNavProps> = ({ className, ...props }) => {
  return <Button className={cn("rmd-app-bar__nav", className)} {...props} />;
};

AppBarNav.defaultProps = {
  asDiv: false,
  disabled: false,
  theme: "primary",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
} as IAppBarNavDefaultProps;

export default AppBarNav;

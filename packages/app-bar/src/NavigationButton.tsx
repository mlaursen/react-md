import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface INavigationButtonProps extends IButtonProps {}

export interface INavigationButtonDefaultProps extends IButtonDefaultProps {}

export type NavigationButtonWithDefaultProps = INavigationButtonProps & INavigationButtonDefaultProps;

const NavigationButton: React.SFC<INavigationButtonProps> = ({ className, ...props }) => {
  return <Button className={cn("rmd-app-bar__nav", className)} {...props} />;
};

NavigationButton.defaultProps = {
  asDiv: false,
  disabled: false,
  theme: "primary",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
} as INavigationButtonDefaultProps;

export default NavigationButton;

import React, { FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
  AppBarProps,
} from "@react-md/app-bar";
import {
  KeyboardArrowLeftSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";
import { bem } from "@react-md/theme";
import StatusBar from "./StatusBar";
import { usePhoneContext } from "./context";
import { useAppSizeContext } from "components/Layout/AppSize";

const block = bem("phone");

const PhoneAppBar: FunctionComponent<AppBarProps> = ({
  className,
  children,
  ...props
}) => {
  const { id } = usePhoneContext();
  const { isPhone } = useAppSizeContext();

  return (
    <AppBar
      {...props}
      id={`${id}-app-bar`}
      className={cn(block("app-bar"), className)}
      fixed
      fixedElevation={false}
      dense={!isPhone}
    >
      <StatusBar id={id} isPhone={isPhone} />
      {children}
    </AppBar>
  );
};

PhoneAppBar.defaultProps = {
  theme: "default",
};

export default PhoneAppBar;

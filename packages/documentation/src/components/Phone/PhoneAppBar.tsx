import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { AppBar, AppBarProps } from "@react-md/app-bar";
import { bem, useAppSize } from "@react-md/utils";

import { usePhoneContext } from "./context";
import StatusBar from "./StatusBar";

const block = bem("phone");

const PhoneAppBar: FC<AppBarProps> = ({ className, children, ...props }) => {
  const { id } = usePhoneContext();
  const { isPhone } = useAppSize();

  return (
    <AppBar
      {...props}
      id={`${id}-app-bar`}
      className={cnb(block("app-bar"), className)}
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

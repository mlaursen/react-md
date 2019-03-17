import React, { FunctionComponent } from "react";
import { StatesConfig } from "@react-md/states";
import { AppSize as AppSizeType } from "@react-md/utils";
import { KeyboardTracker } from "@react-md/wia-aria";

import AppSize from "./AppSize";
import Combined from "./Combined";
import "./layout.scss";

export interface LayoutProps extends Partial<AppSizeType> {
  title: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  ...defaultMedia
}) => {
  return (
    <AppSize {...defaultMedia}>
      <KeyboardTracker>
        <StatesConfig preventColorPollution>
          <Combined title={title}>{children}</Combined>
        </StatesConfig>
      </KeyboardTracker>
    </AppSize>
  );
};

export default Layout;

import React, { FunctionComponent } from "react";
import { AppSizeListener, AppSizeListenerProps } from "@react-md/sizing";
import { StatesConfig } from "@react-md/states";

import Combined from "./Combined";
import "./layout.scss";

export interface LayoutProps extends AppSizeListenerProps {
  title: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  defaultSize,
}) => (
  <AppSizeListener defaultSize={defaultSize}>
    <StatesConfig>
      <Combined title={title}>{children}</Combined>
    </StatesConfig>
  </AppSizeListener>
);

export default Layout;

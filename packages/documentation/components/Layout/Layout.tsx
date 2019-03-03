import React, { FunctionComponent, useEffect } from "react";
import { APP_BAR_OFFSET_CLASSNAME } from "@react-md/app-bar";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import AppSize from "./AppSize";
import Header from "./Header";
import NavigationTree from "./NavigationTree";

import "./layout.scss";

const Layout: FunctionComponent<{ title: string; pageTitle: string }> = ({
  children,
  title,
  ...others
}) => {
  return (
    <AppSize>
      <KeyboardTracker>
        <StatesConfig preventColorPollution>
          <Header title={title} />
          <NavigationTree />
          <main id="main-content" className={APP_BAR_OFFSET_CLASSNAME}>
            {children}
          </main>
        </StatesConfig>
      </KeyboardTracker>
    </AppSize>
  );
};

export default Layout;

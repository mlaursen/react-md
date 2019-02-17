import React, { FunctionComponent, useEffect } from "react";
import {
  AppBar,
  AppBarTitle,
  APP_BAR_OFFSET_CLASSNAME,
} from "@react-md/app-bar";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";
import { useAppSize } from "@react-md/utils";

import "./layout.scss";
import Header from "./Header";
import AppSize from "./AppSize";

const Layout: FunctionComponent<{ title: string }> = ({
  children,
  title,
  ...others
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <AppSize>
      <KeyboardTracker>
        <StatesConfig preventColorPollution>
          <Header title={title} />
          <main id="main-content" className={APP_BAR_OFFSET_CLASSNAME}>
            {children}
          </main>
        </StatesConfig>
      </KeyboardTracker>
    </AppSize>
  );
};

export default Layout;

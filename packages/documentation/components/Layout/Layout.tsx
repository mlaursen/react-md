import React, { FunctionComponent, useEffect } from "react";
import cn from "classnames";
import { APP_BAR_OFFSET_CLASSNAME } from "@react-md/app-bar";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import AppSize from "./AppSize";
import Header from "./Header";
import NavigationTree from "./NavigationTree";

import "./layout.scss";

export interface ILayoutProps {
  title: string;
  pageTitle: string;
  pathname: string;
}

const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  title,
  pathname,
  ...others
}) => {
  return (
    <AppSize>
      <KeyboardTracker>
        <StatesConfig preventColorPollution>
          <Header title={title} />
          <nav className="layout__nav">
            <NavigationTree />
          </nav>
          <main
            id="main-content"
            className={cn("layout__main", APP_BAR_OFFSET_CLASSNAME)}
          >
            {children}
          </main>
        </StatesConfig>
      </KeyboardTracker>
    </AppSize>
  );
};

export default Layout;

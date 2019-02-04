import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Divider, VerticalDivider } from "@react-md/divider";
import { StatesConfig } from "@react-md/states";
import { TooltipHoverMode } from "@react-md/tooltip";
import { KeyboardTracker } from "@react-md/wia-aria";

import MenuDemo from "./MenuDemo";
import AppSize from "./AppSize";
import ListDemo from "./ListDemo";
import AvatarDemo from "./AvatarDemo";
import { ToggleRTL } from "./components/ToggleRTL";
import { ToggleTheme } from "./components/ToggleTheme";
import ButtonDemo from "./ButtonDemo";

const history = createBrowserHistory();

const App: FunctionComponent = () => (
  <Router history={history}>
    <TooltipHoverMode>
      <StatesConfig>
        <KeyboardTracker>
          <ToggleRTL />
          <ToggleTheme />
          <AppSize />
          <Divider />
          <AvatarDemo />
          <Divider />
          <ButtonDemo />
          <Divider />
          <ListDemo />
          <Divider />
          <MenuDemo />
          <Divider />
        </KeyboardTracker>
      </StatesConfig>
    </TooltipHoverMode>
  </Router>
);
export default App;

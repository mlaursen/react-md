import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Divider, VerticalDivider } from "@react-md/divider";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import AppSize from "./AppSize";
import ListDemo from "./ListDemo";
import AvatarDemo from "./AvatarDemo";
import ButtonDemo from "./ButtonDemo";
import AppBarDemo from "./AppBarDemo";
import { Header } from "./components/Header";
import SheetDemo from "./SheetDemo";

const history = createBrowserHistory();

const App: FunctionComponent = () => {
  return (
    <KeyboardTracker>
      <Router history={history}>
        <StatesConfig preventColorPollution>
          <Header />
          <AppSize />
          <Divider />
          <AppBarDemo />
          <Divider />
          <AvatarDemo />
          <Divider />
          <ButtonDemo />
          <Divider />
          <ListDemo />
          <Divider />
          <SheetDemo />
          <Divider />
        </StatesConfig>
      </Router>
    </KeyboardTracker>
  );
};
export default App;

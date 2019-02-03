import React, { FunctionComponent } from "react";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import MenuDemo from "./MenuDemo";
import AppSize from "./AppSize";

const App: FunctionComponent = () => (
  <StatesConfig preventColorPollution>
    <KeyboardTracker>
      <AppSize />
      <MenuDemo />
    </KeyboardTracker>
  </StatesConfig>
);
export default App;

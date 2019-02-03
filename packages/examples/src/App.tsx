import React, { FunctionComponent } from "react";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import MenuDemo from "./MenuDemo";
import AppSize from "./AppSize";
import AvatarDemo from "./AvatarDemo";

const App: FunctionComponent = () => (
  <StatesConfig preventColorPollution>
    <KeyboardTracker>
      <AppSize />
      <AvatarDemo />
      <MenuDemo />
    </KeyboardTracker>
  </StatesConfig>
);
export default App;

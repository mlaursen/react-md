import React, { FunctionComponent } from "react";
import { Divider, VerticalDivider } from "@react-md/divider";
import { StatesConfig } from "@react-md/states";
import { KeyboardTracker } from "@react-md/wia-aria";

import MenuDemo from "./MenuDemo";
import AppSize from "./AppSize";
import ListDemo from "./ListDemo";
import AvatarDemo from "./AvatarDemo";

const App: FunctionComponent = () => (
  <StatesConfig preventColorPollution>
    <KeyboardTracker>
      <AppSize />
      <Divider />
      <AvatarDemo />
      <Divider inset />
      <ListDemo />
      <Divider />
      <MenuDemo />
      <Divider />
    </KeyboardTracker>
  </StatesConfig>
);
export default App;

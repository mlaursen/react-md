import * as React from "react";
import { hot } from "react-hot-loader";
import { Text } from "@react-md/typography";

import PortalExample from "./PortalExample";
import TooltipExample from "./TooltipExample";
import CollapseExample from "./CollapseExample";
import ThemeExample from "./ThemeExample";

const App = () => (
  <React.Fragment>
    <TooltipExample />
    <Text type="headline-1">Hello, world!</Text>
    <PortalExample />
    <CollapseExample />
    <ThemeExample />
  </React.Fragment>
);

export default hot(module)(App);

import React from "react";
import { hot } from "react-hot-loader";
import { Text } from "@react-md/typography";

import PortalExample from "./PortalExample";

const App = () => (
  <React.Fragment>
    <Text type="headline-1">Hello, world!</Text>
    <PortalExample />
  </React.Fragment>
);

export default hot(module)(App);

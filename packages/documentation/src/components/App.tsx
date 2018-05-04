import React from "react";
import { hot } from "react-hot-loader";

import PortalExample from "./PortalExample";

const App = () => (
  <React.Fragment>
    <h1>Hello, world!</h1>
    <PortalExample />
  </React.Fragment>
);

export default hot(module)(App);

import * as React from "react";
import { Route } from "react-router-dom";
import { StatesProvider } from "@react-md/states";

import AppBar from "components/AppBar";
import Button from "components/Button";
import Link from "components/Link";
import Overlay from "components/Overlay";
import Portal from "components/Portal";
import Tooltip from "components/Tooltip";
import TreeView from "components/TreeView";

import "./app.scss";
import Navigation from "./Navigation";
import RTLToggle from "./RTLToggle";

const App: React.SFC<{}> = () => (
  <StatesProvider>
    <React.Fragment>
      <Navigation />
      <RTLToggle />
      <main className="main">
        <Route path="/components/app-bar" component={AppBar} />
        <Route path="/components/button" component={Button} />
        <Route path="/components/link" component={Link} />
        <Route path="/components/overlay" component={Overlay} />
        <Route path="/components/portal" component={Portal} />
        <Route path="/components/tooltip" component={Tooltip} />
        <Route path="/components/tree-view" component={TreeView} />
      </main>
    </React.Fragment>
  </StatesProvider>
);

export default App;

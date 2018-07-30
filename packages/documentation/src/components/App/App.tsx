import * as React from "react";
import { Route } from "react-router-dom";
import { StatesProvider } from "@react-md/states";
import { Button as RMDButton } from "@react-md/button";

import Button from "components/Button";
import Link from "components/Link";
import TreeView from "components/TreeView";

import "./app.scss";
import Navigation from "./Navigation";

const App: React.SFC<{}> = () => (
  <StatesProvider>
    <React.Fragment>
      <Navigation />
      <main className="main">
        <RMDButton theme="primary" themeType="contained" id="main-button">Button!</RMDButton>
        <Route path="/components/button" component={Button} />
        <Route path="/components/link" component={Link} />
        <Route path="/components/tree-view" component={TreeView} />
      </main>
    </React.Fragment>
  </StatesProvider>
);

export default App;

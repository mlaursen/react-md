import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { StatesProvider } from "@react-md/states";

import Home from "components/Home";
import GettingStarted from "components/GettingStarted";
import NotFound from "components/NotFound";
import A11y from "components/packages/A11y";
import AppBar from "components/packages/AppBar";
import Button from "components/packages/Button";
import List from "components/packages/List";
import Overlay from "components/packages/Overlay";
import Portal from "components/packages/Portal";
import Sheet from "components/packages/Sheet";
import Tooltip from "components/packages/Tooltip";
import TreeView from "components/packages/TreeView";

import "./app.scss";
import RTLToggle from "./RTLToggle";
import Layout from "./Layout";

const App: React.SFC<{}> = () => (
  <StatesProvider>
    <Layout>
      <RTLToggle />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/getting-started" component={GettingStarted} />
        <Route path="/packages/a11y" component={A11y} />
        <Route path="/packages/app-bar" component={AppBar} />
        <Route path="/packages/button" component={Button} />
        <Route path="/packages/list" component={List} />
        <Route path="/packages/overlay" component={Overlay} />
        <Route path="/packages/portal" component={Portal} />
        <Route path="/packages/sheet" component={Sheet} />
        <Route path="/packages/tooltip" component={Tooltip} />
        <Route path="/packages/tree-view" component={TreeView} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </StatesProvider>
);

export default App;

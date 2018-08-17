import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { StatesProvider } from "@react-md/states";
import { kebabCase } from "lodash";

import NotFound from "components/NotFound";
import A11y from "components/packages/A11y";
import AppBar from "components/packages/AppBar";

import "./app.scss";
import RTLToggle from "./RTLToggle";
import Layout from "./Layout";

const App: React.SFC<{}> = () => (
  <StatesProvider>
    <Layout>
      <RTLToggle />
      <Switch>
        <Route path="/packages/a11y" component={A11y} />
        <Route path="/packages/app-bar" component={AppBar} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </StatesProvider>
);

export default App;

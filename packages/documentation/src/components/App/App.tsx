import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { StatesProvider } from "@react-md/states";
import { MagicTooltipProvider } from "@react-md/tooltip";

import Home from "components/Home";
import GettingStarted from "components/GettingStarted";
import NotFound from "components/NotFound";
import A11y from "components/packages/A11y";
import AppBar from "components/packages/AppBar";
import Button from "components/packages/Button";
import Elevation from "components/packages/Elevation";
import Icon from "components/packages/Icon";
import List from "components/packages/List";
import Listeners from "components/packages/Listeners";
import MaterialIcons from "components/packages/MaterialIcons";
import Overlay from "components/packages/Overlay";
import Portal from "components/packages/Portal";
import Sheet from "components/packages/Sheet";
import Tooltip from "components/packages/Tooltip";
import Transition from "components/packages/Transition";
import TreeView from "components/packages/TreeView";
import Typography from "components/packages/Typography";

import "./app.scss";
import Layout from "./Layout";
import { routesConfig } from "./routes";

const App: React.SFC<{}> = () => (
  <StatesProvider>
    <MagicTooltipProvider>
      <Layout>
        <Switch>
          {routesConfig.map(({ path, exact, component }) => (
            <Route key={path} path={path} exact={exact} component={component} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </MagicTooltipProvider>
  </StatesProvider>
);

export default App;

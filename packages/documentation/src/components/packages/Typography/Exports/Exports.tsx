import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";
import Text from "./Text";

const TypescriptDefinitions = Loadable(() => import("components/Exports/DerivedDefinitionsPage"));

const Exports: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/text`} />
    <Route path={`${match.path}/typescript-definitions`} component={TypescriptDefinitions} />
    <Route path={`${match.path}/text`} component={Text} />
    <Route component={NotFound} />
  </Switch>
);

export default Exports;

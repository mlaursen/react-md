import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Installation = Loadable(() => import("./Installation"));
const UpdatingCRA = Loadable(() => import("./UpdatingCRA"));

const GettingStarted: React.FunctionComponent<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route exact={true} path={`${match.path}/installation`} component={Installation} />
    <Route path={`${match.path}/installation`} component={Installation} />
    <Route path={`${match.path}/updating-create-react-app`} component={UpdatingCRA} />
    <Route component={NotFound} />
  </Switch>
);

export default GettingStarted;

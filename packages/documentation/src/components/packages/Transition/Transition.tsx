import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const TransitionPropTypes = Loadable(() => import("./TransitionPropTypes"));
const TransitionSassDoc = Loadable(() => import("./TransitionSassDoc"));
const Changelog = Loadable(() => import("./Changelog"));

const Transition: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/examples`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={TransitionPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={TransitionSassDoc} />
    <Route path={`${match.path}/changelog`} component={Changelog} />
    <Route component={NotFound} />
  </Switch>
);

export default Transition;

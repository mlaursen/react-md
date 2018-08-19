import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const TransitionPropTypes = Loadable(() => import("./TransitionPropTypes"));
const TransitionSassDoc = Loadable(() => import("./TransitionSassDoc"));

const Transition: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={TransitionPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={TransitionSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default Transition;

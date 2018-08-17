import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Installation = Loadable(() => import("./Installation"));

const Examples = Loadable(() => import("./Examples"));

const PropTypes = Loadable(() => import("./PropTypes"));

const SassDoc = Loadable(() => import("./SassDoc"));

const A11y: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route exact={true} path={`${match.path}/installation`} component={Installation} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={PropTypes} />
    <Route path={`${match.path}/sassdoc`} component={SassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default A11y;

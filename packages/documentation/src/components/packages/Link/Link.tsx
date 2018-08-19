import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const LinkPropTypes = Loadable(() => import("./LinkPropTypes"));
const LinkSassDoc = Loadable(() => import("./LinkSassDoc"));

const Link: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={LinkPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={LinkSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default Link;

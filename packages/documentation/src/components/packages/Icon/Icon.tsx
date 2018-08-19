import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const IconPropTypes = Loadable(() => import("./IconPropTypes"));
const IconSassDoc = Loadable(() => import("./IconSassDoc"));

const Icon: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={IconPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={IconSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default Icon;

import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const TooltipPropTypes = Loadable(() => import("./TooltipPropTypes"));
const TooltipSassDoc = Loadable(() => import("./TooltipSassDoc"));
const Changelog = Loadable(() => import("./Changelog"));

const Tooltip: React.FunctionComponent<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/examples`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={TooltipPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={TooltipSassDoc} />
    <Route path={`${match.path}/changelog`} component={Changelog} />
    <Route component={NotFound} />
  </Switch>
);

export default Tooltip;

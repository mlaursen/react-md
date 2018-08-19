import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const ButtonPropTypes = Loadable(() => import("./ButtonPropTypes"));
const ButtonSassDoc = Loadable(() => import("./ButtonSassDoc"));

const Button: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/installation`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={ButtonPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={ButtonSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default Button;

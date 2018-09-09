import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const MenuPropTypes = Loadable(() => import("./MenuPropTypes"));
const MenuSassDoc = Loadable(() => import("./MenuSassDoc"));

const Menu: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/examples`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={MenuPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={MenuSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default Menu;

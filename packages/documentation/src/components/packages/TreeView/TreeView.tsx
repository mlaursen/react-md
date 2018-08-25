import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const TreeViewPropTypes = Loadable(() => import("./TreeViewPropTypes"));
const TreeViewSassDoc = Loadable(() => import("./TreeViewSassDoc"));

const TreeView: React.SFC<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/examples`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={TreeViewPropTypes} />
    <Route path={`${match.path}/sassdoc`} component={TreeViewSassDoc} />
    <Route component={NotFound} />
  </Switch>
);

export default TreeView;

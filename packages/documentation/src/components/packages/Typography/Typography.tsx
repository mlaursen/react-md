import * as React from "react";
import * as Router from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Loadable from "components/Loadable";
import NotFound from "components/NotFound";

const Examples = Loadable(() => import("./Examples"));
const TypographyPropTypes = Loadable(() => import("./TypographyPropTypes"));
const TypographySassDoc = Loadable(() => import("./TypographySassDoc"));
const Changelog = Loadable(() => import("./Changelog"));
const Exports = Loadable(() => import("./Exports"));

const Typography: React.FunctionComponent<Router.RouteComponentProps<void>> = ({ match }) => (
  <Switch>
    <Redirect exact={true} from={match.path} to={`${match.path}/examples`} />
    <Route path={`${match.path}/examples`} component={Examples} />
    <Route path={`${match.path}/proptypes`} component={TypographyPropTypes} />
    <Route path={`${match.path}/exports`} component={Exports} />
    <Route path={`${match.path}/sassdoc`} component={TypographySassDoc} />
    <Route path={`${match.path}/changelog`} component={Changelog} />
    <Route component={NotFound} />
  </Switch>
);

export default Typography;

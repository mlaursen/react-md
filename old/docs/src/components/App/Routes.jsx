import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Customization from 'components/Customization';
import DiscoverMore from 'components/DiscoverMore';
import Components from 'components/Components';
import {
  Home,
  NotFound,
  GettingStarted,
  BottomNavigationRouting,
  DrawerRouting,
  NavigationDrawerRouting,
} from 'routes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect from="/customization/grids" to="/components/grids" />
    <Route path="/getting-started/:location" component={GettingStarted} />
    <Route path="/customization/:location" component={Customization} />
    <Route path="/discover-more/routing-examples/bottom-navigations" component={BottomNavigationRouting} />
    <Route path="/discover-more/routing-examples/drawers" component={DrawerRouting} />
    <Route path="/discover-more/routing-examples/navigation-drawers" component={NavigationDrawerRouting} />
    <Route path="/discover-more/upgrade-guides/:version" component={DiscoverMore} />
    <Route path="/discover-more/:location" component={DiscoverMore} />
    <Redirect from="/components/helpers/accessible-fake-button" to="/components/helpers/accessible-fake-buttons" />
    <Redirect from="/components/helpers/collapse" to="/components/helpers/collapses" />
    <Redirect from="/components/helpers/focus-container" to="/components/helpers/focus-containers" />
    <Redirect from="/components/helpers/icon-separator" to="/components/helpers/icon-separators" />
    <Redirect from="/components/helpers/portal" to="/components/helpers/portals" />
    <Redirect from="/components/selection-controls/checkboxes" to="/components/selection-controls" />
    <Redirect from="/components/selection-controls/radios" to="/components/selection-controls" />
    <Redirect from="/components/selection-controls/selection-control" to="/components/selection-controls" />
    <Redirect from="/components/selection-controls/switches" to="/components/selection-controls" />
    <Route path="/components/:section/:component" component={Components} />
    <Route path="/components/:component" component={Components} />
    <Redirect from="/discover-more/routing-examples" to="/discover-more/routing-examples/bottom-navigations" />
    <Redirect from="/getting-started" to="/getting-started/prerequisites" />
    <Redirect from="/customization" to="/customization/colors" />
    <Redirect from="/discover-more" to="/discover-more/whats-new" />
    <Redirect from="/components" to="/components/autocompletes" />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

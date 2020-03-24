import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROOT_PATH } from 'constants/application';
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
    <Route exact path={ROOT_PATH} component={Home} />
    <Redirect
      from={`${ROOT_PATH}customization/grids`}
      to={`${ROOT_PATH}components/grids`}
    />
    <Route
      path={`${ROOT_PATH}getting-started/:location`}
      component={GettingStarted}
    />
    <Route
      path={`${ROOT_PATH}customization/:location`}
      component={Customization}
    />
    <Route
      path={`${ROOT_PATH}discover-more/routing-examples/bottom-navigations`}
      component={BottomNavigationRouting}
    />
    <Route
      path={`${ROOT_PATH}discover-more/routing-examples/drawers`}
      component={DrawerRouting}
    />
    <Route
      path={`${ROOT_PATH}discover-more/routing-examples/navigation-drawers`}
      component={NavigationDrawerRouting}
    />
    <Route
      path={`${ROOT_PATH}discover-more/upgrade-guides/:version`}
      component={DiscoverMore}
    />
    <Route
      path={`${ROOT_PATH}discover-more/:location`}
      component={DiscoverMore}
    />
    <Redirect
      from={`${ROOT_PATH}components/helpers/accessible-fake-button`}
      to={`${ROOT_PATH}components/helpers/accessible-fake-buttons`}
    />
    <Redirect
      from={`${ROOT_PATH}components/helpers/collapse`}
      to={`${ROOT_PATH}components/helpers/collapses`}
    />
    <Redirect
      from={`${ROOT_PATH}components/helpers/focus-container`}
      to={`${ROOT_PATH}components/helpers/focus-containers`}
    />
    <Redirect
      from={`${ROOT_PATH}components/helpers/icon-separator`}
      to={`${ROOT_PATH}components/helpers/icon-separators`}
    />
    <Redirect
      from={`${ROOT_PATH}components/helpers/portal`}
      to={`${ROOT_PATH}components/helpers/portals`}
    />
    <Redirect
      from={`${ROOT_PATH}components/selection-controls/checkboxes`}
      to={`${ROOT_PATH}components/selection-controls`}
    />
    <Redirect
      from={`${ROOT_PATH}components/selection-controls/radios`}
      to={`${ROOT_PATH}components/selection-controls`}
    />
    <Redirect
      from={`${ROOT_PATH}components/selection-controls/selection-control`}
      to={`${ROOT_PATH}components/selection-controls`}
    />
    <Redirect
      from={`${ROOT_PATH}components/selection-controls/switches`}
      to={`${ROOT_PATH}components/selection-controls`}
    />
    <Route
      path={`${ROOT_PATH}components/:section/:component`}
      component={Components}
    />
    <Route
      path={`${ROOT_PATH}components/:component`}
      component={Components}
    />
    <Redirect
      from={`${ROOT_PATH}discover-more/routing-examples`}
      to={`${ROOT_PATH}discover-more/routing-examples/bottom-navigations`}
    />
    <Redirect
      from={`${ROOT_PATH}getting-started`}
      to={`${ROOT_PATH}getting-started/prerequisites`}
    />
    <Redirect
      from={`${ROOT_PATH}customization`}
      to={`${ROOT_PATH}customization/colors`}
    />
    <Redirect
      from={`${ROOT_PATH}discover-more`}
      to={`${ROOT_PATH}discover-more/whats-new`}
    />
    <Redirect
      from={`${ROOT_PATH}components`}
      to={`${ROOT_PATH}components/autocompletes`}
    />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

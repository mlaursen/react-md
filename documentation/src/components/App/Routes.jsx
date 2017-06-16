import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, NotFound, GettingStarted } from 'routes';
import Customization from 'components/Customization';
import DiscoverMore from 'components/DiscoverMore';
import Components from 'components/Components';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/getting-started/:location" component={GettingStarted} />
    <Redirect from="/customization/grids" to="/components/grids" />
    <Route path="/customization/:location" component={Customization} />
    <Route path="/discover-more/upgrade-guides/:version" component={DiscoverMore} />
    <Route path="/discover-more/:location" component={DiscoverMore} />
    <Redirect from="/components/helpers/accessible-fake-button" to="/components/helpers/accessible-fake-buttons" />
    <Redirect from="/components/helpers/collapse" to="/components/helpers/collapses" />
    <Redirect from="/components/helpers/focus-container" to="/components/helpers/focus-containers" />
    <Redirect from="/components/helpers/icon-separator" to="/components/helpers/icon-separators" />
    <Redirect from="/components/helpers/portal" to="/components/helpers/portals" />
    <Route path="/components/:section/:component" component={Components} />
    <Route path="/components/:component" component={Components} />
    <Redirect from="/getting-started" to="/getting-started/prerequisites" />
    <Redirect from="/customization" to="/customization/colors" />
    <Redirect from="/discover-more" to="/discover-more/whats-new" />
    <Redirect from="/components" to="/components/autocompletes" />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;

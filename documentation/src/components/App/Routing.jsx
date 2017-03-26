import React, { PropTypes } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, NotFound } from 'routes';
import GettingStarted from 'components/GettingStarted';
import Customization from 'components/Customization';
import DiscoverMore from 'components/DiscoverMore';
import Components from 'components/Components';

const Routing = ({ location }) => (
  <Switch>
    <Route exact path="/" location={location} component={Home} />
    <Route path="/getting-started/:location" location={location} render={GettingStarted} />
    <Route path="/customization/:location" location={location} render={Customization} />
    <Route path="/discover-more/upgrade-guides/:version" location={location} render={DiscoverMore} />
    <Route path="/discover-more/:location" location={location} render={DiscoverMore} />
    <Route path="/components/:section/:component" location={location} render={Components} />
    <Route path="/components/:component" location={location} render={Components} />
    <Redirect from="/getting-started" to="/getting-started/prerequisites" />
    <Redirect from="/customization" to="/customization/colors" />
    <Redirect from="/discover-more" to="/discover-more/whats-new" />
    <Redirect from="/components" to="/components/autocompletes" />
    <Route component={NotFound} />
  </Switch>
);

Routing.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Routing;

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';
import { Home, NotFound } from 'routes';
import GettingStarted from 'components/GettingStarted';
import Customization from 'components/Customization';
import DiscoverMore from 'components/DiscoverMore';
import Components from 'components/Components';

import configureStore from 'state/store';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);
const root = document.getElementById('app');

render(
  <AppContainer>
    <Router>
      <Provider store={store}>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/getting-started/:location" component={GettingStarted} />
            <Route path="/customization/:location" component={Customization} />
            <Route path="/discover-more/upgrade-guides/:version" component={DiscoverMore} />
            <Route path="/discover-more/:location" component={DiscoverMore} />
            <Route path="/components/:section/:component" component={Components} />
            <Route path="/components/:component" component={Components} />
            <Redirect from="/getting-started" to="/getting-started/prerequisites" />
            <Redirect from="/customization" to="/customization/colors" />
            <Redirect from="/discover-more" to="/discover-more/whats-new" />
            <Redirect from="/components" to="/components/autocompletes" />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Provider>
    </Router>
  </AppContainer>,
  root
);

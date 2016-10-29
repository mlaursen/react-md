import React from 'react';
import { browserHistory } from 'react-router';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from 'stores/configureStore';
import routes from 'routes';
import Root from './Root';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const history = syncHistoryWithStore(browserHistory, store);
const root = document.getElementById('app');
if (process.env.NODE_ENV === 'development') {
  window.Perf = require('react-addons-perf');

  render(<Root store={store} history={history} routes={routes} />, root);
}

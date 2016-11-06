import React from 'react';
import { render } from 'react-dom';
import { match, browserHistory } from 'react-router';
import WebFont from 'webfontloader';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from 'stores/configureStore';
import routes from 'routes';

import Root from './Root';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
  custom: {
    families: ['FontAwesome'],
    urls: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'],
  },
});

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const root = document.getElementById('app');

if (process.env.NODE_ENV === 'development') {
  window.Perf = require('react-addons-perf');

  render(<Root store={store} history={history} routes={routes} />, root);
} else {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(<Root store={store} {...renderProps} />, root);
  });
}


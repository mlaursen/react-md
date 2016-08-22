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
    families: ['Roboto:300,400,500,700', 'Material Icons', 'Source Code Pro'],
  },
  custom: {
    families: ['FontAwesome'],
    urls: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'],
  },
});

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'development') {
  window.Perf = require('react-addons-perf');

  render(<Root store={store} history={history} routes={routes} />, document.getElementById('app'));
} else {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    render(<Root store={store} {...renderProps} />, document.getElementById('app'));
  });
}


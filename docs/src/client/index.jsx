import React from 'react';
import { render, unmountComponentAtNode as unmount } from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
  custom: {
    families: ['FontAwesome'],
    urls: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'],
  },
});

import './_styles.scss';
import configureStore from 'stores/configureStore';
import smoothScroll from 'utils/smoothScroll';

const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const history = syncHistoryWithStore(browserHistory, store);
const root = document.getElementById('app');
if (__DEV__) {
  window.Perf = require('react-addons-perf');
}

function renderApp() {
  const routes = require('routes').default;

  match(({ history, routes }), (error, redirectLocation, renderProps) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Router {...renderProps} onUpdate={smoothScroll} />
        </Provider>
      </AppContainer>,
      root
    );
  });
}

if (module.hot) {
  module.hot.accept('routes', () => {
    setImmediate(() => {
      // prevents the warning with react-router dynamic routes
      unmount(root);

      renderApp();
    });
  });
}

renderApp();

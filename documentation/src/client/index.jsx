import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';
import * as Routes from 'routes';

import configureStore from './configureStore';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);

function loadIntl() {
  if (!global.Intl) {
    const lang = window.navigator.userLanguage || window.navigator.language || 'en-US';
    return Promise.all([
      import('intl'),
      import(`intl/locale-data/jsonp/${__DEV__ ? 'en-US' : lang}`),
    ]);
  }

  return null;
}

(async function renderApp() {
  if (__DEV__) {
    const { updateCustomTheme } = require('state/helmet'); // eslint-disable-line global-require
    store.dispatch(updateCustomTheme(store.getState().theme.href));
  }

  const bundles = window.__WEBPACK_BUNDLES__ || [];
  await Promise.all(bundles.map(chunk => Routes[chunk].loadComponent()));
  await loadIntl();
  const root = document.getElementById('app');

  render(
    <AppContainer>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    root
  );
}());

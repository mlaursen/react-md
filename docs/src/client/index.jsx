import 'babel-polyfill';
import 'svgxuse';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';
import * as Routes from 'routes';
import { updateLocale } from 'state/locale';
import { updateCustomTheme } from 'state/helmet';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);
const locale = window.navigator.userLanguage || window.navigator.language || 'en-US';

function loadIntl() {
  if (!global.Intl) {
    const imports = [import('intl')];
    if (__DEV__) {
      // Only include the minimal polyfills in dev mode to save some time
      imports.push(
        import('intl/locale-data/jsonp/en-US'),
        import('intl/locale-data/jsonp/da-DK'),
      );
    } else {
      imports.push(`intl/locale-data/jsonp/${locale}`);
    }

    return Promise.all(imports);
  }

  return null;
}

(async function renderApp() {
  if (!navigator.onLine || __DEV__) {
    store.dispatch(updateCustomTheme(store.getState().theme.href));
  }
  store.dispatch(updateLocale(locale));

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

  registerServiceWorker(store);
}());

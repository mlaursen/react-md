import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Routes from 'routes';
import App from 'components/App';

import loadIntl from './loadIntl';
import registerServiceWorker from './registerServiceWorker';

export default async function render(root, store, locale) {
  const bundles = window.__WEBPACK_BUNDLES__ || [];
  await Promise.all([
    ...bundles.map(chunk => Routes[chunk].loadComponent()),
    loadIntl(locale),
  ]);

  ReactDOM.hydrate(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  registerServiceWorker(store);
}

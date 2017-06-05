import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';
import * as Routes from 'routes';

import configureStore from '../configureStore';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);

(async function renderApp() {
  const bundles = window.__WEBPACK_BUNDLES__ || [];
  await Promise.all(bundles.map(chunk => Routes[chunk].loadComponent()));
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

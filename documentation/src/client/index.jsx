import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'containers/App';

import configureStore from 'state/store';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);
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

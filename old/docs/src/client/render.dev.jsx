import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from 'components/App';

import loadIntl from './loadIntl';

function renderApp(root, App, store) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    root
  );
}

export default function render(root, store, locale) {
  loadIntl(locale);
  renderApp(root, App, store);

  if (module.hot) {
    module.hot.accept('components/App', () => {
      renderApp(root, App, store);
    });
  }
}

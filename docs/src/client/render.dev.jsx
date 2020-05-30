import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/App';

import loadIntl from './loadIntl';

function renderApp(root, App, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    ,
    root
  );
}

export default function render(root, store, locale) {
  loadIntl(locale);
  renderApp(root, App, store);
}

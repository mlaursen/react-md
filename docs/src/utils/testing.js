/* eslint-disable import/prefer-default-export, react/jsx-filename-extension */
import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducer from 'state';

export function createRouterSnapshot(children, location = '/', context = {}) {
  return renderer.create(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  ).toJSON();
}

export function createReduxSnapshot(children, state) {
  const store = createStore(rootReducer, state);
  return renderer.create(
    <Provider store={store}>
      {children}
    </Provider>
  );
}

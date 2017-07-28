/* eslint-disable import/prefer-default-export, react/jsx-filename-extension */
import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducer from 'state';

/**
 * I'm lazy.
 */
export function createSnapshot(children) {
  return renderer.create(children).toJSON();
}

/**
 * A simple test wrapper to create a snapshot with react-test-renderer and a component that
 * uses something from react-router.
 */
export function createRouterSnapshot(children, location = '/', context = {}) {
  return createSnapshot(
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  );
}

/**
 * A simple test wrapper to create a snapshot with react-test-renderer and a component that
 * requires the redux provider.
 */
export function createReduxSnapshot(children, state) {
  const store = createStore(rootReducer, state);
  return createSnapshot(
    <Provider store={store}>
      {children}
    </Provider>
  );
}

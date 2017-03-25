import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './index';

export default function configureStore(initialState) {
  const middlewares = [applyMiddleware(thunk)];
  if (__DEV__ && typeof window !== 'undefined' && window.devToolsExtension) {
    middlewares.push(window.devToolsExtension());
  }

  const store = createStore(rootReducer, initialState, compose(...middlewares));

  if (module.hot) {
    module.hot.accept('./index', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('./index').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from 'sagas';
import rootReducer from './state';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middlewares = [applyMiddleware(sagaMiddleware)];
  if (__DEV__ && typeof window !== 'undefined' && window.devToolsExtension) {
    middlewares.push(window.devToolsExtension());
  }

  const store = createStore(rootReducer, initialState, compose(...middlewares));

  if (module.hot) {
    module.hot.accept('./state', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('./state').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(sagas);

  return store;
}

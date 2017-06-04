import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './index';
import sagas from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middlewares = [applyMiddleware(thunk, sagaMiddleware)];
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

  sagaMiddleware.run(sagas);

  return store;
}

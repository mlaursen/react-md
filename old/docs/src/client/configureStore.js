import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import sagas from 'sagas';
import rootReducer from 'state';
import scrolling from 'state/middlewares/scrolling';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middleware = applyMiddleware(scrolling, sagaMiddleware);
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleware)
  );

  if (module.hot) {
    module.hot.accept('state', () => {
      /* eslint-disable global-require */
      const nextRootReducer = require('state').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(sagas);

  return store;
}

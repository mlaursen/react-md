import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      global.devToolsExtension ? global.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from 'reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk
    )
  );
}

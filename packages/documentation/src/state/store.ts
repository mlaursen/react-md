import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";

import { scrollingMiddleware } from "./middleware";
import reducers from "./reducers";

export const history = createBrowserHistory();

export const store = createStore(
  connectRouter(history)(reducers),
  {},
  composeWithDevTools(applyMiddleware(routerMiddleware(history), scrollingMiddleware))
);

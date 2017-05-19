import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import getInitialDrawerState from './utils/getInitialDrawerState';
import getInitialQuickNavigationState from './utils/getInitialQuickNavigationState';
import intlLocalesSupported from 'intl-locales-supported';

import routes from 'routes';
import configureStore from 'stores/configureStore';

const SUPPORTED_LANGUAGES = ['en', 'en-US', 'da-DK'];

export default function reactMD(req, res) {
  const store = configureStore({
    ui: {
      drawer: getInitialDrawerState(req),
      quickNavigation: getInitialQuickNavigationState(req),
    },
  });

  const memoryHistory = createMemoryHistory(req.url);
  const history = syncHistoryWithStore(memoryHistory, store);

  if (global.Intl) {
    if (!intlLocalesSupported(SUPPORTED_LANGUAGES)) {
      const Intl = require('intl');
      global.Intl.DateTimeFormat = Intl.DateTimeFormat;
    }
  } else {
    global.Intl = require('intl');
  }

  match({ history, routes, location: req.url }, async (error, redirectLocation, renderProps) => {
    if (error) {
      req.sendStatus(500);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const { params, components } = renderProps;

      let html;
      try {
        await Promise.all(
          components.filter(c => c && c.fetch)
            .map(({ fetch }) => fetch(store.dispatch, params))
        );

        html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
      } catch (e) {
        html = '';
      }

      res.render('index', {
        initialState: JSON.stringify(store.getState()),
        html,
      });
    } else {
      res.sendStatus(404);
    }
  });
}

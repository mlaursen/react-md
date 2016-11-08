import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import getInitialDrawerState from './utils/getInitialDrawerState';
import getInitialQuickNavigationState from './utils/getInitialQuickNavigationState';

import routes from 'routes';
import configureStore from 'stores/configureStore';
import Root from './Root';

export default function reactMD(req, res) {
  const initialState = {
    ui: {
      drawer: getInitialDrawerState(req),
      quickNavigation: getInitialQuickNavigationState(req),
    },
  };

  const tab = req.query.tab;
  console.log('tab:', tab);

  if (req.params.section) {
    console.log('req.params.section:', req.params.section);
  } else if (req.params.component) {
    console.log('req.params.component:', req.params.component);
  }

  const store = configureStore(initialState);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log('error:', error);
      req.status(500).send(error.message);
    } else if (redirectLocation) {
      console.log('redirectLocation:', redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.render('index', {
        initialState: JSON.stringify(store.getState()),
        html: renderToString(<Root store={store} {...renderProps} />),
      });
    } else {
      console.log('NOT FOUND');
      res.status(404).send('Not Found');
    }
  });
}

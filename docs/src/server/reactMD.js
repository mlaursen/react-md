import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import getInitialDrawerState from './utils/getInitialDrawerState';
import getInitialQuickNavigationState from './utils/getInitialQuickNavigationState';
import getInitialSassDocs from './utils/getInitialSassDocs';
import getInitialDocgens from './utils/getInitialDocgens';

import routes from 'routes';
import configureStore from 'stores/configureStore';
import Root from './Root';

export default function reactMD(req, res) {
  const url = req.url;
  match({ routes, location: url }, async (error, redirectLocation, renderProps) => {
    if (error) {
      req.sendStatus(500);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const {
        params: { component, section },
        location: { query: { tab } },
      } = renderProps;

      const sassdocs = await getInitialSassDocs(url, component, section, tab);
      const docgens = await getInitialDocgens(url, component, section);
      const store = configureStore({
        documentation: { docgens, sassdocs },
        ui: {
          drawer: getInitialDrawerState(req),
          quickNavigation: getInitialQuickNavigationState(req),
        },
      });

      res.render('index', {
        initialState: JSON.stringify(store.getState()),
        html: renderToString(<Root store={store} {...renderProps} />),
      });
    } else {
      res.sendStatus(404);
    }
  });
}

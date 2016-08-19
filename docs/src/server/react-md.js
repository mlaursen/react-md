import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';

import { getPageTitle } from 'utils/StringUtils';
import { getDrawerType } from 'utils/MediaUtils';
import Root from './Root';
import routes from 'routes';
import configureStore from 'stores/configureStore';

export default function reactMD(req, res) {
  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const tablet = !!userAgent.match(/ipad/i);

  const toolbarTitle = getPageTitle(req.url);
  const initialState = {
    ui: {
      drawer: {
        initiallyOpen: !mobile,
        initialDrawerType: getDrawerType(mobile, tablet),
        inactive: !toolbarTitle,
        toolbarTitle,
      },
      media: {
        mobile,
        tablet,
        desktop: !mobile && !tablet,
      },
    },
  };

  const store = configureStore(initialState);

  match({ routes, location: req.url }, (error, redirectLocation, props) => {
    if (error) {
      req.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      res.render('index', {
        initialState: JSON.stringify(initialState),
        html: renderToString(<Root store={store} {...props} />),
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
}

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';

import { getPageTitle } from 'utils/StringUtils';
import Root from './Root';
import routes from 'routes';
import configureStore from 'stores/configureStore';

function getDrawerType(mobile, ipad) {
  if (mobile) {
    return 'mobile';
  } else if (ipad) {
    return 'ipad';
  } else {
    return 'desktop';
  }
}

export default function reactMD(req, res) {
  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const ipad = !!userAgent.match(/ipad/i);

  const toolbarTitle = getPageTitle(req.url);
  const initialState = {
    ui: {
      drawer: {
        initiallyOpen: !mobile,
        initialDrawerType: getDrawerType(mobile, ipad),
        inactive: !toolbarTitle,
        toolbarTitle,
      },
      media: {
        mobile,
        ipad,
        desktop: !mobile && !ipad,
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

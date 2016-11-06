import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

import { getPageTitle } from 'utils/StringUtils';
import { getDrawerType } from 'utils/MediaUtils';
import routes from 'routes';
import configureStore from 'stores/configureStore';
import Root from './Root';
import { loadDocumentation } from 'actions/documentation';

const VALID_COMPONENTS = [
  'flat',
  'raised',
  'floating',
  'icon',
  'date',
  'time',
  'checkboxes',
  'radios',
  'switches',
  'circular',
  'linear',
];

function parseURL(url) {
  let [section, component] = url.replace('/components/', '').split('/');

  if (!component || VALID_COMPONENTS.indexOf(component) === -1) {
    component = section;
    section = null;
  }

  return { component, section };
}

export default function reactMD(req, res) {
  const userAgent = req.header('user-agent');
  const mobile = !!userAgent.match(/mobile/i);
  const tablet = !!userAgent.match(/ipad/i);

  const toolbarTitle = getPageTitle(req.url);
  const initialState = {
    ui: {
      drawer: {
        initialDrawerType: getDrawerType(mobile, tablet),
        toolbarTitle,
        inactive: !toolbarTitle,
        tabletDrawerType: NavigationDrawer.defaultProps.tabletDrawerType,
        desktopDrawerType: NavigationDrawer.defaultProps.desktopDrawerType,
        mobileSearch: false,
        includeHeader: true,
        themeable: !mobile && !tablet,
      },
      media: {
        mobile,
        tablet,
        desktop: !mobile && !tablet,
      },
    },
  };

  const store = configureStore(initialState);
  if (req.url.match(/components/)) {
    const { component, section } = parseURL(req.url);
    store.dispatch(loadDocumentation(component, section));
  }

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      req.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.render('index', {
        initialState: JSON.stringify(store.getState()),
        html: renderToString(<Root store={store} {...renderProps} />),
        htmlClassName: 'theme-1',
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
}

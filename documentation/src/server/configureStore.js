import { createStore } from 'redux';
import MobileDetect from 'mobile-detect';

import routes, { componentRoutes } from 'server/routes';
import rootReducer from 'state';
import { updateCustomTheme } from 'state/helmet';
import { pageNotFound } from 'state/routing';
import { getInitialState as getInitialThemeState } from 'state/theme';
import { DEFAULT_STATE as DEFAULT_QUICK_NAV_STATE, handleLocationChange } from 'state/quickNav';
import { docgenSuccess } from 'state/docgens';
import { sassdocSuccess } from 'state/sassdocs';
import { fetchSassdoc, fetchDocgen } from 'utils/api';
import { toPageTitle } from 'utils/strings';

function isSassDocRoute(pathname, tab) {
  if (!tab || tab < 0 || tab > 2) {
    return false;
  } else if (tab === 1) {
    return !!pathname.match(/customization/) && !pathname.match(/themes/);
  } else if (tab === 2) {
    const layovers = pathname.match(/layovers/);
    return !!(pathname.match(/themes/)
      || layovers
      || (!layovers && componentRoutes.indexOf(pathname) !== -1));
  }

  return false;
}

function getEndpoint(pathname) {
  return pathname.indexOf('components') !== -1
    ? pathname.replace('/components/', '')
    : pathname.substring(pathname.lastIndexOf('/') + 1);
}

function getServerUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

export default async function configureStore(req) {
  const pathname = req.url.replace(/\?.*/, '');
  const tab = parseInt(req.query.tab, 10);
  const md = new MobileDetect(req.header('user-agent'));
  const tablet = !!md.tablet();
  const mobile = !tablet && !!md.mobile();
  const desktop = !mobile && !tablet;

  let defaultMedia = 'desktop';
  if (tablet) {
    defaultMedia = 'tablet';
  } else if (mobile) {
    defaultMedia = 'mobile';
  }

  const store = createStore(rootReducer, {
    media: { mobile, tablet, desktop, defaultMedia },
    drawer: {
      toolbarTitle: toPageTitle(pathname),
      toolbarProminent: !pathname.match(/minimizing/) && !!pathname.match(/components|customization/),
      visibleBoxShadow: pathname !== '/',
    },
    quickNav: handleLocationChange(DEFAULT_QUICK_NAV_STATE, { pathname }),
    theme: getInitialThemeState(req.cookies),
  });

  store.dispatch(updateCustomTheme(store.getState().theme.href));
  if (routes.indexOf(pathname.replace(/\?.*/, '')) === -1) {
    store.dispatch(pageNotFound());
  } else if (tab === 1 && componentRoutes.indexOf(pathname) !== -1) {
    const endpoint = getEndpoint(pathname);
    const ids = endpoint.split('/');
    const data = await fetchDocgen(endpoint, getServerUrl(req));
    store.dispatch(docgenSuccess(ids, data));
  } else if (isSassDocRoute(pathname, tab)) {
    const endpoint = getEndpoint(pathname);
    const ids = endpoint.split('/');
    const data = await fetchSassdoc(endpoint, getServerUrl(req));
    store.dispatch(sassdocSuccess(ids, data));
  }

  return store;
}

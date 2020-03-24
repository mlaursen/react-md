import { createStore } from 'redux';
import MobileDetect from 'mobile-detect';
import winston from 'winston';

import { ROOT_PATH } from 'constants/application';
import routes, { componentRoutes } from 'server/routes';
import rootReducer from 'state';
import { updateCustomTheme } from 'state/helmet';
import { pageNotFound, updateLocation } from 'state/routing';
import { getInitialState as getInitialThemeState } from 'state/theme';
import { docgenSuccess } from 'state/docgens';
import { sassdocSuccess } from 'state/sassdocs';
import { airQualityColumnsSuccess, airQualityDataSuccess } from 'state/airQuality';
import { fetchSassdoc, fetchDocgen, fetchAirQualityColumns, fetchAirQualityData } from 'utils/api';
import getServerUrl from 'server/utils/getServerUrl';

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
    ? pathname.replace(`${ROOT_PATH}components/`, '')
    : pathname.substring(pathname.lastIndexOf('/') + 1);
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
    theme: getInitialThemeState(req.cookies),
  });

  store.dispatch(updateCustomTheme(store.getState().theme.href));

  const searchIndex = req.url.indexOf('?');
  store.dispatch(updateLocation({
    pathname,
    search: searchIndex > -1 ? req.url.substring(searchIndex) : '',
  }));

  try {
    const server = getServerUrl(req);
    if (routes.indexOf(pathname.replace(/\?.*/, '')) === -1) {
      store.dispatch(pageNotFound());
    } else if (tab === 1 && componentRoutes.indexOf(pathname) !== -1) {
      const endpoint = getEndpoint(pathname);
      const ids = endpoint.split('/');
      const data = await fetchDocgen(endpoint, server);
      store.dispatch(docgenSuccess(ids, data));
    } else if (isSassDocRoute(pathname, tab)) {
      const endpoint = getEndpoint(pathname)
        .replace(/\/(date|time|linear|circular|selection-control|checkboxes|radios|switches)/, '');
      const ids = endpoint.split('/');
      const data = await fetchSassdoc(endpoint, server);
      store.dispatch(sassdocSuccess(ids, data));
    } else if (!tab && pathname === '/components/data-tables') {
      const columns = await fetchAirQualityColumns(server);
      const data = await fetchAirQualityData({ start: 0, limit: 10 }, server);
      store.dispatch(airQualityColumnsSuccess(columns));
      store.dispatch(airQualityDataSuccess(data));
    }
  } catch (e) {
    winston.error(e, e.message);
    if (__DEV__) {
      throw e;
    }
  }

  return store;
}

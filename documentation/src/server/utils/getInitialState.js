import { createStore } from 'redux';
import MobileDetect from 'mobile-detect';

import rootReducer from 'state';
import routes from './routes';
import { updateCustomTheme } from 'state/helmet';
import { pageNotFound } from 'state/routing';
import { getInitialState as getInitialThemeState } from 'state/theme';
import { DEFAULT_STATE as DEFAULT_QUICK_NAV_STATE, handleLocationChange } from 'state/quickNav';
import { toPageTitle } from 'utils/strings';
import { componentRoutes } from 'server/routes';

console.log('componentRoutes:', componentRoutes);

export default async function configureStore(req) {
  const { url: pathname, query: { tab } } = req;
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
  if (routes.indexOf(req.url.replace(/\?.*/, '')) === -1) {
    store.dispatch(pageNotFound());
  }

  return store;
}

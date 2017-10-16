import 'babel-polyfill';
import 'svgxuse';
import { updateLocale } from 'state/locale';
import { updateCustomTheme } from 'state/helmet';

import configureStore from './configureStore';
import render from './render';

import './styles.scss';

const store = configureStore(window.__INITIAL_STATE__);
const locale = window.navigator.userLanguage || window.navigator.language || 'en-US';

if (!navigator.onLine || !__SSR__) {
  // The custom theme needs to be dispatched when there is no SSR since the
  // custom theme would normally be pre-rendered by the server
  store.dispatch(updateCustomTheme(store.getState().theme.href));
}
// I don't do any server side locale stuff, so make sure the correctly locale is being used.
store.dispatch(updateLocale(locale));

const root = document.getElementById('app');
render(root, store, locale);

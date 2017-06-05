/* eslint-disable no-console */
/* eslint-disable */
import { takeLatest, select, put, all, fork, take, throttle } from 'redux-saga/effects';
import { PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import { updateCustomTheme } from 'state/helmet';
import { SEARCH_REQUEST } from 'state/search';
import { UPDATE_THEME, CLEAR_THEME } from 'state/theme';
import * as cookie from 'utils/cookies';

const themeSelector = state => state.theme;

let removed = false;

/**
 * When the theme has been updated, also update the helmet config
 * for the new href.
 */
export function* watchThemeChanges() {
  yield takeLatest([UPDATE_THEME, CLEAR_THEME], function* handleThemeChange() {
    const { href, saved, primary, secondary, hue, light } = yield select(themeSelector);

    if (href && saved) {
      removed = false;
      cookie.create(PRIMARY, primary);
      cookie.create(SECONDARY, secondary);
      cookie.create(HUE, hue);
      cookie.create(LIGHT, light);
    } else if (!removed && (!saved || !href)) {
      cookie.remove(PRIMARY);
      cookie.remove(SECONDARY);
      cookie.remove(HUE);
      cookie.remove(LIGHT);
      removed = true;
    }

    yield put(updateCustomTheme(href));
  });
}

export function* handleSearch(action) {
  console.log('action:', action);
}

export function* watchSearches() {
  yield throttle(250, SEARCH_REQUEST, handleSearch);
}

export default function* sagas() {
  yield all([
    fork(watchThemeChanges),
    fork(watchSearches),
  ]);
}

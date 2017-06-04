/* eslint-disable no-console */
import { takeLatest, select, put, all, fork } from 'redux-saga/effects';
import { PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import { UPDATE_THEME } from 'state/theme';
import { updateCustomTheme } from 'state/helmet';
import * as cookie from 'utils/cookies';

const themeSelector = state => state.theme;

let removed = false;

/**
 * When the theme has been updated, also update the helmet config
 * for the new href.
 */
export function* watchThemeChanges() {
  yield takeLatest(UPDATE_THEME, function* handleThemeChange() {
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

export default function* sagas() {
  yield all([
    fork(watchThemeChanges),
  ]);
}

import { takeLatest, select, put } from 'redux-saga/effects';
import { PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import { updateCustomTheme } from 'state/helmet';
import { UPDATE_THEME, CLEAR_THEME } from 'state/theme';
import * as cookie from 'utils/cookies';

const themeSelector = state => state.theme;

let removed = false;

/**
 * When the theme has been updated, also update the helmet config
 * for the new href.
 */
export default function* watchThemeChanges() {
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

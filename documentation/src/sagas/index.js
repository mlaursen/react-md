/* eslint-disable */
import { get } from 'lodash/object';
import { takeLatest, select, put, all, fork, throttle, call } from 'redux-saga/effects';
import { API_ENDPOINT, SEARCH_ENDPOINT, SASSDOCS_ENDPOINT } from 'constants/application';
import { PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import { updateCustomTheme } from 'state/helmet';
import { SASSDOC_REQUEST, sassdocSuccess } from 'state/sassdocs';
import { SEARCH_REQUEST, searchSuccess } from 'state/search';
import { UPDATE_THEME, CLEAR_THEME } from 'state/theme';
import fetch from 'utils/api';
import * as cookie from 'utils/cookies';

const themeSelector = state => state.theme;
const sassdocsSelector = state => state.sassdocs;

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
  const { query, start, href } = action.payload;
  if (!query && !href) {
    return;
  }
  const endpoint = href || `${API_ENDPOINT}${SEARCH_ENDPOINT}?q=${query}&start=${start}`;
  const { meta, data } = yield call(fetch, endpoint);

  yield put(searchSuccess({ meta, data }));
}

export function* watchSearches() {
  yield throttle(250, SEARCH_REQUEST, handleSearch);
}

export function* watchSassDocRequests() {
  yield takeLatest(SASSDOC_REQUEST, function* handleSassDocRequest(action) {
    const { ids } = action.payload;
    const sassdoc = get(yield select(sassdocsSelector), ids.join('.'), null);
    if (sassdoc !== null) {
      return;
    }

    const endpoint = `${API_ENDPOINT}${SASSDOCS_ENDPOINT}/${ids.join('/')}`;
    const data = yield call(fetch, endpoint);
    yield put(sassdocSuccess(ids, data));
  });
}

export default function* sagas() {
  yield all([
    fork(watchThemeChanges),
    fork(watchSearches),
    fork(watchSassDocRequests),
  ]);
}

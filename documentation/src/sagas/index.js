import { get } from 'lodash/object';
import { takeLatest, select, put, all, fork, throttle, call } from 'redux-saga/effects';
import { PRIMARY, SECONDARY, HUE, LIGHT } from 'constants/colors';
import { updateCustomTheme } from 'state/helmet';
import { DOCGEN_REQUEST, docgenSuccess } from 'state/docgens';
import { SASSDOC_REQUEST, sassdocSuccess } from 'state/sassdocs';
import { SEARCH_REQUEST, searchSuccess } from 'state/search';
import { UPDATE_THEME, CLEAR_THEME } from 'state/theme';
import { search, fetchDocgen, fetchSassdoc } from 'utils/api';
import * as cookie from 'utils/cookies';

const themeSelector = state => state.theme;
const sassdocsSelector = state => state.sassdocs;
const docgensSelector = state => state.docgens;

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

  const { meta, data } = yield call(search, { query, start, href });
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

    const data = yield call(fetchSassdoc, ids.join('/'));
    yield put(sassdocSuccess(ids, data));
  });
}

export function* watchDocgenRequests() {
  yield takeLatest(DOCGEN_REQUEST, function* handleDocgenRequest(action) {
    const { ids } = action.payload;
    const docgen = get(yield select(docgensSelector), ids.join('.'));
    if (docgen !== null) {
      return;
    }

    const data = yield call(fetchDocgen, ids.join('/'));
    yield put(docgenSuccess(ids, data));
  });
}

export default function* sagas() {
  yield all([
    fork(watchThemeChanges),
    fork(watchSearches),
    fork(watchDocgenRequests),
    fork(watchSassDocRequests),
  ]);
}

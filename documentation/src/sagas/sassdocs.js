import { get } from 'lodash/object';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { SASSDOC_REQUEST, sassdocSuccess } from 'state/sassdocs';
import { fetchSassdoc } from 'utils/api';

const sassdocsSelector = state => state.sassdocs;

export default function* watchSassDocRequests() {
  yield takeLatest(SASSDOC_REQUEST, function* handleSassDocRequest(action) {
    const { ids } = action.payload;
    const sassdoc = get(yield select(sassdocsSelector), ids.join('.'), null);
    if (sassdoc !== null) {
      return;
    }

    try {
      const data = yield call(fetchSassdoc, ids.join('/'));
      yield put(sassdocSuccess(ids, data));
    } catch (e) {
      if (__DEV__) {
        console.log('e:', e); // eslint-disable-line no-console
      }
    }
  });
}

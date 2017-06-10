import { get } from 'lodash/object';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { DOCGEN_REQUEST, docgenSuccess } from 'state/docgens';
import { fetchDocgen } from 'utils/api';

const docgensSelector = state => state.docgens;

export default function* watchDocgenRequests() {
  yield takeLatest(DOCGEN_REQUEST, function* handleDocgenRequest(action) {
    const { ids } = action.payload;
    const docgen = get(yield select(docgensSelector), ids, null);
    if (docgen !== null) {
      return;
    }

    const data = yield call(fetchDocgen, ids.join('/'));
    yield put(docgenSuccess(ids, data));
  });
}

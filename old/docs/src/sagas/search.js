import { put, throttle, call } from 'redux-saga/effects';
import { SEARCH_REQUEST, searchSuccess } from 'state/search';
import { search } from 'utils/api';

export function* handleSearch(action) {
  const { query, start, href } = action.payload;
  if (!query && !href) {
    return;
  }

  const { meta, data } = yield call(search, { query, start, href });
  yield put(searchSuccess({ meta, data }));
}

export default function* watchSearches() {
  yield throttle(250, SEARCH_REQUEST, handleSearch);
}

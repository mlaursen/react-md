import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
import {
  AIR_QUALITY_COLUMNS_REQUEST,
  AIR_QUALITY_DATA_REQUEST,
  AIR_QUALITY_DATA_REQUEST_NEXT,
  airQualityColumnsSuccess,
  airQualityDataSuccess,
} from 'state/airQuality';
import { fetchAirQualityColumns, fetchAirQualityData } from 'utils/api';

export function* watchColumnsRequests() {
  yield takeLatest(AIR_QUALITY_COLUMNS_REQUEST, function* handleAirQualityColumnsRequests() {
    const { columns } = yield select(state => state.airQuality);
    if (columns.length) {
      return;
    }

    const data = yield call(fetchAirQualityColumns);
    yield put(airQualityColumnsSuccess(data));
  });
}

export function* watchDataRequests() {
  yield takeLatest([AIR_QUALITY_DATA_REQUEST, AIR_QUALITY_DATA_REQUEST_NEXT], function* handleAirQualityDataRequests(action) {
    const { start, limit, href } = action.payload;
    const keys = Object.keys(yield select(state => state.airQuality.data));
    const nextKeys = [...new Array(start + limit)].map((_, i) => `${i}`);
    const isMissingData = nextKeys.some(key => keys.indexOf(key) === -1);
    if (!href && !isMissingData) {
      return;
    }

    const { meta, data } = yield call(fetchAirQualityData, { start, limit, href });
    yield put(airQualityDataSuccess({ meta, data }));
  });
}


export default function* watchRequests() {
  yield fork(watchColumnsRequests);
  yield fork(watchDataRequests);
}

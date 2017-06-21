import { takeLatest, call, put, fork } from 'redux-saga/effects';
import {
  GITHUB_REQUEST,
  GITHUB_RATE_LIMIT_REQUEST,
  githubSuccess,
  githubFailure,
  githubRateLimitSuccess,
  githubRateLimitFailure,
} from 'state/github';
import { fetchGithub } from 'utils/api';
import { FORBIDDEN } from 'constants/responseCodes';

const RATE_LIMIT = '/rate_limit';

export function* watchGithubRequests() {
  yield takeLatest(GITHUB_REQUEST, function* handleGithubRequest(action) {
    const { endpoint, config } = action.payload;
    const response = yield call(fetchGithub, endpoint, config);

    if (response.ok) {
      const data = yield response.json();
      yield put(githubSuccess(data, response.headers, endpoint, config));
    } else if (response.status === FORBIDDEN) {
      const data = yield response.json();
      yield put(githubRateLimitFailure(data, response.headers, endpoint, config));
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      yield put(githubFailure(error, endpoint, config));
    }
  });
}

export function* watchGithubRateLimitRequests() {
  yield takeLatest(GITHUB_RATE_LIMIT_REQUEST, function* handleGithubRateLimitRequest() {
    const response = yield call(fetchGithub, RATE_LIMIT);
    if (response.ok) {
      const data = yield response.json();
      yield put(githubRateLimitSuccess(data));
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      yield put(githubFailure(error, RATE_LIMIT));
    }
  });
}

export default function* github() {
  yield fork(watchGithubRequests);
  yield fork(watchGithubRateLimitRequests);
}

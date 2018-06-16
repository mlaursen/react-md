import { takeLatest, call, put, fork, select } from 'redux-saga/effects';
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

export const RATE_LIMIT = '/rate_limit';

/**
 * A saga for checking when a GITHUB_REQUEST action is triggered and then correctly
 * creating an API call to fetch that data.
 */
export function* watchGithubRequests() {
  yield takeLatest(GITHUB_REQUEST, function* handleGithubRequest(action) {
    const { endpoint, options } = action.payload;
    const response = yield call(fetchGithub, endpoint, options);

    if (response.ok) {
      const data = yield response.json();
      yield put(githubSuccess(data, response.headers, endpoint, options));
    } else if (response.status === FORBIDDEN) {
      const data = yield response.json();
      yield put(githubRateLimitFailure(data, response.headers, endpoint, options));
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      yield put(githubFailure(error, endpoint, options));
    }
  });
}

/**
 * A saga for checking with a GITHUB_RATE_LIMIT_REQUEST action is triggered and then
 * correctly creating an API call to fetch the data.
 */
export function* watchGithubRateLimitRequests() {
  yield takeLatest(GITHUB_RATE_LIMIT_REQUEST, function* handleGithubRateLimitRequest() {
    const { core, search } = yield select(state => state.github.rateLimits);
    if (core.remaining !== -1 && search.remaining !== -1) {
      return;
    }

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

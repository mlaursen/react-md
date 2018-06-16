import { combineReducers } from 'redux';

import repos from './repos';
import search from './search';

export * from './search';

export const GITHUB_REQUEST = 'GITHUB_REQUEST';
export const GITHUB_SUCCESS = 'GITHUB_SUCCESS';
export const GITHUB_FAILURE = 'GITHUB_FAILURE';

export function githubRequest(endpoint, options) {
  return { type: GITHUB_REQUEST, payload: { endpoint, options } };
}

export function githubSuccess(data, headers, endpoint, options) {
  return {
    type: GITHUB_SUCCESS,
    payload: { data, headers, endpoint, options },
  };
}

export function githubFailure(error, endpoint, options) {
  return {
    type: GITHUB_FAILURE,
    payload: { error, endpoint, options },
  };
}

export default combineReducers({
  repos,
  search,
});

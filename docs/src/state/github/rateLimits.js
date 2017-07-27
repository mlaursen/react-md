import shallowEqual from 'shallowequal';
import { GITHUB_SUCCESS } from './cache';
import { RATE_LIMIT, RATE_REMAINING, RATE_RESET } from 'constants/headerKeys';

export const GITHUB_RATE_LIMIT_REQUEST = 'GITHUB_RATE_LIMIT_REQUEST';
export const GITHUB_RATE_LIMIT_SUCCESS = 'GITHUB_RATE_LIMIT_SUCCESS';
export const GITHUB_RATE_LIMIT_FAILURE = 'GITHUB_RATE_LIMIT_FAILURE';

export function githubRateLimitRequest() {
  return { type: GITHUB_RATE_LIMIT_REQUEST };
}

export function githubRateLimitSuccess({ resources }) {
  return {
    type: GITHUB_RATE_LIMIT_SUCCESS,
    payload: { resources },
  };
}

export function githubRateLimitFailure(error, headers, endpoint, config) {
  return {
    type: GITHUB_RATE_LIMIT_FAILURE,
    payload: { error, headers, endpoint, config },
  };
}

function setRateLimits(state, { core, search }) {
  if (!shallowEqual(state.core, core) || !shallowEqual(state.search, search)) {
    return { core, search };
  }

  return state;
}

function updateRateLimiting(state, { headers, endpoint }) {
  const key = endpoint.indexOf('/search') === 0 ? 'search' : 'core';
  const limit = parseInt(headers.get(RATE_LIMIT), 10);
  const remaining = parseInt(headers.get(RATE_REMAINING), 10);
  const reset = parseInt(headers.get(RATE_RESET), 10);
  state[key] = { limit, remaining, reset };

  return state;
}

const RESET = 1372700873;
export const INITIAL_STATE = {
  core: { limit: 60, remaining: -1, reset: RESET },
  search: { limit: 10, remaining: -1, reset: RESET },
};

export default function rateLimits(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GITHUB_SUCCESS:
      return updateRateLimiting(state, action.payload);
    case GITHUB_RATE_LIMIT_SUCCESS:
      return setRateLimits(state, action.payload.resources);
    default:
      return state;
  }
}

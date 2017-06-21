import { combineReducers } from 'redux';

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

function updateRepos(state, { data, endpoint }) {
  const matches = endpoint.match(/\/users\/(.*)\/repos/);
  if (!matches) {
    return state;
  }

  const [, username] = matches;
  if (!username) {
    return state;
  }

  return { ...state, [username]: data };
}

function repos(state = {}, action) {
  switch (action.type) {
    case GITHUB_SUCCESS:
      return updateRepos(state, action.payload);
    default:
      return state;
  }
}

function updateSearch(state, { data, endpoint }) {
  if (endpoint.indexOf('/search') !== 0) {
    return state;
  }

  return data.items;
}

function search(state = [], action) {
  switch (action.type) {
    case GITHUB_SUCCESS:
      return updateSearch(state, action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  repos,
  search,
});

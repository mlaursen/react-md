import shallowEqual from 'shallowequal';
import { combineReducers } from 'redux';
import { union } from 'lodash/array';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export function searchRequest(query, start = 0) {
  return { type: SEARCH_REQUEST, payload: { query, start } };
}

export function searchNextRequest(href) {
  return { type: SEARCH_REQUEST, payload: { href } };
}

export function searchSuccess({ meta, data }) {
  return { type: SEARCH_SUCCESS, payload: { meta, data } };
}

export const SHOW_SEARCH = 'SHOW_SEARCH';
export const HIDE_SEARCH = 'HIDE_SEARCH';

export function searching(state = false, action) {
  switch (action.type) {
    case SHOW_SEARCH:
      return true;
    case HIDE_SEARCH:
      return false;
    default:
      return state;
  }
}

function updateMeta(state, { meta }) {
  if (!shallowEqual(state, meta)) {
    return meta;
  }

  return state;
}

export function meta(state = {}, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return updateMeta(state, action.payload);
    default:
      return state;
  }
}

function updateResults(state, { data: results, meta: { start } }) {
  if (shallowEqual(state, results)) {
    return state;
  } else if (start > 0) {
    return union(state, results);
  }

  return results;
}

export function results(state = [], action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return updateResults(state, action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  searching,
  meta,
  results,
});

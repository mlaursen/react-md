import { combineReducers } from 'redux';
import searching from './searching';
import meta from './meta';
import results from './results';

export * from './searching';

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

export default combineReducers({
  searching,
  meta,
  results,
});

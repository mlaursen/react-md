import { SHOW_SEARCH, HIDE_SEARCH, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from 'constants/ActionTypes';

import { API_URL } from 'constants/application';
import { fetchProxyCreator } from './fetch';

const ACTIONS = {
  request: SEARCH_REQUEST,
  success: SEARCH_SUCCESS,
  failure: SEARCH_FAILURE,
};

export function showSearch() {
  return { type: SHOW_SEARCH };
}

export function hideSearch() {
  return { type: HIDE_SEARCH };
}

export function search(query, start = 0) {
  return fetchProxyCreator('search', ['search', 'matches'], `${API_URL}/search?q=${query}&start=${start}`, ACTIONS, false);
}

export function searchNext(link) {
  return fetchProxyCreator('search', ['search', 'matches'], link, ACTIONS, false);
}

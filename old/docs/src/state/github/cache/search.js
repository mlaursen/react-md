import { GITHUB_SUCCESS } from './';

export const GITHUB_CLEAR_SEARCH_RESULTS = 'GITHUB_CLEAR_SEARCH_RESULTS';

export function clearSearchResults() {
  return { type: GITHUB_CLEAR_SEARCH_RESULTS };
}

function updateSearch(state, { data, endpoint }) {
  if (endpoint.indexOf('/search') !== 0) {
    return state;
  }

  return data.items;
}

const INITIAL_STATE = [];

export default function search(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GITHUB_SUCCESS:
      return updateSearch(state, action.payload);
    case GITHUB_CLEAR_SEARCH_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}

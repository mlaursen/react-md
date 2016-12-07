import { SHOW_SEARCH, HIDE_SEARCH, SEARCH_REQUEST, SEARCH_SUCCESS } from 'constants/ActionTypes';

function updateSearchResults(state, { data: { meta, data: results } }) {
  if (state.results === results) {
    return state;
  } else if (meta.start > 0) {
    return Object.assign({}, state, { meta, results: state.results.concat(results) });
  }

  return Object.assign({}, state, { meta, results });
}

function updateSearch(state, searching) {
  if (state.searching === searching) {
    return state;
  }

  return Object.assign({}, state, { searching });
}

const initialState = {
  searching: false,
  meta: {},
  results: [],
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SHOW_SEARCH:
      return updateSearch(state, true);
    case HIDE_SEARCH:
      return updateSearch(state, false);
    case SEARCH_REQUEST:
      return state;
    case SEARCH_SUCCESS:
      return updateSearchResults(state, action);
    default:
      return state;
  }
}

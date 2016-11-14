import { SHOW_SEARCH, HIDE_SEARCH, SEARCH_REQUEST, SEARCH_SUCCESS } from 'constants/ActionTypes';

function updateSearch(state, searching) {
  if (state.searching === searching) {
    return state;
  }

  return Object.assign({}, state, { searching });
}

const initialState = {
  searching: false,
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
      return state;
    default:
      return state;
  }
}

import Fuse from 'fuse.js';

import { QUICK_SEARCH } from 'constants/ActionTypes';
import { fuseRoutes } from 'utils/RouteUtils';

const indexer = new Fuse(fuseRoutes, {
  keys: [{
    name: 'primaryText',
    weight: 0.95,
  }, {
    name: 'to',
    weight: 0.05,
  }],
});

function search(state, query) {
  if (!query && state.matches.length === 0) {
    return state;
  }

  return Object.assign({}, state, { matches: indexer.search(query) });
}

const initialState = {
  matches: [],
};

export default function quickSearch(state = initialState, action) {
  switch (action.type) {
    case QUICK_SEARCH:
      return search(state, action.query);
    default:
      return state;
  }
}

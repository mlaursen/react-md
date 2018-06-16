import { union } from 'lodash/array';
import { isEqual } from 'lodash/lang';
import { SEARCH_SUCCESS } from './';

function updateResults(state, { data: results, meta: { start } }) {
  if (isEqual(state, results)) {
    return state;
  } else if (start > 0) {
    return union(state, results);
  }

  return results;
}

export default function results(state = [], action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return updateResults(state, action.payload);
    default:
      return state;
  }
}

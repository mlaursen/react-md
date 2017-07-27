import shallowEqual from 'shallowequal';
import { SEARCH_SUCCESS } from './';

function updateMeta(state, { meta }) {
  if (!shallowEqual(state, meta)) {
    return meta;
  }

  return state;
}

export default function meta(state = {}, action) {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return updateMeta(state, action.payload);
    default:
      return state;
  }
}

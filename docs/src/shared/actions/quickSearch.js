import { QUICK_SEARCH } from 'constants/ActionTypes';

export function searchForComponent(query) {
  return { type: QUICK_SEARCH, query };
}

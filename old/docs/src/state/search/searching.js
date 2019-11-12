export const SHOW_SEARCH = 'SHOW_SEARCH';
export const HIDE_SEARCH = 'HIDE_SEARCH';

export function showSearch() {
  return { type: SHOW_SEARCH };
}

export function hideSearch() {
  return { type: HIDE_SEARCH };
}

export default function searching(state = false, action) {
  switch (action.type) {
    case SHOW_SEARCH:
      return true;
    case HIDE_SEARCH:
      return false;
    default:
      return state;
  }
}

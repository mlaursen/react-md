import { LOCATION_CHANGE } from 'constants/ActionTypes';
import { quickNavRoutes } from 'constants/navItems';

export const DEFAULT_STATE = {
  previousTo: null,
  previousName: null,
  nextTo: null,
  nextName: null,
};

export function handleLocationChange(state, { pathname }) {
  let i = 0;
  quickNavRoutes.some((r, index) => {
    if (r.to === pathname) {
      i = index;
      return true;
    }

    return false;
  });

  const previous = quickNavRoutes[i - 1] || {};
  const next = quickNavRoutes[i + 1] || {};
  return {
    previousTo: previous.to || null,
    previousName: previous.primaryText || null,
    nextTo: next.to || null,
    nextName: next.primaryText || null,
  };
}

const pathname = __CLIENT__ ? window.location.pathname : '';
const initialState = handleLocationChange(DEFAULT_STATE, { pathname });

export default function quickNavigation(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return handleLocationChange(state, action.payload);
    default:
      return state;
  }
}

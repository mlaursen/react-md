import { LOCATION_CHANGE, NOT_FOUND } from 'state/routing';
import { quickNavRoutes } from 'constants/navItems';

export const DEFAULT_STATE = {
  previousTo: null,
  previousName: null,
  nextTo: null,
  nextName: null,
};

export function handleLocationChange(state, pathname, routes = quickNavRoutes) {
  if (pathname === '/') {
    return DEFAULT_STATE;
  }

  let i = -1;
  routes.some((r, index) => {
    if (r.to === pathname) {
      i = index;
      return true;
    }

    return false;
  });

  if (i === -1) {
    return DEFAULT_STATE;
  }

  const previous = routes[i - 1] || {};
  const next = routes[i + 1] || {};
  return {
    previousTo: previous.to || null,
    previousName: previous.label || null,
    nextTo: next.to || null,
    nextName: next.label || null,
  };
}

const pathname = __CLIENT__ ? location.pathname : '';
const INITIAL_STATE = handleLocationChange(DEFAULT_STATE, { pathname });

export default function quickNav(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOT_FOUND:
      return DEFAULT_STATE;
    case LOCATION_CHANGE:
      return handleLocationChange(state, action.payload.location.pathname);
    default:
      return state;
  }
}

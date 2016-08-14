import { LOCATION_CHANGE } from 'constants/ActionTypes';
import { quickNavRoutes } from 'utils/RouteUtils';

function updateLinks(state, pathname) {
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

const initialState = {
  previousTo: null,
  previousName: null,
  nextTo: null,
  nextName: null,
};

export default function quickNav(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return updateLinks(state, action.payload.pathname);
    default:
      return state;
  }
}

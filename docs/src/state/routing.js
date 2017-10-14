export const LOCATION_CHANGE = 'LOCATION_CHANGE';

/**
 * This is a simple plug-in replacement for react-router-redux until it supports
 * react-router v4.
 *
 * @param {Object} location - the next location object on route change.
 * @return {Object} the action
 */
export function updateLocation(location) {
  return { type: LOCATION_CHANGE, payload: { location } };
}

export const NOT_FOUND = 'NOT_FOUND';

export function pageNotFound() {
  return { type: NOT_FOUND };
}

const INITIAL_STATE = typeof window !== 'undefined' ? { ...window.location } : {};

export default function routing(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload.location;
    default:
      return state;
  }
}

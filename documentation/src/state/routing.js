export const LOCATION_CHANGE = 'LOCATION_CHANGE';

export function updateLocation(location) {
  return { type: LOCATION_CHANGE, payload: { location } };
}

export const NOT_FOUND = 'NOT_FOUND';

export function pageNotFound() {
  return { type: NOT_FOUND };
}

export default function routing(state = {}, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return action.payload.location;
    default:
      return state;
  }
}

export const LOCATION_CHANGE = 'LOCATION_CHANGE';

export function updateLocation(location) {
  return { type: LOCATION_CHANGE, payload: { location } };
}

export default function routing(state = {}, action) {
  if (action.type === LOCATION_CHANGE) {
    return action.payload.location;
  }

  return state;
}

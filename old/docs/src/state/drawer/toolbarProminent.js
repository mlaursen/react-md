import { LOCATION_CHANGE, NOT_FOUND } from 'state/routing';

function isProminent({ pathname }) {
  return !pathname.match(/minimizing/)
    && !!pathname.match(/components|customization/)
    && !pathname.match(/theme-builder/);
}

export default function toolbarProminent(state = false, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return isProminent(action.payload.location);
    case NOT_FOUND:
      return false;
    default:
      return state;
  }
}

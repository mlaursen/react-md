import { ROOT_PATH } from 'constants/application';
import { LOCATION_CHANGE, NOT_FOUND } from 'state/routing';

function isVisible({ pathname }) {
  return !pathname || pathname !== ROOT_PATH;
}

export default function visibleBoxShadow(state = true, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return isVisible(action.payload.location);
    case NOT_FOUND:
      return false;
    default:
      return state;
  }
}

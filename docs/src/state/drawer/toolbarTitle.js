import { toPageTitle } from 'utils/strings';
import { LOCATION_CHANGE, NOT_FOUND } from 'state/routing';

export default function toolbarTitle(state = '', action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return toPageTitle(action.payload.location.pathname);
    case NOT_FOUND:
      return 'Not Found!';
    default:
      return state;
  }
}

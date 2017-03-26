import { toPageTitle } from 'utils/strings';
import { LOCATION_CHANGE } from './routing';

export const NOT_FOUND = 'NOT_FOUND';

export function pageNotFound() {
  return { type: NOT_FOUND };
}

const INITIAL_STATE = {
  visibleToolbarTitle: true,
  toolbarTitle: typeof window !== 'undefined' ? toPageTitle(window.location.pathname) : '',
  toolbarProminent: false,
  visibleBoxShadow: false,
};

export default function drawer(state = INITIAL_STATE, action) {
  if (action.type === NOT_FOUND) {
    return { ...state, toolbarTitle: 'Not Found!', visibleBoxShadow: false };
  } else if (action.type === LOCATION_CHANGE) {
    const { pathname } = action.payload.location;
    return { ...state, toolbarTitle: toPageTitle(pathname), visibleBoxShadow: pathname !== '/' };
  }

  return state;
}

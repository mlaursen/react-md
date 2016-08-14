import { LOCATION_CHANGE, SET_TOOLBAR_INACTIVE } from 'constants/ActionTypes';
import { getPageTitle } from 'utils/StringUtils';


function updateToolbarTitle(state, pathname) {
  const toolbarTitle = getPageTitle(pathname);
  if (state.toolbarTitle === toolbarTitle) {
    return state;
  }

  return Object.assign({}, state, { toolbarTitle });
}

function updateToolbarInactivity(state, { inactive }) {
  if (state.inactive === inactive) {
    return state;
  }

  return Object.assign({}, state, { inactive });
}

const initialState = {
  initiallyOpen: true,
  initialDrawerType: 'desktop',
  toolbarTitle: '',
  inactive: true,
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return updateToolbarTitle(state, action.payload.pathname);
    case SET_TOOLBAR_INACTIVE:
      return updateToolbarInactivity(state, action);
    default:
      return state;
  }
}

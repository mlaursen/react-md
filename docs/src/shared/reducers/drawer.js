import { LOCATION_CHANGE, SET_TOOLBAR_INACTIVE, UPDATE_DRAWER_TYPE } from 'constants/ActionTypes';
import { getPageTitle } from 'utils/StringUtils';
import { isMobile, isTablet, getDrawerType } from 'utils/MediaUtils';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';


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

function updateDrawerType(state, drawerType) {
  if (drawerType === null) {
    return Object.assign({}, state, {
      tabletDrawerType: NavigationDrawer.defaultProps.tabletDrawerType,
      desktopDrawerType: NavigationDrawer.defaultProps.desktopDrawerType,
    });
  } else if (state.tabletDrawerType === drawerType && state.desktopDrawerType === drawerType) {
    return state;
  }

  return Object.assign({}, state, { tabletDrawerType: drawerType, desktopDrawerType: drawerType });
}

const initialState = {
  initialDrawerType: getDrawerType(isMobile(), isTablet()),
  toolbarTitle: '',
  inactive: true,
  tabletDrawerType: NavigationDrawer.defaultProps.tabletDrawerType,
  desktopDrawerType: NavigationDrawer.defaultProps.desktopDrawerType,
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return updateToolbarTitle(state, action.payload.pathname);
    case SET_TOOLBAR_INACTIVE:
      return updateToolbarInactivity(state, action);
    case UPDATE_DRAWER_TYPE:
      return updateDrawerType(state, action.drawerType);
    default:
      return state;
  }
}

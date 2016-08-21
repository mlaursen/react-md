import {
  LOCATION_CHANGE,
  SET_TOOLBAR_INACTIVE,
  UPDATE_DRAWER_TYPE,
  SET_MOBILE_SEARCH,
} from 'constants/ActionTypes';
import { getPageTitle } from 'utils/StringUtils';
import { isMobile, isTablet, getDrawerType } from 'utils/MediaUtils';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';


function handleLocationChange(state, pathname) {
  const toolbarTitle = getPageTitle(pathname);
  const isHome = pathname === '/';

  const { PERSISTENT, PERSISTENT_MINI } = NavigationDrawer.DrawerType;
  const themeable = !isHome && [PERSISTENT, PERSISTENT_MINI].indexOf(state.desktopDrawerType) === -1;

  if (state.toolbarTitle === toolbarTitle && state.themeable === themeable) {
    return state;
  }

  return Object.assign({}, state, { toolbarTitle, themeable });
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
      themeable: !isMobile(),
      includeHeader: true,
    });
  } else if (state.tabletDrawerType === drawerType && state.desktopDrawerType === drawerType) {
    return state;
  }

  const { FULL_HEIGHT, CLIPPED, FLOATING } = NavigationDrawer.DrawerType;
  const themeable = [FULL_HEIGHT, CLIPPED, FLOATING].indexOf(drawerType) !== -1;
  const includeHeader = [CLIPPED, FLOATING].indexOf(drawerType) === -1;

  return Object.assign({}, state, {
    tabletDrawerType: drawerType,
    desktopDrawerType: drawerType,
    themeable,
    includeHeader,
  });
}

function setMobileSearch(state, mobileSearch) {
  if (state.mobileSearch === mobileSearch) {
    return state;
  }

  return Object.assign({}, state, { mobileSearch });
}

const initialState = {
  initialDrawerType: getDrawerType(isMobile(), isTablet()),
  toolbarTitle: '',
  inactive: true,
  tabletDrawerType: NavigationDrawer.defaultProps.tabletDrawerType,
  desktopDrawerType: NavigationDrawer.defaultProps.desktopDrawerType,
  mobileSearch: false,
  includeHeader: true,
  themeable: !isMobile(),
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return handleLocationChange(state, action.payload.pathname);
    case SET_TOOLBAR_INACTIVE:
      return updateToolbarInactivity(state, action);
    case UPDATE_DRAWER_TYPE:
      return updateDrawerType(state, action.drawerType);
    case SET_MOBILE_SEARCH:
      return setMobileSearch(state, action.mobileSearch);
    default:
      return state;
  }
}

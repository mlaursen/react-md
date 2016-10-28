import { SET_DRAWER_TOOLBAR_BOX_SHADOW, UPDATE_MEDIA, LOCATION_CHANGE } from 'constants/ActionTypes';
import toPageTitle from 'utils/StringUtils/toPageTitle';
import Drawer from 'react-md/lib/Drawers';

function isBoxShadowVisible(pathname) {
  return !pathname || pathname !== '/';
}

function setDrawerToolbarBoxShadow(state, visibleBoxShadow) {
  if (state.visibleBoxShadow === visibleBoxShadow) {
    return state;
  }

  return Object.assign({}, state, { visibleBoxShadow });
}

function handleLocationChange(state, { payload: { pathname } }) {
  const visibleBoxShadow = isBoxShadowVisible(pathname);
  const toolbarTitle = toPageTitle(pathname);
  const toolbarProminent = !!pathname.match(/components|customization/);

  if (state.visibleBoxShadow === visibleBoxShadow && state.toolbarTitle === toolbarTitle && state.toolbarProminent === toolbarProminent) {
    return state;
  }

  return Object.assign({}, state, { toolbarTitle, visibleBoxShadow, toolbarProminent });
}


const pathname = (window && window.location && window.location.pathname) || '';
const { mobile, tablet, desktop } = Drawer.getCurrentMedia(Drawer.defaultProps);
let defaultMedia = 'mobile';
if (desktop) {
  defaultMedia = 'desktop';
} else if (tablet) {
  defaultMedia = 'tablet';
}

const initialState = {
  mobile,
  tablet,
  desktop,
  defaultMedia,
  toolbarTitle: toPageTitle(pathname),
  toolbarProminent: !!pathname.match(/components|customization/),
  visibleBoxShadow: isBoxShadowVisible(pathname),
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_TOOLBAR_BOX_SHADOW:
      return setDrawerToolbarBoxShadow(state, action.visible);
    case UPDATE_MEDIA:
      return Object.assign({}, state, { ...action.media });
    case LOCATION_CHANGE:
      return handleLocationChange(state, action);
    default:
      return state;
  }
}

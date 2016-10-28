import { SET_DRAWER_TOOLBAR_BOX_SHADOW, LOCATION_CHANGE } from 'constants/ActionTypes';
import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH, DESKTOP_MIN_WIDTH } from 'react-md/lib/constants/media';
import toPageTitle from 'utils/StringUtils/toPageTitle';

function isBoxShadowVisible(pathname) {
  return pathname && pathname !== '/' && !pathname.match(/components|customization/);
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


function matches(min, max) {
  let media = `screen and (min-width: ${min}px)`;
  if (max) {
    media += ` and (max-width: ${max}px)`;
  }

  return window.matchMedia(media).matches;
}

function getDefaultMedia() {
  if (typeof window === 'undefined' || matches(MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH - 1)) {
    return 'mobile';
  } else if (matches(TABLET_MIN_WIDTH, DESKTOP_MIN_WIDTH - 1)) {
    return 'tablet';
  }

  return 'desktop';
}

const pathname = (window && window.location && window.location.pathname) || '';
const initialState = {
  toolbarTitle: toPageTitle(pathname),
  toolbarProminent: !!pathname.match(/components|customization/),
  defaultMedia: getDefaultMedia(),
  visibleBoxShadow: isBoxShadowVisible(pathname),
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_TOOLBAR_BOX_SHADOW:
      return setDrawerToolbarBoxShadow(state, action.visible);
    case LOCATION_CHANGE:
      return handleLocationChange(state, action);
    default:
      return state;
  }
}

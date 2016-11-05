import {
  SET_DRAWER_TOOLBAR_BOX_SHADOW,
  UPDATE_MEDIA,
  SET_CUSTOM_THEME,
  UPDATE_DRAWER_TYPE,
} from 'constants/ActionTypes';

export function setDrawerToolbarBoxShadow(visible) {
  return { type: SET_DRAWER_TOOLBAR_BOX_SHADOW, visible };
}

export function updateMedia(drawerType, media) {
  return { type: UPDATE_MEDIA, drawerType, media };
}

export function setCustomTheme(enabled) {
  return { type: SET_CUSTOM_THEME, enabled };
}

export function updateDrawerType(drawerType) {
  return { type: UPDATE_DRAWER_TYPE, drawerType };
}

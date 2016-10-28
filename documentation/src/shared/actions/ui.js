import { SET_DRAWER_TOOLBAR_BOX_SHADOW, UPDATE_MEDIA } from 'constants/ActionTypes';

export function setDrawerToolbarBoxShadow(visible) {
  return { type: SET_DRAWER_TOOLBAR_BOX_SHADOW, visible };
}

export function updateMedia(drawerType, media) {
  return { type: UPDATE_MEDIA, drawerType, media };
}

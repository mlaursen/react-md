import { SET_DRAWER_TOOLBAR_BOX_SHADOW } from 'constants/ActionTypes';

export function setDrawerToolbarBoxShadow(visible) {
  return { type: SET_DRAWER_TOOLBAR_BOX_SHADOW, visible };
}

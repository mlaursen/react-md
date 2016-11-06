import {
  SET_TOOLBAR_INACTIVE,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  ADD_TOAST,
  DISMISS_TOAST,
  MEDIA_CHANGE,
  UPDATE_DRAWER_TYPE,
  SET_MOBILE_SEARCH,
  UPDATE_THEME,
} from 'constants/ActionTypes';

import { isMobile, isTablet, isDesktop } from 'utils/MediaUtils';

export function setToolbarInactive(inactive) {
  return { type: SET_TOOLBAR_INACTIVE, inactive };
}

export function showOverlay() {
  return { type: SHOW_OVERLAY };
}

export function hideOverlay() {
  return { type: HIDE_OVERLAY };
}

export function addToast(toast) {
  return { type: ADD_TOAST, toast };
}

export function dismissToast() {
  return { type: DISMISS_TOAST };
}

export function mediaChange() {
  const mobile = isMobile();
  const tablet = isTablet();
  const desktop = isDesktop();

  return {
    type: MEDIA_CHANGE,
    media: { mobile, tablet, desktop },
  };
}

export function updateDrawerType(drawerType) {
  return { type: UPDATE_DRAWER_TYPE, drawerType };
}

export function setMobileSearch(mobileSearch) {
  return { type: SET_MOBILE_SEARCH, mobileSearch };
}

export function updateTheme(theme) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }

  return { type: UPDATE_THEME, theme };
}

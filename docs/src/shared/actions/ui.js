import {
  SET_TOOLBAR_INACTIVE,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  ADD_TOAST,
  DISMISS_TOAST,
  MEDIA_CHANGE,
} from 'constants/ActionTypes';

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
  return { type: MEDIA_CHANGE };
}

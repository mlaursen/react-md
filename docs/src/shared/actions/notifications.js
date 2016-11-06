import { ADD_NOTIFICATION, DISMISS_NOTIFICATION } from 'constants/ActionTypes';

export function addNotification(notification) {
  return { type: ADD_NOTIFICATION, notification };
}

export function dismissNotification() {
  return { type: DISMISS_NOTIFICATION };
}

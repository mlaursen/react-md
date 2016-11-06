/* eslint-disable no-case-declarations */
import { ADD_NOTIFICATION, DISMISS_NOTIFICATION } from 'constants/ActionTypes';

const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [...state, action.notification];
    case DISMISS_NOTIFICATION:
      const [, ...toasts] = state;
      return toasts;
    default:
      return state;
  }
}

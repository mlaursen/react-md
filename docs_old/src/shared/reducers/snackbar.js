import { ADD_TOAST, DISMISS_TOAST } from 'constants/ActionTypes';

function addToast(state, toast) {
  const nextState = state.slice();
  nextState.push(toast);

  return nextState;
}

function dismissToast(state) {
  const nextState = state.slice();
  nextState.shift();

  return nextState;
}

const initialState = [];

export default function snackbar(state = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      return addToast(state, action.toast);
    case DISMISS_TOAST:
      return dismissToast(state);
    default:
      return state;
  }
}

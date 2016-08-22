import { SHOW_OVERLAY, HIDE_OVERLAY } from 'constants/ActionTypes';

function updateOverlay(state, visible) {
  if (state.visible === visible) {
    return state;
  }

  return Object.assign({}, state, { visible });
}

const initialState = {
  visible: false,
};

export default function overlay(state = initialState, action) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return updateOverlay(state, true);
    case HIDE_OVERLAY:
      return updateOverlay(state, false);
    default:
      return state;
  }
}

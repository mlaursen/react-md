export const NOT_FOUND = 'NOT_FOUND';

const INITIAL_STATE = {
  visibleToolbarTitle: true,
  toolbarTitle: '',
  toolbarProminent: false,
  visibleBoxShadow: false,
};

export default function navigation(state = INITIAL_STATE, action) {
  if (action.type === NOT_FOUND) {
    return { ...state, toolbarTitle: 'Not Found!', visibleBoxShadow: false };
  }

  return state;
}

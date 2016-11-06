import { UPDATE_THEME } from 'constants/ActionTypes';
import themes from 'constants/themes';

function updateTheme(state, theme) {
  if (state === theme) {
    return state;
  }

  return theme;
}

const initialState = typeof Storage !== 'undefined' && localStorage.getItem('theme') || themes[1];

export default function theme(state = initialState, action) {
  switch (action.type) {
    case UPDATE_THEME:
      return updateTheme(state, action.theme);
    default:
      return state;
  }
}

import { CUSTOM_THEME_ROUTE } from 'constants/colors';
import { findIndex } from 'lodash/array';

export const UPDATE_CUSTOM_THEME = 'UPDATE_CUSTOM_THEME';
export function updateCustomTheme(href) {
  return { type: UPDATE_CUSTOM_THEME, payload: { href } };
}

export const INITIAL_STATE = [{
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Material+Icons',
}, {
  rel: 'stylesheet',
  href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
}];

const CUSTOM_THEME_ID = 'custom-theme-styles';
export const CUSTOM_THEME_LINK = { id: CUSTOM_THEME_ID, rel: 'stylesheet' };

function handleCustomThemeChange(state, { href }) {
  const i = findIndex(state, link => link.id === CUSTOM_THEME_ID);
  const preview = href === null
    ? null
    : { ...(state[i] || CUSTOM_THEME_LINK), href: `/${CUSTOM_THEME_ROUTE}/${href}` };

  const nextState = state.slice();
  if (preview && i === -1) {
    nextState.push(preview);
  } else if (preview) {
    nextState.splice(i, 1, preview);
  } else {
    nextState.splice(i, 1);
  }

  return nextState;
}

export default function link(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CUSTOM_THEME:
      return handleCustomThemeChange(state, action.payload);
    default:
      return state;
  }
}

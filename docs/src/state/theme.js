import {
  PRIMARY_COLORS,
  ACCENTABLE_COLORS,
  PRIMARY,
  SECONDARY,
  HUE,
  LIGHT,
  THEME_KEYS,
  THEME_STORAGE_KEY,
} from 'constants/colors';
import { underscore } from 'utils/strings';
import hasStorage from 'utils/hasStorage';
import shallowEqual from 'shallowequal';
import { getParsedCookie } from 'utils/cookies';

export const UPDATE_THEME = 'UPDATE_THEME';

export function updateTheme(id, value) {
  return {
    type: UPDATE_THEME,
    payload: { id, value },
  };
}

export const CLEAR_THEME = 'CLEAR_THEME';
export function clearTheme() {
  return { type: CLEAR_THEME };
}

export const DEFAULT_STATE = {
  [PRIMARY]: 'light-blue',
  [SECONDARY]: 'deep-orange',
  [HUE]: 200,
  [LIGHT]: true,
  saved: false,
  saveDisabled: true,
};

export function removeColor(colors, color) {
  const i = colors.indexOf(color);
  if (i > -1) {
    const valids = colors.slice();
    valids.splice(i, 1);
    return valids;
  }

  return colors;
}

export function isSaveDisabled(state) {
  return !THEME_KEYS.some(key => state[key] !== DEFAULT_STATE[key]);
}

export function getStylesheetHref(state) {
  if (THEME_KEYS.filter(key => DEFAULT_STATE[key] === state[key]).length === THEME_KEYS.length) {
    return null;
  }

  const { [PRIMARY]: primary, [SECONDARY]: secondary, [HUE]: hue, [LIGHT]: light } = state;
  return `${underscore(primary)}-${underscore(secondary)}-${hue}${light ? '' : '-dark'}.css`;
}

function handleThemeChange(state, { id, value: nextValue }) {
  if (THEME_KEYS.indexOf(id) === -1 && id !== 'saved') {
    return state;
  }

  let value = nextValue;
  if (id === HUE) {
    value = parseInt(value, 10);
  }

  const nextState = { ...state, [id]: value };
  nextState.href = getStylesheetHref(nextState);
  nextState.saveDisabled = isSaveDisabled(nextState);
  if (id === PRIMARY) {
    nextState.filteredSecondaries = removeColor(ACCENTABLE_COLORS, value);
  } else if (id === SECONDARY) {
    nextState.filteredPrimaries = removeColor(PRIMARY_COLORS, value);
  }

  if (!shallowEqual(state, nextState)) {
    return nextState;
  }

  return state;
}

function handleClearTheme(state) {
  return { ...state, ...DEFAULT_STATE };
}

export function getInitialState(savedData) {
  let state = DEFAULT_STATE;
  const keys = savedData
    ? Object.keys(savedData).filter(key => THEME_KEYS.includes(key))
    : null;
  if (keys && keys.length === THEME_KEYS.length) {
    state = {
      ...state,
      ...keys.reduce((savedState, key) => {
        let value = savedData[key];
        if (key === HUE) {
          value = parseInt(value, 10);
        } else if (key === LIGHT || key === 'saved') {
          value = value === 'true';
        }

        savedState[key] = value;
        return savedState;
      }, {}),
    };
    state.saved = true;
  }

  const { primary, secondary } = state;
  state.href = getStylesheetHref(state);
  state.saveDisabled = isSaveDisabled(state);
  state.filteredPrimaries = removeColor(PRIMARY_COLORS, secondary);
  state.filteredSecondaries = removeColor(ACCENTABLE_COLORS, primary);

  return state;
}

export const INITIAL_STATE = getInitialState(
  (hasStorage() && JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)))
  || getParsedCookie()
);

export default function theme(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_THEME:
      return handleClearTheme(state);
    case UPDATE_THEME:
      return handleThemeChange(state, action.payload);
    default:
      return state;
  }
}

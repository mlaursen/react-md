/* eslint-env jest */
import {
  PRIMARY_COLORS,
  ACCENTABLE_COLORS,
  PRIMARY,
  SECONDARY,
  HUE,
  LIGHT,
} from 'constants/colors';
import reducer, {
  INITIAL_STATE,
  DEFAULT_STATE,
  UPDATE_THEME,
  updateTheme,
  removeColor,
  isSaveDisabled,
  getStylesheetHref,
  getInitialState,
} from '../theme';

describe('theme', () => {
  describe('action creators', () => {
    describe('updateTheme', () => {
      it('should create the correct action', () => {
        const id = PRIMARY;
        const value = 'purple';

        const expected = {
          type: UPDATE_THEME,
          payload: { id, value },
        };

        expect(updateTheme(id, value)).toEqual(expected);
      });
    });
  });

  describe('helper functions', () => {
    describe('removeColor', () => {
      const colors = ['red', 'yellow', 'green'];
      it('should return the list if the color does not exist', () => {
        expect(removeColor(colors, 'blue')).toBe(colors);
      });

      it('should return a list with the color removed', () => {
        expect(removeColor(colors, 'red')).toEqual(['yellow', 'green']);
      });
    });

    describe('isSaveDisabled', () => {
      it('should return true if the THEME_KEYS in the nextState are equal to the DEFAULT_STATE', () => {
        expect(isSaveDisabled(DEFAULT_STATE)).toBe(true);
      });

      it('should return false if one of the nextState keys are not equal to the DEFAULT_STATE', () => {
        const state = {
          [PRIMARY]: 'brown',
          [SECONDARY]: DEFAULT_STATE[SECONDARY],
          [HUE]: DEFAULT_STATE[HUE],
          [LIGHT]: DEFAULT_STATE[LIGHT],
        };

        expect(isSaveDisabled(state)).toBe(false);
      });
    });

    describe('getStylesheetHref', () => {
      it('should correctly create a link', () => {
        const state = {
          [PRIMARY]: 'deep-purple',
          [SECONDARY]: 'orange',
          [HUE]: 200,
          [LIGHT]: true,
        };
        const expected = 'deep_purple-orange-200.css';
        expect(getStylesheetHref(state)).toBe(expected);

        const state2 = {
          [PRIMARY]: 'red',
          [SECONDARY]: 'light-blue',
          [HUE]: 700,
          [LIGHT]: false,
        };
        const expected2 = 'red-light_blue-700-dark.css';
        expect(getStylesheetHref(state2)).toBe(expected2);
      });
    });

    describe('getInitialState', () => {
      it('should correctly make the initial state when there are no cookies and no localStorage', () => {
        const expected = {
          ...DEFAULT_STATE,
          filteredPrimaries: removeColor(PRIMARY_COLORS, DEFAULT_STATE[SECONDARY]),
          filteredSecondaries: removeColor(ACCENTABLE_COLORS, DEFAULT_STATE[PRIMARY]),
        };

        const state = getInitialState(null);
        expect(state).toEqual(expected);
        expect(state.saveDisabled).toBe(true);
      });

      it('should not merge a partial existing state', () => {
        const existing = {
          [PRIMARY]: 'brown',
          [LIGHT]: false,
        };
        const expected = {
          ...DEFAULT_STATE,
          saved: false,
          saveDisabled: true,
          filteredPrimaries: removeColor(PRIMARY_COLORS, DEFAULT_STATE[SECONDARY]),
          filteredSecondaries: removeColor(ACCENTABLE_COLORS, DEFAULT_STATE[PRIMARY]),
        };
        expected.href = getStylesheetHref(expected);

        expect(getInitialState(existing)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to the INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toBe(INITIAL_STATE);
    });

    it('should define all the correct keys', () => {
      const state = reducer(undefined, {});
      expect(state[PRIMARY]).toBeDefined();
      expect(state[SECONDARY]).toBeDefined();
      expect(state[HUE]).toBeDefined();
      expect(state[LIGHT]).toBeDefined();
      expect(state.filteredPrimaries).toBeDefined();
      expect(state.filteredSecondaries).toBeDefined();
      expect(state.href).toBeDefined();
      expect(state.saved).toBeDefined();
      expect(state.saveDisabled).toBeDefined();
    });

    it('should correctly update the primary color', () => {
      const state = INITIAL_STATE;
      const primaryColor = 'brown';
      const expected = {
        ...state,
        saveDisabled: false,
        [PRIMARY]: primaryColor,
        filteredSecondaries: removeColor(ACCENTABLE_COLORS, primaryColor),
      };
      expected.href = getStylesheetHref(expected);

      expect(reducer(state, updateTheme(PRIMARY, primaryColor))).toEqual(expected);
    });

    it('should correctly update the secondary color', () => {
      const state = INITIAL_STATE;
      const secondaryColor = 'deep-purple';
      const expected = {
        ...state,
        saveDisabled: false,
        [SECONDARY]: secondaryColor,
        filteredPrimaries: removeColor(PRIMARY_COLORS, secondaryColor),
      };
      expected.href = getStylesheetHref(expected);

      expect(reducer(state, updateTheme(SECONDARY, secondaryColor))).toEqual(expected);
    });

    it('should correctly update the hue', () => {
      const state = INITIAL_STATE;
      const hue = 100;
      const expected = {
        ...state,
        saveDisabled: false,
        [HUE]: hue,
      };
      expected.href = getStylesheetHref(expected);

      expect(reducer(state, updateTheme(HUE, `${hue}`))).toEqual(expected);
    });

    it('should correctly update the light theme', () => {
      const state = INITIAL_STATE;
      const light = false;
      const expected = {
        ...state,
        saveDisabled: false,
        [LIGHT]: light,
      };
      expected.href = getStylesheetHref(expected);

      expect(reducer(state, updateTheme(LIGHT, light))).toEqual(expected);
    });
  });
});

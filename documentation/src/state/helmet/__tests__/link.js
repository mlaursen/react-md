/* eslint-env jest */
import { CUSTOM_THEME_ROUTE } from 'constants/application';
import reducer, {
  INITIAL_STATE,
  CUSTOM_THEME_LINK,
  UPDATE_CUSTOM_THEME,
  updateCustomTheme,
} from '../link';

describe('link', () => {
  describe('action creators', () => {
    describe('updateCustomTheme', () => {
      it('should create the correct action when there is an href', () => {
        const href = '/themes/react-md.blue-orange-200.css';
        const expected = { type: UPDATE_CUSTOM_THEME, payload: { href } };
        expect(updateCustomTheme(href)).toEqual(expected);
      });

      it('should create the correct action when there is no href', () => {
        const expected = { type: UPDATE_CUSTOM_THEME, payload: { href: null } };
        expect(updateCustomTheme(null)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to the INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toBe(INITIAL_STATE);
    });

    it('should insert a new link after the UPDATE_CUSTOM_THEME action', () => {
      const href = 'react-md.light_blue-deep_purple-dark.css';
      const expected = [...INITIAL_STATE, { ...CUSTOM_THEME_LINK, href: `/${CUSTOM_THEME_ROUTE}/${href}` }];
      expect(reducer(INITIAL_STATE, updateCustomTheme(href))).toEqual(expected);
    });

    it('should update an existing link', () => {
      const state = [...INITIAL_STATE, { ...CUSTOM_THEME_LINK, href: '/themes/something.css' }];

      const href = 'react-md.light_blue-deep_purple-dark.css';
      const expected = [...INITIAL_STATE, { ...CUSTOM_THEME_LINK, href: `/${CUSTOM_THEME_ROUTE}/${href}` }];
      expect(reducer(state, updateCustomTheme(href))).toEqual(expected);
    });

    it('should remove a link if the href is null', () => {
      const state = [...INITIAL_STATE, { ...CUSTOM_THEME_LINK, href: '/themes/something.css' }];
      expect(reducer(state, updateCustomTheme(null))).toEqual(INITIAL_STATE);
    });
  });
});

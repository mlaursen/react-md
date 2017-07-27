/* eslint-env jest */
import reducer, { UPDATE_LOCALE, updateLocale } from '../locale';

describe('locale', () => {
  describe('action creators', () => {
    describe('updateLocale', () => {
      it('should create the correct action', () => {
        expect(updateLocale('da-DK')).toEqual({ type: UPDATE_LOCALE, payload: { locale: 'da-DK' } });
      });
    });
  });

  describe('reducer', () => {
    it('should default to en-US', () => {
      expect(reducer(undefined, {})).toBe('en-US');
    });

    it('should correctly update', () => {
      const locale = 'da';
      const action = {
        type: UPDATE_LOCALE,
        payload: { locale },
      };

      expect(reducer('en-US', action)).toBe(locale);
    });
  });
});

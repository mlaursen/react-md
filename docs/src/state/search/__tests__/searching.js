/* eslint-env jest */
import reducer, {
  SHOW_SEARCH,
  HIDE_SEARCH,
  showSearch,
  hideSearch,
} from '../searching';

describe('searching', () => {
  describe('action creators', () => {
    describe('showSearch', () => {
      it('should create the correct action', () => {
        expect(showSearch()).toEqual({ type: SHOW_SEARCH });
      });
    });

    describe('hideSearch', () => {
      it('should create the correct action', () => {
        expect(hideSearch()).toEqual({ type: HIDE_SEARCH });
      });
    });
  });

  describe('reducer', () => {
    it('should default to false', () => {
      expect(reducer(undefined, {})).toEqual(false);
    });

    it('should return true if the action type is SHOW_SEARCH', () => {
      expect(reducer(false, { type: SHOW_SEARCH })).toBe(true);
    });

    it('should return false if the action type is HIDE_SEARCH', () => {
      expect(reducer(false, { type: HIDE_SEARCH })).toBe(false);
    });
  });
});

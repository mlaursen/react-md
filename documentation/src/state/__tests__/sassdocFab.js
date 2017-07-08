/* eslint-env jest */
import reducer, {
  UPDATE_FINDER_VISIBILITY,
  updateFinderVisibility,
} from '../sassdocFab';

describe('sassdocFab', () => {
  describe('action creators', () => {
    describe('updateFinderVisibility', () => {
      it('should create the correct actions', () => {
        expect(updateFinderVisibility(true)).toEqual({ type: UPDATE_FINDER_VISIBILITY, payload: { visible: true } });
        expect(updateFinderVisibility(false)).toEqual({ type: UPDATE_FINDER_VISIBILITY, payload: { visible: false } });
      });
    });
  });

  describe('reducer', () => {
    it('should default to true', () => {
      expect(reducer(undefined, {})).toBe(true);
    });

    it('should correctly update after a UPDATE_FINDER_VISIBILITY action', () => {
      expect(reducer(true, updateFinderVisibility(false))).toBe(false);
      expect(reducer(false, updateFinderVisibility(true))).toBe(true);
    });
  });
});

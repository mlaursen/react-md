/* eslint-env jest */
import reducer, {
  INITIAL_STATE,
  UPDATE_MEDIA,
  updateMedia,
} from '../media';

describe('media', () => {
  describe('action creators', () => {
    describe('updateMedia', () => {
      it('should create the correct action', () => {
        const media = { mobile: false, tablet: false, desktop: true };
        const drawerType = 'FULL_HEIGHT';
        const expected = {
          type: UPDATE_MEDIA,
          payload: { drawerType, media },
        };

        expect(updateMedia(drawerType, media)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to the INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toBe(INITIAL_STATE);
    });

    it('should correctly update the state when the UPDATE_MEDIA type is dispatched', () => {
      const state = { mobile: true, tablet: false, desktop: false, defaultMedia: 'mobile' };
      const media = { mobile: false, tablet: false, desktop: true };
      const drawerType = 'FULL_HEIGHT';
      const action = {
        type: UPDATE_MEDIA,
        payload: { drawerType, media },
      };

      const expected = { mobile: false, tablet: false, desktop: true, defaultMedia: 'mobile' };
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});

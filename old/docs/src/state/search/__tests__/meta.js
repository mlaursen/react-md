/* eslint-env jest */
import reducer from '../meta';
import { SEARCH_SUCCESS } from '../';

describe('meta', () => {
  describe('reducer', () => {
    it('should default to an empty object', () => {
      expect(reducer(undefined, {})).toEqual({});
    });

    it('should update the meta state on search success', () => {
      const state = {};
      const meta = { start: 0, total: 5, next: null, previous: null };
      const action = {
        type: SEARCH_SUCCESS,
        payload: { meta },
      };
      expect(reducer(state, action)).toBe(meta);
    });

    it('should not update the meta state if it is shallow equal', () => {
      const state = { start: 0, total: 10, next: null, previous: null };
      const meta = { start: 0, total: 10, next: null, previous: null };
      const action = {
        type: SEARCH_SUCCESS,
        payload: { meta },
      };
      expect(reducer(state, action)).toBe(state);
    });
  });
});

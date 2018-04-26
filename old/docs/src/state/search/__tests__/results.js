/* eslint-env jest */
import reducer from '../results';
import { SEARCH_SUCCESS } from '../';

describe('results', () => {
  describe('reducer', () => {
    it('should default to an empty list', () => {
      expect(reducer(undefined, {})).toEqual([]);
    });

    it('should update the state on SEARCH_SUCCESS', () => {
      const meta = { start: 0, total: 1 };
      const data = [{
        name: 'hello',
        ref: 'https://react-md.mlaursen.com/api/search?q=hello&start=0',
        type: 'Variable',
      }];
      const action = {
        type: SEARCH_SUCCESS,
        payload: { meta, data },
      };
      expect(reducer([], action)).toBe(data);
    });

    it('should not update the state if it is equal', () => {
      let state = [];
      let action = {
        type: SEARCH_SUCCESS,
        payload: { data: [], meta: { start: 0 } },
      };
      expect(reducer(state, action)).toBe(state);

      state = [{ name: 'apple' }];
      action = {
        type: SEARCH_SUCCESS,
        payload: { data: [{ name: 'apple' }], meta: { start: 0 } },
      };
      expect(reducer(state, action)).toBe(state);
    });

    it('should perform a union if the start is greater than 0', () => {
      const state = [0, 1];
      const meta = { start: 2, total: 15 };
      const data = [2, 3];

      const action = {
        type: SEARCH_SUCCESS,
        payload: { meta, data },
      };
      expect(reducer(state, action)).toEqual([0, 1, 2, 3]);
    });
  });
});

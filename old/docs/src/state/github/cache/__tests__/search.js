/* eslint-env jest */
import reducer, {
  GITHUB_CLEAR_SEARCH_RESULTS,
  clearSearchResults,
} from '../search';
import { GITHUB_SUCCESS } from '../';

describe('search', () => {
  describe('action creators', () => {
    describe('clearSearchResults', () => {
      it('should create the correct action', () => {
        const expected = { type: GITHUB_CLEAR_SEARCH_RESULTS };
        expect(clearSearchResults()).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to an empty list', () => {
      expect(reducer(undefined, {})).toEqual([]);
    });

    it('should not update the state on a GITHUB_SUCCESS if the endpoint does not start with search', () => {
      const state = [];
      const action1 = {
        type: GITHUB_SUCCESS,
        payload: { data: {}, endpoint: '/bobby-flay' },
      };
      const action2 = {
        type: GITHUB_SUCCESS,
        payload: { data: {}, endpoint: '/bobby-flay/search' },
      };

      expect(reducer(state, action1)).toBe(state);
      expect(reducer(state, action2)).toBe(state);
    });

    it('should set the state to be the items from the search result', () => {
      const state = [];
      const action = {
        type: GITHUB_SUCCESS,
        payload: {
          data: {
            items: [{ login: 'mlaursen' }],
          },
          endpoint: '/search/users?q=mlaursen',
        },
      };

      expect(reducer(state, action)).toEqual(action.payload.data.items);
    });
  });
});

/* eslint-env jest */
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  searchRequest,
  searchSuccess,
} from '../';

describe('search', () => {
  describe('action creators', () => {
    describe('searchRequest', () => {
      it('should create the correct action', () => {
        let expected = {
          type: SEARCH_REQUEST,
          payload: { query: 'a', start: 0 },
        };
        expect(searchRequest('a')).toEqual(expected);

        expected = {
          type: SEARCH_REQUEST,
          payload: { query: 'hello', start: 15 },
        };
        expect(searchRequest('hello', 15)).toEqual(expected);
      });
    });

    describe('searchSuccess', () => {
      it('should create the correct action', () => {
        const meta = { start: 0, total: 10, next: null, previous: null };
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expected = {
          type: SEARCH_SUCCESS,
          payload: { meta, data },
        };
        expect(searchSuccess({ meta, data })).toEqual(expected);
      });
    });
  });
});

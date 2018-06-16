/* eslint-env jest */
import { GITHUB_SUCCESS } from '../';
import reducer from '../repos';

describe('repos', () => {
  describe('reducer', () => {
    it('should default to an empty object', () => {
      expect(reducer(undefined, {})).toEqual({});
    });

    it('should update the state when the endpoint matches `/users/:username/repos`', () => {
      const state = {};
      const expected = {
        mlaursen: {
          login: 'mlaursen',
        },
      };

      const action = {
        type: GITHUB_SUCCESS,
        payload: { data: expected.mlaursen, endpoint: '/users/mlaursen/repos' },
      };
      expect(reducer(state, action)).toEqual(expected);
    });
  });
});

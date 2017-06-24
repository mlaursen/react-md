/* eslint-env jest */
import 'isomorphic-fetch'; // Required for Headers
import {
  GITHUB_REQUEST,
  GITHUB_SUCCESS,
  GITHUB_FAILURE,
  githubRequest,
  githubSuccess,
  githubFailure,
} from '../';

describe('github', () => {
  describe('action creators', () => {
    describe('githubRequest', () => {
      it('should create the correct action', () => {
        const endpoint = '/users/mlaursen';
        const options = {};
        const expected1 = {
          type: GITHUB_REQUEST,
          payload: { endpoint, options: undefined },
        };
        const expected2 = {
          type: GITHUB_REQUEST,
          payload: { endpoint, options },
        };

        expect(githubRequest(endpoint)).toEqual(expected1);
        expect(githubRequest(endpoint, options)).toEqual(expected2);
      });
    });

    describe('githubSuccess', () => {
      it('should create the correct action', () => {
        const data = { items: [] };
        const headers = new Headers();
        const endpoint = '/users/mlaursen';
        const options = {};
        const expected = {
          type: GITHUB_SUCCESS,
          payload: { data, headers, endpoint, options },
        };
        expect(githubSuccess(data, headers, endpoint, options)).toEqual(expected);
      });
    });

    describe('githubFailure', () => {
      it('should create the correct action', () => {
        const error = new Error('Forbidden');
        error.response = { statusText: 'Forbidden', status: 400 };
        const endpoint = '/users/mlaursen';
        const options = {};
        const expected = {
          type: GITHUB_FAILURE,
          payload: { error, endpoint, options },
        };
        expect(githubFailure(error, endpoint, options)).toEqual(expected);
      });
    });
  });
});

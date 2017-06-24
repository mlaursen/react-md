/* eslint-env jest */
import 'isomorphic-fetch'; // required for the Headers
import { RATE_LIMIT, RATE_REMAINING, RATE_RESET } from 'constants/headerKeys';
import reducer, {
  INITIAL_STATE,
  GITHUB_RATE_LIMIT_REQUEST,
  GITHUB_RATE_LIMIT_SUCCESS,
  GITHUB_RATE_LIMIT_FAILURE,
  githubRateLimitRequest,
  githubRateLimitSuccess,
  githubRateLimitFailure,
} from '../rateLimits';
import { GITHUB_SUCCESS } from '../cache';

describe('rateLimits', () => {
  describe('action creators', () => {
    describe('githubRateLimitRequest', () => {
      it('should create the correct action', () => {
        const expected = { type: GITHUB_RATE_LIMIT_REQUEST };
        expect(githubRateLimitRequest()).toEqual(expected);
      });
    });

    describe('githubRateLimitSuccess', () => {
      it('should create the correct action', () => {
        const resources = {
          core: { limit: 60, remaining: 60, reset: Date.now() / 1000 },
          search: { limit: 10, remaining: 10, reset: Date.now() / 1000 },
        };
        const expected = {
          type: GITHUB_RATE_LIMIT_SUCCESS,
          payload: { resources },
        };
        expect(githubRateLimitSuccess({ resources })).toEqual(expected);
      });
    });

    describe('githubRateLimitFailure', () => {
      it('should create the correct action', () => {
        const error = new Error('Forbidden');
        error.response = { status: 403, statusText: 'Forbidden' };
        const headers = {};
        const endpoint = '/rate_limit';
        const config = {};
        const expected = {
          type: GITHUB_RATE_LIMIT_FAILURE,
          payload: { error, headers, endpoint, config },
        };
        expect(githubRateLimitFailure(error, headers, endpoint, config)).toEqual(expected);
      });
    });

    describe('reducer', () => {
      it('should defailt to the INITIAL_STATE', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
      });

      it('should set the rate limits after a GITHUB_RATE_LIMIT_SUCCESS action', () => {
        // Reset is a UTC time
        const reset = Math.floor(Date.now() / 1000);
        const resources = {
          core: { limit: 60, remaining: 20, reset },
          search: { limit: 10, remaining: 2, reset },
        };
        expect(reducer(INITIAL_STATE, githubRateLimitSuccess({ resources }))).toEqual(resources);
      });

      it('should update the rate limiting after a GITHUB_SUCCESS action', () => {
        const nowUTC = Math.floor(Date.now() / 1000);
        const coreHeaders = new Headers({
          [RATE_LIMIT]: 60,
          [RATE_REMAINING]: 43,
          [RATE_RESET]: nowUTC + 50000, // 50 seconds in future
        });
        const searchHeaders = new Headers({
          [RATE_LIMIT]: 10,
          [RATE_REMAINING]: 1,
          [RATE_RESET]: nowUTC + 1000, // 1 second in future
        });

        const state = {
          core: { limit: 60, remaining: 44, reset: nowUTC + 51000 },
          search: { limit: 10, remaining: 2, reset: nowUTC + 2000 },
        };

        const action1 = {
          type: GITHUB_SUCCESS,
          payload: { endpoint: '/users', headers: coreHeaders },
        };
        const action2 = {
          type: GITHUB_SUCCESS,
          payload: { endpoint: '/search/users?q=hello', headers: searchHeaders },
        };

        const expected1 = {
          core: {
            limit: 60,
            remaining: 43,
            reset: nowUTC + 50000,
          },
          search: state.search,
        };
        const expected2 = {
          ...expected1,
          search: {
            limit: 10,
            remaining: 1,
            reset: nowUTC + 1000,
          },
        };

        expect(reducer(state, action1)).toEqual(expected1);
        expect(reducer(expected1, action2)).toEqual(expected2);
      });
    });
  });
});

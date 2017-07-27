/* eslint-env jest */
/* eslint-disable max-len */
import 'isomorphic-fetch'; // Required for Headers
import SagaTester from 'redux-saga-tester';
import { NOT_FOUND, FORBIDDEN } from 'constants/responseCodes';
import { RATE_LIMIT, RATE_REMAINING, RATE_RESET } from 'constants/headerKeys';
import {
  githubRequest,
  githubSuccess,
  githubFailure,
  githubRateLimitRequest,
  githubRateLimitSuccess,
  githubRateLimitFailure,
} from 'state/github';
import { fetchGithub } from 'utils/api';

import {
  RATE_LIMIT as RATE_LIMIT_ENDPOINT,
  watchGithubRequests,
  watchGithubRateLimitRequests,
} from '../github';

jest.mock('utils/api');

const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

function getReset() {
  return Math.floor(Date.now() / 1000);
}

describe('watchGithubRequests', () => {
  let sagaTester;
  beforeEach(() => {
    sagaTester = new SagaTester({ initialState: {} });
  });

  afterEach(() => {
    fetchGithub.mockClear();
  });

  it('should correctly call the corresponding actions on a github request', async () => {
    const data = { items: [] };
    const headers = new Headers();
    const options = {};
    const endpoint = '/users/mlaursen';
    const jsonMock = jest.fn(() => new Promise((resolve) => {
      resolve(data);
    }));
    fetchGithub.mockImplementation(() => ({ headers, json: jsonMock, ok: true }));

    sagaTester.start(watchGithubRequests);
    sagaTester.dispatch(githubRequest(endpoint, options));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchGithub).toBeCalledWith(endpoint, options);
    expect(jsonMock).toBeCalled();

    const expected = [
      githubSuccess(data, headers, endpoint, options),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expect.arrayContaining(expected));
  });

  it('should correctly call the corresponding actions when a FORBIDDEN response is returned', async () => {
    const data = {
      message: 'You have triggered an abuse detection mechanism and have been temporarily blocked from content creation. Please retry your request again later.',
      documentation_url: 'https://developer.github.com/v3#abuse-rate-limits',
    };
    const headers = new Headers({
      [RATE_LIMIT]: 10,
      [RATE_REMAINING]: 0,
      [RATE_RESET]: Math.floor(Date.now() / 1000) + 50000,
    });
    const options = {};
    const endpoint = '/users/mlaursen';
    const jsonMock = jest.fn(() => new Promise((resolve) => {
      resolve(data);
    }));
    fetchGithub.mockImplementation(() => ({
      headers,
      json: jsonMock,
      ok: false,
      status: FORBIDDEN,
    }));

    sagaTester.start(watchGithubRequests);
    sagaTester.dispatch(githubRequest(endpoint, options));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    const expected = [
      githubRateLimitFailure(data, headers, endpoint, options),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expect.arrayContaining(expected));
  });

  it('should correctly call the corresponding actions when any other failure happens', async () => {
    const headers = new Headers();
    const options = {};
    const endpoint = '/users/mlaursen';
    const jsonMock = jest.fn();
    const response = {
      headers,
      json: jsonMock,
      ok: false,
      status: NOT_FOUND,
      statusText: 'Not found',
    };
    fetchGithub.mockImplementation(() => response);

    sagaTester.start(watchGithubRequests);
    sagaTester.dispatch(githubRequest(endpoint, options));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(jsonMock).not.toBeCalled();

    const error = new Error(response.statusText);
    error.response = response;
    const expected = [
      githubFailure(error, endpoint, options),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expect.arrayContaining(expected));
  });
});

describe('watchGithubRateLimitRequests', () => {
  function createLimit(limit, remaining, reset) {
    return { limit, remaining, reset };
  }

  function createState(coreRemaining = -1, searchRemaining = -1) {
    return {
      github: {
        rateLimits: {
          core: createLimit(60, coreRemaining, getReset() + 50000),
          search: createLimit(10, searchRemaining, getReset() + 1000),
        },
      },
    };
  }

  let sagaTester;
  beforeEach(() => {
    sagaTester = new SagaTester({ initialState: createState() });
  });

  afterEach(() => {
    fetchGithub.mockClear();
  });

  it('should correctly call the corresponding action when a GITHUB_RATE_LIMIT_REQUEST is dispatched', async () => {
    const data = {
      core: createLimit(60, 59, getReset() + 1000),
      search: createLimit(10, 8, getReset() + 100),
    };
    const jsonMock = jest.fn(() => new Promise((resolve) => {
      resolve(data);
    }));
    fetchGithub.mockImplementation(() => ({ json: jsonMock, ok: true }));

    sagaTester.start(watchGithubRateLimitRequests);
    sagaTester.dispatch(githubRateLimitRequest());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchGithub).toBeCalledWith(RATE_LIMIT_ENDPOINT);
    expect(jsonMock).toBeCalled();
    const expected = [
      githubRateLimitSuccess(data),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expect.arrayContaining(expected));
  });

  it('should correctly call the githubFailure on error', async () => {
    const headers = new Headers();
    const jsonMock = jest.fn();
    const response = {
      headers,
      json: jsonMock,
      ok: false,
      status: NOT_FOUND,
      statusText: 'Not found',
    };
    fetchGithub.mockImplementation(() => response);

    sagaTester.start(watchGithubRateLimitRequests);
    sagaTester.dispatch(githubRateLimitRequest());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(jsonMock).not.toBeCalled();

    const error = new Error(response.statusText);
    error.response = response;
    const expected = [
      githubFailure(error, RATE_LIMIT_ENDPOINT),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expect.arrayContaining(expected));
  });

  it('should not call the fetchGithub api if the remaining for core and search are not -1', async () => {
    sagaTester = new SagaTester({ initialState: createState(40, 8) });
    sagaTester.start(watchGithubRateLimitRequests);
    sagaTester.dispatch(githubRateLimitRequest());
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchGithub).not.toBeCalled();
  });
});

/* eslint-env jest */
import SagaTester from 'redux-saga-tester';
import { searchRequest, searchNextRequest, searchSuccess } from 'state/search';
import { search } from 'utils/api';

import watchSeaches from '../search';

jest.mock('utils/api');

const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

describe('watchSearches', () => {
  afterEach(() => {
    search.mockClear();
  });

  it('should correctly call the correct actions', async () => {
    const results = {
      meta: { next: null, previous: null, total: 0, start: 0 },
      data: [],
    };

    search.mockImplementation(() => results);
    const sagaTester = new SagaTester({ initialState: {} });
    sagaTester.start(watchSeaches);
    sagaTester.dispatch(searchRequest('hello'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(search).toBeCalledWith({ query: 'hello', start: 0 });

    const expected = [
      searchRequest('hello'),
      searchSuccess(results),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should correctly call the search api if there is only an href', async () => {
    const href = '/api/search?q=auto&start=10';
    const results = {
      meta: { next: null, previous: href, total: 11, start: 10 },
      data: [{ name: 'Autocomplete', ref: '/components/autocompletes', type: 'Example' }],
    };

    search.mockImplementation(() => results);
    const sagaTester = new SagaTester({ initialState: {} });
    sagaTester.start(watchSeaches);
    sagaTester.dispatch(searchNextRequest(href));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(search).toBeCalledWith({ href });

    const expected = [
      searchNextRequest(href),
      searchSuccess(results),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should not call the search api if there is no query or no href', async () => {
    const sagaTester = new SagaTester({ initialState: {} });
    sagaTester.start(watchSeaches);
    sagaTester.dispatch(searchRequest(''));
    sagaTester.dispatch(searchRequest(null));
    sagaTester.dispatch(searchNextRequest(''));
    sagaTester.dispatch(searchNextRequest(null));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(search).not.toBeCalled();

    const expected = [
      searchRequest(''),
      searchRequest(null),
      searchNextRequest(''),
      searchNextRequest(null),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });
});

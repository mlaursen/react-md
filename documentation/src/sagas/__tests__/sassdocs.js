/* eslint-env jest */
import SagaTester from 'redux-saga-tester';
import { sassdocSuccess, sassdocRequest } from 'state/sassdocs';
import { fetchSassdoc } from 'utils/api';
import watchSassdocRequests from '../sassdocs';

jest.mock('utils/api');

const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

describe('watchSassdocRequests', () => {
  afterEach(() => {
    fetchSassdoc.mockClear();
  });

  it('should correctly call the corresponding actions when there is no data in the store', async () => {
    const sagaTester = new SagaTester({ initialState: { sassdocs: {} } });
    const data = { name: 'autocompletes' };
    fetchSassdoc.mockImplementation(() => data);
    sagaTester.start(watchSassdocRequests);
    sagaTester.dispatch(sassdocRequest('autocompletes'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchSassdoc).toBeCalledWith('autocompletes');
    const expected = [
      sassdocRequest('autocompletes'),
      sassdocSuccess(['autocompletes'], data),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should not call the fetchSassdoc and sassdocSuccess actions if there is data in the store', async () => {
    const sagaTester = new SagaTester({
      initialState: {
        sassdocs: { autocompletes: { name: 'autocompletes' } },
      },
    });

    sagaTester.start(watchSassdocRequests);
    sagaTester.dispatch(sassdocRequest('autocompletes'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchSassdoc).not.toBeCalled();
    const expected = [
      sassdocRequest('autocompletes'),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should correctly handle sassdocs that have a section', async () => {
    const sagaTester = new SagaTester({ initialState: { sassdocs: {} } });
    const data = { name: 'selection-controls' };
    fetchSassdoc.mockImplementation(() => data);
    sagaTester.start(watchSassdocRequests);
    sagaTester.dispatch(sassdocRequest('selection-control', 'selection-controls'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchSassdoc).toBeCalledWith('selection-controls');
    const expected = [
      sassdocRequest('selection-control', 'selection-controls'),
      sassdocSuccess(['selection-controls'], data),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should correctly handle sassdocs that have a section', async () => {
    const sagaTester = new SagaTester({
      initialState: {
        sassdocs: {
          'selection-controls': { name: 'selection-controls' },
        },
      },
    });
    sagaTester.start(watchSassdocRequests);
    sagaTester.dispatch(sassdocRequest('selection-control', 'selection-controls'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchSassdoc).not.toBeCalled();
    const expected = [
      sassdocRequest('selection-control', 'selection-controls'),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });
});

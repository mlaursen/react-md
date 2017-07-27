/* eslint-env jest */
import SagaTester from 'redux-saga-tester';
import { docgenSuccess, docgenRequest } from 'state/docgens';
import { fetchDocgen } from 'utils/api';
import watchDocgenRequests from '../docgens';

jest.mock('utils/api');

const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

const SELECTION_CONTROLS = [
  { component: 'SelectionControl' },
  { component: 'SelectionControlGroup' },
];

describe('watchDocgenRequests', () => {
  afterEach(() => {
    fetchDocgen.mockClear();
  });

  it('should correctly call the corresponding actions when there is no data in the store', async () => {
    const sagaTester = new SagaTester({ initialState: { docgens: {} } });
    const data = [{ component: 'Autocomplete' }];
    fetchDocgen.mockImplementation(() => data);
    sagaTester.start(watchDocgenRequests);
    sagaTester.dispatch(docgenRequest('autocompletes'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchDocgen).toBeCalledWith('autocompletes');
    const expected = [
      docgenRequest('autocompletes'),
      docgenSuccess(['autocompletes'], data),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should not call the fetchDocgen and docgenSuccess actions if there is data in the store', async () => {
    const sagaTester = new SagaTester({
      initialState: {
        docgens: { autocompletes: [{ component: 'Autocomplete' }] },
      },
    });

    sagaTester.start(watchDocgenRequests);
    sagaTester.dispatch(docgenRequest('autocompletes'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchDocgen).not.toBeCalled();
    const expected = [
      docgenRequest('autocompletes'),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should correctly handle docgens that have a section', async () => {
    const sagaTester = new SagaTester({ initialState: { docgens: {} } });
    const data = SELECTION_CONTROLS;
    fetchDocgen.mockImplementation(() => data);
    sagaTester.start(watchDocgenRequests);
    sagaTester.dispatch(docgenRequest('selection-control', 'selection-controls'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchDocgen).toBeCalledWith('selection-controls/selection-control');
    const expected = [
      docgenRequest('selection-control', 'selection-controls'),
      docgenSuccess(['selection-controls', 'selection-control'], data),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });

  it('should correctly handle docgens that have a section', async () => {
    const sagaTester = new SagaTester({
      initialState: {
        docgens: {
          'selection-controls': {
            'selection-control': SELECTION_CONTROLS,
          },
        },
      },
    });
    sagaTester.start(watchDocgenRequests);
    sagaTester.dispatch(docgenRequest('selection-control', 'selection-controls'));
    sagaTester.dispatch(done());

    await sagaTester.waitFor(DONE);
    expect(fetchDocgen).not.toBeCalled();
    const expected = [
      docgenRequest('selection-control', 'selection-controls'),
      done(),
    ];
    expect(sagaTester.getCalledActions()).toEqual(expected);
  });
});

/* eslint-env jest */
import SagaTester from 'redux-saga-tester';
import {
  airQualityColumnsRequest,
  airQualityColumnsSuccess,
  airQualityDataRequest,
  airQualityDataRequestNext,
  airQualityDataSuccess,
} from 'state/airQuality';
import { fetchAirQualityColumns, fetchAirQualityData } from 'utils/api';

import { watchColumnsRequests, watchDataRequests } from '../airQuality';

jest.mock('utils/api');

const DONE = 'DONE_TESTING';
function done() {
  return { type: DONE };
}

describe('watchAirQualityRequests', () => {
  describe('watchColumnsRequests', () => {
    afterEach(() => {
      fetchAirQualityColumns.mockClear();
    });

    it('should call the correct actions when there is no data in the store', async () => {
      const data = [{ id: 0, name: 'Column' }];
      fetchAirQualityColumns.mockImplementation(() => data);
      const sagaTester = new SagaTester({ initialState: { airQuality: { columns: [] } } });

      sagaTester.start(watchColumnsRequests);
      sagaTester.dispatch(airQualityColumnsRequest());
      sagaTester.dispatch(done());
      await sagaTester.waitFor(DONE);
      expect(fetchAirQualityColumns).toBeCalled();

      const expected = [
        airQualityColumnsRequest(),
        airQualityColumnsSuccess(data),
        done(),
      ];
      expect(sagaTester.getCalledActions()).toEqual(expected);
    });

    it('should not fetch the columns if the data exists in the store', async () => {
      const columns = [{ id: 0, name: 'Column' }];
      const sagaTester = new SagaTester({ initialState: { airQuality: { columns } } });
      sagaTester.start(watchColumnsRequests);
      sagaTester.dispatch(airQualityColumnsRequest());
      sagaTester.dispatch(done());
      await sagaTester.waitFor(DONE);

      expect(fetchAirQualityColumns).not.toBeCalled();

      const expected = [
        airQualityColumnsRequest(),
        done(),
      ];
      expect(sagaTester.getCalledActions()).toEqual(expected);
    });
  });

  describe('watchDataRequests', () => {
    afterEach(() => {
      fetchAirQualityData.mockClear();
    });

    it('should call the correct actions when there is no data in the store', async () => {
      const data = [{ index: 0 }];
      fetchAirQualityData.mockImplementation(() => ({ data }));
      const sagaTester = new SagaTester({ initialState: { airQuality: { data: [] } } });

      sagaTester.start(watchDataRequests);
      sagaTester.dispatch(airQualityDataRequest(0, 10, ''));
      sagaTester.dispatch(done());

      await sagaTester.waitFor(DONE);
      expect(fetchAirQualityData).toBeCalledWith({ href: undefined, start: 0, limit: 10 });

      const expected = [
        airQualityDataRequest(0, 10, ''),
        airQualityDataSuccess({ data }),
        done(),
      ];
      expect(sagaTester.getCalledActions()).toEqual(expected);
    });

    it('should call the correct actions when all the indexes exist in the store', async () => {
      const data = [{ 0: { index: 0 } }];
      const sagaTester = new SagaTester({ initialState: { airQuality: { data } } });
      sagaTester.start(watchDataRequests);
      sagaTester.dispatch(airQualityDataRequest(0, 1, ''));
      sagaTester.dispatch(done());

      await sagaTester.waitFor(DONE);
      expect(fetchAirQualityData).not.toBeCalled();

      const expected = [
        airQualityDataRequest(0, 1, ''),
        done(),
      ];
      expect(sagaTester.getCalledActions()).toEqual(expected);
    });

    it('should still call the airQualityDataSuccess action if some of the keys exist, but not all', async () => {
      const data = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }];
      fetchAirQualityData.mockImplementation(() => ({ data }));
      const sagaTester = new SagaTester({
        initialState: {
          airQuality: {
            data: [{ index: 0 }, { index: 1 }],
          },
        },
      });

      sagaTester.start(watchDataRequests);
      sagaTester.dispatch(airQualityDataRequest(0, 10, ''));
      sagaTester.dispatch(done());

      await sagaTester.waitFor(DONE);
      expect(fetchAirQualityData).toBeCalledWith({ href: undefined, start: 0, limit: 10 });

      const expected = [
        airQualityDataRequest(0, 10, ''),
        airQualityDataSuccess({ data }),
        done(),
      ];
      expect(sagaTester.getCalledActions()).toEqual(expected);
    });
  });
});

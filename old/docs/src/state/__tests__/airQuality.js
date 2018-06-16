/* eslint-disable quote-props */
/* eslint-env jest */
import {
  AIR_QUALITY_COLUMNS_REQUEST,
  AIR_QUALITY_COLUMNS_SUCCESS,
  AIR_QUALITY_DATA_REQUEST,
  AIR_QUALITY_DATA_REQUEST_NEXT,
  AIR_QUALITY_DATA_SUCCESS,
  airQualityColumnsRequest,
  airQualityColumnsSuccess,
  airQualityDataRequest,
  airQualityDataRequestNext,
  airQualityDataSuccess,
  columns as columnsReducer,
  meta as metaReducer,
  data as dataReducer,
} from '../airQuality';

describe('airQuality', () => {
  describe('action creators', () => {
    describe('airQualityColumnsRequest', () => {
      it('should create the correct action', () => {
        expect(airQualityColumnsRequest()).toEqual({ type: AIR_QUALITY_COLUMNS_REQUEST });
      });
    });

    describe('airQualityColumnsSuccess', () => {
      it('should create the correct action', () => {
        const data = [{ id: 34924, name: 'Example', description: 'Example description', numeric: false }];
        expect(airQualityColumnsSuccess(data)).toEqual({ type: AIR_QUALITY_COLUMNS_SUCCESS, payload: { data } });
      });
    });

    describe('airQualityDataRequest', () => {
      it('should create the correct action', () => {
        expect(airQualityDataRequest()).toEqual({ type: AIR_QUALITY_DATA_REQUEST, payload: { start: 0, limit: 10 } });
      });
    });

    describe('airQualityDataRequestNext', () => {
      it('should create the correct action', () => {
        const href = 'http://localhost:8080/api/air-quality/data?start=10&limit=10';
        expect(airQualityDataRequestNext(href)).toEqual({ type: AIR_QUALITY_DATA_REQUEST_NEXT, payload: { href } });
      });
    });

    describe('airQualityDataSuccess', () => {
      it('should create the correct action', () => {
        const meta = { start: 0, limit: 10, total: 1, next: null, previous: null };
        const data = [{
          measureId: 83,
          measureName: 'Number of days with maximum 8-hour average ozone concentration over the National Ambient Air Quality Standard',
          measureType: 'Counts',
          stratificationLevel: 'State x County',
          stateFips: '6',
          stateName: 'California',
          countyFips: '6009',
          countyName: 'Calaveras',
          reportYear: '2002',
          value: 41,
          unit: 'No Units',
          unitName: 'No Units',
          dataOrigin: 'Monitor Only',
          monitorOnly: 1,
        }];

        expect(airQualityDataSuccess({ meta, data })).toEqual({ type: AIR_QUALITY_DATA_SUCCESS, payload: { meta, data } });
      });
    });
  });

  describe('reducers', () => {
    describe('columns', () => {
      it('should default to the empty list', () => {
        expect(columnsReducer(undefined, {})).toEqual([]);
      });

      it('should correctly replace the state on a columns success action', () => {
        const state = [];
        const data = [{ name: 'some column data' }];
        expect(columnsReducer(state, airQualityColumnsSuccess(data))).toEqual(data);
      });
    });

    describe('meta', () => {
      it('should default to the initial state', () => {
        const expected = {
          start: 0,
          limit: 10,
          total: 0,
          next: null,
          previous: null,
        };
        expect(metaReducer(undefined, {})).toEqual(expected);
      });

      it('should correctly replace the state on a data success section', () => {
        const meta = {
          start: 0,
          limit: 10,
          total: 20,
          next: 'jlkdajfklads',
          previous: null,
        };

        const action = {
          type: AIR_QUALITY_DATA_SUCCESS,
          payload: { meta },
        };
        expect(metaReducer(undefined, action)).toEqual(meta);
      });
    });

    describe('data', () => {
      it('should default to an empty object', () => {
        expect(dataReducer(undefined, {})).toEqual({});
      });

      it('should correctly insert the state from the server when there is no existing state', () => {
        const data = [{ id: 3420932 }];
        const action1 = {
          type: AIR_QUALITY_DATA_SUCCESS,
          payload: { meta: { start: 0 }, data },
        };
        const action2 = {
          type: AIR_QUALITY_DATA_SUCCESS,
          payload: { meta: { start: 10 }, data },
        };

        const expected1 = { '0': data[0] };
        const expected2 = { '10': data[0] };
        expect(dataReducer({}, action1)).toEqual(expected1);
        expect(dataReducer({}, action2)).toEqual(expected2);
      });

      it('should correctly merge the state from the server when there is an existing state', () => {
        const data = [{ id: 34242 }, { id: 0 }];
        const action1 = {
          type: AIR_QUALITY_DATA_SUCCESS,
          payload: { meta: { start: 2 }, data },
        };
        const action2 = {
          type: AIR_QUALITY_DATA_SUCCESS,
          payload: { meta: { start: 10 }, data },
        };

        const state = { '0': { id: 1 }, '1': { id: 32 } };
        const expected1 = { '0': { id: 1 }, '1': { id: 32 }, '2': data[0], '3': data[1] };
        const expected2 = { '0': { id: 1 }, '1': { id: 32 }, '10': data[0], '11': data[1] };
        expect(dataReducer(state, action1)).toEqual(expected1);
        expect(dataReducer(state, action2)).toEqual(expected2);
      });
    });
  });
});

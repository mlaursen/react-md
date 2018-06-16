/* eslint-env jest */
import reducer, {
  SASSDOC_REQUEST,
  SASSDOC_SUCCESS,
  SASSDOC_FAILURE,
  sassdocRequest,
  sassdocSuccess,
  sassdocFailure,
} from '../sassdocs';

describe('sassdocs', () => {
  describe('action creators', () => {
    describe('sassdocRequest', () => {
      it('should create the correct action', () => {
        expect(sassdocRequest('autocompletes')).toEqual({
          type: SASSDOC_REQUEST,
          payload: { ids: ['autocompletes'] },
        });

        expect(sassdocRequest('layovers', 'helpers')).toEqual({
          type: SASSDOC_REQUEST,
          payload: { ids: ['helpers', 'layovers'] },
        });
      });

      it('should not add the component to the ids if the section matches progress, or pickers', () => {
        expect(sassdocRequest('date', 'pickers')).toEqual({
          type: SASSDOC_REQUEST,
          payload: { ids: ['pickers'] },
        });

        expect(sassdocRequest('linear', 'progress')).toEqual({
          type: SASSDOC_REQUEST,
          payload: { ids: ['progress'] },
        });
      });
    });

    describe('sassdocSuccess', () => {
      it('should create the correct action', () => {
        const ids = ['helpers', 'layovers'];
        const data = [{ component: 'Layover' }];
        const expected = {
          type: SASSDOC_SUCCESS,
          payload: { ids, data },
        };

        expect(sassdocSuccess(ids, data)).toEqual(expected);
      });
    });

    describe('sassdocFailure', () => {
      it('should create the correct action', () => {
        const ids = ['helpers', 'bobby-flat'];
        const error = new Error('Not Found');
        const expected = {
          type: SASSDOC_FAILURE,
          payload: { ids, error },
        };

        expect(sassdocFailure(ids, error)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to an empty object state', () => {
      expect(reducer(undefined, {})).toEqual({});
    });

    it('should correctly update the state when there is no section provided', () => {
      const ids = ['autocompletes'];
      const data = [{ component: 'Autocomplete' }];
      const expected = { autocompletes: data };
      expect(reducer({}, sassdocSuccess(ids, data))).toEqual(expected);
    });

    it('should correctly update the state when there is a section provided', () => {
      const ids = ['helpers', 'layovers'];
      const data = [{ component: 'Layover' }];
      const expected = { helpers: { layovers: data } };
      expect(reducer({}, sassdocSuccess(ids, data))).toEqual(expected);
    });

    it('should correctly update when there is existing state', () => {
      const state = {
        helpers: { layovers: [{ component: 'Layover' }] },
      };

      const ids1 = ['autocompletes'];
      const data1 = [{ component: 'Autocomplete' }];
      const expected1 = {
        ...state,
        autocompletes: data1,
      };
      expect(reducer(state, sassdocSuccess(ids1, data1))).toEqual(expected1);

      const ids2 = ['helpers', 'collapse'];
      const data2 = [{ component: 'Collapse' }];
      const expected2 = {
        ...state,
        helpers: {
          ...state.helpers,
          collapse: data2,
        },
      };
      expect(reducer(state, sassdocSuccess(ids2, data2))).toEqual(expected2);
    });
  });
});

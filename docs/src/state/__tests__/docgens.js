/* eslint-env jest */
import reducer, {
  DOCGEN_REQUEST,
  DOCGEN_SUCCESS,
  DOCGEN_FAILURE,
  docgenRequest,
  docgenSuccess,
  docgenFailure,
} from '../docgens';

describe('docgens', () => {
  describe('action creators', () => {
    describe('docgenRequest', () => {
      it('should create the correct action', () => {
        expect(docgenRequest('autocompletes')).toEqual({
          type: DOCGEN_REQUEST,
          payload: { ids: ['autocompletes'] },
        });

        expect(docgenRequest('layovers', 'helpers')).toEqual({
          type: DOCGEN_REQUEST,
          payload: { ids: ['helpers', 'layovers'] },
        });
      });
    });

    describe('docgenSuccess', () => {
      it('should create the correct action', () => {
        const ids = ['helpers', 'layovers'];
        const data = [{ component: 'Layover' }];
        const expected = {
          type: DOCGEN_SUCCESS,
          payload: { ids, data },
        };

        expect(docgenSuccess(ids, data)).toEqual(expected);
      });
    });

    describe('docgenFailure', () => {
      it('should create the correct action', () => {
        const ids = ['helpers', 'bobby-flat'];
        const error = new Error('Not Found');
        const expected = {
          type: DOCGEN_FAILURE,
          payload: { ids, error },
        };

        expect(docgenFailure(ids, error)).toEqual(expected);
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
      expect(reducer({}, docgenSuccess(ids, data))).toEqual(expected);
    });

    it('should correctly update the state when there is a section provided', () => {
      const ids = ['helpers', 'layovers'];
      const data = [{ component: 'Layover' }];
      const expected = { helpers: { layovers: data } };
      expect(reducer({}, docgenSuccess(ids, data))).toEqual(expected);
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
      expect(reducer(state, docgenSuccess(ids1, data1))).toEqual(expected1);

      const ids2 = ['helpers', 'collapse'];
      const data2 = [{ component: 'Collapse' }];
      const expected2 = {
        ...state,
        helpers: {
          ...state.helpers,
          collapse: data2,
        },
      };
      expect(reducer(state, docgenSuccess(ids2, data2))).toEqual(expected2);
    });
  });
});

/* eslint-env jest */
import reducer, {
  LOCATION_CHANGE,
  NOT_FOUND,
  updateLocation,
  pageNotFound,
} from '../routing';

const location = {
  href: 'http://react-md.mlaursen.com',
  search: '',
};

describe('routing', () => {
  describe('action creators', () => {
    describe('updateLocation', () => {
      it('should create the correct action', () => {
        const expected = {
          type: LOCATION_CHANGE,
          payload: { location },
        };
        expect(updateLocation(location)).toEqual(expected);
      });
    });

    describe('pageNotFound', () => {
      it('should create the correct action', () => {
        const expected = { type: NOT_FOUND };
        expect(pageNotFound()).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to an empty object', () => {
      expect(reducer(undefined, {})).toEqual({});
    });

    it('should set the state to the location from the LOCATION_CHANGE action', () => {
      expect(reducer({}, updateLocation(location))).toBe(location);
    });

    it('should not update the state when any other action type is called', () => {
      expect(reducer(location, { type: 'LOCATION_CHANGE_2' })).toBe(location);
    });
  });
});

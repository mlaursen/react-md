/* eslint-env jest */
import { LOCATION_CHANGE, NOT_FOUND } from 'state/routing';
import reducer, { DEFAULT_STATE, handleLocationChange } from '../quickNav';

const ROUTES = [
  { label: 'Something', to: '/something' },
  { label: 'Something Else', to: '/something-else' },
  { label: 'Something Third', to: '/something-third' },
];

const STATE = {
  previousTo: '/something',
  previousName: 'Something',
  nextTo: null,
  nextName: null,
};

describe('quickNav', () => {
  describe('handleLocationChange', () => {
    it('should return the default state if the pathname is "/"', () => {
      expect(handleLocationChange(undefined, '/', ROUTES)).toBe(DEFAULT_STATE);
    });

    it('should reeturn the default state if the path can not be found', () => {
      expect(handleLocationChange(STATE, '/woop', ROUTES)).toBe(DEFAULT_STATE);
    });

    it('should return all the previous and next nav state', () => {
      const expected = {
        previousTo: '/something',
        previousName: 'Something',
        nextTo: '/something-third',
        nextName: 'Something Third',
      };
      expect(handleLocationChange(undefined, '/something-else', ROUTES)).toEqual(expected);
    });

    it('should not return the previous nav state if it is the last route', () => {
      const expected = {
        previousTo: null,
        previousName: null,
        nextTo: '/something-else',
        nextName: 'Something Else',
      };
      expect(handleLocationChange(undefined, '/something', ROUTES)).toEqual(expected);
    });

    it('should not return the next nav state if it is the last route', () => {
      const expected = {
        previousTo: '/something-else',
        previousName: 'Something Else',
        nextTo: null,
        nextName: null,
      };
      expect(handleLocationChange(undefined, '/something-third', ROUTES)).toEqual(expected);
    });
  });

  describe('reducer', () => {
    it('should return the DEFAULT_STATE when the NOT_FOUND action type is triggered', () => {
      expect(reducer(STATE, { type: NOT_FOUND })).toBe(DEFAULT_STATE);
    });

    it('should call the handleLocationChange function when the LOCATION_CHANGE action type is triggered', () => {
      const action = {
        type: LOCATION_CHANGE,
        payload: {
          location: {
            pathname: '/',
          },
        },
      };
      expect(reducer(STATE, action)).toBe(DEFAULT_STATE);
    });
  });
});

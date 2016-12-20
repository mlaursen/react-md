/* eslint-env jest */
jest.unmock('../calculateValueDistance');

import calculateValueDistance from '../calculateValueDistance';

describe('calculateValueDistance', () => {
  it('returns a value and distance', () => {
    const { value, distance } = calculateValueDistance(0, 100, 0, 100, 1, 0, 100, true);
    expect(value).toBe(0);
    expect(distance).toBe(0);
  });

  it('can calculate the distance when the step is a number greater than 0 and less than 1', () => {
    expect(calculateValueDistance(25, 100, 0, 100, 0.1, 0, 100, true)).toEqual({ value: 2.5, distance: 25 });
    expect(calculateValueDistance(10, 100, 0, 100, 0.1, 0, 100, false)).toEqual({ value: 1, distance: 10 });
  });

  it('prevents negative distance', () => {
    expect(calculateValueDistance(25, 100, 100, 100, 1, 0, 100, true)).toEqual({ value: 0, distance: 0 });
  });

  it('prevents a distance greater than 100', () => {
    expect(calculateValueDistance(125, 100, 0, 100, 1, 0, 100, true)).toEqual({ value: 100, distance: 100 });
  });

  it('prevents a value less than the min', () => {
    expect(calculateValueDistance(25, 100, 100, 75, 1, 25, 100, true)).toEqual({ value: 25, distance: 0 });
  });

  it('prevents a value greater than the max', () => {
    expect(calculateValueDistance(125, 100, 0, 100, 1, 0, 100, true)).toEqual({ value: 100, distance: 100 });
  });
});

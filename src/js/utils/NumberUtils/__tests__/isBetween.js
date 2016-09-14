/* eslint-env jest */
jest.unmock('../isBetween');

import isBetween from '../isBetween';

describe('isBetween', () => {
  it('returns true if a number is between the min and max values', () => {
    expect(isBetween(1, 0, 2)).toBe(true);
    expect(isBetween(-1, -2, 0)).toBe(true);
    expect(isBetween(-50, -100, 0)).toBe(true);
    expect(isBetween(50, 0, 100)).toBe(true);
  });

  it('returns true if the number is equal to the min or max values', () => {
    expect(isBetween(0, 0, 100)).toBe(true);
    expect(isBetween(0, -100, 0)).toBe(true);
    expect(isBetween(-100, -100, 100)).toBe(true);
    expect(isBetween(100, 0, 100)).toBe(true);
    expect(isBetween(5, 3, 5)).toBe(true);
  });

  it('returns false if a number is not between the min and max values', () => {
    expect(isBetween(0, 1, 100)).toBe(false);
    expect(isBetween(-101, -100, 100)).toBe(false);
    expect(isBetween(100, 1, 99)).toBe(false);
  });
});

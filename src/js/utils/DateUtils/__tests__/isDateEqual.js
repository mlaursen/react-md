/* eslint-env jest */
jest.unmock('../isDateEqual');

import isDateEqual from '../isDateEqual';

describe('isDateEqual', () => {
  it('allows nulls', () => {
    expect(isDateEqual(null, new Date())).toBe(false);
    expect(isDateEqual(new Date(), null)).toBe(false);
    expect(isDateEqual(null, null)).toBe(true);
  });

  it('allows undefined', () => {
    expect(isDateEqual(undefined, new Date())).toBe(false);
    expect(isDateEqual(new Date(), undefined)).toBe(false);
    expect(isDateEqual(undefined, undefined)).toBe(true);
  });

  it('returns true if the dates are equal by comparing getTime', () => {
    const d1 = new Date(2016, 3, 2);
    let d2 = new Date(2016, 3, 2);

    expect(isDateEqual(d1, d2)).toBe(true);

    d2 = new Date(2016, 3, 2, 100);
    expect(isDateEqual(d1, d2)).toBe(false);
  });
});

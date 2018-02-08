/* eslint-env jest */
import isSameYear from '../isSameYear';

describe('isSameYear', () => {
  it('should return false by default if both values are null-ish', () => {
    expect(isSameYear(null, null)).toBe(false);
    expect(isSameYear(undefined, undefined)).toBe(false);
  });

  it('should return the third param if both values are null', () => {
    expect(isSameYear(null, null, false)).toBe(false);
    expect(isSameYear(null, null, true)).toBe(true);
    expect(isSameYear(null, null, null)).toBe(null);
  });

  it('should return false if one of the dates is not a valid date', () => {
    const d = new Date();
    const invalid1 = 0;
    const invalid2 = '';
    const invalid3 = null;
    const invalid4 = undefined;
    const invalid5 = new Date('20--23');
    expect(isSameYear(d, invalid1)).toBe(false);
    expect(isSameYear(d, invalid2)).toBe(false);
    expect(isSameYear(d, invalid3)).toBe(false);
    expect(isSameYear(d, invalid4)).toBe(false);
    expect(isSameYear(d, invalid5)).toBe(false);
    expect(isSameYear(invalid1, d)).toBe(false);
    expect(isSameYear(invalid2, d)).toBe(false);
    expect(isSameYear(invalid3, d)).toBe(false);
    expect(isSameYear(invalid4, d)).toBe(false);
    expect(isSameYear(invalid5, d)).toBe(false);
  });

  it('should return true if the dates are part of the same year', () => {
    expect(isSameYear(new Date(2018, 0, 1), new Date(2018, 5, 15))).toBe(true);
    expect(isSameYear(new Date(2018, 5, 15), new Date(2018, 0, 1))).toBe(true);

    expect(isSameYear(new Date(2017, 5, 15), new Date(2018, 0, 1))).toBe(false);
    expect(isSameYear(new Date(2017, 11, 31), new Date(2018, 0, 1))).toBe(false);
  });
});

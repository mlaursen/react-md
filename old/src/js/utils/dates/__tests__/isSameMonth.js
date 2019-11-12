/* eslint-env jest */
import isSameMonth from '../isSameMonth';

describe('isSameMonth', () => {
  it('should return false by default if both values are null-ish', () => {
    expect(isSameMonth(null, null)).toBe(false);
    expect(isSameMonth(undefined, undefined)).toBe(false);
  });

  it('should return the third param if both values are null', () => {
    expect(isSameMonth(null, null, false)).toBe(false);
    expect(isSameMonth(null, null, true)).toBe(true);
    expect(isSameMonth(null, null, null)).toBe(null);
  });

  it('should return false if one of the dates is not a valid date', () => {
    const d = new Date();
    const invalid1 = 0;
    const invalid2 = '';
    const invalid3 = null;
    const invalid4 = undefined;
    const invalid5 = new Date('20--23');
    expect(isSameMonth(d, invalid1)).toBe(false);
    expect(isSameMonth(d, invalid2)).toBe(false);
    expect(isSameMonth(d, invalid3)).toBe(false);
    expect(isSameMonth(d, invalid4)).toBe(false);
    expect(isSameMonth(d, invalid5)).toBe(false);
    expect(isSameMonth(invalid1, d)).toBe(false);
    expect(isSameMonth(invalid2, d)).toBe(false);
    expect(isSameMonth(invalid3, d)).toBe(false);
    expect(isSameMonth(invalid4, d)).toBe(false);
    expect(isSameMonth(invalid5, d)).toBe(false);
  });

  it('should return true if the dates are part of the same year and month', () => {
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2018, 0, 1))).toBe(true);
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2018, 0, 15))).toBe(true);
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2018, 0, 31))).toBe(true);
    expect(isSameMonth(new Date(2018, 0, 15), new Date(2018, 0, 1))).toBe(true);
    expect(isSameMonth(new Date(2018, 0, 31), new Date(2018, 0, 15))).toBe(true);
    expect(isSameMonth(new Date(2018, 4, 1), new Date(2018, 4, 1))).toBe(true);
    expect(isSameMonth(new Date(2018, 4, 1), new Date(2018, 4, 15))).toBe(true);
    expect(isSameMonth(new Date(2018, 4, 1), new Date(2018, 4, 31))).toBe(true);
    expect(isSameMonth(new Date(2018, 4, 15), new Date(2018, 4, 1))).toBe(true);
    expect(isSameMonth(new Date(2018, 4, 31), new Date(2018, 4, 15))).toBe(true);

    expect(isSameMonth(new Date(2018, 0, 1), new Date(2014, 0, 1))).toBe(false);
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2017, 0, 1))).toBe(false);
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2018, 1, 1))).toBe(false);
    expect(isSameMonth(new Date(2018, 0, 1), new Date(2018, 2, 15))).toBe(false);
  });
});

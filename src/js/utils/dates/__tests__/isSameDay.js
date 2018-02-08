/* eslint-env jest */
import isSameDay from '../isSameDay';

describe('isSameDay', () => {
  it('should return false by default if both values are null-ish', () => {
    expect(isSameDay(null, null)).toBe(false);
    expect(isSameDay(undefined, undefined)).toBe(false);
  });

  it('should return the third param if both values are null', () => {
    expect(isSameDay(null, null, false)).toBe(false);
    expect(isSameDay(null, null, true)).toBe(true);
    expect(isSameDay(null, null, null)).toBe(null);
  });

  it('should return false if one of the dates is not a valid date', () => {
    const d = new Date();
    const invalid1 = 0;
    const invalid2 = '';
    const invalid3 = null;
    const invalid4 = undefined;
    const invalid5 = new Date('20--23');
    expect(isSameDay(d, invalid1)).toBe(false);
    expect(isSameDay(d, invalid2)).toBe(false);
    expect(isSameDay(d, invalid3)).toBe(false);
    expect(isSameDay(d, invalid4)).toBe(false);
    expect(isSameDay(d, invalid5)).toBe(false);
    expect(isSameDay(invalid1, d)).toBe(false);
    expect(isSameDay(invalid2, d)).toBe(false);
    expect(isSameDay(invalid3, d)).toBe(false);
    expect(isSameDay(invalid4, d)).toBe(false);
    expect(isSameDay(invalid5, d)).toBe(false);
  });

  it('should return true if the dates are part of the same year, month, and day', () => {
    expect(isSameDay(new Date(2018, 0, 1), new Date(2018, 0, 1))).toBe(true);
    expect(isSameDay(new Date(2018, 0, 1), new Date(2018, 0, 1, 8))).toBe(true);
    expect(isSameDay(new Date(2018, 0, 1), new Date(2018, 0, 1, 1))).toBe(true);
    expect(isSameDay(new Date(2018, 0, 1), new Date(2018, 0, 1, 12))).toBe(true);

    expect(isSameDay(new Date(2018, 0, 1), new Date(2018, 0, 2))).toBe(false);
    expect(isSameDay(new Date(2018, 0, 1), new Date(2019, 0, 2))).toBe(false);
    expect(isSameDay(new Date(2018, 0, 1), new Date(2014, 0, 1))).toBe(false);
  });
});

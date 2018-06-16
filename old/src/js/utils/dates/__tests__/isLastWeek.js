/* eslint-env jest */
import isFirstWeek from '../isFirstWeek';

describe('isFirstWeek', () => {
  it('should return false for invalid dates', () => {
    expect(isFirstWeek(undefined)).toBe(false);
    expect(isFirstWeek(null)).toBe(false);
    expect(isFirstWeek('')).toBe(false);
    expect(isFirstWeek(0)).toBe(false);
    expect(isFirstWeek(new Date('23--43'))).toBe(false);
  });

  it('should correctly figure out if the date is within the first week', () => {
    expect(isFirstWeek(new Date(2018, 0, 1))).toBe(true);
    expect(isFirstWeek(new Date(2018, 0, 6))).toBe(true);
    expect(isFirstWeek(new Date(2018, 0, 7))).toBe(false);
    expect(isFirstWeek(new Date(2018, 0, 31))).toBe(false);
    expect(isFirstWeek(new Date(2018, 1, 1))).toBe(true);
    expect(isFirstWeek(new Date(2018, 1, 28))).toBe(false);
  });
});

/* eslint-env jest */
import isLastWeek from '../isLastWeek';

describe('isLastWeek', () => {
  it('should return false for invalid dates', () => {
    expect(isLastWeek(undefined)).toBe(false);
    expect(isLastWeek(null)).toBe(false);
    expect(isLastWeek('')).toBe(false);
    expect(isLastWeek(0)).toBe(false);
    expect(isLastWeek(new Date('23--43'))).toBe(false);
  });

  it.only('should correctly figure out if the date is within the first week', () => {
    expect(isLastWeek(new Date(2018, 0, 1))).toBe(false);
    expect(isLastWeek(new Date(2018, 0, 6))).toBe(false);
    expect(isLastWeek(new Date(2018, 0, 7))).toBe(false);
    expect(isLastWeek(new Date(2018, 0, 31))).toBe(true);
    expect(isLastWeek(new Date(2018, 1, 1))).toBe(false);
    expect(isLastWeek(new Date(2018, 1, 28))).toBe(true);
  });
});

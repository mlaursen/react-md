/* eslint-env jest */
import getWeekNumber from '../getWeekNumber';

describe('getWeekNumber', () => {
  it('should return -1 for invalid dates', () => {
    expect(getWeekNumber(undefined)).toBe(-1);
    expect(getWeekNumber(null)).toBe(-1);
    expect(getWeekNumber('')).toBe(-1);
    expect(getWeekNumber(0)).toBe(-1);
    expect(getWeekNumber(new Date('23---332'))).toBe(-1);
  });

  it('should correctly return the week number for a provided date', () => {
    expect(getWeekNumber(new Date(2018, 0, 1))).toBe(1);
    expect(getWeekNumber(new Date(2018, 0, 7))).toBe(2);
    expect(getWeekNumber(new Date(2018, 3, 1))).toBe(1);
    expect(getWeekNumber(new Date(2018, 3, 8))).toBe(2);
    expect(getWeekNumber(new Date(2018, 3, 28))).toBe(4);
    expect(getWeekNumber(new Date(2020, 1, 22))).toBe(4);
    expect(getWeekNumber(new Date(2020, 1, 28))).toBe(5);
    expect(getWeekNumber(new Date(2020, 1, 29))).toBe(5);
  });
});

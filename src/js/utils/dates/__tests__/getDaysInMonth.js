/* eslint-env jest */
import getDaysInMonth from '../getDaysInMonth';

describe('getDaysInMonth', () => {
  it('should return -1 for invalid dates', () => {
    expect(getDaysInMonth(undefined)).toBe(-1);
    expect(getDaysInMonth(null)).toBe(-1);
    expect(getDaysInMonth(0)).toBe(-1);
    expect(getDaysInMonth('9324')).toBe(-1);
    expect(getDaysInMonth(new Date('23--33'))).toBe(-1);
  });

  it('should return the number of days in a month', () => {
    expect(getDaysInMonth(new Date(2018, 0, 1))).toBe(31);
    expect(getDaysInMonth(new Date(2018, 0, 31))).toBe(31);
    expect(getDaysInMonth(new Date(2018, 2, 1))).toBe(31);
    expect(getDaysInMonth(new Date(2018, 4, 1))).toBe(31);
    expect(getDaysInMonth(new Date(2018, 1, 1))).toBe(28);
    expect(getDaysInMonth(new Date(2020, 1, 1))).toBe(29);
  });
});

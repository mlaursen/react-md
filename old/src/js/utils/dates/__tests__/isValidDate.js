/* eslint-env jest */
import isValidDate from '../isValidDate';

describe('isValidDate', () => {
  it('should return true for valid dates', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date(2017, 0, 1))).toBe(true);
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it('should return false for invalid dates', () => {
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(0)).toBe(false);
    expect(isValidDate('')).toBe(false);
    expect(isValidDate('12321321')).toBe(false);
    expect(isValidDate(12321321)).toBe(false);
    expect(isValidDate(new Date('20'))).toBe(false);
    expect(isValidDate(new Date('20--23'))).toBe(false);
    expect(isValidDate(new Date('2018-01-01T0322'))).toBe(false);
  });
});

/* eslint-env jest */
import toDayOfWeek from '../toDayOfWeek';

describe('toDayOfWeek', () => {
  it('should return null for invalid dates', () => {
    expect(toDayOfWeek(undefined)).toBe(null);
    expect(toDayOfWeek(null)).toBe(null);
    expect(toDayOfWeek('')).toBe(null);
    expect(toDayOfWeek(0)).toBe(null);
    expect(toDayOfWeek(new Date('23--23'))).toBe(null);
  });

  it('should return a new date at the specified day of week', () => {
    expect(toDayOfWeek(new Date(2018, 0, 1), 0)).toEqual(new Date(2017, 11, 31));
    expect(toDayOfWeek(new Date(2018, 0, 1), 1)).toEqual(new Date(2018, 0, 1));
    expect(toDayOfWeek(new Date(2018, 0, 1), 2)).toEqual(new Date(2018, 0, 2));
    expect(toDayOfWeek(new Date(2018, 0, 1), 3)).toEqual(new Date(2018, 0, 3));
    expect(toDayOfWeek(new Date(2018, 0, 1), 4)).toEqual(new Date(2018, 0, 4));
    expect(toDayOfWeek(new Date(2018, 0, 1), 5)).toEqual(new Date(2018, 0, 5));
    expect(toDayOfWeek(new Date(2018, 0, 1), 6)).toEqual(new Date(2018, 0, 6));

    expect(toDayOfWeek(new Date(2018, 0, 31), 0)).toEqual(new Date(2018, 0, 28));
    expect(toDayOfWeek(new Date(2018, 0, 31), 1)).toEqual(new Date(2018, 0, 29));
    expect(toDayOfWeek(new Date(2018, 0, 31), 2)).toEqual(new Date(2018, 0, 30));
    expect(toDayOfWeek(new Date(2018, 0, 31), 3)).toEqual(new Date(2018, 0, 31));
    expect(toDayOfWeek(new Date(2018, 0, 31), 4)).toEqual(new Date(2018, 1, 1));
    expect(toDayOfWeek(new Date(2018, 0, 31), 5)).toEqual(new Date(2018, 1, 2));
    expect(toDayOfWeek(new Date(2018, 0, 31), 6)).toEqual(new Date(2018, 1, 3));
  });
});

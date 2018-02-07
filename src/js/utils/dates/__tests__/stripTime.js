/* eslint-env jest */
import stripTime from '../stripTime';

describe('stripTime', () => {
  it('should return null for invalid dates', () => {
    expect(stripTime(undefined)).toBe(null);
    expect(stripTime(null)).toBe(null);
    expect(stripTime('')).toBe(null);
    expect(stripTime(0)).toBe(null);
    expect(stripTime(new Date('23--32'))).toBe(null);
  });

  it('should return a date without any time', () => {
    expect(stripTime(new Date(2018, 0, 1, 22))).toEqual(new Date(2018, 0, 1));
    expect(stripTime(new Date(2018, 0, 1, 22, 3))).toEqual(new Date(2018, 0, 1));
    expect(stripTime(new Date(2018, 0, 1, 0, 3))).toEqual(new Date(2018, 0, 1));
    expect(stripTime(new Date(2018, 0, 1, 0, 0))).toEqual(new Date(2018, 0, 1));
    expect(stripTime(new Date(2018, 0, 1))).toEqual(new Date(2018, 0, 1));

    // for sanity
    const d = new Date(2018, 0, 1, 22, 30, 45, 899);
    const result = stripTime(d);
    expect(d.getHours()).toBe(22);
    expect(d.getMinutes()).toBe(30);
    expect(d.getSeconds()).toBe(45);
    expect(d.getMilliseconds()).toBe(899);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('should return a new date even if the original date didn\'t have time set', () => {
    const date1 = new Date(2018, 0, 1);
    const date2 = new Date(2000, 11, 24);
    const date3 = new Date(1950, 4, 10);
    const date4 = new Date(2113, 9, 29);

    const result1 = stripTime(date1);
    const result2 = stripTime(date2);
    const result3 = stripTime(date3);
    const result4 = stripTime(date4);

    expect(result1).toEqual(date1);
    expect(result1).not.toBe(date1);
    expect(result2).toEqual(date2);
    expect(result2).not.toBe(date2);
    expect(result3).toEqual(date3);
    expect(result3).not.toBe(date3);
    expect(result4).toEqual(date4);
    expect(result4).not.toBe(date4);
  });
});

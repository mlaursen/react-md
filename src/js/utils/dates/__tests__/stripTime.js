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
  });
});

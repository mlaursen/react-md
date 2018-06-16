/* eslint-disable max-len */
/* eslint-env jest */
import getLastDay from '../getLastDay';

describe('getLastDay', () => {
  it('should return null for invalid dates', () => {
    expect(getLastDay(null, 0)).toBe(null);
    expect(getLastDay(new Date('20--33'), 0)).toBe(null);
    expect(getLastDay(false, 0)).toBe(null);
  });

  it('should return the last day in the provided month as a new date even if the provided date is the last day in the month', () => {
    const feb28 = new Date(2018, 1, 28);
    const feb29 = new Date(2020, 1, 29);
    const dec31 = new Date(2018, 11, 31);
    const result = getLastDay(feb28);

    expect(result).toEqual(feb28);
    expect(result).not.toBe(feb28);

    expect(getLastDay(new Date(2018, 1, 1))).toEqual(feb28);
    expect(getLastDay(new Date(2018, 1, 15))).toEqual(feb28);
    expect(getLastDay(new Date(2018, 1, 28))).toEqual(feb28);

    expect(getLastDay(new Date(2018, 11, 1))).toEqual(dec31);
    expect(getLastDay(new Date(2018, 11, 15))).toEqual(dec31);
    expect(getLastDay(new Date(2018, 11, 31))).toEqual(dec31);

    expect(getLastDay(new Date(2020, 1, 1))).toEqual(feb29);
    expect(getLastDay(new Date(2020, 1, 15))).toEqual(feb29);
    expect(getLastDay(new Date(2020, 1, 28))).toEqual(feb29);
    expect(getLastDay(new Date(2020, 1, 29))).toEqual(feb29);
  });
});

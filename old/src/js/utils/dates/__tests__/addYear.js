/* eslint-env jest */
import addYear from '../addYear';

const JAN_1_2018 = new Date(2018, 0, 1);
const JUNE_15_2018 = new Date(2018, 5, 15);

describe('addYear', () => {
  it('should return null for invalid dates', () => {
    expect(addYear(undefined, 0)).toBe(null);
    expect(addYear(null, 0)).toBe(null);
    expect(addYear('12', 0)).toBe(null);
    expect(addYear(0, 0)).toBe(null);
    expect(addYear(new Date('23--33'), 0)).toBe(null);
  });

  it('should return a new date even if the amount is 0', () => {
    const result1 = addYear(JAN_1_2018, 0);
    const result2 = addYear(JUNE_15_2018, 0);
    expect(result1).toEqual(JAN_1_2018);
    expect(result1).not.toBe(JAN_1_2018);
    expect(result2).toEqual(JUNE_15_2018);
    expect(result2).not.toBe(JUNE_15_2018);
  });

  it('should correctly add days that are positive', () => {
    expect(addYear(JAN_1_2018, 1)).toEqual(new Date(2019, 0, 1));
    expect(addYear(JAN_1_2018, 100)).toEqual(new Date(2118, 0, 1));
    expect(addYear(JAN_1_2018, 1000)).toEqual(new Date(3018, 0, 1));

    expect(addYear(JUNE_15_2018, 1)).toEqual(new Date(2019, 5, 15));
    expect(addYear(JUNE_15_2018, 100)).toEqual(new Date(2118, 5, 15));
    expect(addYear(JUNE_15_2018, 1000)).toEqual(new Date(3018, 5, 15));
  });

  it('should correctly add days that are negative', () => {
    const year18 = new Date(18, 0, 1); // really 1918 at this point.
    year18.setFullYear(18);

    expect(addYear(JAN_1_2018, -1)).toEqual(new Date(2017, 0, 1));
    expect(addYear(JAN_1_2018, -100)).toEqual(new Date(1918, 0, 1));
    expect(addYear(JAN_1_2018, -1000)).toEqual(new Date(1018, 0, 1));
    expect(addYear(JAN_1_2018, -2000)).toEqual(year18);
  });
});

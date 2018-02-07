/* eslint-env jest */
import addMonth from '../addMonth';

const JAN_1_2018 = new Date(2018, 0, 1);

describe('addMonth', () => {
  it('should return null for invalid dates', () => {
    expect(addMonth(undefined, 1)).toBe(null);
    expect(addMonth(null, 1)).toBe(null);
    expect(addMonth(0, 1)).toBe(null);
    expect(addMonth('', 1)).toBe(null);
    expect(addMonth(new Date('23--33'), 1)).toBe(null);
  });

  it('should return a new Date instance even if the amount is 0', () => {
    const result = addMonth(JAN_1_2018, 0);
    expect(result).toEqual(JAN_1_2018);
    expect(result).not.toBe(JAN_1_2018);
  });

  it('should correctly add months that are positive', () => {
    expect(addMonth(JAN_1_2018, 1)).toEqual(new Date(2018, 1, 1));
    expect(addMonth(JAN_1_2018, 100)).toEqual(new Date(2026, 4, 1));
    expect(addMonth(JAN_1_2018, 1000)).toEqual(new Date(2101, 4, 1));
  });

  it('should correctly add months that are negative', () => {
    expect(addMonth(JAN_1_2018, -1)).toEqual(new Date(2017, 11, 1));
    expect(addMonth(JAN_1_2018, -100)).toEqual(new Date(2009, 8, 1));
    expect(addMonth(JAN_1_2018, -1000)).toEqual(new Date(1934, 8, 1));
  });

  it('should correctly keep the date within the month if the new month also contains it', () => {
    const jan15 = new Date(2018, 0, 15);
    expect(addMonth(jan15, 1)).toEqual(new Date(2018, 1, 15));
    expect(addMonth(jan15, 3)).toEqual(new Date(2018, 3, 15));
  });

  it('should default to the first day of the month if the new month does not contain the day within the month', () => {
    const jan31 = new Date(2018, 0, 31);
    expect(addMonth(jan31, 1)).toEqual(new Date(2018, 1, 1));
    expect(addMonth(jan31, 2)).toEqual(new Date(2018, 2, 31));
    expect(addMonth(jan31, 3)).toEqual(new Date(2018, 3, 1));
  });

  it('should correctly set the newMonthDate if it exists in the new month', () => {
    expect(addMonth(JAN_1_2018, 1, 12)).toEqual(new Date(2018, 1, 12));
    expect(addMonth(new Date(2018, 1, 1), 3, 31)).toEqual(new Date(2018, 4, 31));
  });

  it('should default back to the first date of the month if the newMonthDate does not exist in the new month', () => {
    expect(addMonth(JAN_1_2018, 1, 31)).toEqual(new Date(2018, 1, 1));
    expect(addMonth(new Date(2018, 1, 1), 2, 31)).toEqual(new Date(2018, 3, 1));
  });
});

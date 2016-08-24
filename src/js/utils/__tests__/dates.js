/* eslint-env jest*/
/* eslint-disable no-undefined*/
jest.unmock('../dates');
import { DateTimeFormat } from 'intl';

import {
  stripTime,
  getLastDay,
  getDayOfWeek,
  addDate,
  subtractDate,
  getTimeString,
  extractTimeParts,
  addHours,
  subtractHours,
} from '../dates';

const march14 = new Date(2016, 2, 14, 15, 22, 18, 450);
const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
const fifteenThirtyTwo = new Date(2016, 3, 2, 15, 32);

describe('stripTime', () => {
  it('removes all time from a date. Only keeps year, month, and date', () => {
    const expected = new Date(2016, 2, 14);
    expect(stripTime(march14)).toEqual(expected);
  });

  it('returns null if the date is undefined or null', () => {
    expect(stripTime(undefined)).toEqual(null);
    expect(stripTime(null)).toEqual(null);
  });

  it('returns null if the date is not a Date object', () => {
    expect(stripTime('Hello!')).toEqual(null);
  });
});

describe('getLastDate', () => {
  it('strips the time from the last day in the month', () => {
    const march31 = new Date(2016, 2, 31);
    expect(getLastDay(march14)).toEqual(march31);
  });
});

describe('getDayOfWeek', () => {
  it('gets a relative day of the week from any given date', () => {
    const monday2016April4 = new Date(2016, 3, 4);
    const sunday2016April3 = new Date(2016, 3, 3);

    expect(getDayOfWeek(monday2016April4, 0)).toEqual(sunday2016April3);
    expect(getDayOfWeek(monday2016April4, 1)).toEqual(monday2016April4);
  });

  it('can return a day of the week from the previous month', () => {
    const april1 = new Date(2016, 3, 1);
    const march31 = new Date(2016, 2, 31);

    expect(getDayOfWeek(april1, 4)).toEqual(march31);
  });

  it('can return a day of the week from the next month', () => {
    const march31 = new Date(2016, 2, 31);
    const april1 = new Date(2016, 3, 1);

    expect(getDayOfWeek(march31, 5)).toEqual(april1);
  });
});

describe('addDate', () => {
  it('adds days to a date', () => {
    const march15 = new Date(2016, 2, 15, 15, 22, 18, 450);
    const march22 = new Date(2016, 2, 22, 15, 22, 18, 450);

    expect(addDate(march14, 1, 'D')).toEqual(march15);
    expect(addDate(march14, 8, 'D')).toEqual(march22);
  });

  it('can add negative days to a date', () => {
    const march13 = new Date(2016, 2, 13, 15, 22, 18, 450);
    const march1 = new Date(2016, 2, 1, 15, 22, 18, 450);

    expect(addDate(march14, -1, 'D')).toEqual(march13);
    expect(addDate(march14, -13, 'D')).toEqual(march1);
  });
});

describe('subtractDate', () => {
  it('subtracts days from a date', () => {
    const march13 = new Date(2016, 2, 13, 15, 22, 18, 450);
    const march1 = new Date(2016, 2, 1, 15, 22, 18, 450);

    expect(subtractDate(march14, 1, 'D')).toEqual(march13);
    expect(subtractDate(march14, 13, 'D')).toEqual(march1);
  });
});

describe('getTimeString', () => {
  it('gets a formatted time string for a given locale', () => {
    expect(getTimeString(DateTimeFormat, 'en-US', threeFiftyOne)).toBe('3:51 AM');
    expect(getTimeString(DateTimeFormat, 'da-DK', threeFiftyOne)).toBe('3.51');
  });

  it('formats a with AM/PM or as 24h depending on time zone', () => {
    expect(getTimeString(DateTimeFormat, 'en-US', fifteenThirtyTwo)).toBe('3:32 PM');
    expect(getTimeString(DateTimeFormat, 'da-DK', fifteenThirtyTwo)).toBe('15.32');
  });
});

describe('extractTimeParts', () => {
  it('extracts the hour from a date', () => {
    const three = extractTimeParts(DateTimeFormat, 'en-US', threeFiftyOne).hours;
    const fifteen = extractTimeParts(DateTimeFormat, 'da-DK', fifteenThirtyTwo).hours;

    expect(three).toBe('3');
    expect(fifteen).toBe('15');
  });

  it('extracts the minutes including the optional separator', () => {
    const enFiftyOneMinutes = extractTimeParts(DateTimeFormat, 'en-US', threeFiftyOne).minutes;
    const dkFiftyOneMinutes = extractTimeParts(DateTimeFormat, 'da-DK', threeFiftyOne).minutes;

    expect(enFiftyOneMinutes).toBe(':51');
    expect(dkFiftyOneMinutes).toBe('.51');
  });

  it('extracts the time period if it exists for the locale', () => {
    const enTimePeriod = extractTimeParts(DateTimeFormat, 'en-US', threeFiftyOne).timePeriod;
    const dkTimePeriod = extractTimeParts(DateTimeFormat, 'da-DK', threeFiftyOne).timePeriod;

    expect(enTimePeriod).toBe('AM');
    expect(dkTimePeriod).toBe(undefined);
  });
});

describe('addHours', () => {
  it('adds hours to a date', () => {
    const fiveFiftyOne = new Date(2016, 3, 2, 5, 51);

    expect(addHours(threeFiftyOne, 2)).toEqual(fiveFiftyOne);
  });
});

describe('subtractHours', () => {
  it('adds hours to a date', () => {
    const oneFiftyOne = new Date(2016, 3, 2, 1, 51);

    expect(subtractHours(threeFiftyOne, 2)).toEqual(oneFiftyOne);
  });
});

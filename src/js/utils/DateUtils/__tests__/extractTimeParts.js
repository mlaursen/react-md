/* eslint-env jest */
jest.unmock('../formatTime');
jest.unmock('../extractTimeParts');

import extractTimeParts from '../extractTimeParts';
import { DateTimeFormat } from 'intl';

const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
const fifteenThirtyTwo = new Date(2016, 3, 2, 15, 32);
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

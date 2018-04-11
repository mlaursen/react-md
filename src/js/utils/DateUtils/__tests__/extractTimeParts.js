/* eslint-env jest */
import extractTimeParts from '../extractTimeParts';
import { DateTimeFormat } from 'intl';

const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
const fifteenThirtyTwo = new Date(2016, 3, 2, 15, 32);
describe('extractTimeParts', () => {
  it('extracts the hour from a date', () => {
    const three = extractTimeParts(DateTimeFormat, 'en-US', false, threeFiftyOne).hours;
    const fifteen = extractTimeParts(DateTimeFormat, 'da-DK', false, fifteenThirtyTwo).hours;

    expect(three).toBe('3');
    expect(fifteen).toBe('15');
  });

  it('extracts the minutes including the optional separator', () => {
    const enFiftyOneMinutes = extractTimeParts(DateTimeFormat, 'en-US', false, threeFiftyOne).minutes;
    const dkFiftyOneMinutes = extractTimeParts(DateTimeFormat, 'da-DK', false, threeFiftyOne).minutes;

    expect(enFiftyOneMinutes).toBe(':51');
    expect(dkFiftyOneMinutes).toBe('.51');
  });

  it('extracts the seconds including the optional separator if showSeconds is enabled', () => {
    const three = extractTimeParts(DateTimeFormat, 'en-US', true, threeFiftyOne).seconds;
    const fifteen = extractTimeParts(DateTimeFormat, 'da-DK', true, fifteenThirtyTwo).seconds;

    expect(three).toBe(':00');
    expect(fifteen).toBe('.00');
  });

  it('extracts the time period if it exists for the locale', () => {
    const enTimePeriod = extractTimeParts(DateTimeFormat, 'en-US', false, threeFiftyOne).timePeriod;
    const dkTimePeriod = extractTimeParts(DateTimeFormat, 'da-DK', false, threeFiftyOne).timePeriod;

    expect(enTimePeriod).toBe('AM');
    expect(dkTimePeriod).toBe(undefined);
  });
});

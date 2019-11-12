/* eslint-env jest */
import formatTime from '../formatTime';
import { DateTimeFormat } from 'intl';

const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
const fifteenThirtyTwo = new Date(2016, 3, 2, 15, 32);
describe('formatTime', () => {
  it('gets a formatted time string for a given locale', () => {
    expect(formatTime(DateTimeFormat, 'en-US', false, threeFiftyOne)).toBe('3:51 AM');
    expect(formatTime(DateTimeFormat, 'da-DK', false, threeFiftyOne)).toBe('3.51');
  });

  it('gets a formatted time string for a given locale with seconds if showSeconds is enabled', () => {
    expect(formatTime(DateTimeFormat, 'en-US', true, threeFiftyOne)).toBe('3:51:00 AM');
    expect(formatTime(DateTimeFormat, 'da-DK', true, threeFiftyOne)).toBe('3.51.00');
  });

  it('formats a with AM/PM or as 24h depending on time zone', () => {
    expect(formatTime(DateTimeFormat, 'en-US', false, fifteenThirtyTwo)).toBe('3:32 PM');
    expect(formatTime(DateTimeFormat, 'da-DK', false, fifteenThirtyTwo)).toBe('15.32');
  });
});

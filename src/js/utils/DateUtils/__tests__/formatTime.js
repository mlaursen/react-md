/* eslint-env jest */

jest.unmock('../formatTime');
import formatTime from '../formatTime';
import { DateTimeFormat } from 'intl';

const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
const fifteenThirtyTwo = new Date(2016, 3, 2, 15, 32);
describe('formatTime', () => {
  it('gets a formatted time string for a given locale', () => {
    expect(formatTime(DateTimeFormat, 'en-US', threeFiftyOne)).toBe('3:51 AM');
    expect(formatTime(DateTimeFormat, 'da-DK', threeFiftyOne)).toBe('3.51');
  });

  it('formats a with AM/PM or as 24h depending on time zone', () => {
    expect(formatTime(DateTimeFormat, 'en-US', fifteenThirtyTwo)).toBe('3:32 PM');
    expect(formatTime(DateTimeFormat, 'da-DK', fifteenThirtyTwo)).toBe('15.32');
  });
});

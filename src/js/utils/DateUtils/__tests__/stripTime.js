/* eslint-env jest */
jest.unmock('../stripTime');

import stripTime from '../stripTime';

const march14 = new Date(2016, 2, 14, 15, 22, 18, 450);

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

/* eslint-env jest */
jest.unmock('../getLastDay');
jest.unmock('../stripTime'); // Depends heavily on it.

import getLastDay from '../getLastDay';

const march14 = new Date(2016, 2, 14, 15, 22, 18, 450);

describe('getLastDate', () => {
  it('strips the time from the last day in the month', () => {
    const march31 = new Date(2016, 2, 31);
    expect(getLastDay(march14)).toEqual(march31);
  });
});

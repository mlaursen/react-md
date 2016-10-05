/* eslint-env jest */
jest.unmock('../getDayOfWeek');

import getDayOfWeek from '../getDayOfWeek';

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

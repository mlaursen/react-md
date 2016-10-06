/* eslint-env jest */
jest.unmock('../isMonthBefore');
jest.unmock('../stripTime');

import isMonthBefore from '../isMonthBefore';

const march14 = new Date(2016, 2, 14, 15, 22, 18, 450);
describe('isMonthBefore', () => {
  it('returns true if a month is before another month', () => {
    const february28 = new Date(2016, 1, 28);
    expect(isMonthBefore(march14, february28)).toBe(true);
  });

  it('returns false if a month is after another month', () => {
    const april1 = new Date(2016, 3, 1);
    expect(isMonthBefore(march14, april1)).toBe(false);
  });

  it('returns true if they are the same month', () => {
    const march28 = new Date(2016, 2, 28);
    expect(isMonthBefore(march14, march28)).toBe(true);
  });

  it('returns false if the month is before but in a later year', () => {
    const february28 = new Date(2017, 1, 28);
    expect(isMonthBefore(march14, february28)).toBe(false);
  });
});

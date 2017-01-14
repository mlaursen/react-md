/* eslint-env jest */
jest.unmock('../isWithinStep');
import isWithinStep from '../isWithinStep';

describe('isWithinStep', () => {
  it('works with with whole numbers', () => {
    expect(isWithinStep(20, 1)).toBe(true);
    expect(isWithinStep(20, 20)).toBe(true);
  });

  it('returns false if the value is less than the step', () => {
    expect(isWithinStep(20, 100)).toBe(false);
    expect(isWithinStep(20, 30)).toBe(false);
  });

  it('allows for decimal precision', () => {
    expect(isWithinStep(20, 0.01)).toBe(true);
    expect(isWithinStep(20, 0.1)).toBe(true);
    expect(isWithinStep(20, 0.001)).toBe(true);
    expect(isWithinStep(20, 0.25)).toBe(true);
  });
});

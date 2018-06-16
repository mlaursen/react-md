/* eslint-env jest */
import minMaxLoop from '../minMaxLoop';

describe('minMaxLoop', () => {
  it('should increment the current number by 1 when increment is true', () => {
    const current = 0;
    const expected = 1;
    expect(minMaxLoop(current, 0, 5, true)).toBe(expected);
  });

  it('should decrement the current number by 1 when increment is false', () => {
    const current = 1;
    const expected = 0;
    expect(minMaxLoop(current, 0, 5, false)).toBe(expected);
  });

  it('should return the max number when decrementing at the min value', () => {
    const current = 0;
    const min = 0;
    const max = 5;
    expect(minMaxLoop(current, min, max, false)).toBe(max);
  });

  it('should return the min number when incrementing at the max value', () => {
    const current = 5;
    const min = 0;
    const max = 5;
    expect(minMaxLoop(current, min, max, true)).toBe(min);
  });
});

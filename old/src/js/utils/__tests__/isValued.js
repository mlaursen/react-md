/* eslint-env jest */
import isValued from '../isValued';

describe('isValued', () => {
  it('should return true when valued', () => {
    expect(isValued(0)).toBe(true);
    expect(isValued(1)).toBe(true);
    expect(isValued(-1)).toBe(true);
    expect(isValued(-100)).toBe(true);
    expect(isValued(100)).toBe(true);
    expect(isValued('0')).toBe(true);
    expect(isValued('some-string')).toBe(true);
    expect(isValued('another string that has other stuff')).toBe(true);
    expect(isValued('true')).toBe(true);
    expect(isValued('false')).toBe(true);
  });

  it('should return false when not valued', () => {
    expect(isValued()).toBe(false);
    expect(isValued(undefined)).toBe(false);
    expect(isValued(null)).toBe(false);
    expect(isValued('')).toBe(false);
  });
});

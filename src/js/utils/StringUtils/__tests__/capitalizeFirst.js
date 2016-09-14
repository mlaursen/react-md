/* eslint-env jest */
jest.unmock('../capitalizeFirst');

import capitalizeFirst from '../capitalizeFirst';

describe('capitalizeFirst', () => {
  it('returns the unmodified string if falseish', () => {
    expect(capitalizeFirst(undefined)).toBe(undefined);
    expect(capitalizeFirst(null)).toBe(null);
    expect(capitalizeFirst('')).toBe('');
  });

  it('allows for single character strings', () => {
    expect(capitalizeFirst('a')).toBe('A');
  });

  it('allows for two character strings', () => {
    expect(capitalizeFirst('ab')).toBe('Ab');
  });

  it('does not uncapitalize any capitalize', () => {
    expect(capitalizeFirst('A')).toBe('A');
    expect(capitalizeFirst('AB')).toBe('AB');
    expect(capitalizeFirst('aB')).toBe('AB');
  });
});

/* eslint-env jest */

jest.unmock('../addSuffix');

import addSuffix from '../addSuffix';

describe('addSuffix', () => {
  it('adds a suffix to a string with a space', () => {
    expect(addSuffix('hello', '')).toBe('hello');
    expect(addSuffix('he', 'llo')).toBe('he llo');
  });

  it('returns the string unmodified if the string is false-ish', () => {
    expect(addSuffix(null, 'hello')).toBe(null);
    expect(addSuffix('', 'hello')).toBe('');
    expect(addSuffix(undefined, 'hello')).toBeUndefined();
  });

  it('removes any additional whitespace around the string', () => {
    expect(addSuffix('        hello world       ', 'something')).toBe('hello world something');
  });

  it('does not add the suffix if it already exists in the string', () => {
    expect(addSuffix('hello world', ' ')).toBe('hello world');
    expect(addSuffix('Required *', '*')).toBe('Required *');
  });
});

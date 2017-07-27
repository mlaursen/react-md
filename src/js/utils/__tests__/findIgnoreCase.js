/* eslint-env jest */
import React from 'react';
import findIgnoreCase from '../findIgnoreCase';

class Test extends React.Component {
  render() {
    return <div />;
  }
}

describe('findIgnoreCase', () => {
  it('should return the empty string if no word starts with the given letter', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(findIgnoreCase(haystack, 'e')).toBe('');
  });

  it('should return the empty string if no words starts with the given letters', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(findIgnoreCase(haystack, 'ab')).toBe('');
    expect(findIgnoreCase(haystack, 'appb')).toBe('');
  });

  it('should find the first match of a word beginning with the given letter ignoring case', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(findIgnoreCase(haystack, 'a')).toEqual('Apple');
    expect(findIgnoreCase(haystack, 'B')).toEqual('Banana');
  });

  it('should find the first match of a word beginning with the given letters ignoring case', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(findIgnoreCase(haystack, 'ap')).toEqual('Apple');
    expect(findIgnoreCase(haystack, 'Bana')).toEqual('Banana');
  });

  it('should allow the items to be a list of number', () => {
    const haystack = [1, 2, 3, 4];

    expect(findIgnoreCase(haystack, '1')).toEqual('1');
  });

  it('should allow the items to be a list of object', () => {
    const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

    expect(findIgnoreCase(haystack, 'ap', 'name')).toBe('Apple');
  });

  it('should allow the items to be a mixed list of string, number, object, and react element', () => {
    const test = <Test />;
    const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

    expect(findIgnoreCase(haystack, 'a', 'name')).toEqual('Apple');
    expect(findIgnoreCase(haystack, '3', 'name')).toBe('3');
  });
});

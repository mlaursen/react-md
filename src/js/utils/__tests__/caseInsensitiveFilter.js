/* eslint-env jest */
import React from 'react';
import caseInsensitiveFilter from '../caseInsensitiveFilter';

class Test extends React.Component {
  render() {
    return <div />;
  }
}


describe('caseInsensitiveFilter', () => {
  it('should include any items that match a single letter', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(caseInsensitiveFilter(haystack, 'a')).toEqual(haystack);
    expect(caseInsensitiveFilter(haystack, 'e')).toEqual(['Apple', 'Orange']);
  });

  it('should include any items that match a single letter ignoring case', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(caseInsensitiveFilter(haystack, 'A')).toEqual(haystack);
    expect(caseInsensitiveFilter(haystack, 'E')).toEqual(['Apple', 'Orange']);
  });

  it('should only include items that match letters in order', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(caseInsensitiveFilter(haystack, 'an')).toEqual(['Banana', 'Orange']);
    expect(caseInsensitiveFilter(haystack, 'ana')).toEqual(['Banana']);
  });

  it('should allow the items to be a list of numbers', () => {
    const haystack = [1, 11, 111];

    expect(caseInsensitiveFilter(haystack, '1')).toEqual(haystack);
    expect(caseInsensitiveFilter(haystack, '2')).toEqual([]);
  });

  it('should allow the items to be a list of objects', () => {
    const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

    expect(caseInsensitiveFilter(haystack, 'apple', 'name')).toEqual([{ name: 'Apple' }]);
  });

  it('should allow the item to be a mixed list of string, number, object, and react element', () => {
    const test = <Test />;
    const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

    expect(caseInsensitiveFilter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
    expect(caseInsensitiveFilter(haystack, '3', 'name')).toEqual([3, test]);
  });

  it('should filter out empty, null, and undefined', () => {
    const haystack = [
      undefined,
      '',
      null,
      0,
      100,
      { name: undefined },
      { name: '' },
      { name: null },
    ];

    expect(caseInsensitiveFilter(haystack, '0')).toEqual([0, 100]);
  });
});

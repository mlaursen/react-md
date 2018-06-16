/* eslint-env jest */
import React from 'react';
import fuzzyFilter from '../fuzzyFilter';


class Test extends React.Component {
  render() {
    return <div />;
  }
}

describe('fuzzyFilter', () => {
  it('should include items that contain the letter', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(fuzzyFilter(haystack, 'a')).toEqual(haystack);
    expect(fuzzyFilter(haystack, 'z')).toEqual([]);
  });

  it('should include items that contain all the letters', () => {
    const haystack = ['Apple', 'Banana', 'Orange'];

    expect(fuzzyFilter(haystack, 'ae')).toEqual(['Apple', 'Orange']);
  });

  it('should allow the items to be a list of numbers', () => {
    const haystack = [1, 315, 814325, 82];

    expect(fuzzyFilter(haystack, '1')).toEqual([1, 315, 814325]);
    expect(fuzzyFilter(haystack, '15')).toEqual([315, 814325]);
  });

  it('should allow the items to be a list of objects', () => {
    const haystack = [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Orange' }];

    expect(fuzzyFilter(haystack, 'ae', 'name')).toEqual([{ name: 'Apple' }, { name: 'Orange' }]);
  });

  it('should allow the items to be a mixed list of string, number, object, and react element', () => {
    const test = <Test />;
    const haystack = [{ name: 'Apple' }, 'Banana', 3, test];

    expect(fuzzyFilter(haystack, 'e', 'name')).toEqual([{ name: 'Apple' }, test]);
    expect(fuzzyFilter(haystack, '3', 'name')).toEqual([3, test]);
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

    expect(fuzzyFilter(haystack, '0', 'name')).toEqual([0, 100]);
  });

  it('should allow any characters that are used in regex', () => {
    const haystack = [
      'Ap^p[]e',
      '$What',
      '(Now!)',
      'Who?',
      'Through-Stuff.',
      'What\'s \\ That?',
      'Pipe | Pipe',
      'You **',
    ];

    expect(fuzzyFilter(haystack, '[')).toEqual(['Ap^p[]e']);
    expect(fuzzyFilter(haystack, ']')).toEqual(['Ap^p[]e']);
    expect(fuzzyFilter(haystack, '^')).toEqual(['Ap^p[]e']);
    expect(fuzzyFilter(haystack, '$')).toEqual(['$What']);
    expect(fuzzyFilter(haystack, '(')).toEqual(['(Now!)']);
    expect(fuzzyFilter(haystack, ')')).toEqual(['(Now!)']);
    expect(fuzzyFilter(haystack, '?')).toEqual(['Who?', 'What\'s \\ That?']);
    expect(fuzzyFilter(haystack, '-')).toEqual(['Through-Stuff.']);
    expect(fuzzyFilter(haystack, '.')).toEqual(['Through-Stuff.']);
    expect(fuzzyFilter(haystack, '\\')).toEqual(['What\'s \\ That?']);
    expect(fuzzyFilter(haystack, '|')).toEqual(['Pipe | Pipe']);
    expect(fuzzyFilter(haystack, '*')).toEqual(['You **']);

    expect(fuzzyFilter(haystack, '(?!What)')).toEqual([]);
    expect(fuzzyFilter(haystack, '(Now!)')).toEqual(['(Now!)']);
  });
});

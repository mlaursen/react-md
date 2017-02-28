/* eslint-env jest */

jest.unmock('../getField');

import getField from '../getField';

describe('getField', () => {
  it('gets the first defined field from two objects', () => {
    let o1 = { test: 'Object 1' };
    const o2 = { test: 'Object 2' };

    expect(getField(o1, o2, 'test')).toBe(o1.test);

    o1 = { test: undefined };
    expect(getField(o1, o2, 'test')).toBe(o2.test);
  });

  it('defaults to retrieving the value', () => {
    const o1 = {};
    const o2 = { value: 'test' };
    expect(getField(o1, o2)).toBe(o2.value);
    expect(getField(o1, o2, 'value')).toBe(o2.value);
  });

  it('will get a nulled field', () => {
    let o1 = { value: null };
    let o2 = { value: 'hello' };
    expect(getField(o1, o2, 'value')).toBe(null);

    o1 = { value: '' };
    expect(getField(o1, o2, 'value')).toBe('');

    o1 = {};
    o2 = { value: null };
    expect(getField(o1, o2, 'value')).toBe(null);

    o2 = { value: '' };
    expect(getField(o1, o2, 'value')).toBe('');
  });
});

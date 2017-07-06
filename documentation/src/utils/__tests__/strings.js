/* eslint-env jest */

import { toCaterpillarCase } from '../strings';

describe('toCaterpillarCase', () => {
  it('should correctly format a string', () => {
    expect(toCaterpillarCase('This is an amazing Example')).toBe('this-is-an-amazing-example');
    expect(toCaterpillarCase('Lazy/Something Else[]')).toBe('lazy-something-else');
  });
});

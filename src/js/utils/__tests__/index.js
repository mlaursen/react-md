 /*eslint-env jest*/
jest.unmock('../index');

import { isPointInCircle } from '../index';

describe('isPointInCircle', () => {
  it('returns true if an x and y coordinate are in a circle', () => {
    // 4x4 circle
    expect(isPointInCircle(2, 2, 2, 2, 2)).toBe(true);
  });

  it('returns false if an x and y coordinate are outside of a circle', () => {
    // 4x4 circle
    expect(isPointInCircle(2, 2, 2, 0, 0)).toBe(false);
  });
});

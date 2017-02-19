/* eslint-env jest */
jest.unmock('../isOutOfBounds');

import isOutOfBounds from '../isOutOfBounds';

const vThresh = 1;
const hThresh = 1;

describe('isOutOfBounds', () => {
  it('should return false if the fixedTo object is the window', () => {
    const getBoundingClientRect = jest.fn();
    const child = { getBoundingClientRect };
    const toggle = { getBoundingClientRect };

    expect(isOutOfBounds(window, child, toggle, false, vThresh, hThresh)).toBe(false);
    expect(getBoundingClientRect.mock.calls.length).toBe(0);
  });

  it('should do a lot of magic that I don\'t know how to test when the fixedTo object is not the window', () => {
    const getScreenSize = require('../getScreenSize');
    const getBoundingClientRect = jest.fn(() => ({}));
    const child = { getBoundingClientRect };
    const toggle = { getBoundingClientRect };
    const fixedTo = { getBoundingClientRect };
    expect(isOutOfBounds(fixedTo, child, toggle, false, vThresh, hThresh)).toBe(false);

    // 2 for vertical and 2 for horizontal
    expect(getBoundingClientRect.mock.calls.length).toBe(4);
    expect(getScreenSize.mock.calls.length).toBe(2);
    expect(getScreenSize).toBeCalledWith('Width');
    expect(getScreenSize).toBeCalledWith('Height');
  });
});

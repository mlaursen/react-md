/* eslint-env jest */
import isOutOfBounds from '../isOutOfBounds';
import getScreenSize from '../getScreenSize';

const vThresh = 1;
const hThresh = 1;

jest.mock('../getScreenSize');

describe('isOutOfBounds', () => {
  beforeEach(() => {
    getScreenSize.mockClear();
  });

  it('should return false if the fixedTo object is the window', () => {
    const getBoundingClientRect = jest.fn();
    const child = { getBoundingClientRect };
    const toggle = { getBoundingClientRect };

    expect(isOutOfBounds(window, child, toggle, vThresh, hThresh)).toBe(false);
    expect(getBoundingClientRect.mock.calls.length).toBe(0);
  });

  it('should do a lot of magic that I don\'t know how to test when the fixedTo object is not the window', () => {
    const child = { getBoundingClientRect: jest.fn(() => ({})) };
    const toggle = { getBoundingClientRect: jest.fn() };
    const fixedTo = { getBoundingClientRect: jest.fn(() => ({})) };
    expect(isOutOfBounds(fixedTo, child, toggle, vThresh, hThresh)).toBe(false);

    expect(child.getBoundingClientRect.mock.calls.length).toBe(2);
    expect(toggle.getBoundingClientRect.mock.calls.length).toBe(0);
    expect(fixedTo.getBoundingClientRect.mock.calls.length).toBe(2);
    expect(getScreenSize.mock.calls.length).toBe(2);
    expect(getScreenSize).toBeCalledWith('Width');
    expect(getScreenSize).toBeCalledWith('Height');
  });

  it('should check the x coordinate of the fixed to object if it exists', () => {
    const child = { getBoundingClientRect: jest.fn(() => ({})) };
    const toggle = { getBoundingClientRect: jest.fn() };
    const fixedTo = { x: { getBoundingClientRect: jest.fn(() => ({})) } };
    expect(isOutOfBounds(fixedTo, child, toggle, vThresh, hThresh)).toBe(false);

    expect(child.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(toggle.getBoundingClientRect.mock.calls.length).toBe(0);
    expect(fixedTo.x.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(getScreenSize.mock.calls.length).toBe(1);
    expect(getScreenSize).toBeCalledWith('Width');
  });

  it('should check the y coordinate of the fixed to object if it exists', () => {
    const child = { getBoundingClientRect: jest.fn(() => ({})) };
    const toggle = { getBoundingClientRect: jest.fn() };
    const fixedTo = { y: { getBoundingClientRect: jest.fn(() => ({})) } };
    expect(isOutOfBounds(fixedTo, child, toggle, vThresh, hThresh)).toBe(false);

    expect(child.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(toggle.getBoundingClientRect.mock.calls.length).toBe(0);
    expect(fixedTo.y.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(getScreenSize.mock.calls.length).toBe(1);
    expect(getScreenSize).toBeCalledWith('Height');
  });

  it('should check both the x and y coordinate of the fixed to object if it exists', () => {
    const child = { getBoundingClientRect: jest.fn(() => ({})) };
    const toggle = { getBoundingClientRect: jest.fn(() => ({})) };
    const fixedTo = {
      x: { getBoundingClientRect: jest.fn(() => ({})) },
      y: { getBoundingClientRect: jest.fn(() => ({})) },
    };
    expect(isOutOfBounds(fixedTo, child, toggle, vThresh, hThresh)).toBe(false);

    expect(child.getBoundingClientRect.mock.calls.length).toBe(2);
    expect(toggle.getBoundingClientRect.mock.calls.length).toBe(0);
    expect(fixedTo.x.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(fixedTo.y.getBoundingClientRect.mock.calls.length).toBe(1);
    expect(getScreenSize.mock.calls.length).toBe(2);
    expect(getScreenSize).toBeCalledWith('Height');
    expect(getScreenSize).toBeCalledWith('Width');
  });
});

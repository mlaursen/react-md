/* eslint-env jest */
import viewport from '../viewport';

// The viewport is 1920x1080
describe('viewport', () => {
  it('should return an empty object if there is no element', () => {
    expect(viewport()).toEqual({});
    expect(viewport(undefined)).toEqual({});
    expect(viewport(null)).toEqual({});
    expect(viewport('')).toEqual({});
    expect(viewport(false)).toEqual({});
  });

  it('should return a boolean if the element is in the viewport', () => {
    const el = document.createElement('div');
    el.getBoundingClientRect = jest.fn(() => ({ left: 16, top: 16, right: 16, bottom: 16 }));
    expect(viewport(el)).toBe(true);
  });

  it('should return an object containing all the positions that are out of the viewport', () => {
    const el = document.createElement('div');
    el.getBoundingClientRect = jest.fn(() => ({ left: -1, top: -1, right: 16, bottom: 16 }));
    expect(viewport(el)).toEqual({ left: false, top: false, bottom: true, right: true });

    el.getBoundingClientRect = jest.fn(() => ({ left: 16, top: 16, right: 1921, bottom: 1081 }));
    expect(viewport(el)).toEqual({ left: true, top: true, bottom: false, right: false });
  });
});

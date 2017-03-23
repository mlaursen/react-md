/* eslint-env jest */
/* eslint-disable max-len */
import getScroll from '../getScroll';

describe('getScroll', () => {
  it('should return the scrollX and scrollY of the object if they exist', () => {
    expect(getScroll(window)).toEqual({ x: 0, y: 0 });

    // Unable to actually modify the window's scroll here
    const o = { scrollX: 30, scrollY: 100 };
    expect(getScroll(o)).toEqual({ x: 30, y: 100 });
  });

  it('should return the scrollLeft and scrollTop of the object if they exist', () => {
    const o = { scrollLeft: 80, scrollTop: 40 };
    expect(getScroll(o)).toEqual({ x: 80, y: 40 });
  });

  it('should return the scrollX and the scrollY over the scrollLeft and scrollTop if they both exist', () => {
    const o = { scrollX: 30, scrollY: 100, scrollLeft: 80, scrollTop: 40 };
    expect(getScroll(o)).toEqual({ x: 30, y: 100 });
  });

  it('should return 0 for both x and y if the scrollX, scrollY, scrollLeft, and scrollY attributes do not exist', () => {
    expect(getScroll({})).toEqual({ x: 0, y: 0 });
  });
});

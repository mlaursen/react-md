/* eslint-env jest */
jest.unmock('../calcTimeFromPoint');

import calcTimeFromPoint from '../calcTimeFromPoint';

const CENTER = { x: 0, y: 0 };

describe('calcTimeFromPoint', () => {
  it('calculates the time correctly for 3oclock', () => {
    const point = { x: 100, y: 0 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, true)).toBe(3);
  });

  it('calculates the time no matter how big the circle is', () => {
    const point = { x: 10000000, y: 100000000 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, true)).toBe(6);
  });

  it('can calculate the time from a non zerod point', () => {
    const point = { x: 200, y: 200 };
    const center = { x: 100, y: 200 };
    expect(calcTimeFromPoint(point, center, 40, false, true)).toBe(3);
  });

  it('can get the time for the inner clock', () => {
    const point = { x: -20, y: 0 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, false)).toBe(21);
    point.x = 20;
    expect(calcTimeFromPoint(point, CENTER, 40, false, false)).toBe(15);
  });

  it('returns 0 for time at 12 oclock in a 12 hour clock', () => {
    const point = { x: 0, y: -50 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, true)).toBe(0);
  });

  it('returns 0 for time at 24', () => {
    const point = { x: 0, y: -30 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, false)).toBe(0);
  });

  it('returns 12 for time at 12 oclock for a 24 hour clock', () => {
    const point = { x: 0, y: -50 };
    expect(calcTimeFromPoint(point, CENTER, 40, false, true)).toBe(0);
  });

  it('returns 12oclock on the outside circle and 0 on the inside circle', () => {
    const twelve = { x: 0, y: -50 };
    const zero = { x: 0, y: -35 };
    expect(calcTimeFromPoint(twelve, CENTER, 40, false, false)).toBe(12);
    expect(calcTimeFromPoint(zero, CENTER, 40, false, false)).toBe(0);
  });
});

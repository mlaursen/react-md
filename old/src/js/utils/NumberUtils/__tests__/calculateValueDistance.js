/* eslint-env jest */
import calculateValueDistance from '../calculateValueDistance';

describe('calculateValueDistance', () => {
  it('should return a value and distance', () => {
    const { value, distance } = calculateValueDistance(0, 100, 0, 100, 1, 0, 100, true);
    expect(value).toBe(0);
    expect(distance).toBe(0);
  });

  it('should calculate the distance when the step is a number greater than 0 and less than 1', () => {
    expect(calculateValueDistance(25, 100, 0, 100, 0.1, 0, 100, true)).toEqual({ value: 2.5, distance: 25 });
    expect(calculateValueDistance(10, 100, 0, 100, 0.1, 0, 100, false)).toEqual({ value: 1, distance: 10 });
  });

  it('should prevent negative distance', () => {
    expect(calculateValueDistance(25, 100, 100, 100, 1, 0, 100, true)).toEqual({ value: 0, distance: 0 });
  });

  it('should prevent a distance greater than 100', () => {
    expect(calculateValueDistance(125, 100, 0, 100, 1, 0, 100, true)).toEqual({ value: 100, distance: 100 });
  });

  it('should prevent a value less than the min', () => {
    expect(calculateValueDistance(25, 100, 100, 75, 1, 25, 100, true)).toEqual({ value: 25, distance: 0 });
  });

  it('should prevent a value greater than the max', () => {
    expect(calculateValueDistance(125, 100, 0, 100, 1, 0, 100, true)).toEqual({ value: 100, distance: 100 });
  });

  it('should correctly set the value when a min value is provided', () => {
    // Each step is 3px (width / scale)
    const pageX = 6;
    const width = 210;
    const left = 0;
    const scale = 70;
    const step = 1;
    const min = 30;
    const max = 100;
    const normalized = false;
    const expected = expect.objectContaining({
      value: 32,
      distance: expect.any(Number),
    });
    expect(calculateValueDistance(pageX, width, left, scale, step, min, max, normalized)).toEqual(expected);
  });

  describe('handle min values with step < 1', () => {
    const value = 1.75;
    const pxOffset = 5;
    const width = 210;
    const left = 0;
    const step = 0.25;
    const min = 1;
    const max = 3;
    // introduce an error of pxOffset to demonstrate it is rounding to nearest step
    const pageX = (value - min) / (max - min) * width + left - pxOffset;
    const scale = (max - min) / step;
    it('should correctly round the value to the nearest step with normalized = false', () => {
      const normalized = false;
      const expected = expect.objectContaining({
        value,
        distance: (pageX - left) / width * 100,
      });
      expect(calculateValueDistance(pageX, width, left, scale, step, min, max, normalized)).toEqual(expected);
    });
    it('should correctly round the value and the distance to the nearest step with normalized = true', () => {
      // modify to test normalized calculation
      const normalized = true;
      const expected = expect.objectContaining({
        value,
        distance: (pageX + pxOffset - left) / width * 100, // it should compensate for the error introduced above
      });
      expect(calculateValueDistance(pageX, width, left, scale, step, min, max, normalized)).toEqual(expected);
    });
  });
});

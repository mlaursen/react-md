/* eslint-env jest */
jest.unmock('../NumberUtils');

import { calculateScale, isBetween } from '../NumberUtils';

describe('NumberUtils', () => {
  describe('calculateScale', () => {
    it('calculates a scale from the default min and max values', () => {
      expect(calculateScale(0, 100)).toBe(101);
    });

    it('calculates a scale from a min and max value greater than 0', () => {
      expect(calculateScale(1, 100)).toBe(100);
      expect(calculateScale(1, 3)).toBe(3);
      expect(calculateScale(1, 2)).toBe(2);
    });

    it('calculates a scale from a min and max value less than 0', () => {
      expect(calculateScale(-100, -1)).toBe(100);
      expect(calculateScale(-3, -1)).toBe(3);
      expect(calculateScale(-2, -1)).toBe(2);
    });

    it('calculates a scale from a min value less than 0 and a max value equal to 0', () => {
      expect(calculateScale(-100, 0)).toBe(101);
      expect(calculateScale(-3, 0)).toBe(4);
      expect(calculateScale(-2, 0)).toBe(3);
    });

    it('calculates a scale from a min value less than 0 and a max value greater than 0', () => {
      expect(calculateScale(-100, 1)).toBe(102);
      expect(calculateScale(-3, 5)).toBe(9);
      expect(calculateScale(-2, 100)).toBe(103);
    });
  });

  describe('isBetween', () => {
    it('returns true if a number is between the min and max values', () => {
      expect(isBetween(1, 0, 2)).toBe(true);
      expect(isBetween(-1, -2, 0)).toBe(true);
      expect(isBetween(-50, -100, 0)).toBe(true);
      expect(isBetween(50, 0, 100)).toBe(true);
    });

    it('returns true if the number is equal to the min or max values', () => {
      expect(isBetween(0, 0, 100)).toBe(true);
      expect(isBetween(0, -100, 0)).toBe(true);
      expect(isBetween(-100, -100, 100)).toBe(true);
      expect(isBetween(100, 0, 100)).toBe(true);
      expect(isBetween(5, 3, 5)).toBe(true);
    });

    it('returns false if a number is not between the min and max values', () => {
      expect(isBetween(0, 1, 100)).toBe(false);
      expect(isBetween(-101, -100, 100)).toBe(false);
      expect(isBetween(100, 1, 99)).toBe(false);
    });
  });
});

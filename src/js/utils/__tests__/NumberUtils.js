/* eslint-env jest */
jest.unmock('../NumberUtils');

import { isBetween, calculateValueDistance, updateUnit } from '../NumberUtils';

describe('NumberUtils', () => {
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

  describe('calculateValueDistance', () => {
    it('does stuff I do not really know how to test', () => {
      expect(calculateValueDistance(0, 20, 0, 100, 1, 0, 100, false)).toEqual({ distance: 0, value: 0 });
    });
  });

  describe('updateUnit', () => {
    it('applies a function to a number unit', () => {
      const fn = u => u;
      expect(updateUnit(3, fn)).toBe(3);
      expect(updateUnit(4, u => u / 2)).toBe(2);
    });

    it('applies a function to a string unit', () => {
      const fn = u => u;
      const half = u => u / 2;

      expect(updateUnit('1rem', fn)).toBe('1rem');
      expect(updateUnit('1em', fn)).toBe('1em');
      expect(updateUnit('1px', fn)).toBe('1px');

      expect(updateUnit('2rem', half)).toBe('1rem');
      expect(updateUnit('2em', half)).toBe('1em');
      expect(updateUnit('2px', half)).toBe('1px');
    });

    it('applies a function to a number unit and casts it to the given toUnit', () => {
      const fn = u => u;
      const half = u => u / 2;

      expect(updateUnit(1, fn, 'rem')).toBe('1rem');
      expect(updateUnit(1, fn, 'em')).toBe('1em');
      expect(updateUnit(1, fn, 'px')).toBe('1px');

      expect(updateUnit(2, half, 'rem')).toBe('1rem');
      expect(updateUnit(2, half, 'em')).toBe('1em');
      expect(updateUnit(2, half, 'px')).toBe('1px');
    });
  });
});

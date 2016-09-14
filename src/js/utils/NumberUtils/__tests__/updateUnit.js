/* eslint-env jest */
jest.unmock('../updateUnit');

import updateUnit from '../updateUnit';

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

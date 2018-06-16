/* eslint-env jest */

import bem from '../bem';

describe('bem', () => {
  it('should correctly join blocks', () => {
    expect(bem('md-card')).toBe('md-card');
    expect(bem('md-card', 'title')).toBe('md-card__title');
    expect(bem('md-card', 'title', 'heading', 'freddy')).toBe('md-card__title__heading__freddy');
  });

  it('should correctly apply modifiers to the blocks', () => {
    const config1 = { active: false, disabled: true };
    const config2 = { active: true, disabled: true };
    expect(bem('md-card', config1)).toBe('md-card md-card--disabled');
    expect(bem('md-card', config2)).toBe('md-card md-card--active md-card--disabled');
    expect(bem('md-card', 'title', config1)).toBe('md-card__title md-card__title--disabled');
    expect(bem('md-card', 'title', config2)).toBe('md-card__title md-card__title--active md-card__title--disabled');
  });

  it('should correctly apply remaining classnames', () => {
    const config1 = { active: false, disabled: true };
    const config2 = { 'class-1--active': true };
    expect(bem('md-card', config1, 'class-1')).toBe('md-card md-card--disabled class-1');
    expect(bem('md-card', config1, 'class-1', 'class-2')).toBe('md-card md-card--disabled class-1 class-2');

    const expected = 'md-card md-card--disabled class-1 class-2 class-1--active';
    expect(bem('md-card', config1, 'class-1', 'class-2', config2)).toBe(expected);
  });
});

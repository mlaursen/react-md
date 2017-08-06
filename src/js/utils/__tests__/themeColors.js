/* eslint-disable max-len */
/* eslint-env jest */
import themeColors from '../themeColors';

describe('themeColors', () => {
  it('should return the empty string if no parameters are provided', () => {
    expect(themeColors()).toBe('');
  });

  it('should return the empty string if an empty configuration is provided', () => {
    expect(themeColors({})).toBe('');
  });

  it('should only return the disabled color if it is enabled and themeText is true', () => {
    const expected = 'md-text--disabled';

    expect(themeColors({ disabled: true })).toBe(expected);
    expect(themeColors({ disabled: true, primary: true, secondary: true, error: true })).toBe(expected);
    expect(themeColors({ disabled: true, themeText: false })).toBe('');
  });

  it('should only return the error text when enabled and inheriting logic of disabled state', () => {
    const expected = 'md-text--error';

    expect(themeColors({ error: true, primary: true, secondary: true })).toBe(expected);
    expect(themeColors({ error: true, themeText: false })).toBe('');
  });

  it('should only return the inherit text when enabled and inheriting logic of disabled and error states', () => {
    const expected = 'md-text--inherit';

    expect(themeColors({ inherit: true, primary: true })).toBe(expected);
    expect(themeColors({ inherit: true, themeText: false })).toBe('');
  });

  it('should apply the hint text when enabled and inheriting the logic of disabled, error, and inherit states', () => {
    const expected = 'md-text--secondary';

    expect(themeColors({ hint: true })).toBe(expected);
    expect(themeColors({ hint: true, themeText: false })).toBe('');
  });

  it('should apply the primary text when enabled and inheriting the logic of disabled, error, inherit, and hint states', () => {
    const expected = 'md-text--theme-primary';

    expect(themeColors({ primary: true })).toBe(expected);
    expect(themeColors({ primary: true, hint: true })).not.toBe(expected);
    expect(themeColors({ primary: true, themeText: false })).not.toBe(expected);
  });

  it('should apply the secondary text when enabled and inheriting the logic of disabled, error, inherit, and hint states', () => {
    const expected = 'md-text--theme-secondary';

    expect(themeColors({ secondary: true })).toBe(expected);
    expect(themeColors({ secondary: true, hint: true })).not.toBe(expected);
    expect(themeColors({ secondary: true, themeText: false })).not.toBe(expected);
  });

  it('should apply the ink states correctly', () => {
    expect(themeColors({ ink: true, primary: true })).toBe('md-text--theme-primary md-ink--primary');
    expect(themeColors({ ink: true, secondary: true })).toBe('md-text--theme-secondary md-ink--secondary');
    expect(themeColors({ ink: true, primary: true, themeText: false })).not.toContain('md-text--theme-primary md-ink--primary');
    expect(themeColors({ ink: true, secondary: true, themeText: false })).not.toContain('md-text--theme-secondary md-ink--secondary');
  });

  it('should apply the base md-text class name when enabled and inheriting the logic of disabled, error, inherit, hint, primary, and secondary states', () => {
    const expected = 'md-text';

    expect(themeColors({ text: true })).toBe(expected);
    expect(themeColors({ text: true, primary: true })).not.toBe(expected);
    expect(themeColors({ text: true, secondary: true })).not.toBe(expected);
    expect(themeColors({ text: true, hint: true })).not.toBe(expected);
  });

  it('should apply the card background color when themeText is disabled and card is enabled', () => {
    const expected = 'md-background--card';

    expect(themeColors({ themeText: false, card: true })).toBe(expected);
    expect(themeColors({ card: true })).not.toBe(expected);
  });

  it('should apply the primary background color when themeText is disabled and primary is enabled', () => {
    const expected = 'md-background--primary';

    expect(themeColors({ themeText: false, primary: true })).toBe(expected);
    expect(themeColors({ primary: true })).not.toBe(expected);
  });

  it('should apply the secondary background color when themeText is disabled and secondary is enabled', () => {
    const expected = 'md-background--secondary';

    expect(themeColors({ themeText: false, secondary: true })).toBe(expected);
    expect(themeColors({ secondary: true })).not.toBe(expected);
  });

  it('should correctly apply the background hover colors', () => {
    expect(themeColors({ themeText: false, primary: true, hover: true })).toBe('md-background--primary md-background--primary-hover');
    expect(themeColors({ themeText: false, secondary: true, hover: true })).toBe('md-background--secondary md-background--secondary-hover');
    expect(themeColors({ primary: true, hover: true })).not.toBe('md-background--primary md-background--primary-hover');
    expect(themeColors({ secondary: true, hover: true })).not.toBe('md-background--secondary md-background--secondary-hover');
  });

  it('should apply the base background color when all the other states are disabled', () => {
    expect(themeColors({ themeText: false, background: true })).toBe('md-background');
  });
});

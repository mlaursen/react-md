/** @module utils/themeColors */
import cn from 'classnames';

/**
 * This is a utility function to apply the different text colors as a class name.
 *
 * @param {Object} options - The options to use to figure out which styles to apply.
 * @param {boolean?} options.text - Boolean if the base text color should attempt to be
 *    applied. This will only be applied if all the other states are not true.
 * @param {boolean?} options.disabled - Boolean if the text should be disabled.
 * @param {boolean?} options.error - Boolean if the error color should attempt to be applied.
 *    This will only be applied if the disabled state is false.
 * @param {boolean?} options.primary - Boolean if the primary color should be applied. This
 *    will only be applied if all the other states are false.
 * @param {boolean?} options.secondary - Boolean if the secondary color should be applied.
 *    This will only be applied if all the other states are false.
 * @param {boolean?} options.inherit - Boolean if the color should be inherited by a parent.
 *    This will only be applied if the error and disabled states are false.
 * @return {String} the class name
 */
export default function themeColors({
  themeText = true,
  text = false,
  background = false,
  disabled = false,
  error = false,
  hint = false,
  primary = false,
  secondary = false,
  inherit = false,
  ink = false,
  card = false,
  hover = false,
} = {}, className) {
  let colors = '';
  if (themeText) {
    if (disabled) {
      colors = 'md-text--disabled';
    } else if (error) {
      colors = 'md-text--error';
    } else if (inherit) {
      colors = 'md-text--inherit';
    } else {
      colors = cn({
        'md-text': text && !primary && !secondary && !hint,
        'md-text--secondary': hint,
        'md-text--theme-primary': !hint && primary,
        'md-text--theme-secondary': !hint && secondary,
        'md-ink--primary': ink && primary,
        'md-ink--secondary': ink && secondary,
      });
    }
  } else {
    colors = cn({
      'md-background': background && !primary && !secondary && !card,
      'md-background--card': card,
      'md-background--primary': primary,
      'md-background--primary-hover': primary && hover,
      'md-background--secondary': secondary,
      'md-background--secondary-hover': secondary && hover,
    });
  }

  return cn(colors, className);
}

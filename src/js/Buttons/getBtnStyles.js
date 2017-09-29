import cn from 'classnames';
import themeColors from '../utils/themeColors';

/**
 * Since it can be helpful to apply button styles on other components, this is a utlity function
 * to apply those styles based on props.
 */
export default function getBtnStyles({
  flat,
  raised,
  icon,
  floating,
  disabled,
  primary,
  secondary,
  hover,
  swapTheming,
  pressed,
  mini,
  fixed,
  fixedPosition,
}, ...classNames) {
  const flatStyles = flat || icon;
  const raisedStyles = raised || floating;
  const textTheming = (flatStyles && !swapTheming) || (raisedStyles && swapTheming);
  const backgroundTheming = ((!disabled && raisedStyles && !swapTheming)
    || (flatStyles && swapTheming))
    && (primary || secondary);

  return cn('md-btn', {
    'md-btn--flat': flat || (disabled && raised),
    'md-btn--raised': !disabled && raised,
    'md-btn--icon': icon || floating,
    'md-btn--floating': floating,
    'md-btn--text': flat || raised,
    'md-btn--hover': !disabled && hover,
    'md-btn--raised-disabled': disabled && raised,
    'md-btn--raised-pressed': !disabled && raisedStyles && pressed,
    'md-btn--fixed': fixed,
    [`md-btn--fixed-${fixedPosition}`]: floating && fixed,
    'md-btn--floating-mini': floating && mini,
    'md-btn--color-primary-active': !disabled && primary && hover && textTheming,
    'md-btn--color-secondary-active': !disabled && secondary && hover && textTheming,
    'md-pointer--hover': !disabled,
    'md-paper md-paper--2': !disabled && floating,
    'md-paper--4': !disabled && floating && pressed,
  }, themeColors({
    text: !icon && !floating && !backgroundTheming,
    themeText: !backgroundTheming,
    disabled,
    primary,
    secondary,
    hover: true,
    ink: true,
  }), ...classNames);
}

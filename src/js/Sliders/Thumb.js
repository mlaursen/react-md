import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import AccessibleFakeButton from '../Helpers/AccessibleFakeButton';

/**
 * The `Thumb` component is the little ball for the slider.
 */
export default class Thumb extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    thumbLeft: PropTypes.string.isRequired,
    on: PropTypes.bool,
    off: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    dragging: PropTypes.bool,
    discrete: PropTypes.bool,
  };

  render() {
    const {
      style,
      className,
      on,
      off,
      active,
      disabled,
      dragging,
      thumbLeft,
      discrete,
      ...props
    } = this.props;

    return (
      <AccessibleFakeButton
        disabled={disabled}
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-thumb', className, {
          'md-slider-thumb--active': active,
          'md-slider-thumb--dragging': dragging,
          'md-slider-thumb--disabled': disabled,
          'md-slider-thumb--on': on,
          'md-slider-thumb--continuous-off': !discrete && off,
          'md-slider-thumb--discrete': discrete,
          'md-slider-thumb--discrete-on': discrete && active && on,
          'md-slider-thumb--discrete-off': discrete && !disabled && off,
          'md-slider-thumb--discrete-active': discrete && active,
          'md-slider-thumb--discrete-active-off': discrete && active && off,
        })}
      />
    );
  }
}

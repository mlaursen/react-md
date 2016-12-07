import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class FloatingLabel extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    floating: PropTypes.bool,
    error: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    iconOffset: PropTypes.bool,
    customSize: PropTypes.string,
    htmlFor: PropTypes.string,
  };

  render() {
    const {
      label,
      htmlFor,
      className,
      floating,
      active,
      error,
      disabled,
      iconOffset,
      customSize,
      ...props
    } = this.props;

    if (!label) {
      return null;
    }

    return (
      <label
        {...props}
        htmlFor={htmlFor}
        className={cn('md-floating-label', {
          'md-floating-label--active': !error && active,
          'md-floating-label--error': !disabled && error,
          'md-floating-label--inactive': !floating,
          'md-floating-label--inactive-sized': !floating && !customSize,
          [`md-floating-label--${customSize}`]: customSize,
          [`md-floating-label--inactive-${customSize}`]: customSize && !floating,
          'md-floating-label--floating': floating,
          'md-floating-label--disabled': disabled,
          'md-floating-label--icon-offset': iconOffset,
        }, className)}
      >
        {label}
      </label>
    );
  }
}

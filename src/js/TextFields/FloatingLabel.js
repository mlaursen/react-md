import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class FloatingLabel extends PureComponent {
  static propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node,
    floating: PropTypes.bool,
    floatingLabel: PropTypes.bool,
    error: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    iconOffset: PropTypes.bool,
    customSize: PropTypes.string,
  };

  render() {
    const {
      label,
      className,
      floating,
      floatingLabel,
      active,
      error,
      disabled,
      iconOffset,
      customSize,
      ...props,
    } = this.props;
    if (!label || !floatingLabel) {
      return null;
    }

    return (
      <span
        {...props}
        className={cn('md-floating-label', className, {
          'md-floating-label--active': !error && active,
          'md-floating-label--error': error,
          'md-floating-label--inactive': !floating && !customSize,
          'md-floating-label--floating': floating,
          'md-floating-label--disabled': disabled,
          'md-floating-label--icon-offset': iconOffset,
          [`md-floating-label--${customSize}`]: customSize && !floating,
        })}
      >
        {label}
      </span>
    );
  }
}

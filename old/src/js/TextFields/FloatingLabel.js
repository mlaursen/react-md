import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';

export default class FloatingLabel extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.node,
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
          'md-floating-label--inactive': !floating,
          'md-floating-label--inactive-sized': !floating && !customSize,
          [`md-floating-label--${customSize}`]: customSize,
          [`md-floating-label--inactive-${customSize}`]: customSize && !floating,
          'md-floating-label--floating': floating,
          'md-floating-label--icon-offset': iconOffset,
        }, themeColors({
          disabled,
          error,
          hint: !active,
          primary: active,
        }, className))}
      >
        {label}
      </label>
    );
  }
}

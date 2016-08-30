import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * This component is used for rendering the floating label for a text field.
 */
export default class FloatingLabel extends PureComponent {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  render() {
    const { active, error, required, value, disabled } = this.props;
    let { label } = this.props;
    if (required && label.indexOf('*') === -1) {
      label = `${label.trim()} *`;
    }

    const className = cn('md-floating-label', {
      error,
      disabled,
      'focus': active,
      'active': active || value !== '',
    });

    return <span className={className}>{label}</span>;
  }
}

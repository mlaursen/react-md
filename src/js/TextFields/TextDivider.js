import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class TextDivider extends PureComponent {
  static propTypes = {
    block: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.bool,
    lineDirection: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const {
      block,
      active,
      error,
      lineDirection,
      className,
      ...props,
    } = this.props;
    if (block) {
      return null;
    }

    return (
      <hr
        {...props}
        className={cn('md-text-field-divider', className, {
          [`md-text-field-divider--from-${lineDirection}`]: lineDirection,
          'md-text-field-divider--active': active,
          'md-text-field-divider--error': error,
        })}
      />
    );
  }
}

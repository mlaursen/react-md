import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Divider from '../Dividers/Divider';

export default class TextFieldDivider extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    active: PropTypes.bool,
    error: PropTypes.bool,
    lineDirection: PropTypes.oneOf(['left', 'center', 'right']),
  };

  render() {
    const { active, error, lineDirection, className, ...props } = this.props;
    return (
      <Divider
        {...props}
        className={cn(`md-divider--text-field md-divider--expand-from-${lineDirection}`, {
          'md-divider--text-field-expanded': active,
          'md-divider--text-field-active': !error && active,
          'md-divider--text-field-error': error,
        }, className)}
      />
    );
  }
}

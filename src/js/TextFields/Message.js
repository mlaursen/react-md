import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class Message extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { active, children, className } = this.props;

    if (!children) {
      return null;
    }

    return (
      <span
        aria-hidden={!active}
        className={cn(
          'md-text-field-message',
          `md-text-field-message--${active ? '' : 'in'}active`,
          className
        )}
      >
        {children}
      </span>
    );
  }
}

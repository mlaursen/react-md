import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

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
      <p
        aria-hidden={!active}
        className={cn(
          'md-text-field-message',
          `md-text-field-message--${active ? '' : 'in'}active`,
          className
        )}
      >
        {children}
      </p>
    );
  }
}

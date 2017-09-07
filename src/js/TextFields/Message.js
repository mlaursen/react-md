import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
      <div
        aria-hidden={!active}
        className={cn(
          'md-text-field-message',
          `md-text-field-message--${active ? '' : 'in'}active`,
          className
        )}
      >
        {children}
      </div>
    );
  }
}

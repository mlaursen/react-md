import React, { PureComponent } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
export default class DialogTitle extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { children, className, ...props } = this.props;

    if (!children) {
      return null;
    }

    return (
      <h2 {...props} className={cn('md-title md-title--dialog', className)}>
        {children}
      </h2>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class List extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    ordered: PropTypes.object,
    children: PropTypes.node,
  };

  render() {
    const { className, ordered, children, ...props } = this.props;
    const Component = ordered ? 'ol' : 'ul';
    return (
      <Component {...props} className={cn('md-list', className)}>
        {children}
      </Component>
    );
  }
}

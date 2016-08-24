import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import injectInk from '../Inks';
import AccessibleFakeButton from '../Buttons/AccessibleFakeButton';

class ListTile extends PureComponent {
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    tabIndex: PropTypes.number,

    // Injected from injectInk
    ink: PropTypes.node,
  };

  static defaultProps = {
    tabIndex: 0,
  };

  render() {
    const { ink, children, className, ...props } = this.props;
    return (
      <AccessibleFakeButton {...props} className={cn('md-list-tile', className)}>
        {ink}
        {children}
      </AccessibleFakeButton>
    );
  }
}

export default injectInk(ListTile);

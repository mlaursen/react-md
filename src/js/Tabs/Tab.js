import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

export default class Tab extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    children: PropTypes.node,

    active: PropTypes.bool,
    index: PropTypes.number,
    onTabClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    const { index, onTabClick, onClick, children } = this.props;
    if (onClick) {
      onClick(index, e);
    }

    if (onTabClick) {
      onTabClick(index, children, e);
    }
  }

  render() {
    const { className, label, icon, active, index, ...props } = this.props;
    delete props.onTabClick;

    return (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._handleClick}
        className={cn('md-tab', {
          'md-tab--first': index === 0,
          'md-tab--active': active,
          'md-tab--inactive': !active,
          'md-tab--icon': label && icon,
        }, className)}
      >
        {icon}
        {label ? <div>{label}</div> : null}
      </AccessibleFakeInkedButton>
    );
  }
}

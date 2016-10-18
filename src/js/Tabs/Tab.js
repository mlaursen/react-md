import React, { PureComponent, PropTypes, Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

export default class Tab extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.node,
    icon: PropTypes.element,
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
    const { className, active, ...props } = this.props;
    delete props.icon;
    delete props.index;
    delete props.label;
    delete props.onTabClick;

    let { icon, label } = this.props;
    if (icon) {
      const iconEl = Children.only(icon);
      icon = cloneElement(icon, {
        className: cn('md-icon--tab', iconEl.props.className),
      });
    }

    if (isValidElement(label)) {
      const labelEl = Children.only(label);
      label = cloneElement(label, {
        className: cn('md-tab-label', labelEl.props.className),
      });
    } else {
      label = <div className="md-tab-label">{label}</div>;
    }


    return (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._handleClick}
        className={cn('md-tab', {
          'md-tab--active': active,
          'md-tab--inactive': !active,
          'md-tab--icon': label && icon,
        }, className)}
      >
        {icon}
        {label}
      </AccessibleFakeInkedButton>
    );
  }
}

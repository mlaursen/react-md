import React, { PureComponent, Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import themeColors from '../utils/themeColors';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons';

/**
 * The `BottomNav` component is used for rendering the navigation tab/link in the `BottomNavigation`
 * component.
 */
export default class BottomNav extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    active: PropTypes.bool,
    fixed: PropTypes.bool,
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired,
    colored: PropTypes.bool,
    iconChildren: PropTypes.node,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
    onNavChange: PropTypes.func,
    role: PropTypes.string,
    animate: PropTypes.bool,
    icon: PropTypes.element,
  };

  static defaultProps = {
    component: 'a',
    role: null,
  };

  _handleClick = (e) => {
    const { onClick, onNavChange, index } = this.props;
    if (onClick) {
      onClick(index, e);
    }

    if (onNavChange) {
      onNavChange(index, e);
    }
  };

  render() {
    const {
      active,
      fixed,
      className,
      colored,
      animate,

      // deprecated
      iconClassName,
      iconChildren,
      /* eslint-disable no-unused-vars */
      index,
      icon: propIcon,
      label: propLabel,
      onClick,
      onNavChange,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    let { label, icon } = this.props;
    const labelClassName = cn('md-bottom-nav-label', { 'md-bottom-nav-label--shifting-inactive': !active && !fixed });
    if (Children.count(label) === 1 && isValidElement(label)) {
      const labelEl = Children.only(label);
      label = cloneElement(label, {
        className: cn(labelClassName, labelEl.props.className),
      });
    } else {
      label = <div className={labelClassName}>{label}</div>;
    }

    if (!icon && (iconClassName || iconChildren)) {
      // Deprecated
      icon = <FontIcon iconClassName={iconClassName} inherit>{iconChildren}</FontIcon>;
    } else if (icon) {
      icon = React.cloneElement(icon, { inherit: true });
    }

    return (
      <AccessibleFakeInkedButton
        {...props}
        onClick={this._handleClick}
        className={cn('md-bottom-nav', {
          'md-bottom-nav--active': active,
          'md-bottom-nav--fixed': fixed,
          'md-bottom-nav--shifting': !fixed,
          'md-bottom-nav--shifting-active': !fixed && active,
          'md-bottom-nav--shifting-inactive': !fixed && !active,
        }, themeColors({ primary: !colored && active, text: !active && !colored }, className))}
      >
        {icon}
        <Collapse collapsed={!fixed && !active} animate={animate}>
          {label}
        </Collapse>
      </AccessibleFakeInkedButton>
    );
  }
}

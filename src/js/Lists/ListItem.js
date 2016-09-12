import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import TileAddon from './TileAddon';
import ListItemText from './ListItemText';

export default class ListItem extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tileStyle: PropTypes.object,
    tileClassName: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,

    primaryText: PropTypes.node,
    secondaryText: PropTypes.node,
    leftIcon: PropTypes.node,
    leftAvatar: PropTypes.node,
    rightIcon: PropTypes.node,
    rightAvatar: PropTypes.node,
    threeLines: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      style,
      className,
      tileStyle,
      tileClassName,
      disabled,
      tabIndex,
      leftIcon,
      leftAvatar,
      rightIcon,
      rightAvatar,
      primaryText,
      secondaryText,
      threeLines,
      children,
    } = this.props;

    const leftNode = <TileAddon icon={leftIcon} avatar={leftAvatar} />;
    const rightNode = <TileAddon icon={rightIcon} avatar={rightAvatar} />;
    const icond = !!leftIcon || !!rightIcon;
    const avatard = !!leftAvatar || !!rightAvatar;

    return (
      <li
        style={style}
        className={cn('md-list-item', className)}
      >
        <AccessibleFakeInkedButton
          tabIndex={tabIndex}
          disabled={disabled}
          style={tileStyle}
          className={cn('md-list-tile', {
            'md-list-tile--icon': !secondaryText && icond && !avatard,
            'md-list-tile--avatar': !secondaryText && avatard,
            'md-list-tile--two-lines': secondaryText && !threeLines,
            'md-list-tile--three-lines': secondaryText && threeLines,
          }, tileClassName)}
        >
          {leftNode}
          <ListItemText
            primaryText={primaryText}
            secondaryText={secondaryText}
            threeLines={threeLines}
            className={cn({
              'md-tile-content--left-icon': leftIcon,
              'md-tile-content--left-avatar': leftAvatar,
              'md-tile-content--right-padding': rightIcon || rightAvatar,
            })}
          />
          {rightNode}
          {children}
        </AccessibleFakeInkedButton>
      </li>
    );
  }
}

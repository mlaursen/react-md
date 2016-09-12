import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class TileAddon extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    icon: PropTypes.node,
    avatar: PropTypes.node,
  };

  render() {
    const { icon, avatar, active, activeClassName } = this.props;
    if (!icon && !avatar) {
      return null;
    }

    let avatarIcon = false;
    if (avatar) {
      const avatarChild = React.Children.only(avatar);
      if (avatarChild.props.iconSized) {
        avatarIcon = true;
      }
    }
    return (
      <div
        className={cn('md-tile-addon', {
          'md-tile-addon--icon': icon || avatarIcon,
          'md-tile-addon--avatar': avatar && !avatarIcon,
          [activeClassName]: active,
        })}
      >
        {icon || avatar}
      </div>
    );
  }
}

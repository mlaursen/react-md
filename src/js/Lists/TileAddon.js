import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `TileAddon` component is used to render either a `FontIcon` or an `Avatar`
 * next to the `ListTileText` for a `ListItem`.
 */
export default class TileAddon extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    icon: PropTypes.node,
    avatar: PropTypes.node,
  };

  render() {
    const { icon, avatar, active, activeClassName, style, className } = this.props;
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
        style={style}
        className={cn('md-tile-addon', {
          'md-tile-addon--icon': icon || avatarIcon,
          'md-tile-addon--avatar': avatar && !avatarIcon,
          [activeClassName]: active,
        }, className)}
      >
        {icon || avatar}
      </div>
    );
  }
}

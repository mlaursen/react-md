import React, { PureComponent, PropTypes } from 'react';

export default class TileAddon extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    avatar: PropTypes.node,
  };

  render() {
    const { icon, avatar } = this.props;
    if (!icon && !avatar) {
      return null;
    }

    return (
      <div className="md-tile-addon">
        {icon || avatar}
      </div>
    );
  }
}

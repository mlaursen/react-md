import React, { PureComponent, PropTypes } from 'react';

import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';

export default class StateChip extends PureComponent {
  static propTypes = {
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  _handleRemove = () => {
    this.props.onClick(this.props.state);
  };

  render() {
    const { state: { name, abbreviation }, ...props } = this.props;
    return (
      <Chip
        {...props}
        onClick={this._handleRemove}
        removable
        label={name}
        avatar={<Avatar random>{abbreviation.charAt(0)}</Avatar>}
      />
    );
  }
}

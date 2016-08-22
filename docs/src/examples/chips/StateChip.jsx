import React, { PureComponent, PropTypes } from 'react';

import Avatar from 'react-md/lib/Avatars';
import Chip from 'react-md/lib/Chips';

export default class StateChip extends PureComponent {
  static propTypes = {
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  _remove = () => {
    this.props.onRemove(this.props.state);
  };

  render() {
    const { name, abbreviation } = this.props.state;
    return (
      <Chip
        label={name}
        remove={this._remove}
      >
        <Avatar random>{abbreviation.charAt(0)}</Avatar>
      </Chip>
    );
  }
}

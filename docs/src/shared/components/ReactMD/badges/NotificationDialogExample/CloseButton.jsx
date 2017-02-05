import React, { PureComponent, PropTypes } from 'react';
import FontIcon from 'react-md/lib/FontIcons';

export default class CloseButton extends PureComponent {
  static propTypes = {
    index: PropTypes.number,
    dismiss: PropTypes.func.isRequired,
  };

  _handleClick = (e) => {
    // Don't propagate to close dialog listener
    e.stopPropagation();
    this.props.dismiss(this.props.index);
  };

  render() {
    return (
      <button
        type="button"
        onClick={this._handleClick}
        className="md-btn md-pointer--hover notification-close"
        aria-controls="example-notifications"
      >
        <FontIcon>close</FontIcon>
      </button>
    );
  }
}

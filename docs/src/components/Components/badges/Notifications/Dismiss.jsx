import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';

export default class Dismiss extends PureComponent {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = (e) => {
    e.stopPropagation();
    this.props.onClick(this.props.index);
  };

  render() {
    const { cardId } = this.props;
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className="md-btn md-pointer--hover badges__notifications__notification__close"
        aria-controls={cardId}
      >
        <FontIcon>close</FontIcon>
      </button>
    );
  }
}

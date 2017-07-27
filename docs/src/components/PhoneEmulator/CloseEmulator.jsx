import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

export default class CloseEmulator extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  };

  static contextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.context.hideDemo(e);
  };

  render() {
    return <Button {...this.props} onClick={this.handleClick} />;
  }
}

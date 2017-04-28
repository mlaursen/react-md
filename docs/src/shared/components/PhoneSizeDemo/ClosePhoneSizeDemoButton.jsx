import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

export default class ClosePhoneSizeDemoButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'arrow_back',
  };

  static contextTypes = {
    hideDemo: PropTypes.func,
  };

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.context.hideDemo) {
      this.context.hideDemo(e);
    }
  };

  render() {
    return <Button {...this.props} onClick={this._handleClick} />;
  }
}

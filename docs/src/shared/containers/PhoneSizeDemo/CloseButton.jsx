import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

export default class CloseButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: 'arrow_back',
  };

  static contextTypes = {
    hideDemo: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.context.hideDemo) {
      this.context.hideDemo();
    }
  }

  render() {
    return <Button {...this.props} onClick={this._handleClick} waitForInkTransition />;
  }
}

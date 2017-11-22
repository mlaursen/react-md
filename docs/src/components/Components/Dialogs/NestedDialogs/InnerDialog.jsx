import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogContainer } from 'react-md';

export default class InnerDialog extends PureComponent {
  static propTypes = {
    fixed: PropTypes.bool,
  };

  state = { visible: false };
  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { fixed } = this.props;

    return [
      <Button key="button" raised secondary onClick={this.show}>Show Dialog</Button>,
      <DialogContainer
        id="inner-dialog"
        key="inner-dialog"
        title="Inner Dialog"
        onHide={this.hide}
        visible={visible}
        portal={fixed}
        lastChild={fixed}
        disableScrollLocking={fixed}
        renderNode={document.body}
        actions={[{
          id: 'dialog-cancel',
          children: 'Cancel',
          onClick: this.hide,
        }, {
          id: 'dialog-confirm',
          children: 'Ok',
          onClick: this.hide,
        }]}
      >
        <p>This is an inner dialog!</p>
      </DialogContainer>,
    ];
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogContainer, DatePicker } from 'react-md';

import InnerDialog from './InnerDialog';

export default class MainDialog extends PureComponent {
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
      <Button key="button" onClick={this.show} raised>Show Dialog</Button>,
      <DialogContainer
        id="main-dialog"
        key="main-dialog"
        title="Nested Example"
        onHide={this.hide}
        visible={visible}
      >
        <InnerDialog fixed={fixed} />
        <DatePicker
          id="date-1"
          label="Date"
          portal={fixed}
          lastChild={fixed}
          disableScrollLocking={fixed}
          renderNode={document.body}
        />
      </DialogContainer>,
    ];
  }
}

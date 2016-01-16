import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { RaisedButton, FlatButton } from 'react-md/Buttons';
import Dialog from 'react-md/Dialogs';

export default class ModalDialogExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  render() {
    return (
      <div>
        <RaisedButton label="Open modal dialog" onClick={this.open} />
        <Dialog
          isOpen={this.state.isOpen}
          title="Use Google's location service?"
          modal
          actions={[
            <FlatButton
              key="disagree"
              onClick={this.close}
              secondary
              label="Disagree"
            />,
            <FlatButton
              key="agree"
              onClick={this.close}
              primary
              label="Agree"
            />,
          ]}
          close={this.close}
          style={{ maxWidth: '320px' }}
          >
          <p>
            Let Google help apps determine location. This means
            sending anonymouse location data to Google, even
            when no apps are running.
          </p>
        </Dialog>
      </div>
    );
  }
}

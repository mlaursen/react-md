import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Snackbar from 'react-md/lib/Snackbars';
import { RaisedButton, FloatingButton } from 'react-md/lib/Buttons';

import FakePhone from '../../FakePhone';

const connectionToast = {
  text: 'Connection timed out. Showing limited messages.',
  action: {
    label: 'Retry',
    onClick: () => alert('You tried again for some reason..'),
  },
};
const sentToast = {
  text: 'Sent',
  action: 'Undo',
};
const TOASTS = [connectionToast, sentToast];

export default class SnackbarExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { toasts: [], phoneToasts: [] };
  }

  addToast = (text, action) => {
    this.setState({
      toasts: this.state.toasts.concat([{
        key: new Date().getTime() + '',
        text,
        action,
      }]),
    });
  };

  addToasts = () => {
    this.setState({
      toasts: this.state.toasts.concat(TOASTS.map(({ action, ...props }, i) => {
        if(typeof action !== 'string') {
          const { onClick } = action;
          action.onClick = () => {
            onClick && onClick();
            this.removeToast();
          };
        }

        return {
          key: new Date().getTime() + `-${i}`,
          action,
          ...props,
        };
      })),
    });
  };

  removeToast = () => {
    let toasts = this.state.toasts.slice();
    toasts.shift();
    this.setState({ toasts });
  };

  addPhoneToasts = () => {
    this.setState({ phoneToasts: this.state.phoneToasts.concat([{
      text: 'This item already has the label "travel". You can add a new label.',
      action: 'Undo',
    }, {
      text: 'Archived',
      action: 'Undo',
    }])});
  };

  removePhoneToast = () => {
    let phoneToasts = this.state.phoneToasts.slice();
    phoneToasts.shift();
    this.setState({ phoneToasts });
  };

  render() {
    const { toasts, phoneToasts } = this.state;
    const [toast] = toasts;
    const isToasting = !!toast;
    const autohide = isToasting && (toast.action === 'Ok' || toast.action === null);
    return (
      <div>
        <div className="fake-phone-container">
          <div className="btn-group">
            <h4 className="md-title">Desktop Notifications</h4>
            <RaisedButton
              primary
              onClick={this.addToast.bind(this, 'Hello, World!', null)}
              label="Toast hellow world!"
            />
            <RaisedButton
              primary
              onClick={this.addToast.bind(this, 'Something happened', 'Retry')}
              label="Toast that requires action to dismiss"
            />
            <RaisedButton
              primary
              onClick={this.addToast.bind(this, 'This is some long text to show the multiline feature of a toast. This requires an additional prop.', 'Ok')}
              label="Toast multiple lines"
            />
            <RaisedButton primary onClick={this.addToasts} label="Chained toasts" />
          </div>
          <FakePhone primary={true} className="with-fixed-fab">
            <p style={{ padding: '1em' }}>Click the Floating Action Button to see toasts in a mobile device</p>
            <FloatingButton
              fixed
              secondary
              onClick={this.addPhoneToasts}
              className={phoneToasts[0] ? 'floating-active' : null}
              >
              add
            </FloatingButton>
            <Snackbar
              toasts={phoneToasts}
              dismiss={this.removePhoneToast}
              multiline={phoneToasts[0] && phoneToasts[0].text !== 'Archived'}
            />
          </FakePhone>
        </div>
        <Snackbar
          toasts={toasts}
          dismiss={this.removeToast}
          multiline={isToasting && toast.text.length > 60}
          autohide={autohide}
        />
      </div>
    );
  }
}

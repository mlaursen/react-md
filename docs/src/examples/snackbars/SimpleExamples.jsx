import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Snackbar from 'react-md/lib/Snackbars';

const MOBILE_MULTILINE = 'This item has the label "travel". You can add a new label.';
const DESKTOP_MULTILINE = `There aren't really any examples of a multiline snackbar on non-mobile devices.
I am not sure if it is really supported since these are supposed to be short messages.`;

@connect(({ ui: { media: { mobile } } }) => ({ mobile }))
export default class SimpleExamples extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
      autohide: true,
    };

    this._addToast = this._addToast.bind(this);
    this._removeToast = this._removeToast.bind(this);
    this._toastHello = this._toastHello.bind(this);
    this._toastRetry = this._toastRetry.bind(this);
    this._toastMultiple = this._toastMultiple.bind(this);
    this._toastMultiline = this._toastMultiline.bind(this);
  }

  _addToast(text, action) {
    const toasts = this.state.toasts.slice();
    toasts.push({ text, action });
    const autohide = !action || action === 'Ok';

    this.setState({ toasts, autohide });
  }

  _removeToast() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  _toastHello() {
    this._addToast('Hello, World!');
  }

  _toastRetry() {
    this._addToast('Something Happened.', 'Retry');
  }

  _toastMultiple() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'Sent', action: 'Undo' });

    toasts.push({
      text: 'Connection timed out. Showing limited messages.',
      action: {
        label: 'Retry',
        onClick: () => {
          alert('You tried again for some reason..'); // eslint-disable-line no-alert
        },
      },
    });

    this.setState({ toasts, autohide: true });
  }


  _toastMultiline() {
    this._addToast(this.props.mobile ? MOBILE_MULTILINE : DESKTOP_MULTILINE);
  }

  render() {
    return (
      <div className="btn-group">
        <Button raised label="Toast Hello, World" onClick={this._toastHello} />
        <Button raised label="Toast Multiple Lines" onClick={this._toastMultiline} />
        <Button raised label="Require Action to Dismiss" onClick={this._toastRetry} />
        <Button raised label="Chain Toasts" onClick={this._toastMultiple} />
        <Snackbar {...this.state} onDismiss={this._removeToast} />
      </div>
    );
  }
}

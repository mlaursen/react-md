import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Snackbar } from 'react-md';

const MOBILE_MULTILINE = 'This item has the label "travel". You can add a new label.';
const DESKTOP_MULTILINE = `There aren't really any examples of a multiline snackbar on non-mobile devices.
I am not sure if it is really supported since these are supposed to be short messages.`;

export class SimpleExamples extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool,
  };

  state = { toasts: [], autohide: true };

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  toastHello = () => {
    this.addToast('Hello, World!');
  };

  toastMultiline = () => {
    this.addToast(this.props.mobile ? MOBILE_MULTILINE : DESKTOP_MULTILINE);
  };

  toastRetry = () => {
    this.addToast('Something happened...', 'Retry', false);
  };

  chainToasts = () => {
    this.addToast('Sent', 'Undo');
    this.addToast('Connection timed out. Showing limited messages.', {
      children: 'Retry',
      onClick: () => {
        alert('You tried again for some reason...'); // eslint-disable-line no-alert
      },
    });
  };

  render() {
    const { toasts, autohide } = this.state;

    return (
      <div className="buttons__group">
        <Button raised onClick={this.toastHello}>
          Toast Hello, World!
        </Button>
        <Button raised onClick={this.toastMultiline}>
          Toast multiple lines
        </Button>
        <Button raised onClick={this.toastRetry}>
          Require action to dismiss
        </Button>
        <Button raised onClick={this.chainToasts}>
          Chain toasts
        </Button>
        <Snackbar
          id="example-snackbar"
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />
      </div>
    );
  }
}

export default connect(({ media: { mobile } }) => ({ mobile }))(SimpleExamples);

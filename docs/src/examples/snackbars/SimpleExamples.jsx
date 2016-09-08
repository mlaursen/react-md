/* eslint-disable react/jsx-no-bind,no-alert */
import React, { PureComponent } from 'react';
import Snackbar from 'react-md/lib/Snackbars';
import Button from 'react-md/lib/Buttons';

export default class SnackbarExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
      autohide: true,
    };
  }

  _addToast = (text, action) => {
    const toasts = this.state.toasts.slice();
    toasts.push({
      key: Date.now(),
      text,
      action,
    });
    const autohide = action === null || action === 'Ok';

    this.setState({ toasts, autohide });
  };

  _addToasts = () => {
    const toasts = this.state.toasts.slice();
    toasts.push({
      text: 'Sent',
      action: 'Undo',
    });

    toasts.push({
      text: 'Connection timed out. Showing limited messages.',
      action: {
        label: 'Retry',
        onClick: () => {
          alert('You tried again for some reason..');
        },
      },
    });

    this.setState({ toasts, autohide: true });
  };

  // Pops the first toast off of the stack of toasts.
  // Make sure to make a new array object since it won't update
  // the snackbar otherwise.
  _dismissToast = () => {
    const toasts = this.state.toasts.slice();
    toasts.shift();
    this.setState({ toasts });
  };

  render() {
    const { toasts, autohide } = this.state;

    return (
      <div className="btn-group">
        <Button
          raised
          label="Toast Hello, world!"
          onClick={this._addToast.bind(this, 'Hello, World!', null)}
        />
        <Button
          raised
          label="Require action to dismiss"
          onClick={this._addToast.bind(this, 'Something Happend', 'Retry')}
        />
        <Button
          raised
          label="Mutliple Line Toast"
          onClick={this._addToast.bind(this, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non metus finibus, ultrices odio eget.', 'Ok')}
        />
        <Button
          raised
          label="Chained Toasts"
          onClick={this._addToasts}
        />
        <Snackbar
          toasts={toasts}
          dismiss={this._dismissToast}
          autohide={autohide}
        />
      </div>
    );
  }
}

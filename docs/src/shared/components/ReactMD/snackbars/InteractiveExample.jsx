import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Snackbar from 'react-md/lib/Snackbars';
import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

// https://en.wikipedia.org/wiki/Speed_reading
const AVERAGE_WPM = 200;
const AVERAGE_WPS = AVERAGE_WPM / 60;

const noop = e => {
  e.preventDefault();
};

export default class SimpleExamples extends PureComponent {
  state = {
    toasts: [],
    text: 'Hello, World!',
    action: '',
    autohide: true,
  };

  _addToast = () => {
    const { text, action } = this.state;
    const toasts = this.state.toasts.slice();
    toasts.push({ text, action });

    const words = text.split(' ').length;
    const autohideTimeout = Math.max(
      Snackbar.defaultProps.autohideTimeout,
      (words / AVERAGE_WPS) * 1000
    );

    this.setState({ toasts, autohideTimeout });
  };

  _removeToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  _handleTextChange = (text) => {
    this.setState({ text });
  };

  _handleActionChange = (action) => {
    this.setState({ action, autohide: this.state.autohide || !action });
  };

  _handleAutohideChange = (autohide) => {
    this.setState({ autohide });
  };

  _reset = () => {
    this.setState({ text: '', action: '', autohide: true, autohideTimeout: undefined });
  };

  render() {
    const { text, action, toasts, autohide } = this.state;
    return (
      <form className="md-grid md-text-container" onSubmit={noop}>
        <TextField
          id="toastText"
          label="Toast's Text"
          value={text}
          className="md-cell md-cell--4 md-cell--6-desktop"
          onChange={this._handleTextChange}
        />
        <TextField
          id="toastAction"
          label="Toast's Action"
          value={action}
          className="md-cell md-cell--4 md-cell--6-desktop"
          onChange={this._handleActionChange}
        />
        <footer
          className="md-cell md-cell--12 md-dialog-footer md-dialog-footer--inline"
          style={{ alignItems: 'center', margin: 0 }}
        >
          <SelectionControl
            id="toastAutohide"
            type="checkbox"
            name="autohide"
            checked={autohide}
            className="snackbar-generator-checkbox"
            onChange={this._handleAutohideChange}
            disabled={!action}
            label="Autohide"
          />
          <Button
            raised
            secondary
            disabled={!text}
            type="submit"
            label="Toast"
            onClick={this._addToast}
            className="md-btn--dialog md-cell--right"
          />
          <Button
            raised
            type="reset"
            label="Reset"
            className="md-btn--dialog"
            onClick={this._reset}
          />
        </footer>
        <Snackbar toasts={toasts} autohide={autohide} onDismiss={this._removeToast} />
      </form>
    );
  }
}

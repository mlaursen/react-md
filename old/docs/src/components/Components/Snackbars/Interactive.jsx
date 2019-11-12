import React, { PureComponent } from 'react';
import {
  Button,
  CardActions,
  SelectionControl,
  Snackbar,
  TextField,
} from 'react-md';

import './_interactive.scss';

export default class Interactive extends PureComponent {
  state = {
    toasts: [],
    text: 'Hello, World!',
    action: '',
    autohide: true,
    autohideTimeout: Snackbar.defaultProps.autohideTimeout,
    target: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.submitButton && !this.state.toasts.length && prevState.toasts.length) {
      // Since there is currently no focus management built into the Snackbar, you will manually
      // need to re-focus the previous element once the toast is dismissed
      this.submitButton.focus();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, action } = this.state;
    const toasts = this.state.toasts.slice();
    toasts.push({ text, action });

    this.setState({ toasts });
  };

  handleReset = () => {
    this.setState({
      text: '',
      action: '',
      autohide: true,
      autohideTimeout: Snackbar.defaultProps.autohideTimeout,
      toasts: [],
    });
  };

  dismiss = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  updateText = (text) => {
    this.setState({ text });
  };

  updateAction = (action) => {
    this.setState({ action, autohide: this.state.autohide || !action });
  };

  updateAutohide = (autohide) => {
    this.setState({ autohide });
  };

  updateAutohideTimeout = (value) => {
    const autohideTimeout = value ? parseInt(value, 10) : '';
    this.setState({ autohideTimeout });
  };

  render() {
    const {
      text,
      action,
      toasts,
      autohide,
      autohideTimeout,
    } = this.state;

    return (
      <form className="md-grid md-text-container snackbars__interactive" onSubmit={this.handleSubmit} onReset={this.handleReset}>
        <TextField
          id="interactive-snackbar-text"
          name="text"
          label="Toast's text"
          placeholder="Hello, World!"
          required
          className="md-cell md-cell--4 md-cell--6-desktop"
          value={text}
          onChange={this.updateText}
        />
        <TextField
          id="interactive-snackbar-action"
          label="Toast's action"
          name="action"
          className="md-cell md-cell--4 md-cell--6-desktop"
          value={action}
          onChange={this.updateAction}
        />
        <TextField
          id="interactive-snackbar-autohide-timeout"
          label="Autohide timeout (ms)"
          type="number"
          name="autohide-timeout"
          required
          value={autohideTimeout}
          onChange={this.updateAutohideTimeout}
          className="md-cell"
        />
        <CardActions className="md-cell md-cell--12">
          <SelectionControl
            id="interactive-snackbar-autohide"
            type="checkbox"
            name="autohide"
            label="Autohide"
            checked={autohide}
            disabled={!action}
            className="snackbars__interactive__checkbox"
            onChange={this.updateAutohide}
          />
          <Button
            id="interactive-snackbar-submit"
            raised
            secondary
            disabled={!text || !autohideTimeout}
            type="submit"
            className="md-btn--dialog md-cell--right"
            ref={(c) => { this.submitButton = c; }}
          >
            Toast
          </Button>
          <Button
            id="interactive-snackbar-reset"
            raised
            type="reset"
            className="md-btn--dialog"
          >
            Reset
          </Button>
        </CardActions>
        <Snackbar
          id="interactive-snackbar"
          toasts={toasts}
          autohide={autohide}
          autohideTimeout={autohideTimeout || Snackbar.defaultProps.autohideTimeout}
          autoFocusAction
          onDismiss={this.dismiss}
        />
      </form>
    );
  }
}

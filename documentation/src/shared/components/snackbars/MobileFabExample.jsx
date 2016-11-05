import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import loremIpsum from 'lorem-ipsum';
import Snackbar from 'react-md/lib/Snackbars';
import Button from 'react-md/lib/Buttons/Button';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';

export default class MobileFabExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { toasts: [] };
    this._addToast = this._addToast.bind(this);
    this._removeToast = this._removeToast.bind(this);
    this._setFAB = this._setFAB.bind(this);
  }

  _addToast() {
    const toasts = this.state.toasts.slice();
    toasts.push({
      text: loremIpsum({ count: 8, units: 'words' }),
      action: 'Ok',
    });

    this.setState({ toasts });
  }

  _removeToast() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }

  _setFAB(fab) {
    this._fab = fab;
    if (fab !== null) {
      this._phone = findDOMNode(fab).parentNode;
    }
  }

  render() {
    const { toasts } = this.state;

    return (
      <PhoneSizeDemo contentClassName="container">
        <p className="phone-size-text">
          Click the Floating Action Button to create a lorem ipsum toast.
          When you include a reference to a FAB, it will be moved when a
          toast is created.
        </p>
        <Button floating fixed secondary onClick={this._addToast} ref={this._setFAB}>add</Button>
        <Snackbar
          toasts={toasts}
          onDismiss={this._removeToast}
          fab={this._fab}
          className="phone-demo-snackbar"
          renderNode={this._phone}
        />
      </PhoneSizeDemo>
    );
  }
}

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import loremIpsum from 'lorem-ipsum';
import Snackbar from 'react-md/lib/Snackbars';
import Button from 'react-md/lib/Buttons';

import PhoneSize from 'components/PhoneSize';

export default class MobileFabExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { toasts: [], fab: null };
  }

  componentDidMount() {
    this.setState({ fab: findDOMNode(this.refs.fab) }); // eslint-disable-line react/no-did-mount-set-state
  }

  _addToast = () => {
    const toasts = this.state.toasts.slice();
    toasts.push({
      key: Date.now(),
      text: loremIpsum({ count: 8, units: 'words' }),
      action: 'Ok',
    });

    this.setState({ toasts });
  };

  _dismiss = () => {
    const toasts = this.state.toasts.slice();
    toasts.shift();

    this.setState({ toasts });
  };

  render() {
    const { toasts, fab } = this.state;

    return (
      <PhoneSize contentClassName="container">
        <p className="md-body-1">
          Click the Floating Action Button to create a lorem ipsum toast.
          When you include a reference to a FAB, it will be moved when a
          toast is created.
        </p>
        <Button floating ref="fab" fixed secondary onClick={this._addToast}>add</Button>
        <Snackbar toasts={toasts} dismiss={this._dismiss} fab={fab} />
      </PhoneSize>
    );
  }
}

import React, { PureComponent } from 'react';
import FileInput from 'react-md/lib/FileInputs';
import Snackbar from 'react-md/lib/Snackbars';

import './_file-inputs.scss';

export default class FileInputExamples extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { toasts: [] };
  }

  _dismiss = () => {
    const toasts = this.state.toasts.slice();
    toasts.shift();

    this.setState({ toasts });
  };

  _handleFileSelect = (file) => {
    const toasts = this.state.toasts.slice();

    if (!file) {
      toasts.push({ text: 'You did not select new file.' });
    } else {
      toasts.push({ text: `${file.name} has been selected.` });
    }

    this.setState({ toasts });
  };

  render() {
    const { toasts } = this.state;

    return (
      <div className="md-grid file-input-grid">
        <FileInput id="imageInput" onChange={this._handleFileSelect} accept="image/*" name="images" />
        <FileInput
          id="imageInput1"
          onChange={this._handleFileSelect}
          accept="image/*"
          primary
          name="images-1"
        />
        <FileInput
          id="imageInput2"
          onChange={this._handleFileSelect}
          accept="image/*"
          name="images-2"
          secondary
          flat
          iconBefore
        />
        <FileInput id="imageInputDisabled" disabled onChange={this._handleFileSelect} accept="image/*" name="images-disabled" />
        <FileInput
          id="imageInput1Disabled"
          onChange={this._handleFileSelect}
          accept="image/*"
          name="images-disabled-1"
          primary
          disabled
        />
        <FileInput
          id="imageInput2Disabled"
          onChange={this._handleFileSelect}
          accept="image/*"
          name="images-2-disabled"
          secondary
          flat
          iconBefore
          disabled
        />
        <Snackbar toasts={toasts} onDismiss={this._dismiss} />
      </div>
    );
  }
}

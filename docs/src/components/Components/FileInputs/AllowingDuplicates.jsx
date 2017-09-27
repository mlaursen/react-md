import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileInput from 'react-md/lib/FileInputs/FileInput';
import TextField from 'react-md/lib/TextFields';
import Snackbar from 'react-md/lib/Snackbars';

import { QUOTATION_MARK } from 'constants/unicode';

// Cheating a bit since I just want some space between the button and the text field
// just like the icon, so only include the onChange from props and the className
// that is cloned in by the TextField for icons.
const Input = ({ onChange, className }) => (
  <FileInput
    id="duplicate-file-selection"
    label="Choose file"
    accept="image/*,video/*"
    onChange={onChange}
    className={className}
    primary
    iconBefore
    allowDuplicates
  />
);

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default class AllowingDuplicates extends PureComponent {
  state = { value: '', fileName: '', toasts: [] };

  handleChange = ({ name }, e) => {
    const { value } = e.target;
    const toasts = [
      ...this.state.toasts, {
        text: `${this.state.value === value ? 'The onChange event would not have been triggered again for' : 'Selected'} ${name}`,
      },
    ];
    this.setState({ value, fileName: name, toasts });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  render() {
    const { value, fileName, toasts } = this.state;

    return (
      <div>
        <p>The current value of the input would be:</p>
        <pre><code>{`${QUOTATION_MARK}${value}${QUOTATION_MARK}`}</code></pre>
        <TextField
          id="duplicate-file-selection-field"
          placeholder="No file chosen"
          value={fileName}
          readOnly
          leftIcon={<Input onChange={this.handleChange} />}
        />
        <Snackbar id="duplicate-file-messages" toasts={toasts} onDismiss={this.dismissToast} />
      </div>
    );
  }
}

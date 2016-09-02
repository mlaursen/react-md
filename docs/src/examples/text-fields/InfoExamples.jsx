import React, { PureComponent } from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

export default class InfoExamples extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: 'Wow, look at me!',
    };

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="block-text-field-examples">
        <TextField
          id="maxLenTitle"
          label="Title"
          maxLength={20}
          value={this.state.value}
          onChange={this._handleChange}
          helpOnFocus
          helpText="I am help text that appears only on focus"
        />
        <TextField
          id="homePhone"
          label="Phone"
          type="tel"
          helpText="Your home phone number"
          leftIcon={<FontIcon>phone</FontIcon>}
        />
        <TextField
          id="errorTitle"
          label="Title"
          defaultValue="I am amazing"
          error
          errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going."
          style={{ maxWidth: 320 }}
        />
        <TextField
          id="helpMultiline"
          label="Description"
          placeholder="Whatchu thinkin' bout?"
          rows={2}
          maxRows={4}
          helpText="I am a multiline text field that has 2 rows."
        />
      </div>
    );
  }
}

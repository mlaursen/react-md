import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TextField from 'react-md/TextFields';
// import { TextField } from 'react-md';

import FontIcon from 'react-md/FontIcon';

export default class TextFieldExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <TextField label="Title" />
        <TextField
          label="Title"
          helpText="I am help text that appears only on focus."
          helpOnFocus
          maxLength={20}
        />
        <TextField
          label="Title"
          defaultValue="I am amazing"
          errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going."
        />
        <TextField label="Position" floatingLabel={false} helpText="I am a single line with help text." />
        <TextField
          label="Phone"
          floatingLabel={false}
          icon={<FontIcon>phone</FontIcon>}
          type="tel"
        />
        <TextField label="I am required" required />
        <TextField label="I am disabled" disabled />
        <TextField label="I am a single line disabled" floatingLabel={false} disabled />
        <TextField
          label="Description"
          placeholder="Enter some amazing description"
          rows={2}
          maxRows={4}
          helpText="I am a multiline text field that has 2 rows."
        />
        <TextField
          label="Description"
          placeholder="What are you thinking about today?"
          rows={2}
          maxRows={-1}
          maxLength={1000}
        />
      </div>
    );
  }
}

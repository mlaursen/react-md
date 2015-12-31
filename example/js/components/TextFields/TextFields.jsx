import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DocPage from '../../DocPage';
import { TextField } from '../../../../src/js';

export default class TextFields extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        imports={['TextField']}
        examples={[
          <TextField label="Title" />,
          <TextField label="Title" helpText="I am help text that appears only on focus." helpOnFocus maxLength={20} />,
          <TextField label="Title" errorText="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going." />,
          <TextField label="Position" singleLine helpText="I am a single line with help text." />,
          <TextField label="I am required" required />,
          <TextField label="I am disabled" disabled />,
          <TextField label="I am a single line disabled" singleLine disabled />,
          <TextField
            label="Description"
            placeholder="Enter some amazing description"
            rows={2}
            helpText="I am a multiline text field that has 2 rows."
          />,
        ]}
        components={[{
          component: TextField,
          details: [],
        }]}
      />
    );
  }
}

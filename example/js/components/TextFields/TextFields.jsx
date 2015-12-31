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
          <TextField label="Hello world!" maxLength={50} />,
          <TextField label="I am required" required />,
          <TextField label="I am disabled" disabled />,
          <TextField label="Single line" singleLine />,
          <TextField label="I am a single line disabled" singleLine disabled />,
          <TextField label="Title" errorMessage="This is an example of some error message. It should automatically wrap lines as well. It just keeps going and going and going." />,
        ]}
        components={[{
          component: TextField,
          details: [],
        }]}
      />
    );
  }
}

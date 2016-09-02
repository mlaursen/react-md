import React from 'react';
import TextField from 'react-md/lib/TextFields';

const FloatingLabelExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      id="floatingTitle"
      label="Title"
      placeholder="Hello World"
      customSize="title"
      size={10}
    />
    <TextField
      id="floatingCenterTitle"
      label="Title"
      lineDirection="center"
      placeholder="Hello World"
    />
    <TextField
      id="floatingMultiline"
      label="Type many letters"
      lineDirection="right"
      rows={2}
      placeholder="Hello World"
    />
    <TextField
      id="floatingPassword"
      label="Enter your password"
      type="password"
    />
  </div>
);

export default FloatingLabelExamples;

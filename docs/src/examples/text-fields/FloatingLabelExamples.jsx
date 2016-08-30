import React from 'react';
import TextField from 'react-md/lib/TextFields';

const FloatingLabelExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      label="Title"
      placeholder="Hello World"
      customSize="title"
      size={10}
      floatingLabel
    />
    <TextField label="Title" lineDirection="center" floatingLabel />
    <TextField label="Type many letters" lineDirection="right" multiline maxRows={4} floatingLabel />
    <TextField label="Enter your password" type="password" floatingLabel />
  </div>
);

export default FloatingLabelExamples;

import React from 'react';
import TextField from 'react-md/lib/TextFields';

const FloatingLabelExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      label="Title"
      placeholder="Hello World"
      className="md-title-text-field"
      size={10}
    />
    <TextField label="Title" lineDirection="center" />
    <TextField label="Type many letters" lineDirection="right" rows={2} maxRows={4} />
    <TextField label="Enter your password" type="password" />
  </div>
);

export default FloatingLabelExamples;

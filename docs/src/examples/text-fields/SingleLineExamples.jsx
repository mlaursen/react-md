import React from 'react';
import TextField from 'react-md/lib/TextFields';

const SingleLineExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      label="Title"
      size={10}
      customSize="title"
      lineDirection="right"
    />
    <TextField label="Title" floatingLabel={false} />
    <TextField
      label="Type many letters"
      multiline
      maxRows={4}
    />
    <TextField label="Enter your password" type="password" floatingLabel={false} />
  </div>
);

export default SingleLineExamples;

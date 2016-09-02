import React from 'react';
import TextField from 'react-md/lib/TextFields';

const SingleLineExamples = () => (
  <div className="block-text-field-examples">
    <TextField
      id="singleRightTitle"
      placeholder="Title"
      size={10}
      customSize="title"
      lineDirection="right"
    />
    <TextField id="singleTitle" placeholder="Title" />
    <TextField
      id="singleMultiline"
      placeholder="Type many letters"
      rows={2}
    />
    <TextField id="singlePassword" placeholder="Enter your password" type="password" />
  </div>
);

export default SingleLineExamples;

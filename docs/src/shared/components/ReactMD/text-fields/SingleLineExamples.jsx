import React from 'react';
import TextField from 'react-md/lib/TextFields';

const SingleLineExamples = () => (
  <div className="md-grid">
    <TextField
      id="singleRightTitle"
      placeholder="Title"
      size={10}
      customSize="title"
      lineDirection="right"
      className="md-cell md-cell--bottom"
    />
    <TextField id="singleTitle" placeholder="Title" className="md-cell md-cell--bottom" />
    <TextField
      id="singleMultiline"
      placeholder="Type many letters"
      rows={2}
      className="md-cell md-cell--bottom"
    />
    <TextField id="singlePassword" placeholder="Enter your password" type="password" className="md-cell md-cell--bottom" />
  </div>
);

export default SingleLineExamples;

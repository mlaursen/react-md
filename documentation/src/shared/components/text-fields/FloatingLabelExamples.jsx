import React from 'react';
import TextField from 'react-md/lib/TextFields';

const FloatingLabelExamples = () => (
  <div className="md-grid">
    <TextField
      id="floatingTitle"
      label="Title"
      placeholder="Hello World"
      customSize="title"
      size={10}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floatingCenterTitle"
      label="Title"
      lineDirection="center"
      placeholder="Hello World"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floatingMultiline"
      label="Type many letters"
      lineDirection="right"
      rows={2}
      placeholder="Hello World"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floatingPassword"
      label="Enter your password"
      type="password"
      className="md-cell md-cell--bottom"
    />
  </div>
);

export default FloatingLabelExamples;

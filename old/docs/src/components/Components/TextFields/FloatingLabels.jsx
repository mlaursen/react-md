import React from 'react';
import { TextField } from 'react-md';

const FloatingLabels = () => (
  <div className="md-grid">
    <TextField
      id="floating-center-title"
      label="Title"
      lineDirection="center"
      placeholder="Hello World"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floating-multiline"
      label="Type many letters"
      lineDirection="right"
      rows={2}
      placeholder="Hello World"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="floating-password"
      label="Enter your password"
      type="password"
      className="md-cell md-cell--bottom"
    />
  </div>
);
export default FloatingLabels;

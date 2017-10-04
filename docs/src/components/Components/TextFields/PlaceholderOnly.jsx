import React from 'react';
import { TextField } from 'react-md';

const PlaceholderOnly = () => (
  <div className="md-grid">
    <TextField id="placeholder-only-title" placeholder="Title" className="md-cell md-cell--bottom" />
    <TextField
      id="placeholder-only-multiline"
      placeholder="Type many letters"
      rows={2}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="placeholder-only-password"
      placeholder="Enter your password"
      type="password"
      className="md-cell md-cell--bottom"
    />
  </div>
);

export default PlaceholderOnly;

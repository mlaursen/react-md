import React from 'react';
import { FontIcon, TextField } from 'react-md';

const DisabledFields = () => (
  <div className="md-grid">
    <TextField
      id="disabled-floating-label-field"
      label="Disabled label"
      disabled
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabled-placeholder-field"
      placeholder="Disabled placeholder"
      disabled
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabled-floating-label-multiline-field"
      label="Disabled multiline"
      rows={2}
      disabled
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabled-placeholder-multiline-field"
      placeholder="Disabled multiline placeholder"
      rows={2}
      disabled
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabled-floating-label-with-icon"
      label="Disabled label with icon"
      disabled
      className="md-cell md-cell--bottom"
      leftIcon={<FontIcon>date_range</FontIcon>}
    />
  </div>
);

export default DisabledFields;

import React from 'react';
import TextField from 'react-md/lib/TextFields';

const StatefulAdditions = () => (
  <div className="md-grid">
    <h4 className="md-cell md-cell--12">Disabled</h4>
    <TextField
      id="disabled-floating-label"
      label="Disabled"
      placeholder="..."
      disabled
      className="md-cell"
    />
  </div>
);

export default StatefulAdditions;

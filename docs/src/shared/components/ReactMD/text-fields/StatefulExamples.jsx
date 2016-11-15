import React from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';


const StatefulExamples = () => (
  <div className="md-grid">
    <TextField
      id="iconLeftPhone"
      label="Phone"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="iconRightPhone"
      placeholder="Phone"
      type="tel"
      rightIcon={<FontIcon>phone</FontIcon>}
      size={10}
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="requiredField"
      label="I am required"
      required
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="requiredPhone"
      label="Phone *"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
      required
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabledText"
      label="Help, I am disabled"
      className="md-cell md-cell--bottom"
      disabled
    />
    <TextField
      id="disabledPhone"
      label="Phone"
      type="tel"
      leftIcon={<FontIcon>phone</FontIcon>}
      size={10}
      disabled
      className="md-cell md-cell--bottom"
    />
    <TextField
      id="disabledMultiline"
      label="Try to type many letters"
      placeholder="But you can't.."
      rows={2}
      maxRows={4}
      disabled
      className="md-cell md-cell--bottom"
    />
  </div>
);

export default StatefulExamples;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, TextField } from 'react-md';

const Configuration = ({ onChange, onSubmit }) => (
  <form name="with-scrolling-content-form" onChange={onChange} onSubmit={onSubmit}>
    <Checkbox
      id="scrolling-dialog-title"
      name="dialog-content-title"
      defaultChecked
      label="Display title?"
    />
    <Checkbox
      id="scrolling-dialog-footer"
      name="dialog-content-footer"
      defaultChecked
      label="Display footer?"
    />
    <TextField id="scrolling-dialog-height" label="Height" placeholder="400" />
    <TextField id="scrolling-dialog-width" label="Width" placeholder="800" />
    <Button type="submit" raised>
      Show Dialog
    </Button>
  </form>
);

Configuration.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Configuration;

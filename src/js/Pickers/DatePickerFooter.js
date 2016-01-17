import React, { PropTypes } from 'react';

import { FlatButton } from '../Buttons';

const DatePickerFooter = ({ cancelLabel, onCancelClick, okLabel, onOkClick }) => {
  return (
    <footer className="md-dialog-footer md-date-picker-footer">
      <FlatButton primary onClick={onCancelClick} label={cancelLabel} />
      <FlatButton primary onClick={onOkClick} label={okLabel} />
    </footer>
  );
};

DatePickerFooter.propTypes = {
  cancelLabel: PropTypes.string.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  okLabel: PropTypes.string.isRequired,
  onOkClick: PropTypes.func.isRequired,
};

export default DatePickerFooter;

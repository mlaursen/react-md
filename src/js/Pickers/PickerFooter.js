import React, { PropTypes } from 'react';
import { FlatButton } from '../Buttons';

const PickerFooter = ({ okLabel, okPrimary, onOkClick, cancelLabel, cancelPrimary, onCancelClick }) => {
  return (
    <footer className="md-dialog-footer">
      <FlatButton
        primary={cancelPrimary}
        secondary={!cancelPrimary}
        label={cancelLabel}
        onClick={onCancelClick}
      />
      <FlatButton
        primary={okPrimary}
        secondary={!okPrimary}
        label={okLabel}
        onClick={onOkClick}
      />
    </footer>
  );
};

PickerFooter.propTypes = {
  okLabel: PropTypes.string.isRequired,
  okPrimary: PropTypes.bool.isRequired,
  onOkClick: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  cancelPrimary: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default PickerFooter;

import React, { PropTypes } from 'react';

import Dialog from '../Dialogs';

const PickerDialog = ({ isOpen, close, children }) => {
  return (
    <Dialog isOpen={isOpen} close={close} onlyChildren={true}>
      {isOpen && <div className="md-picker">{children}</div>}
    </Dialog>
  );
};

PickerDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default PickerDialog;

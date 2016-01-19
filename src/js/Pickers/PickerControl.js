import React, { PropTypes } from 'react';
import classnames from 'classnames';

const PickerControl = ({ active, onClick, children }) => {
  return (
    <button
      type="button"
      className={classnames('md-picker-control', { active })}
      onClick={onClick}
      >
      {children}
    </button>
  );
};

PickerControl.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PickerControl;

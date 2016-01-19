import React, { PropTypes } from 'react';
import classnames from 'classnames';

const PickerHeader = ({ children, className, ...props }) => {
  return (
    <header className={classnames('md-picker-header', className)} {...props}>
      {children}
    </header>
  );
};

PickerHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PickerHeader;

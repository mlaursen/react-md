import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ActionArea = ({ children, className, ...props }) => (
  <div className={classnames('action-area', className)} {...props}>
    {children}
  </div>
);

ActionArea.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ActionArea;

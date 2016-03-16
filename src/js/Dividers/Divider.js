import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Divider = ({ className, inset, vertical, ...props}) => (
  <hr
    role="divider"
    className={classnames('md-divider', className, { inset, vertical })}
    {...props}
  />
);

Divider.propTypes = {
  className: PropTypes.string,
  inset: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Divider;

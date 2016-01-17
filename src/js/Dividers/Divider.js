import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { isPropEnabled } from '../utils/PropUtils';

const Divider = (className, ...props) => (
  <hr
    role="divider"
    className={classnames('md-divider', className, {
      'inset': isPropEnabled(props, 'inset'),
      'vertical': isPropEnabled(props, 'vertical'),
    })}
    {...props}
  />
);

Divider.propTypes = {
  inset: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Divider;

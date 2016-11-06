import React, { PropTypes } from 'react';
import cn from 'classnames';

const VariableFormat = ({ children, className }) => (
  <pre className={cn('lang-scss', className)}>
    <code className="hljs-variable">
      {children}
    </code>
  </pre>
);

VariableFormat.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default VariableFormat;

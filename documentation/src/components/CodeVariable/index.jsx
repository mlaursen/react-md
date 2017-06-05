import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CodeVariable = ({ children, className }) => (
  <pre className={cn('language-scss', className)}>
    <code className="language-scss">
      {children}
    </code>
  </pre>
);

CodeVariable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CodeVariable;

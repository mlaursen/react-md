import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Prism from 'prismjs';

function highlight(code) {
  if (code) {
    Prism.highlightElement(code);
  }
}

const CodeVariable = ({ children, className }) => (
  <pre className={cn('language-css', className)} ref={highlight}>
    {children}
  </pre>
);

CodeVariable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CodeVariable;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Prism from 'prismjs';

import './_styles.scss';

function highlight(code) {
  if (code) {
    Prism.highlightElement(code);
  }
}

const CodeVariable = ({ children, className, lang, component: Component }) => (
  <Component className={cn(`code-variable language-${lang}`, className)} ref={highlight}>
    {children}
  </Component>
);

CodeVariable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
  component: PropTypes.oneOf(['pre', 'code']).isRequired,
};

CodeVariable.defaultProps = {
  lang: 'scss',
  component: 'code',
};

export default CodeVariable;

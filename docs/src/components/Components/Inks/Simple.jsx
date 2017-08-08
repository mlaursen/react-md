import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import injectInk from 'react-md/lib/Inks';

import './_styles.scss';

const Button = ({ ink, className, children, ...props }) => (
  <button type="button" className={cn('button', className)} {...props}>
    {ink}
    {children}
  </button>
);

Button.propTypes = {
  ink: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const InkedButton = injectInk(Button);

const Simple = () => (
  <div className="inks__examples">
    <InkedButton>Hello, World!</InkedButton>
    <InkedButton disabled>Disabled button</InkedButton>
    <InkedButton inkDisabled>Only ink disabled</InkedButton>
    <InkedButton disabledInteractions={['mouse', 'keyboard']}>
      Disable desktop inks
    </InkedButton>
  </div>
);

export default Simple;

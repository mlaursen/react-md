import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from 'react-md';

const LinkButton = ({ children, className, ...props }) => (
  <Button className={cn('md-cell--right', className)} {...props}>
    {children}
  </Button>
);

LinkButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default LinkButton;

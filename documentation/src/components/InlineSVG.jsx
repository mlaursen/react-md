import React, { PropTypes } from 'react';

/* eslint-disable react/no-danger */
const InlineSVG = ({ component: Component, src, ...props }) => (
  <Component {...props} dangerouslySetInnerHTML={{ __html: src }} />
);

InlineSVG.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  src: PropTypes.string.isRequired,
};

InlineSVG.defaultProps = {
  component: 'div',
};

export default InlineSVG;

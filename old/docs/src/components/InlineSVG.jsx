import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */
const InlineSVG = ({ component: Component, src, ...props }) => (
  <Component {...props} dangerouslySetInnerHTML={{ __html: src }} />
);

InlineSVG.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  src: PropTypes.string.isRequired,
};

InlineSVG.defaultProps = {
  component: 'div',
};

export default InlineSVG;

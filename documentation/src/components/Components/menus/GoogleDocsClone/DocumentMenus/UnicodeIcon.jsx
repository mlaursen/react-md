import React from 'react';
import PropTypes from 'prop-types';

const UnicodeIcon = ({ children }) => <span className="menus__google-docs__unicode-icon md-text-center">{children}</span>;
UnicodeIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnicodeIcon;

import React from 'react';
import PropTypes from 'prop-types';
import { Version as ReactMDVersion } from 'react-md';

const Version = ({ version }) => (
  <p className="md-text-right md-cell md-cell--12">
    Current version <i>{version}</i>
  </p>
);

Version.propTypes = {
  version: PropTypes.string,
};

Version.defaultProps = {
  version: ReactMDVersion,
};

export default Version;

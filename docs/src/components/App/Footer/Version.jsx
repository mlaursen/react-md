import React from 'react';
import PropTypes from 'prop-types';
import { VERSION } from 'constants/application';

const Version = ({ version }) => (
  <p className="md-text-right md-cell md-cell--12">
    Current version <i>{version}</i>
  </p>
);

Version.propTypes = {
  version: PropTypes.string,
};

Version.defaultProps = {
  version: VERSION,
};

export default Version;

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Version as ReactMDVersion } from 'react-md';

const Version = ({ version }) => (
  <Cell component="p" className="md-text-right" size={12}>
    Current version <i>{version}</i>
  </Cell>
);

Version.propTypes = {
  version: PropTypes.string,
};

Version.defaultProps = {
  version: ReactMDVersion,
};

export default Version;

import React, { PropTypes } from 'react';

import { NotFound } from 'routes';

const Customization = ({ match: { params: { section, component } }, history }) => {
  if (component === 'autocompletes') {
    return null;
  } else if (section === 'pickers') {
    return null;
  }

  return <NotFound history={history} />;
};

Customization.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Customization;

import React, { PropTypes } from 'react';
import { components, sections } from 'constants/navItems';

import { NotFound, ExamplesPage } from 'routes';

const Customization = (props) => {
  const { match: { params: { section, component } }, history } = props;
  if (components.indexOf(component) === -1 || (section && sections.indexOf(section) === -1)) {
    return <NotFound history={history} />;
  }

  return <ExamplesPage {...props} />;
};

Customization.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Customization;

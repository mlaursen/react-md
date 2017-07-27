import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import DocumentTitle from './DocumentTitle';
import Account from './Account';
import DocumentMenus from './DocumentMenus';

const DocumentToolbar = ({ hide }) => (
  <Toolbar
    nav={<Button icon onClick={hide}>arrow_back</Button>}
    title={<DocumentTitle />}
    className="menus__google-docs__toolbar md-background--card"
    fixed
    zDepth={1}
  >
    <Account />
    <DocumentMenus />
  </Toolbar>
);

DocumentToolbar.propTypes = {
  hide: PropTypes.func,
};

export default DocumentToolbar;

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import BadgeWithDialog from './BadgeWithDialog';

const ToolbarWithBadge = ({ notifications, onDismiss }) => (
  <Toolbar
    colored
    nav={<Button icon>menu</Button>}
    title="Example"
    actions={<BadgeWithDialog notifications={notifications} onDismiss={onDismiss} />}
  />
);

ToolbarWithBadge.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
export default ToolbarWithBadge;

import React, { PropTypes } from 'react';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import KebabMenu from 'components/KebabMenu';

const actions = [
  <Button icon key="delete">delete</Button>,
  <KebabMenu key="kebab" items={['Waka', 'Waka Waka']} />,
];

const SelectedToolbar = ({ selected, className, ...props }) => (
  <Toolbar {...props} actions={actions} className={cn('table-controls-toolbar', className)}>
    <div className="md-title--toolbar">{}</div>
  </Toolbar>
);

SelectedToolbar.propTypes = {
  selected: PropTypes.number,
  className: PropTypes.string,
};

export default SelectedToolbar;

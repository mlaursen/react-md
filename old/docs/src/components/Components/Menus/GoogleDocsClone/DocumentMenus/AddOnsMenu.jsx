import React from 'react';

import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [
  'Get add-ons...', {
    primaryText: 'Manage add-ons...',
    disabled: true,
  },
];

const AddOnsMenu = props => <DocumentMenu {...props} id="add-ons" text="Add-ons" menuItems={MENU_ITEMS} />;
export default AddOnsMenu;

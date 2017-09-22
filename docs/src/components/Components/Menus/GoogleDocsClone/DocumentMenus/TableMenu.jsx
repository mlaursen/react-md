import React from 'react';

import { DIVIDER } from './constants';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [{
  primaryText: 'Insert table',
  nestedItems: [],
}, {
  primaryText: 'Insert row above',
  disabled: true,
}, {
  primaryText: 'Insert row below',
  disabled: true,
}, {
  primaryText: 'Insert column left',
  disabled: true,
}, {
  primaryText: 'Insert column right',
  disabled: true,
}, DIVIDER, {
  primaryText: 'Delete row',
  disabled: true,
}, {
  primaryText: 'Delete column',
  disabled: true,
}, {
  primaryText: 'Delete table',
  disabled: true,
}, DIVIDER, {
  primaryText: 'Distribute rows',
  disabled: true,
}, {
  primaryText: 'Distribute columns',
  disabled: true,
}, DIVIDER, {
  primaryText: 'Merge cells',
  disabled: true,
}, {
  primaryText: 'Unmerge cells',
  disabled: true,
}, DIVIDER, {
  primaryText: 'Table properties',
  disabled: true,
}];

const TableMenu = props => <DocumentMenu {...props} id="table" text="Table" menuItems={MENU_ITEMS} />;
export default TableMenu;

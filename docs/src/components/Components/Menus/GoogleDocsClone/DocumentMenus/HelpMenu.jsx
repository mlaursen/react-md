import React from 'react';
import TextField from 'react-md/lib/TextFields';

import { ALT } from 'constants/unicode';
import { DIVIDER } from './constants';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [
  <TextField
    key="search"
    id="google-docs-search-menus"
    placeholder={`Search the menus (${ALT}+/)`}
    block
    paddedBlock={false}
    className="menus__google-docs__search"
    type="search"
  />, DIVIDER,
  'Docs Help',
  DIVIDER,
  'Report a problem',
  'Report abuse/copyright',
  DIVIDER,
  'Keyboard shortcuts',
];

const HelpMenu = () => <DocumentMenu id="help" text="Help" menuItems={MENU_ITEMS} />;
export default HelpMenu;

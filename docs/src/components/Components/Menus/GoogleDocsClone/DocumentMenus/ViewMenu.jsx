import React from 'react';
import { FontIcon } from 'react-md';

import { CONTROL, SHIFT } from 'constants/unicode';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';
import CheckboxListItem from './CheckboxListItem';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [
  <CheckboxListItem
    id="google-docs-print-layout"
    key="print-layout"
    name="view-options"
    label="Print Layout"
    defaultChecked
  />, {
    primaryText: 'Mode',
    nestedItems: [{
      primaryText: 'Editing',
      secondaryText: 'Edit document directly',
      tileClassName: ICON_TILE_CLASS_NAME,
      leftIcon: <FontIcon>mode_edit</FontIcon>,
    }, {
      primaryText: 'Suggesting',
      secondaryText: 'Edits become suggestions',
      tileClassName: ICON_TILE_CLASS_NAME,
      leftIcon: <FontIcon>insert_emoticon</FontIcon>,
    }, {
      primaryText: 'Viewing',
      secondaryText: 'Read or print final document',
      tileClassName: ICON_TILE_CLASS_NAME,
      leftIcon: <FontIcon>remove_red_eye</FontIcon>,
    }],
  }, DIVIDER,
  <CheckboxListItem
    id="google-docs-show-ruler"
    key="show-ruler"
    name="view-options"
    label="Show ruler"
    defaultChecked
  />,
  <CheckboxListItem
    id="google-docs-show-equation-toolbar"
    key="show-equation-toolbar"
    name="view-options"
    label="Show equation toolbar"
  />,
  <CheckboxListItem
    id="google-docs-show-spelling-suggestions"
    key="show-spelling-suggestions"
    name="view-options"
    label="Show spelling suggestions"
    defaultChecked
  />, {
    primaryText: 'Compact controls',
    rightIcon: `${CONTROL}+${SHIFT}+F`,
  }, 'Full screen',
];

const ViewMenu = props => <DocumentMenu {...props} id="view" text="View" menuItems={MENU_ITEMS} />;
export default ViewMenu;

import React from 'react';
import { FontIcon } from 'react-md';

import { COMMAND, SHIFT } from 'constants/unicode';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [{
  primaryText: 'Undo',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>undo</FontIcon>,
  rightIcon: `${COMMAND}+Z`,
}, {
  primaryText: 'Redo',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>redo</FontIcon>,
  rightIcon: `${COMMAND}+Y`,
}, DIVIDER, {
  primaryText: 'Cut',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>content_cut</FontIcon>,
  rightIcon: `${COMMAND}+X`,
}, {
  primaryText: 'Copy',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>content_copy</FontIcon>,
  rightIcon: `${COMMAND}+C`,
}, {
  primaryText: 'Paste',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>content_paste</FontIcon>,
  rightIcon: `${COMMAND}+V`,
}, {
  primaryText: 'Paste without formatting',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>content_paste</FontIcon>,
  rightIcon: `${COMMAND}+${SHIFT}+V`,
}, {
  primaryText: 'Web clipboard',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>assignment</FontIcon>,
  nestedItems: [{
    primaryText: 'Nothing to copy',
    disabled: true,
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>content_copy</FontIcon>,
  }, DIVIDER,
    'Web clipboard help',
  ],
}, {
  primaryText: 'Select all',
  rightIcon: `${COMMAND}+A`,
}, {
  primaryText: 'Select none',
  rightIcon: `${COMMAND}+${SHIFT}+A`,
}, DIVIDER, {
  primaryText: 'Find and replace...',
  rightIcon: `${COMMAND}+${SHIFT}+H`,
}];

const EditMenu = props => <DocumentMenu {...props} id="edit" text="Edit" menuItems={MENU_ITEMS} />;
export default EditMenu;

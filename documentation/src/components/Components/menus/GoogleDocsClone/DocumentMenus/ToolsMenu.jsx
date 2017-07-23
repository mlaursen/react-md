import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

import { COMMAND, CONTROL, SHIFT, ALT } from 'constants/unicode';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [
  'Spelling...', {
    primaryText: 'Explore',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>explore</FontIcon>,
    rightIcon: `${COMMAND}+${ALT}+${SHIFT}+I`,
  }, {
    primaryText: 'Define',
    rightIcon: `${COMMAND}+${SHIFT}+Y`,
  }, {
    primaryText: 'Document outline',
    rightIcon: `${COMMAND}+${CONTROL}+A ${COMMAND}+${CONTROL}+H`,
  }, {
    primaryText: 'Word count',
    rightIcon: `${COMMAND}+${SHIFT}+C`,
  }, {
    primaryText: 'Voice typing...',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>keyboard_voice</FontIcon>,
    rightIcon: `${COMMAND}+${ALT}+${SHIFT}+S`,
  }, {
    primaryText: 'Keep notepad',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>lightbulb_outline</FontIcon>,
  }, DIVIDER,
  'Translate document...',
  DIVIDER,
  'Script editor...',
  DIVIDER,
  'Preferences...',
  'Personal dictionary...',
];

const ToolsMenu = () => <DocumentMenu id="tools" text="Tools" menuItems={MENU_ITEMS} />;
export default ToolsMenu;

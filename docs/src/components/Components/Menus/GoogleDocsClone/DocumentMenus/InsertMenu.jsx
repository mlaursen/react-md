import React from 'react';
import { FontIcon } from 'react-md';

import { COMMAND, CONTROL, ALT, HORIZONTAL_BAR, OMEGA } from 'constants/unicode';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';
import UnicodeIcon from './UnicodeIcon';
import DocumentMenu from './DocumentMenu';

const MENU_ITEMS = [{
  primaryText: 'Image',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>image</FontIcon>,
}, {
  primaryText: 'Link...',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>link</FontIcon>,
  rightIcon: `${COMMAND}+K`,
}, {
  primaryText: 'Equation...',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>functions</FontIcon>,
}, {
  primaryText: 'Drawing...',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>vignette</FontIcon>,
}, {
  primaryText: 'Chart',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>insert_chart</FontIcon>,
  nestedItems: [{
    primaryText: 'Bar',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon iconClassName="fa fa-bar-chart" />,
  }, {
    primaryText: 'Column',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon iconClassName="fa fa-columns" />,
  }, {
    primaryText: 'Line',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>show_chart</FontIcon>,
  }, {
    primaryText: 'Pie',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>pie_chart</FontIcon>,
  }, DIVIDER, {
    primaryText: 'From Sheets...',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>bubble_chart</FontIcon>,
  }],
}, {
  primaryText: 'Table',
  nestedItems: [],
}, DIVIDER, {
  primaryText: 'Comment',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>add_comment</FontIcon>,
  rightIcon: `${COMMAND}+${ALT}+M`,
}, {
  primaryText: 'Footnote',
  rightIcon: `${COMMAND}+${ALT}+F`,
}, DIVIDER, {
  primaryText: 'Special characters...',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <UnicodeIcon>{OMEGA}</UnicodeIcon>,
}, {
  primaryText: 'Horizontal line',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <UnicodeIcon>{HORIZONTAL_BAR}</UnicodeIcon>,
}, DIVIDER, {
  primaryText: 'Page number',
  nestedItems: [],
}, 'Page count', DIVIDER, {
  primaryText: 'Page Break',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>pages</FontIcon>,
  rightIcon: `${COMMAND}+Enter`,
}, {
  primaryText: 'Column break',
  disabled: true,
}, {
  primaryText: 'Header',
  rightIcon: `${CONTROL}+${COMMAND}+O ${CONTROL}+${COMMAND}+H`,
}, {
  primaryText: 'Footer',
  rightIcon: `${CONTROL}+${COMMAND}+O ${CONTROL}+${COMMAND}+F`,
}, 'Bookmark', {
  primaryText: 'Table of contents',
  nestedItems: [],
}];

const InsertMenu = props => <DocumentMenu {...props} id="insert" text="Insert" menuItems={MENU_ITEMS} />;
export default InsertMenu;

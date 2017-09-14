import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

import { COMMAND, SHIFT, ALT } from 'constants/unicode';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';
import DocumentMenu from './DocumentMenu';
import CheckboxListItem from './CheckboxListItem';

const MENU_ITEMS = [{
  primaryText: 'Bold',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>format_bold</FontIcon>,
  rightIcon: `${COMMAND}+B`,
}, {
  primaryText: 'Italic',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>format_italic</FontIcon>,
  rightIcon: `${COMMAND}+I`,
}, {
  primaryText: 'Underline',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>format_underline</FontIcon>,
  rightIcon: `${COMMAND}+U`,
}, {
  primaryText: 'Strikethrough',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>strikethrough_s</FontIcon>,
  rightIcon: `${COMMAND}+${SHIFT}+X`,
}, {
  primaryText: 'Superscript',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon iconClassName="fa fa-superscript" />,
  rightIcon: `${COMMAND}+.`,
}, {
  primaryText: 'Subscript',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon iconClassName="fa fa-subscript" />,
  rightIcon: `${COMMAND}+,`,
}, DIVIDER, {
  primaryText: 'Font size',
  nestedItems: [{
    primaryText: 'Increase font size',
    rightIcon: `${COMMAND}+${SHIFT}+.`,
  }, {
    primaryText: 'Decrease font size',
    rightIcon: `${COMMAND}+${SHIFT}+,`,
  }],
}, {
  primaryText: 'Paragraph styles',
  nestedListHeightRestricted: false,
  nestedItems: [{
    primaryText: 'Increase indent',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_indent_increase</FontIcon>,
    rightIcon: `${COMMAND}+]`,
  }, {
    primaryText: 'Decrease indent',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_indent_decrease</FontIcon>,
    rightIcon: `${COMMAND}+[`,
  }, DIVIDER, {
    primaryText: 'Normal Text',
    nestedItems: [
      <CheckboxListItem
        key="apply-normal"
        id="apply-normal-text"
        name="format-options"
        label="Apply 'Normal text'"
        defaultChecked
        rightIcon={`${COMMAND}+${ALT}+0`}
      />, 'Update \'Normal text\' to match'],
  }, {
    primaryText: 'Title',
    nestedItems: [
      <CheckboxListItem
        key="apply-title"
        id="apply-title"
        name="format-options"
        label="Apply 'Title'"
      />, 'Update \'Title\' to match'],
  }, {
    primaryText: 'Subitle',
    nestedItems: [
      <CheckboxListItem
        key="apply-subtitle"
        id="apply-subtitle"
        name="format-options"
        label="Apply 'Subtitle'"
      />, 'Update \'Subtitle\' to match'],
  }, {
    primaryText: 'Heading 1',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-1"
        id="apply-heading-1"
        name="format-options"
        label="Apply 'Heading 1'"
        rightIcon={`${COMMAND}+${ALT}+1`}
      />, 'Update \'Heading 1\' to match'],
  }, {
    primaryText: 'Heading 2',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-2"
        id="apply-heading-2"
        name="format-options"
        label="Apply 'Heading 2'"
        rightIcon={`${COMMAND}+${ALT}+2`}
      />, 'Update \'Heading 2\' to match'],
  }, {
    primaryText: 'Heading 3',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-3"
        id="apply-heading-3"
        name="format-options"
        label="Apply 'Heading 3'"
        rightIcon={`${COMMAND}+${ALT}+3`}
      />, 'Update \'Heading 3\' to match'],
  }, {
    primaryText: 'Heading 4',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-4"
        id="apply-heading-4"
        name="format-options"
        label="Apply 'Heading 4'"
        rightIcon={`${COMMAND}+${ALT}+4`}
      />, 'Update \'Heading 4\' to match'],
  }, {
    primaryText: 'Heading 5',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-5"
        id="apply-heading-5"
        name="format-options"
        label="Apply 'Heading 5'"
        rightIcon={`${COMMAND}+${ALT}+5`}
      />, 'Update \'Heading 5\' to match'],
  }, {
    primaryText: 'Heading 6',
    nestedItems: [
      <CheckboxListItem
        key="apply-heading-6"
        id="apply-heading-6"
        name="format-options"
        label="Apply 'Heading 6'"
        rightIcon={`${COMMAND}+${ALT}+6`}
      />, 'Update \'Heading 6\' to match'],
  }, DIVIDER, {
    primaryText: 'Options',
    nestedItems: ['Save as my default styles', 'Use my default styles', 'Reset styles'],
  }],
}, {
  primaryText: 'Align',
  nestedItems: [{
    primaryText: 'Left',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_align_left</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+L`,
  }, {
    primaryText: 'Center',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_align_center</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+E`,
  }, {
    primaryText: 'Right',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_align_right</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+R`,
  }, {
    primaryText: 'Justified',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_align_justify</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+J`,
  }],
}, {
  primaryText: 'Line spacing',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>format_line_spacing</FontIcon>,
  nestedListHeightRestricted: false,
  nestedItems: [
    // Dont' feel like actually making a radio group here..
    <CheckboxListItem
      key="single"
      id="single-line-spacing"
      name="spacing-options"
      label="Single"
    />,
    <CheckboxListItem
      key="spacing-1.15"
      id="spacing-1.15"
      name="spacing-options"
      label="1.15"
      defaultChecked
    />,
    <CheckboxListItem
      key="spacing-1.5"
      id="spacing-1.5"
      name="spacing-options"
      label="1.5"
    />,
    <CheckboxListItem
      key="double"
      id="double-line-spacing"
      name="spacing-options"
      label="Double"
    />, DIVIDER,
    'Add space before paragraph',
    'Add space after paragraph',
    DIVIDER,
    'Custom spacing...',
  ],
}, {
  primaryText: 'Columns',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>view_column</FontIcon>,
  nestedItems: [],
}, {
  primaryText: 'Lists',
  nestedItems: [{
    primaryText: 'List options...',
    disabled: true,
    nestedItems: [],
  }, {
    primaryText: 'Numbered list',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_list_numbered</FontIcon>,
    nestedItems: [],
  }, {
    primaryText: 'Bulleted list',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>format_list_bulleted</FontIcon>,
    nestedItems: [],
  }],
}, DIVIDER, {
  primaryText: 'Clear formatting',
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>format_clear</FontIcon>,
  rightIcon: `${COMMAND}+\\`,
}, DIVIDER, {
  primaryText: 'Lines',
  disabled: true,
  nestedItems: [],
}, DIVIDER, {
  primaryText: 'Crop image',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>crop</FontIcon>,
}, {
  primaryText: 'Image options...',
  disabled: true,
}, {
  primaryText: 'Replace image...',
  disabled: true,
  nestedItems: [],
}, {
  primaryText: 'Reset image',
  disabled: true,
  tileClassName: ICON_TILE_CLASS_NAME,
  leftIcon: <FontIcon>photo_size_select_actual</FontIcon>,
}, DIVIDER, {
  primaryText: 'Alt text...',
  disabled: true,
}];

const FormatMenu = props => <DocumentMenu {...props} id="format" text="Format" menuItems={MENU_ITEMS} />;
export default FormatMenu;

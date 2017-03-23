import React from 'react';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

import { COMMAND, CONTROL, SHIFT, ALT, OMEGA, HORIZONTAL_BAR } from 'constants/unicodes';
import languages from 'constants/languages';
import DropDownMenu from './DropDownMenu';
import CheckboxListItem from './CheckboxListItem';
import LastEdit from './LastEdit';

const divider = { divider: true };
const tileClassName = 'left-icon-tile';
const unicodeIcon = unicode => <span className="unicode-icon md-text-center">{unicode}</span>;

const MENUS = [{
  text: 'File',
  items: [
    'Share...', divider, {
      primaryText: 'New',
      nestedItems: ['Document', 'Spreadsheet', 'Presentation', 'Form', 'Drawing', 'From template...'],
    }, {
      primaryText: 'Open',
      rightIcon: `${COMMAND}+O`,
    }, 'Rename...', 'Make a copy...', {
      primaryText: 'Move to...',
      tileClassName,
      leftIcon: <FontIcon>folder</FontIcon>,
    }, {
      primaryText: 'Move to trash',
      tileClassName,
      leftIcon: <FontIcon>delete</FontIcon>,
    }, divider, {
      primaryText: 'See revision history',
      rightIcon: `${COMMAND}+${SHIFT}+${ALT}+H`,
    }, {
      primaryText: 'Language',
      nestedItems: languages,
      nestedListStyle: { width: 240 },
    }, divider, {
      primaryText: 'Download as...',
      nestedItems: [
        'Microsoft Word (.docx)',
        'OpenDocument Format (.odt)',
        'Rich Text Format (.rtf)',
        'PDF Document (.pdf)',
        'Plain Text (.txt)',
        'Web Page (.html, zipped)',
        'EPUB Publication (.epub)',
      ],
    },
    'Publish to the web...',
    'Email collaborators...',
    'Email as attachment...', divider,
    'Document Details...',
    'Page setup...', {
      primaryText: 'Print',
      tileClassName,
      leftIcon: <FontIcon>print</FontIcon>,
      rightIcon: `${COMMAND}+P`,
    },
  ],
}, {
  text: 'Edit',
  items: [{
    primaryText: 'Undo',
    tileClassName,
    leftIcon: <FontIcon>undo</FontIcon>,
    rightIcon: `${COMMAND}+Z`,
  }, {
    primaryText: 'Redo',
    tileClassName,
    leftIcon: <FontIcon>redo</FontIcon>,
    rightIcon: `${COMMAND}+Y`,
  }, divider, {
    primaryText: 'Cut',
    disabled: true,
    tileClassName,
    leftIcon: <FontIcon>content_cut</FontIcon>,
    rightIcon: `${COMMAND}+X`,
  }, {
    primaryText: 'Copy',
    disabled: true,
    tileClassName,
    leftIcon: <FontIcon>content_copy</FontIcon>,
    rightIcon: `${COMMAND}+C`,
  }, {
    primaryText: 'Paste',
    disabled: true,
    tileClassName,
    leftIcon: <FontIcon>content_paste</FontIcon>,
    rightIcon: `${COMMAND}+V`,
  }, {
    primaryText: 'Paste without formatting',
    disabled: true,
    tileClassName,
    leftIcon: <FontIcon>content_paste</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+V`,
  }, {
    primaryText: 'Web clipboard',
    tileClassName,
    leftIcon: <FontIcon>assignment</FontIcon>,
    nestedItems: [{
      primaryText: 'Nothing to copy',
      disabled: true,
      tileClassName,
      leftIcon: <FontIcon>content_copy</FontIcon>,
    }, divider,
      'Web clipboard help',
    ],
  }, {
    primaryText: 'Select all',
    rightIcon: `${COMMAND}+A`,
  }, {
    primaryText: 'Select none',
    rightIcon: `${COMMAND}+${SHIFT}+A`,
  }, divider, {
    primaryText: 'Find and replace...',
    rightIcon: `${COMMAND}+${SHIFT}+H`,
  }],
}, {
  text: 'View',
  items: [
    <CheckboxListItem
      key="print-layout"
      id="print-layout"
      name="view-options"
      label="Print Layout"
      defaultChecked
    />, {
      primaryText: 'Mode',
      nestedItems: [{
        primaryText: 'Editing',
        secondaryText: 'Edit document directly',
        tileClassName,
        leftIcon: <FontIcon>mode_edit</FontIcon>,
      }, {
        primaryText: 'Suggesting',
        secondaryText: 'Edits become suggestions',
        tileClassName,
        leftIcon: <FontIcon>insert_emoticon</FontIcon>,
      }, {
        primaryText: 'Viewing',
        secondaryText: 'Read or print final document',
        tileClassName,
        leftIcon: <FontIcon>remove_red_eye</FontIcon>,
      }],
    }, divider,
    <CheckboxListItem
      id="show-ruler"
      key="show-ruler"
      name="view-options"
      label="Show ruler"
      defaultChecked
    />,
    <CheckboxListItem
      id="show-equation-toolbar"
      key="show-equation-toolbar"
      name="view-options"
      label="Show equation toolbar"
    />,
    <CheckboxListItem
      id="show-spelling-suggestions"
      key="show-spelling-suggestions"
      name="view-options"
      label="Show spelling suggestions"
      defaultChecked
    />, divider, {
      primaryText: 'Compact controls',
      rightIcon: `${CONTROL}+${SHIFT}+F`,
    }, 'Full screen',
  ],
}, {
  text: 'Insert',
  items: [{
    primaryText: 'Image',
    tileClassName,
    leftIcon: <FontIcon>image</FontIcon>,
  }, {
    primaryText: 'Link...',
    tileClassName,
    leftIcon: <FontIcon>link</FontIcon>,
    rightIcon: `${COMMAND}+K`,
  }, {
    primaryText: 'Equation...',
    tileClassName,
    leftIcon: <FontIcon>functions</FontIcon>,
  }, {
    primaryText: 'Drawing...',
    tileClassName,
    leftIcon: <FontIcon>vignette</FontIcon>,
  }, {
    primaryText: 'Chart',
    tileClassName,
    leftIcon: <FontIcon>insert_chart</FontIcon>,
    nestedItems: [{
      primaryText: 'Bar',
      tileClassName,
      leftIcon: <FontIcon iconClassName="fa fa-bar-chart" />,
    }, {
      primaryText: 'Column',
      tileClassName,
      leftIcon: <FontIcon iconClassName="fa fa-columns" />,
    }, {
      primaryText: 'Line',
      tileClassName,
      leftIcon: <FontIcon>show_chart</FontIcon>,
    }, {
      primaryText: 'Pie',
      tileClassName,
      leftIcon: <FontIcon>pie_chart</FontIcon>,
    }, divider, {
      primaryText: 'From Sheets...',
      tileClassName,
      leftIcon: <FontIcon>bubble_chart</FontIcon>,
    }],
  }, {
    primaryText: 'Table',
    nestedItems: [],
  }, divider, {
    primaryText: 'Comment',
    tileClassName,
    leftIcon: <FontIcon>add_comment</FontIcon>,
    rightIcon: `${COMMAND}+${ALT}+M`,
  }, {
    primaryText: 'Footnote',
    rightIcon: `${COMMAND}+${ALT}+F`,
  }, divider, {
    primaryText: 'Special characters...',
    tileClassName,
    leftIcon: unicodeIcon(OMEGA),
  }, {
    primaryText: 'Horizontal line',
    tileClassName,
    leftIcon: unicodeIcon(HORIZONTAL_BAR),
  }, divider, {
    primaryText: 'Page number',
    nestedItems: [],
  }, 'Page count', divider, {
    primaryText: 'Page Break',
    tileClassName,
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
  }],
}, {
  text: 'Format',
  items: [{
    primaryText: 'Bold',
    tileClassName,
    leftIcon: <FontIcon>format_bold</FontIcon>,
    rightIcon: `${COMMAND}+B`,
  }, {
    primaryText: 'Italic',
    tileClassName,
    leftIcon: <FontIcon>format_italic</FontIcon>,
    rightIcon: `${COMMAND}+I`,
  }, {
    primaryText: 'Underline',
    tileClassName,
    leftIcon: <FontIcon>format_underline</FontIcon>,
    rightIcon: `${COMMAND}+U`,
  }, {
    primaryText: 'Strikethrough',
    tileClassName,
    leftIcon: <FontIcon>strikethrough_s</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+X`,
  }, {
    primaryText: 'Superscript',
    tileClassName,
    leftIcon: <FontIcon iconClassName="fa fa-superscript" />,
    rightIcon: `${COMMAND}+.`,
  }, {
    primaryText: 'Subscript',
    tileClassName,
    leftIcon: <FontIcon iconClassName="fa fa-subscript" />,
    rightIcon: `${COMMAND}+,`,
  }, divider, {
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
      tileClassName,
      leftIcon: <FontIcon>format_indent_increase</FontIcon>,
      rightIcon: `${COMMAND}+]`,
    }, {
      primaryText: 'Decrease indent',
      tileClassName,
      leftIcon: <FontIcon>format_indent_decrease</FontIcon>,
      rightIcon: `${COMMAND}+[`,
    }, divider, {
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
    }, divider, {
      primaryText: 'Options',
      nestedItems: ['Save as my default styles', 'Use my default styles', 'Reset styles'],
    }],
  }, {
    primaryText: 'Align',
    nestedItems: [{
      primaryText: 'Left',
      tileClassName,
      leftIcon: <FontIcon>format_align_left</FontIcon>,
      rightIcon: `${COMMAND}+${SHIFT}+L`,
    }, {
      primaryText: 'Center',
      tileClassName,
      leftIcon: <FontIcon>format_align_center</FontIcon>,
      rightIcon: `${COMMAND}+${SHIFT}+E`,
    }, {
      primaryText: 'Right',
      tileClassName,
      leftIcon: <FontIcon>format_align_right</FontIcon>,
      rightIcon: `${COMMAND}+${SHIFT}+R`,
    }, {
      primaryText: 'Justified',
      tileClassName,
      leftIcon: <FontIcon>format_align_justify</FontIcon>,
      rightIcon: `${COMMAND}+${SHIFT}+J`,
    }],
  }, {
    primaryText: 'Line spacing',
    tileClassName,
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
      />, divider,
      'Add space before paragraph',
      'Add space after paragraph',
      divider,
      'Custom spacing...',
    ],
  }, {
    primaryText: 'Columns',
    tileClassName,
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
      tileClassName,
      leftIcon: <FontIcon>format_list_numbered</FontIcon>,
      nestedItems: [],
    }, {
      primaryText: 'Bulleted list',
      tileClassName,
      leftIcon: <FontIcon>format_list_bulleted</FontIcon>,
      nestedItems: [],
    }],
  }, divider, {
    primaryText: 'Clear formatting',
    tileClassName,
    leftIcon: <FontIcon>format_clear</FontIcon>,
    rightIcon: `${COMMAND}+\\`,
  }, divider, {
    primaryText: 'Lines',
    disabled: true,
    nestedItems: [],
  }, divider, {
    primaryText: 'Crop image',
    disabled: true,
    tileClassName,
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
    tileClassName,
    leftIcon: <FontIcon>photo_size_select_actual</FontIcon>,
  }, divider, {
    primaryText: 'Alt text...',
    disabled: true,
  }],
}, {
  text: 'Tools',
  items: [
    'Spelling...', {
      primaryText: 'Explore',
      tileClassName,
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
      tileClassName,
      leftIcon: <FontIcon>keyboard_voice</FontIcon>,
      rightIcon: `${COMMAND}+${ALT}+${SHIFT}+S`,
    }, {
      primaryText: 'Keep notepad',
      tileClassName,
      leftIcon: <FontIcon>lightbulb_outline</FontIcon>,
    }, divider,
    'Translate document...',
    divider,
    'Script editor...',
    divider,
    'Preferences...',
    'Personal dictionary...',
  ],
}, {
  text: 'Table',
  items: [{
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
  }, divider, {
    primaryText: 'Delete row',
    disabled: true,
  }, {
    primaryText: 'Delete column',
    disabled: true,
  }, {
    primaryText: 'Delete table',
    disabled: true,
  }, divider, {
    primaryText: 'Distribute rows',
    disabled: true,
  }, {
    primaryText: 'Distribute columns',
    disabled: true,
  }, divider, {
    primaryText: 'Merge cells',
    disabled: true,
  }, {
    primaryText: 'Unmerge cells',
    disabled: true,
  }, divider, {
    primaryText: 'Table properties',
    disabled: true,
  }],
}, {
  text: 'Add-ons',
  items: ['Get add-ons...', { primaryText: 'Manage add-ons...', disabled: true }],
}, {
  text: 'Help',
  items: [
    <TextField
      key="search"
      id="search-doc-menus"
      placeholder={`Search the menus (${ALT}+/)`}
      block
      paddedBlock={false}
      className="google-docs-search"
      type="search"
    />, divider,
    'Docs Help',
    divider,
    'Report a problem',
    'Report abuse/copyright',
    divider,
    'Keyboard shortcuts',
  ],
}];

const DocMenus = () => (
  <ul className="md-list-unstyled google-docs-menus">
    {MENUS.map(menuProps => <DropDownMenu {...menuProps} key={menuProps.text} />)}
    <LastEdit />
  </ul>
);

export default DocMenus;

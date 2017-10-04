import React from 'react';
import { FontIcon } from 'react-md';

import { COMMAND, SHIFT, ALT } from 'constants/unicode';
import languages from 'constants/sampleData/languages';
import DocumentMenu from './DocumentMenu';
import { DIVIDER, ICON_TILE_CLASS_NAME } from './constants';

const MENU_ITEMS = [
  'Share...', DIVIDER, {
    primaryText: 'New',
    nestedItems: ['Document', 'Spreadsheet', 'Presentation', 'Form', 'Drawing', 'From template...'],
  }, {
    primaryText: 'Open',
    rightIcon: `${COMMAND}+O`,
  }, 'Rename...', 'Make a copy...', {
    primaryText: 'Move to...',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>folder</FontIcon>,
  }, {
    primaryText: 'Move to trash',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>delete</FontIcon>,
  }, DIVIDER, {
    primaryText: 'See revision history',
    rightIcon: `${COMMAND}+${SHIFT}+${ALT}+H`,
  }, {
    primaryText: 'Language',
    nestedItems: languages,
    nestedListStyle: { width: 240 },
  }, DIVIDER, {
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
  'Email as attachment...', DIVIDER,
  'Document Details...',
  'Page setup...', {
    primaryText: 'Print',
    tileClassName: ICON_TILE_CLASS_NAME,
    leftIcon: <FontIcon>print</FontIcon>,
    rightIcon: `${COMMAND}+P`,
  },
];

const FileMenu = props => <DocumentMenu {...props} id="file" text="File" menuItems={MENU_ITEMS} />;
export default FileMenu;

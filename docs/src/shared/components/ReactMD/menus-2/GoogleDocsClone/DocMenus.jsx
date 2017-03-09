import React, { PureComponent } from 'react';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import FontIcon from 'react-md/lib/FontIcons';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import { COMMAND, CONTROL, SHIFT, ALT } from 'constants/unicodes';
import DropDownMenu from './DropDownMenu';
import languages from 'constants/languages';

const MENUS = [{
  text: 'File',
  items: [
    'Share...', { divider: true }, {
      primaryText: 'New',
      nestedItems: ['Document', 'Spreadsheet', 'Presentation', 'Form', 'Drawing', 'From template...'],
    }, {
      primaryText: 'Open',
      rightIcon: `${COMMAND}O`,
    }, 'Rename...', 'Make a copy...', {
      leftIcon: <FontIcon>folder</FontIcon>,
      primaryText: 'Move to...',
    }, {
      leftIcon: <FontIcon>delete</FontIcon>,
      primaryText: 'Move to trash',
    }, { divider: true }, {
      primaryText: 'See revision history',
      rightIcon: `${COMMAND}+${SHIFT}+${ALT}+H`,
    }, {
      primaryText: 'Language',
      nestedItems: languages,
      nestedListStyle: { width: 240 },
    }, { divider: true }, {
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
    'Email as attachment...', { divider: true },
    'Document Details...',
    'Page setup...', {
      leftIcon: <FontIcon>print</FontIcon>,
      primaryText: 'Print',
      rightIcon: `${COMMAND}P`,
    },
  ],
}, {
  text: 'Edit',
  items: [{
    primaryText: 'Undo',
    leftIcon: <FontIcon>undo</FontIcon>,
    rightIcon: `${COMMAND}Z`,
  }, {
    primaryText: 'Redo',
    leftIcon: <FontIcon>redo</FontIcon>,
    rightIcon: `${COMMAND}Y`,
  }, { divider: true }, {
    primaryText: 'Cut',
    disabled: true,
    leftIcon: <FontIcon>content_cut</FontIcon>,
    rightIcon: `${COMMAND}X`,
  }, {
    primaryText: 'Copy',
    disabled: true,
    leftIcon: <FontIcon>content_copy</FontIcon>,
    rightIcon: `${COMMAND}C`,
  }, {
    primaryText: 'Paste',
    disabled: true,
    leftIcon: <FontIcon>content_paste</FontIcon>,
    rightIcon: `${COMMAND}V`,
  }, {
    primaryText: 'Paste without formatting',
    disabled: true,
    leftIcon: <FontIcon>content_paste</FontIcon>,
    rightIcon: `${COMMAND}+${SHIFT}+V`,
  }, {
    primaryText: 'Web clipboard',
    leftIcon: <FontIcon>assignment</FontIcon>,
    nestedItems: [{
      primaryText: 'Nothing to copy',
      disabled: true,
      leftIcon: <FontIcon>content_copy</FontIcon>,
    }, { divider: true },
      'Web clipboard help',
    ],
  }, {
    primaryText: 'Select all',
    rightIcon: `${COMMAND}A`,
  }, {
    primaryText: 'Select none',
    rightIcon: `${COMMAND}+${SHIFT}+A`,
  }, { divider: true }, {
    primaryText: 'Find and replace...',
    rightIcon: `${COMMAND}+${SHIFT}+H`,
  }],
}, {
  text: 'View',
  items: [
    <ListItemControl
      key="print-layout"
      primaryText="Print Layout"
      primaryAction={<Checkbox id="print-layout" name="view-options" defaultChecked />}
    />, {
      primaryText: 'Mode',
      nestedItems: [{
        primaryText: 'Editing',
        secondaryText: 'Edit document directly',
        leftIcon: <FontIcon>mode_edit</FontIcon>,
      }, {
        primaryText: 'Suggesting',
        secondaryText: 'Edits become suggestions',
        leftIcon: <FontIcon>insert_emoticon</FontIcon>,
      }, {
        primaryText: 'Viewing',
        secondaryText: 'Read or print final document',
        leftIcon: <FontIcon>remove_red_eye</FontIcon>,
      }],
    }, { divider: true },
    <ListItemControl
      key="show-ruler"
      primaryText="Show ruler"
      primaryAction={<Checkbox id="show-ruler" name="view-options" defaultChecked />}
    />,
    <ListItemControl
      key="show-equation-toolbar"
      primaryText="Show equation toolbar"
      primaryAction={<Checkbox id="show-equation-toolbar" name="view-options" />}
    />,
    <ListItemControl
      key="show-spelling-suggestions"
      primaryText="Show spelling suggestions"
      primaryAction={<Checkbox id="show-spelling-suggestions" name="view-options" defaultChecked />}
    />, { divider: true }, {
      primaryText: 'Compact controls',
      rightIcon: `${CONTROL}+${SHIFT}+F`,
    }, 'Full screen',
  ],
}];

export default class DocMenus extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ul className="md-list-unstyled google-docs-menus">
        {MENUS.map(props => <DropDownMenu {...props} key={props.text} />)}
      </ul>
    );
  }
}

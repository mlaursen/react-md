import React, { PureComponent } from 'react';
import FontIcon from 'react-md/lib/FontIcons';

import DropDownMenu from './DropDownMenu';
import languages from 'constants/languages';

const MENUS = [{
  text: 'File',
  items: [
    'Share...', { divider: true }, {
      primaryText: 'New',
      nestedItems: ['Document', 'Spreadsheet', 'Presentation', 'Form', 'Drawing', 'From template...'],
    }, 'Open', 'Rename...', 'Make a copy...', {
      leftIcon: <FontIcon>folder</FontIcon>,
      primaryText: 'Move to...',
    }, {
      leftIcon: <FontIcon>delete</FontIcon>,
      primaryText: 'Move to trash',
    }, { divider: true }, 'See revision history', {
      primaryText: 'Language',
      nestedItems: languages,
    },
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

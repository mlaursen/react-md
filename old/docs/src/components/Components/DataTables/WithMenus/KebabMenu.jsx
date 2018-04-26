import React from 'react';
import { MenuButtonColumn, SVGIcon } from 'react-md';

import info from 'icons/info_outline.svg';
import download from 'icons/file_download.svg';
import duplicate from 'icons/content_copy.svg';
import deleteIcon from 'icons/delete.svg';
import kebab from 'icons/kebab.svg';

const menuItems = [{
  leftIcon: <SVGIcon use={info.url} />,
  primaryText: 'More info',
}, {
  leftIcon: <SVGIcon use={duplicate.url} />,
  primaryText: 'Duplicate',
}, {
  leftIcon: <SVGIcon use={download.url} />,
  primaryText: 'Download',
}, { divider: true }, {
  leftIcon: <SVGIcon use={deleteIcon.url} className="md-text--error" />,
  primaryText: <span className="md-text--error">Delete</span>,
}];

const KebabMenu = props => (
  <MenuButtonColumn {...props} icon menuItems={menuItems} listClassName="tables__with-menus__kebab-list">
    <SVGIcon use={kebab.url} />
  </MenuButtonColumn>
);
export default KebabMenu;

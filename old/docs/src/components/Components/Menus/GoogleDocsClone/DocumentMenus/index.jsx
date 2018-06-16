import React from 'react';

import FileMenu from './FileMenu';
import EditMenu from './EditMenu';
import ViewMenu from './ViewMenu';
import InsertMenu from './InsertMenu';
import FormatMenu from './FormatMenu';
import ToolsMenu from './ToolsMenu';
import TableMenu from './TableMenu';
import AddOnsMenu from './AddOnsMenu';
import HelpMenu from './HelpMenu';

const DocumentMenus = () => (
  <ul className="menus__google-docs__menus">
    <FileMenu />
    <EditMenu />
    <ViewMenu />
    <InsertMenu />
    <FormatMenu />
    <ToolsMenu />
    <TableMenu />
    <AddOnsMenu />
    <HelpMenu />
  </ul>
);

export default DocumentMenus;

import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import Paper from 'react-md/lib/Papers';

import LoremIpsum from 'components/LoremIpsum';

const ToolbarWithTabsExample = () => (
  <Paper>
    <Toolbar
      primary
      actionLeft={<Button icon className="menu-btn">menu</Button>}
      title="Page title"
      actionsRight={(
        <div className="md-toolbar-item margin-left-auto">
          <Button icon>search</Button>
          <Button icon>more_vert</Button>
        </div>
      )}
    >
      <Tabs primary>
        <Tab label="Item 1">
          <LoremIpsum count={3} />
        </Tab>
        <Tab label="Item 2">
          <LoremIpsum count={3} />
        </Tab>
        <Tab label="Item 3">
          <LoremIpsum count={3} />
        </Tab>
      </Tabs>
    </Toolbar>
  </Paper>
);

export default ToolbarWithTabsExample;

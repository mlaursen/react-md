import React from 'react';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons';
import Paper from 'react-md/lib/Papers';
import FontIcon from 'react-md/lib/FontIcons';

import LoremIpsum from 'components/LoremIpsum';

const InToolbarExample = () => (
  <Paper className="phone-size-container">
    <Toolbar
      primary
      title="Page Title"
      actionLeft={<Button icon>menu</Button>}
      actionsRight={<Button icon className="md-toolbar-item margin-left-auto">search</Button>}
    >
      <Tabs primary fixedWidth>
        <Tab label="Recents" icon={<FontIcon>phone</FontIcon>}>
          <LoremIpsum count={3} />
        </Tab>
        <Tab label="Favorites" icon={<FontIcon>favorite</FontIcon>}>
          <LoremIpsum count={4} />
        </Tab>
        <Tab label="Near By" icon={<FontIcon>person_pin</FontIcon>}>
          <LoremIpsum count={2} />
        </Tab>
      </Tabs>
    </Toolbar>
  </Paper>
);

export default InToolbarExample;

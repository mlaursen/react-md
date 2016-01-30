import React from 'react';

import Toolbar, { ActionArea } from 'react-md/lib/Toolbars';
import { IconButton } from 'react-md/lib/Buttons';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import { numstr } from '../utils';
import Paper from 'react-md/lib/Papers';

const ToolbarWithTabs = ({ centered = false, scrollable = false, fixedWidth = false }) => {
  return (
    <Paper>
      <Toolbar
        primary
        actionLeft={<IconButton className="menu-btn">menu</IconButton>}
        title="Page title"
        actionsRight={(
          <ActionArea>
            <IconButton>search</IconButton>
            <IconButton>more_vert</IconButton>
          </ActionArea>
        )}
        >
        <Tabs primary centered={centered} scrollable={scrollable} fixedWidth={fixedWidth}>
          {Array.apply(null, new Array(scrollable ? 9 : 3)).map((_, i) => (
          <Tab
            key={i}
            label={`Item ${numstr[i]}`}
            >
            <div style={{ minHeight: '80px', background: '#fafafa' }} />
          </Tab>
          ))}
        </Tabs>
      </Toolbar>
    </Paper>
  );
};

export default ToolbarWithTabs;

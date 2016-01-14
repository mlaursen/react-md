import React, { PropTypes } from 'react';

import AppBar, { ActionArea } from 'react-md/AppBar';
import { IconButton } from 'react-md/Buttons';
import { Tabs, Tab } from 'react-md/Tabs';
import { loremIpsum, numstr } from '../utils';

const AppWithTabs = ({ numTabs }) => {
  return (
    <AppBar
      primary
      menuButton={<IconButton className="menu-btn">menu</IconButton>}
      title="Page title"
      actionsRight={(
        <ActionArea>
          <IconButton>search</IconButton>
          <IconButton>more_vert</IconButton>
        </ActionArea>
      )}
      >
      <Tabs primary>
        {Array.apply(null, new Array(numTabs)).map((_, i) => (
        <Tab
          key={i}
          label={`Tab ${numstr[i]}`}
          >
          {loremIpsum(Math.floor(Math.random() * 5) + 1)}
        </Tab>
        ))}
      </Tabs>
    </AppBar>
  );
};

AppWithTabs.propTypes = {
  numTabs: PropTypes.number,
};

AppWithTabs.defaultProps = {
  numTabs: 3,
};

export default AppWithTabs;

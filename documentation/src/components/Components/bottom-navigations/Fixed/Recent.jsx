import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';

import pastries from 'constants/pastries';

const recent = [pastries[0], pastries[5], pastries[15], pastries[8], pastries[22], pastries[40], pastries[23], pastries[28]];

const Recent = () => (
  <List>
    {recent.map(pastry => (
      <ListItem
        key={pastry}
        primaryText={pastry}
        secondaryText="Wowza"
        leftIcon={<FontIcon>star</FontIcon>}
      />
    ))}
  </List>
);

export default Recent;

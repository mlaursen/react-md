import React from 'react';
import { List, ListItem, FontIcon } from 'react-md';

import pastries from 'constants/sampleData/pastries';

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

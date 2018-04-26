import React from 'react';
import { List, ListItem, FontIcon } from 'react-md';

import pastries from 'constants/sampleData/pastries';

const nearby = pastries.slice(2, 30).concat(pastries.slice(35, 40)).concat(pastries.slice(100, 130));

const Nearby = () => (
  <List>
    {nearby.map(pastry => (
      <ListItem
        key={pastry}
        primaryText={pastry}
        secondaryText="Wowza"
        leftIcon={<FontIcon>star</FontIcon>}
      />
    ))}
  </List>
);

export default Nearby;

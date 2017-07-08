import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';

import pastries from 'constants/pastries';

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

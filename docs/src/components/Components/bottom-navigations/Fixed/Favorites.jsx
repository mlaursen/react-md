import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';

import pastries from 'constants/sampleData/pastries';

const favorites = [pastries[1], pastries[46], pastries[40], pastries[123]];

const Favorites = () => (
  <List>
    {favorites.map(pastry => (
      <ListItem
        key={pastry}
        primaryText={pastry}
        secondaryText="Wowza"
        leftIcon={<FontIcon className="md-text--theme-secondary">star</FontIcon>}
      />
    ))}
  </List>
);

export default Favorites;

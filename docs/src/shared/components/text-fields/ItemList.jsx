import React from 'react';
import loremIpsum from 'lorem-ipsum';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import capitalizeFirst from 'react-md/lib/utils/StringUtils/capitalizeFirst';

import randomAvatars from 'utils/RandomUtils/randomAvatars';

const length = 6;
const avatars = randomAvatars(length);
const items = [...Array(length).keys()].map((_, i) => ({
  key: `item-${i}`,
  primaryText: capitalizeFirst(loremIpsum({ count: 5, units: 'words' })),
  secondaryText: loremIpsum(),
  leftAvatar: avatars[i],
}));

const ItemList = () => (
  <List className="toolbar-offset">
    {items.map(item => <ListItem {...item} />)}
  </List>
);

export default ItemList;

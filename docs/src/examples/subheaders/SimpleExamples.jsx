import React from 'react';
import Subheader from 'react-md/lib/Subheaders';
import Divider from 'react-md/lib/Dividers';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Avatar from 'react-md/lib/Avatars';

import { randomImage } from 'utils/RandomUtils';

const SimpleExamples = () => (
  <div>
    <List className="example-list">
      <Subheader primary primaryText="Primary Styled" />
      <ListItem primaryText="First" />
      <ListItem primaryText="Second" />
      <ListItem primaryText="Third" />
    </List>

    <List className="example-list">
      <Subheader primaryText="Inset" inset />
      <Divider inset />
      <ListItem primaryText="First" leftAvatar={<Avatar src={randomImage()} />} />
      <ListItem primaryText="Second" leftAvatar={<Avatar src={randomImage()} />} />
      <ListItem primaryText="Third" leftAvatar={<Avatar src={randomImage()} />} />
    </List>
  </div>
);

export default SimpleExamples;
